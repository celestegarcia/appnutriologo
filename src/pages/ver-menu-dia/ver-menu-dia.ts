import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuCompletoPage } from '../menu-completo/menu-completo';
import { DespensaPage } from '../despensa/despensa';
import { EscogerMenuPage } from '../escoger-menu/escoger-menu';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-ver-menu-dia',
  templateUrl: 'ver-menu-dia.html'
})
export class VerMenuDiaPage {

  constructor(public navCtrl: NavController) {
  }
  goToMenuCompleto(params){
    if (!params) params = {};
    this.navCtrl.push(MenuCompletoPage);
  }goToDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(DespensaPage);
  }goToEscogerMenu(params){
    if (!params) params = {};
    this.navCtrl.push(EscogerMenuPage);
  }goToVerMenuDia(params){
    if (!params) params = {};
    this.navCtrl.push(VerMenuDiaPage);
  }goToListaDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDespensaPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }
}
