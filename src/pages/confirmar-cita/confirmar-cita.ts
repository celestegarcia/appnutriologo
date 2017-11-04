import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CitasPage } from '../citas/citas';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-confirmar-cita',
  templateUrl: 'confirmar-cita.html'
})
export class ConfirmarCitaPage {

  constructor(public navCtrl: NavController) {
  }
  goToCitas(params){
    if (!params) params = {};
    this.navCtrl.push(CitasPage);
  }goToConfirmarCita(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmarCitaPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }
}
