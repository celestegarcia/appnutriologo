import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EscogerMenuPage } from '../escoger-menu/escoger-menu';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';

import { ModalController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-despensa',
  templateUrl: 'despensa.html'
})
export class DespensaPage {

  constructor(public navCtrl: NavController,  public http : Http , private modalCtrl: ModalController, private alertCtrl: AlertController)
  {
  }
  goToEscogerMenu(params){
    if (!params) params = {};
    this.navCtrl.push(EscogerMenuPage);
  }goToDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(DespensaPage);
  }goToListaDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDespensaPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }

  agregarMenu(){
    this.navCtrl.push(EscogerMenuPage);
  }

  ionViewDidLoad() {
    //Cargar info
  }

}
