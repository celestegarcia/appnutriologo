import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController, Tabs } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InicioPage } from '../pages/inicio/inicio';
import { CerrarSesionPage } from '../pages/cerrar-sesion/cerrar-sesion';
import { OlvideContrasenaPage } from '../pages/olvide-contrasena/olvide-contrasena';
import { DespensaPage } from '../pages/despensa/despensa';
import { EscogerMenuPage } from '../pages/escoger-menu/escoger-menu';
import { VerMenuDiaPage } from '../pages/ver-menu-dia/ver-menu-dia';
import { MenuCompletoPage } from '../pages/menu-completo/menu-completo';
import { ListaDespensaPage } from '../pages/lista-despensa/lista-despensa';
import { CitasPage } from '../pages/citas/citas';
import { ConfirmarCitaPage } from '../pages/confirmar-cita/confirmar-cita';
import { ConfiguracionesPage } from '../pages/configuraciones/configuraciones';
import { AcercaDePage } from '../pages/acerca-de/acerca-de';
import { SeguimientoPage } from '../pages/seguimiento/seguimiento';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';


import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = InicioPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToInicio(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage, {index:0});
  }goToCerrarSesion(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CerrarSesionPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.setRoot(OlvideContrasenaPage);
  }goToDespensa(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DespensaPage);
  }goToEscogerMenu(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EscogerMenuPage);
  }goToVerMenuDia(params){
    if (!params) params = {};
    this.navCtrl.setRoot(VerMenuDiaPage);
  }goToMenuCompleto(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MenuCompletoPage);
  }goToListaDespensa(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ListaDespensaPage);
  }goToCitas(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CitasPage);
  }goToConfirmarCita(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ConfirmarCitaPage);
  }goToConfiguraciones(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ConfiguracionesPage);
  }goToAcercaDe(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AcercaDePage);
  }goToSeguimiento(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SeguimientoPage);
  }
}
