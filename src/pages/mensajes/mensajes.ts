import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MensajePage } from '../mensaje/mensaje';

import { ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { InicioPage } from '../inicio/inicio';

import { TabsControllerPage } from '../tabs-controller/tabs-controller';
//http
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html'
})
export class MensajesPage {
  public mensajes: any = ["asd", "asd", "asd"];
  constructor(public navCtrl: NavController, public http: Http, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.obtenerNotificaciones();
  }
  goToMensaje(params) {
    if (!params) params = {};
    this.navCtrl.push(MensajePage);
  } goToMensajes(params) {
    if (!params) params = {};
    this.navCtrl.push(MensajesPage);
  }
  obtenerNotificaciones() {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('access-control-allow-origin', '*');
    let id = localStorage.getItem("paciente_id");
    this.http.get('http://104.131.121.55/getAvisos').subscribe(res => {
      var resultado = res.json().result.reverse();

      if (resultado.length >= 11) {
        resultado.splice(10, resultado.length - 1);

      }
      this.mensajes = resultado;
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Error al Obtener las notificaciones',
        subTitle: 'Hubo un error al obtener notificaciones, intentelo más tarde.',
        buttons: ['Regresar']
      });
      alert.present();
    });

  }
  borrarSitio(id) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: 'Lo sentimosno tienes permiso para borrar esta notificación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        }
      ]
    });

    alert.present();
  }
}