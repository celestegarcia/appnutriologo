import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DespensaPage } from '../despensa/despensa';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';
import { AlertController } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { MenuPage } from "../menu/menu";

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
  public seleccion:any = [-1,-1,-1,-1,-1];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http : Http , private modalCtrl: ModalController) 
  {
    //this.obtenerMenus();
  }

  getFecha(){
    var today:any = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }

  goToDespensa(params){
    if (!params) params = {};
    
    //localStorage.setItem("diasSeleccionados",null);
    var diasSel=localStorage.getItem("diasSeleccionados");

    if (diasSel && diasSel!=="null"){
      var diasOld = JSON.parse(diasSel);
      let newId= diasOld[0].id++;
      let newDia={id:newId,nombre:"Nmenu",menus:this.seleccion};
      diasOld.push(newDia);
      localStorage.setItem("diasSeleccionados",JSON.stringify(diasOld));
    }
    else{ //AQUI MUEVELE CELESTE PLS
      var newDia=[{id:0,nombre:"Nmenu",menus:this.seleccion}];
      localStorage.setItem("diasSeleccionados",JSON.stringify(newDia));
    }
    diasSel=localStorage.getItem("diasSeleccionados");
    console.log(diasSel);
    this.navCtrl.push(DespensaPage);
  }
  
  goToEscogerMenu(params){
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
            this.desayuno.push({menu:element.nombre,alimentos:element.alimentos,menu_id:element.menu_id});
            
        }
        else if (element.tipo === "Colacion"){
          //
          if (element.orden ==="1"){
            this.colacion1.push({menu:element.nombre,alimentos:element.alimentos,menu_id:element.menu_id});
          }
          else {
          this.colacion2.push({menu:element.nombre,alimentos:element.alimentos,menu_id:element.menu_id});
          }
          
        }
        else if (element.tipo === "Comida"){
          this.comida.push({menu:element.nombre,alimentos:element.alimentos,menu_id:element.menu_id});
        }
        else if (element.tipo === "Cena"){
          this.cena.push({menu:element.nombre,alimentos:element.alimentos,menu_id:element.menu_id});
        }
      });
      //console.log("Comida",this.comida);
      //console.log("Desayuno",this.desayuno);
      //console.log("Cena",this.cena);
      //console.log(this.cena);
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

  showAlert(p) {
    var listaAlimentos="";
    p.alimentos.forEach(element => {
      listaAlimentos+= element.can_recomendada+" "+element.um+" de "+element.descripcion+"<br>";
    });
    let alert = this.alertCtrl.create({
      title: p.menu,
      subTitle: listaAlimentos,
      buttons: [
        /*{
          text: 'Agregar',
          role: 'cancel',
          handler: () => {

            //localStorage.setItem("arreglo_despensa",null);
            var aux=localStorage.getItem("arreglo_despensa");
            console.log("MAMADAS",aux);
            if (aux && aux !="null"){
              var arrDesp = JSON.parse(aux);

              var newArr = this.union_arrays(arrDesp, [p.menu_id]);

              console.log("union",this.union_arrays(arrDesp, [p.menu_id]));
              localStorage.setItem("arreglo_despensa",JSON.stringify(newArr));
            }
            else{
            let auxArr = [p.menu_id];
            localStorage.setItem("arreglo_despensa",JSON.stringify(auxArr));
            //console.log('Menu revisado',p);
            }
          }
        },  */
        {
          text: 'Vista Compl.',
          handler: () => {
            this.navCtrl.push(MenuPage);
          }
        },
        {
          text: 'Cerrar',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  union_arrays (x, y) {
    var obj = {};
    for (var i = x.length-1; i >= 0; -- i)
       obj[x[i]] = x[i];
    for (var i = y.length-1; i >= 0; -- i)
       obj[y[i]] = y[i];
    var res = []
    for (var k in obj) {
      if (obj.hasOwnProperty(k))  // <-- optional
        res.push(obj[k]);
    }
    return res;
  }

}