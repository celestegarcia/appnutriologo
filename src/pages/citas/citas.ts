import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { TabsControllerPage } from '../tabs-controller/tabs-controller';
//http
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html'
})
export class CitasPage {

  
  public fecha:String =  "";
  public horas:string[] =["9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00"];
  public disableHoras:boolean = true;
  public cita = {
    hora:"",
    fecha:"",
    idpaciente:""
  }
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  constructor (public navCtrl: NavController,public http : Http , private modalCtrl: ModalController, private alertCtrl: AlertController ) 
  { 
      this.cita.idpaciente=(localStorage.getItem("paciente_id") as string);
      this.obtenerHoras();
  }

  fechaHoy(){
    var today = new Date();
    var dd:any = today.getDate();
    var mm:any = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd;
    } 
    
    if(mm<10) {
        mm = '0'+mm;
    } 
    
    var hoy = yyyy  + '-' + mm  + '-' + dd;
    return hoy;
  }

  obtenerHoras(){

    if(this.cita.fecha===""){
      this.disableHoras=true;
      this.horas = ["Eliga una Fecha"];
      return;
    }
    this.disableHoras=false;
    var body = this.cita;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('access-control-allow-origin', '*');
    console.log(this.cita);
    //http://104.131.121.55/insertCita?fecha=01-01-2017&hora=10:30&paciente=1
      this.http.get('http://104.131.121.55/getHorariosByFecha?fecha='+this.cita.fecha).subscribe(res=>{
        var resultado=res.json().result;
        console.log("getHorariosByFecha "+resultado);
        this.horas=resultado.hms;
    },error=> {
      let alert = this.alertCtrl.create({
        title: 'Error al Obtener Horas',
        subTitle: 'Hubo un error al obtener horas disponibles intentelo más tarde.',
        buttons: ['Regresar']
      });
      alert.present();  
    });
  }
  confirmarPost(respuesta){
    let alert = this.alertCtrl.create({
      title: 'Registro exitoso',
      subTitle: JSON.parse(respuesta).result,
      buttons: ['Aceptar']
    });
    alert.present();
    //this.navCtrl.push(LoginPage);
    
    this.navCtrl.setRoot(TabsControllerPage, {index:2});
    this.navCtrl.popToRoot();
  }
  prueba(){ 
    if (this.cita.fecha!=="") {
        this.disableHoras=false;
        console.log(this.cita.fecha);
        return;
      } 
      this.disableHoras=true;
    console.log(this.cita.fecha);
    }

  prepararPost(){

    if (this.cita.fecha < this.fechaHoy() ) {
      let alert = this.alertCtrl.create({
        title: 'Fecha Incorrecta',
        subTitle: 'Seleccione una fecha futura para la cita.',
        buttons: ['Regresar']
      });
      alert.present();
      return;
    }

    var body = this.cita;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('access-control-allow-origin', '*');
    console.log(this.cita);
    //http://104.131.121.55/insertCita?fecha=01-01-2017&hora=10:30&paciente=1
    this.http
      .post('http://104.131.121.55/insertCita?paciente='+this.cita.idpaciente+
            '&hora='+this.cita.hora+'&fecha='+this.cita.fecha,
             null, { headers: headers }).toPromise()
      .then(data => {
        console.log((data as any)._body);
        this.confirmarPost((data as any)._body);
      }).catch(error => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Error al Registrar Cita',
          subTitle: 'Hubo un error al procesar su solicitud, verifique su información, o intentelo más tarde.',
          buttons: ['Regresar']
        });
        alert.present();
      });
  }
 goToCitas(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage, {index:2}); 
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage, {index:0});    

  }
  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'De: ' + start + '<br>A: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  
}
