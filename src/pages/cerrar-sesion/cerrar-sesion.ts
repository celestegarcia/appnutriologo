import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { OlvideContrasenaPage } from '../olvide-contrasena/olvide-contrasena';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
@Component({
  selector: 'page-cerrar-sesion',
  templateUrl: 'cerrar-sesion.html'
})
export class CerrarSesionPage {
  public usuario:string=""

  constructor(public navCtrl: NavController) {
    this.usuario=localStorage.getItem("email");
  }
  goToLogin(params){
    if (!params) params = {};
    //this.navCtrl.push(LoginPage);

    localStorage.clear();

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
