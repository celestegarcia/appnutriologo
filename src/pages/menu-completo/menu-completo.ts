import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DespensaPage } from '../despensa/despensa';
import { EscogerMenuPage } from '../escoger-menu/escoger-menu';
import { VerMenuDiaPage } from '../ver-menu-dia/ver-menu-dia';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-menu-completo',
  templateUrl: 'menu-completo.html'
})
export class MenuCompletoPage {

  constructor(public navCtrl: NavController) {
  }
  goToDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(DespensaPage);
  }goToEscogerMenu(params){
    if (!params) params = {};
    this.navCtrl.push(EscogerMenuPage);
  }goToVerMenuDia(params){
    if (!params) params = {};
    this.navCtrl.push(VerMenuDiaPage);
  }goToMenuCompleto(params){
    if (!params) params = {};
    this.navCtrl.push(MenuCompletoPage);
  }goToListaDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDespensaPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }
}
