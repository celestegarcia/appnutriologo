import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { OlvideContrasenaPage } from '../olvide-contrasena/olvide-contrasena';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage) ;
  }goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.push(OlvideContrasenaPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
}
