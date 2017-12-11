import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DespensaPage } from '../despensa/despensa';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';
import { AlertController } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-escoger-menu',
  templateUrl: 'escoger-menu.html'
})
export class EscogerMenuPage {

  public menus:any = {};
  public desayuno: any = [];
  public colacion1: any = [];
  public comida: any = [];
  public colacion2: any = [];
  public cena: any = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http : Http , private modalCtrl: ModalController) 
  {
    this.obtenerMenus();
  }

  goToDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(DespensaPage);
  }goToEscogerMenu(params){
    if (!params) params = {};
    this.navCtrl.push(EscogerMenuPage);
  }goToListaDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDespensaPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }

  obtenerMenus(){
    let id= localStorage.getItem("paciente_id")
    //http://104.131.121.55/getMenusActivosPaciente?id=1
    this.http.get('http://104.131.121.55/getMenusActivosPaciente?id='+id).subscribe(res=>{
      var resultado=res.json().result;
      console.log("getMenusActivosPaciente ");
      console.log(resultado);
      this.menus=resultado;
      this.menus.forEach(element => {
        if (element.tipo === "Desayuno"){
            this.desayuno.push({menu:element.nombre,alimentos:element.alimentos});
            
        }
        else if (element.tipo === "Colacion"){
          //
          if (element.orden ===1){
            this.colacion1.push({menu:element.nombre,alimentos:element.alimentos});
          }
          else {
          this.colacion2.push({menu:element.nombre,alimentos:element.alimentos});
          }
          
        }
        else if (element.tipo === "Comida"){
          this.comida.push({menu:element.nombre,alimentos:element.alimentos});
        }
        else if (element.tipo === "Cena"){
          this.cena.push({menu:element.nombre,alimentos:element.alimentos});
        }
      });
      console.log("Comida",this.comida);
      console.log("Desayuno",this.desayuno);
      console.log("Cena",this.cena);
      console.log(this.cena);
  },error=> {
    let alert = this.alertCtrl.create({
      title: 'Error al Obtener Horas',
      subTitle: 'Hubo un error al obtener menus.',
      buttons: ['Regresar']
    });
    alert.present();  
  });
  }

  ionViewDidLoad() {
    //this.obtenerMenus();
  }

  showAlert(p) {
    let alert = this.alertCtrl.create({
      title: 'Contenido del menu',
      subTitle: 'Aqui van los ingredientes!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
      
            console.log('Menu revisado');
          }
        },
        {
          text: 'Ver todo',
          handler: () => {
            console.log('Menu completo');
          }
        }
      ]
    });
    alert.present();
  }
}