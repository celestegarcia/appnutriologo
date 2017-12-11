import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { Camera } from "@ionic-native/camera";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-configuraciones',
  templateUrl: 'configuraciones.html'
})
export class ConfiguracionesPage {
public base64Image: string;
public direccion:string;
public telefono:string;
public pwd1:string;
public pwd2:string;
myForm2: FormGroup;
public errMsg:boolean = true;
  constructor(public navCtrl: NavController, private camera: Camera, private alertCtrl: AlertController, public http : Http, public fb: FormBuilder ) 
  {
    this.myForm2 = this.fb.group({
      pass1: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      pass2: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      
     } );


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
 
    obtenerImg(){
      let id = localStorage.getItem("paciente_id");
        this.http.get("http://104.131.121.55/getPicture?id="+id).subscribe(res=>{
            let result = res.json().result;
            this.base64Image = result.foto;
            this.direccion = result.domicilio;
            this.telefono = result.telefono;
            //console.log(this.data);
            //this.enviarFormulario(res.json());
            //return this.data;
        },error=> {
          console.log(error);  
        });
    }

   enviarImg(){
     let id = localStorage.getItem("paciente_id");
     let body = {id:id,
                foto:this.base64Image,
                telefono:this.telefono,
                domicilio:this.direccion,
                pwd1:this.pwd1,
                pwd2:this.pwd2};
    if(body.pwd1==body.pwd2){
      let headers: any = new Headers({'Content-Type': 'multipart/form-data'});
      headers = new Headers({ 'Content-Type': 'application/json' });
      //headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http
        .post('http://104.131.121.55/setPicture',
              body, { headers: headers }).toPromise()
        .then(data => {
          console.log((data as any)._body);
          this.confirmarPost((data as any)._body);
        }).catch(error => {
          console.log(error);
          let alert = this.alertCtrl.create({
            title: 'Error al Subir',
            subTitle: 'Hubo un error al Actualizar el registro',
            buttons: ['Aceptar']
          });
          alert.present();
        });
    } else{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }
   confirmarPost(respuesta){
    let alert = this.alertCtrl.create({
      title: 'Registro exitoso',
      subTitle: JSON.parse(respuesta).result,
      buttons: ['Aceptar']
    });
    alert.present();
    //this.navCtrl.push(LoginPage);

  }

  ionViewDidLoad() {
    this.obtenerImg();
  }

}
