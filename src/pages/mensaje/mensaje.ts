import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MensajesPage } from '../mensajes/mensajes';

@Component({
  selector: 'page-mensaje',
  templateUrl: 'mensaje.html'
})
export class MensajePage {

  constructor(public navCtrl: NavController) {
  }
  goToMensajes(params){
    if (!params) params = {};
    this.navCtrl.push(MensajesPage);
  }
}
