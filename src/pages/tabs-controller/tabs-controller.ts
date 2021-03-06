import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Tabs } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { MensajesPage } from '../mensajes/mensajes';
import { RecordatorioDeCitasPage } from '../recordatorio-de-citas/recordatorio-de-citas';


@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  public user:any = {
    email:"",
    password:""
  }

  tab1Root: any = InicioPage;
  tab2Root: any = MensajesPage;
  tab3Root: any = RecordatorioDeCitasPage;
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user=navParams.data;
    //console.log(this.navParams.data.index);
  }

  ionViewDidEnter() {
    this.tabRef.select(this.navParams.data.index);
  }
  goToInicio(params){
    params = {email:this.user.email, password:this.user.password};
    //if (!params) params = {};
    //console.log(params.data);
   // this.navCtrl.push(InicioPage);
  }goToMensajes(params){
    if (!params) params = {};
    this.navCtrl.push(MensajesPage);
  }goToRecordatorioDeCitas(params){
    if (!params) params = {};
    this.navCtrl.push(RecordatorioDeCitasPage);
  }
}
