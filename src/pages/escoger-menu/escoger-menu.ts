import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerMenuDiaPage } from '../ver-menu-dia/ver-menu-dia';
import { MenuCompletoPage } from '../menu-completo/menu-completo';
import { DespensaPage } from '../despensa/despensa';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-escoger-menu',
  templateUrl: 'escoger-menu.html'
})
export class EscogerMenuPage {

  constructor(public navCtrl: NavController) {
  }
  goToVerMenuDia(params){
    if (!params) params = {};
    this.navCtrl.push(VerMenuDiaPage);
  }goToMenuCompleto(params){
    if (!params) params = {};
    this.navCtrl.push(MenuCompletoPage);
  }goToDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(DespensaPage);
  }goToEscogerMenu(params){
    if (!params) params = {};
    this.navCtrl.push(EscogerMenuPage);
  }goToListaDespensa(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDespensaPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }
}
