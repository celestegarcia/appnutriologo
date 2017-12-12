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
  public despensa: any = [];

  public idmenus:any = [];

  constructor(public navCtrl: NavController, public http : Http , private modalCtrl: ModalController, private alertCtrl: AlertController) 
  {
  }
  goToInicio(params){
    if (!params) params = {};
    //this.navCtrl.push(TabsControllerPage, {index:0});    
    this.navCtrl.pop();
  }

  obtenerSeleccionados(){
    let aux = localStorage.getItem("diasSeleccionados");
    var arrDesp = [];
          if(aux){
          arrDesp = JSON.parse(aux);
          //console.log("SHIMAZU->",arrDesp);
          }
    var res = [];
    arrDesp.forEach(element => {
      element.menus.forEach(iter => {

        if(iter!==-1){
          res.push(parseInt(iter));
        }
      });
    });
    localStorage.setItem("arreglo_despensa",JSON.stringify (res));
    console.log("lorem ",res);
  }

  contarRepesN(arr,n) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    //return [a, b];
    let aux=a.indexOf(n);
    if(aux!==-1){
    return b[aux];
    }
    return -1;
}

  obtenerMenus(){
    let id= localStorage.getItem("paciente_id")
    //http://104.131.121.55/getMenusActivosPaciente?id=1
    this.http.get('http://104.131.121.55/getMenusActivosPaciente?id='+id).subscribe(res=>{
      var resultado=res.json().result;
      let aux = localStorage.getItem("arreglo_despensa");
      var arrDesp = [];
            if(aux){
            arrDesp = JSON.parse(aux);
            console.log("ID MENUS->",arrDesp);
            }
      this.menus=resultado;
      this.menus.forEach(element => {
        this.idmenus.push(element.menu_id);
function foo(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}
       // arrDesp.forEach(iter => { //checar para cada menu por si hay repetidos
          if(arrDesp.indexOf(element.menu_id)!==-1){
            for(var i = this.contarRepesN(arrDesp,element.menu_id);i>0;i--){
              this.desayuno.push({menu:element.nombre,alimentos:element.alimentos,menu_id:element.menu_id});
              }
            }
      //  });//arrDesp
      });//menus
      //console.log("Comida",this.comida);
      //console.log("Desayuno",this.desayuno);
      //console.log("Cena",this.cena);
      //console.log(this.cena);
      //console.log("ONEGAI->",this.idmenus);

      this.procesarDespensa();


  },error=> {
    let alert = this.alertCtrl.create({
      title: 'Error al Obtener Horas',
      subTitle: 'Hubo un error al obtener menus.',
      buttons: ['Regresar']
    });
    alert.present();  
  });
  }

  procesarDespensa(){ //ESTO ESTA BIEN PUERQUISIMO ALR
    var a = this.desayuno;
    console.log("desayuno ",JSON.stringify(a));
    var alimentos = [];

        
    this.desayuno.forEach(element => {
      element.alimentos.forEach(element2 => {
        alimentos.push(element2.descripcion);
      });
    });

    var catAlimentos =this.union_arrays([],alimentos); //elimina repetidos
    var auxAlimentos = [];
    var auxUM = [];
    console.log("CATALIM",catAlimentos);

    catAlimentos.forEach(element => {
      auxAlimentos.push(0); //contadores
    });

    var despensa = []
    this.desayuno.forEach(element => {
      element.alimentos.forEach(element2 => {
        
        
      let indx = catAlimentos.indexOf(element2.descripcion);
      console.log("indx",indx);
      console.log("auxAli",auxAlimentos);
      if (indx!==-1){
        auxAlimentos[indx]+=parseInt(element2.porciones);
        var cantidad = auxAlimentos[indx];
        auxUM[indx]=element2.um;
        despensa.push(
          {descripcion:element2.descripcion,
            um:element2.um,
            cantidad:cantidad,
            can_recomendada:element2.can_recomenada,
            porciones:element2.porciones
          });
      }
    }); //alimentos
  }); //desayuno
  console.log("auxAli",auxAlimentos);
  
  console.log("ipsum->",catAlimentos);
  catAlimentos = catAlimentos.reverse();
  catAlimentos = this.union_arrays([],catAlimentos); //elimina repetidos
  //auxAlimentos = this.union_arrays([],auxAlimentos); //elimina repetidos
  //auxUM = this.union_arrays([],auxUM); //elimina repetidos
  var tempdesp=JSON.parse(localStorage.getItem("despensa2"));
  
  catAlimentos.forEach(element2 => {
    var ts = catAlimentos;
    var indx = ts.indexOf(element2);
    var a=false;
    try {
      a=tempdesp[indx].checked;
    }
    catch(err) {
      console.log("no hay checked");
    }
    
    //if(tempdesp[indx].checked==undefined)a=false;
    this.despensa.push(
      {descripcion:element2,
        um:auxUM[indx],
        cantidad:auxAlimentos[indx],
        checked:a
      });
  });
  localStorage.setItem("despensa2",JSON.stringify (this.despensa));
  }
  clickcbox(){
    localStorage.setItem("despensa2",JSON.stringify (this.despensa));
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

  ionViewDidLoad() {
    this.obtenerSeleccionados();
    this.obtenerMenus();
    
  }

}//class
