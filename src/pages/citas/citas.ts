import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfirmarCitaPage } from '../confirmar-cita/confirmar-cita';

import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html'
})
export class CitasPage {

  constructor(public navCtrl: NavController) {
  }
  goToConfirmarCita(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmarCitaPage);
  }goToCitas(params){
    if (!params) params = {};
    this.navCtrl.push(CitasPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }
}
