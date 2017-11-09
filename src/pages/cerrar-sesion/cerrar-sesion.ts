import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InicioPage } from '../inicio/inicio';
import { OlvideContrasenaPage } from '../olvide-contrasena/olvide-contrasena';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
@Component({
  selector: 'page-cerrar-sesion',
  templateUrl: 'cerrar-sesion.html'
})
export class CerrarSesionPage {

  constructor(public navCtrl: NavController) {
  }
  goToLogin(params){
    if (!params) params = {};
    //this.navCtrl.push(LoginPage);
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage,{index:0});
  }goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.push(OlvideContrasenaPage);
  }
}
