import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from "../tabs-controller/tabs-controller";
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-acerca-de',
  templateUrl: 'acerca-de.html'
})
export class AcercaDePage {

  constructor(public navCtrl: NavController, private callNumber: CallNumber) {
  }
  
  llamar(){
    this.callNumber.callNumber("18001010101", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
}
