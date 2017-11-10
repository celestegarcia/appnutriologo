import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {

  public user:any = {
    email:"",
    password:""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let tmpUsr: any ={
      email:localStorage.getItem("email"),
      ape_materno: localStorage.getItem("ape_materno"),
      nombre: localStorage.getItem("nombre")
    }
    /*
        ape_materno:"DIAZ"
        ape_paterno:"HUDSON"
        email:"hudson2@gmail.com"
        nombre:"CARLOS"
        paciente_id:1
      */
    this.user=tmpUsr;    // navParams; // <- No funciona esta basura
    console.log(this.user);
    
  }
  
}
