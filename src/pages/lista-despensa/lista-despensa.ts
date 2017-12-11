import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';


import { ModalController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'page-lista-despensa',
  templateUrl: 'lista-despensa.html'
})
export class ListaDespensaPage {

  public menus:any = {};
  public desayuno: any = [];
  public colacion1: any = [];
  public comida: any = [];
  public colacion2: any = [];
  public cena: any = [];

  public idmenus:any = [];

  constructor(public navCtrl: NavController, public http : Http , private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }
  goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage, {index:0});    

  }

  obtenerMenus(){
    let id= localStorage.getItem("paciente_id")
    //http://104.131.121.55/getMenusActivosPaciente?id=1
    this.http.get('http://104.131.121.55/getMenusActivosPaciente?id='+id).subscribe(res=>{
      var resultado=res.json().result;
      //console.log("getMenusActivosPaciente ");
      //console.log(resultado);
      this.menus=resultado;
      this.menus.forEach(element => {
        this.idmenus.push(element.menu_id);
        
            this.desayuno.push({menu:element.nombre,alimentos:element.alimentos,menu_id:element.menu_id});
      });
      //console.log("Comida",this.comida);
      //console.log("Desayuno",this.desayuno);
      //console.log("Cena",this.cena);
      //console.log(this.cena);
      console.log("ONEGAI->",this.idmenus);
      let aux = localStorage.getItem("arreglo_despensa");

      if(aux){
      let arrDesp = JSON.parse(aux);
      console.log("SHIMAZU->",arrDesp);


      }


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
    this.obtenerMenus();
  }

}//class
