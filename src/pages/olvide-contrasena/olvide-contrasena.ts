import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-olvide-contrasena',
  templateUrl: 'olvide-contrasena.html'
})
export class OlvideContrasenaPage {

  constructor(public navCtrl: NavController) {
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.push(OlvideContrasenaPage);
  }
}
