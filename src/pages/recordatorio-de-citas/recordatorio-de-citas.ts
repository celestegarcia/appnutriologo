import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CitasPage } from '../citas/citas';

@Component({
  selector: 'page-recordatorio-de-citas',
  templateUrl: 'recordatorio-de-citas.html'
})
export class RecordatorioDeCitasPage {

  constructor(public navCtrl: NavController) {
  }
  
  irCitas(params){
    if (!params) params = {};
    this.navCtrl.push(CitasPage);
  }
}
