import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { MensajesPage } from '../mensajes/mensajes';
import { RecordatorioDeCitasPage } from '../recordatorio-de-citas/recordatorio-de-citas';


@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = InicioPage;
  tab2Root: any = MensajesPage;
  tab3Root: any = RecordatorioDeCitasPage;
  constructor(public navCtrl: NavController) {
  }
  goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }goToMensajes(params){
    if (!params) params = {};
    this.navCtrl.push(MensajesPage);
  }goToRecordatorioDeCitas(params){
    if (!params) params = {};
    this.navCtrl.push(RecordatorioDeCitasPage);
  }
}
