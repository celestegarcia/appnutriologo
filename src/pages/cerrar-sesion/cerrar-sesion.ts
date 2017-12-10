import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { OlvideContrasenaPage } from '../olvide-contrasena/olvide-contrasena';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'page-cerrar-sesion',
  templateUrl: 'cerrar-sesion.html'
})
export class CerrarSesionPage {
  public usuario:string=""
  public base64Image: string;

  constructor(public navCtrl: NavController,public http : Http) {
    this.usuario=localStorage.getItem("email");
  }
  goToLogin(params){
    if (!params) params = {};
    //this.navCtrl.push(LoginPage);

    localStorage.clear();

    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage,{index:0});
  }goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.push(OlvideContrasenaPage);
  }

  obtenerImg(){
    let id = localStorage.getItem("paciente_id");
      this.http.get("http://104.131.121.55/getPicture?id="+id).subscribe(res=>{
          let result = res.json().result;
          this.base64Image = result.foto;
          //console.log(this.data);
          //this.enviarFormulario(res.json());
          //return this.data;
      },error=> {
        console.log(error);  
      });
  }

  ionViewDidLoad() {
   
        this.obtenerImg();
  }    
}
