import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CitasPage } from '../citas/citas';

import { ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { InicioPage } from '../inicio/inicio';

import { TabsControllerPage } from '../tabs-controller/tabs-controller';
//http
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'page-recordatorio-de-citas',
  templateUrl: 'recordatorio-de-citas.html'
})
export class RecordatorioDeCitasPage {
  /*
{   "status": "OK",
    "code": 200,
    "result": [
        {
            "cita_id": 2,
            "fecha": "2017-11-29",
            "hora": "11:00:00",
            "status": 0,
            "motivo": null,
            "paciente_id": 5,
            "nombre": "Celeste",
            "ape_paterno": "Garcia",
            "ape_materno": "Diaz"    } ] }
  */

  public citas:any =["asd","asd","asd"];

  constructor(public navCtrl: NavController,public http : Http , private modalCtrl: ModalController, private alertCtrl: AlertController) 
  {
      this.obtenerCitas();
  }

  obtenerCitas(){
    
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('access-control-allow-origin', '*');
        let id = localStorage.getItem("paciente_id");
          this.http.get('http://104.131.121.55/getCitasByPaciente?id='+id).subscribe(res=>{
            var resultado=res.json().result;
            resultado.forEach(element => { //Ajustar valor de fecha para que no lleve segundos
              let aux=element.hora.split(":")
              element.hora=aux[0]+":"+aux[1];
              if(element.status===0) {element.status="Pendiente";} //Procesar status para que lo muestre como texto
              else if(element.status===1) {element.status="Confirmada";}
              else if(element.status===2) {element.status="Cancelada";}
              else if(element.status===3) {element.status="Completada";}
             
            });
            console.log("getCitasByPaciente "+resultado);
            this.citas=resultado;
        },error=> {
          let alert = this.alertCtrl.create({
            title: 'Error al Obtener Citas',
            subTitle: 'Hubo un error al obtener citas, intentelo más tarde.',
            buttons: ['Regresar']
          });
          alert.present();  
        });
    
  }
  
  irCitas(params){
    if (!params) params = {};
    this.navCtrl.push(CitasPage);
  }
}
