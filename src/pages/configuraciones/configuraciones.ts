import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { Camera } from "@ionic-native/camera";

@Component({
  selector: 'page-configuraciones',
  templateUrl: 'configuraciones.html'
})
export class ConfiguracionesPage {
public base64Image: string;
  constructor(public navCtrl: NavController, private camera: Camera) {
  }
  goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage, {index:0});     

  }

   takePic(){
     this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
     }).then((ImageData) => {
       this.base64Image = 'data:image/jpeg;base64,' + ImageData;

     }, (err) =>{
       console.log(err);
     });
     }

     openGallery(){
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
       }).then((ImageData) => {
         this.base64Image = 'data:image/jpeg;base64,' + ImageData;
  
       }, (err) =>{
         console.log(err);
       });
       }
}
