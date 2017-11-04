import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InicioPage } from '../inicio/inicio';
import { OlvideContrasenaPage } from '../olvide-contrasena/olvide-contrasena';

@Component({
  selector: 'page-cerrar-sesion',
  templateUrl: 'cerrar-sesion.html'
})
export class CerrarSesionPage {

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
