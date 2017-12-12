import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EscogerMenuPage } from '../escoger-menu/escoger-menu';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';

import { ModalController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-despensa',
  templateUrl: 'despensa.html'
})
export class DespensaPage {

  public menus:any = [];
  public desayuno: any = [];
  public colacion1: any = [];
  public comida: any = [];
  public colacion2: any = [];
  public cena: any = [];

  public idmenus:any = [];
  public dias:any=[];

  constructor(public navCtrl: NavController,  public http : Http , private modalCtrl: ModalController, private alertCtrl: AlertController)
  {
  }
  goToEscogerMenu(params){
    if (!params) params = {};
    this.navCtrl.push(EscogerMenuPage);
  }goToDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(DespensaPage);
  }goToListaDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDespensaPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }

  agregarMenu(){
    this.navCtrl.push(EscogerMenuPage);
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
        if (element.tipo === "Desayuno"){
            this.desayuno.push({menu:element.nombre,alimentos:element.alimentos,menu_id:element.menu_id});
            
        }
        else if (element.tipo === "Colacion"){
          //
          if (element.orden ==="1"){
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
      console.log(this.menus);
      //console.log("Comida",this.comida);
      //console.log("Desayuno",this.desayuno);
      //console.log("Cena",this.cena);
      //console.log(this.cena);
      console.log("ONEGAI->",this.idmenus);
      let aux = localStorage.getItem("arreglo_despensa");

      if(aux){
      let arrDesp = JSON.parse(aux);
      console.log("SHIMAZU->",arrDesp);

      console.log("intersect",this.intersect(this.idmenus,arrDesp));
      var newArr = this.intersect(this.idmenus,arrDesp);
        //asignar interseccion para asegurar que solo menus activos se muestren
      localStorage.setItem("arreglo_despensa",JSON.stringify(newArr));

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
    this.obtenerDias();
  }

  obtenerDias(){
    var diasSel=localStorage.getItem("diasSeleccionados");
    if(diasSel && diasSel!=="null"){
      this.dias = JSON.parse(diasSel);
    }
    console.log(this.dias);

  }

  borrar(){
    localStorage.setItem("diasSeleccionados",null);
  }

  intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}

borrarElemento(){
  
}

}
