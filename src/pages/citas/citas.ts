import { Component } from '@angular/core';
import { ConfirmarCitaPage } from '../confirmar-cita/confirmar-cita';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html'
})
export class CitasPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 
  calendar = {
    mode: 'month ',
    currentDate: new Date()
  };
  constructor (public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }
  goToConfirmarCita(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmarCitaPage);
  }goToCitas(params){
    if (!params) params = {};
    this.navCtrl.push(CitasPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }
  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'De: ' + start + '<br>A: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
