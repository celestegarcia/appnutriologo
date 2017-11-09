import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerMenuDiaPage } from '../ver-menu-dia/ver-menu-dia';
import { MenuCompletoPage } from '../menu-completo/menu-completo';
import { DespensaPage } from '../despensa/despensa';
import { ListaDespensaPage } from '../lista-despensa/lista-despensa';
import { InicioPage } from '../inicio/inicio';
import { AlertController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-escoger-menu',
  templateUrl: 'escoger-menu.html'
})
export class EscogerMenuPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
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
    this.navCtrl.push(TabsControllerPage, {index:0});     

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Contenido del menu',
      subTitle: 'Aqui van los ingredientes!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Menu revisado');
          }
        },
        {
          text: 'Ver todo',
          handler: () => {
            console.log('Menu completo');
          }
        }
      ]
    });
    alert.present();
  }
}
