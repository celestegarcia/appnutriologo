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
      email:localStorage.getItem("usrEmail"),
      password:localStorage.getItem("usrPass")
    }
    this.user=tmpUsr;    // navParams; // <- No funciona esta basura
    console.log(this.user);
    
  }
  
}
