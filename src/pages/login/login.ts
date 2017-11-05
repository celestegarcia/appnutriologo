import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { OlvideContrasenaPage } from '../olvide-contrasena/olvide-contrasena';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { PreRegistroPage } from '../pre-registro/pre-registro';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public user:any = {
    email:"",
    password:""
  }

  constructor(public navCtrl: NavController) {
  }
  goToInicio(params){
    if (!params) params = {};

    //Guardar datos del compa
    localStorage.setItem("usrEmail", this.user.email);
    localStorage.setItem("usrPass", this.user.password);
    this.navCtrl.push(TabsControllerPage,this.user);


    

  }goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.push(OlvideContrasenaPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
  goToPreReg(params){
    if (!params) params = {};
    this.navCtrl.push(PreRegistroPage);
  }
}
