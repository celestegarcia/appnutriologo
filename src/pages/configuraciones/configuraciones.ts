import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-configuraciones',
  templateUrl: 'configuraciones.html'
})
export class ConfiguracionesPage {

  constructor(public navCtrl: NavController) {
  }
  goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage, {index:0});     

  }
}
