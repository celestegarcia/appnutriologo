import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MensajePage } from '../mensaje/mensaje';


@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html'
})
export class MensajesPage {

  constructor(public navCtrl: NavController) {
  }
  goToMensaje(params){
    if (!params) params = {};
    this.navCtrl.push(MensajePage);
  }goToMensajes(params){
    if (!params) params = {};
    this.navCtrl.push(MensajesPage);
  }
}