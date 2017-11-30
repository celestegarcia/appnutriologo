import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { TabsControllerPage } from "../tabs-controller/tabs-controller";
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-acerca-de',
  templateUrl: 'acerca-de.html'
})
export class AcercaDePage {

  constructor(public navCtrl: NavController, private callNumber: CallNumber) {
  }
  goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage,{index:0});
  }

  llamar(){
    this.callNumber.callNumber("18001010101", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
}
