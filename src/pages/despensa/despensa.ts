import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EscogerMenuPage } from '../escoger-menu/escoger-menu';
import { VerMenuDiaPage } from '../ver-menu-dia/ver-menu-dia';
import { MenuCompletoPage } from '../menu-completo/menu-completo';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-despensa',
  templateUrl: 'despensa.html'
})
export class DespensaPage {

  constructor(public navCtrl: NavController) {
  }
  goToEscogerMenu(params){
    if (!params) params = {};
    this.navCtrl.push(EscogerMenuPage);
  }goToVerMenuDia(params){
    if (!params) params = {};
    this.navCtrl.push(VerMenuDiaPage);
  }goToMenuCompleto(params){
    if (!params) params = {};
    this.navCtrl.push(MenuCompletoPage);
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
}
