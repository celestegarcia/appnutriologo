import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController,   Tabs } from 'ionic-angular';
import { OlvideContrasenaPage } from '../olvide-contrasena/olvide-contrasena';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { PreRegistroPage } from '../pre-registro/pre-registro';

import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


import 'rxjs/add/operator/toPromise';

import  {PostPreReg} from "../../services/postprereg";

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public error: boolean;
  public valido: boolean;
  public email: string;
  public pwd: string;


  myForm: FormGroup;
  public user:any = {
    email:"",
    pwd:""
  }
  public idLogeado:string=""

  constructor(public navCtrl: NavController, public fb: FormBuilder,public http : Http,private alertCtrl: AlertController) 
  {
    this.error = false;
    this.valido = false;
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      pwd: ['', [Validators.required]]
    });

    if(localStorage.getItem("paciente_id")){
      this.navCtrl.setRoot(TabsControllerPage);
      this.navCtrl.popToRoot();
    }
    
  }

  //guarda los datos del formulario
  saveData(){
    //alert(JSON.stringify(this.myForm.value));
  }

  halp(){
    //http://104.131.121.55/loginPaciente?email=hudson2@gmail.com&pwd=1234
    console.log(this.email+"    "+this.pwd);
    this.http.get("http://104.131.121.55/loginPaciente?email="+this.email+"&pwd="+this.pwd).subscribe(res=>{
      var resultado=res.json().result[0];
      console.log(resultado);
      //this.enviarFormulario(res.json());
      //return this.data;
      if(resultado!=undefined){
      //Guardar datos del compa
      /*
        ape_materno:"DIAZ"
        ape_paterno:"HUDSON"
        email:"hudson2@gmail.com"
        nombre:"CARLOS"
        paciente_id:1
      */
      localStorage.setItem("email", this.email);
      localStorage.setItem("pwd", this.pwd);
      localStorage.setItem("paciente_id", resultado.paciente_id);
      localStorage.setItem("ape_materno", resultado.ape_materno);
      localStorage.setItem("ape_paterno", resultado.ape_paterno);
      localStorage.setItem("nombre", resultado.nombre);


      
      //le dice a cual pestana de tabs debe abrir
      this.navCtrl.push(TabsControllerPage,{index:0}, this.user);   
      //con este comando puedes obtener un json de los datos
      //alert(JSON.stringify(this.myForm.value));

      } else {
        let alert = this.alertCtrl.create({
          title: 'Datos Incorrectos',
          subTitle: 'Datos de Inicio de Sesión Incorrectos.',
          buttons: ['Aceptar']
        });
        alert.present();
      }
      


  },error=> {
    let alert = this.alertCtrl.create({
      title: 'Error al Registrar',
      subTitle: 'Hubo un error al procesar su solicitud, verifique su información, o intentelo más tarde.',
      buttons: ['Aceptar']
    });
    alert.present();  
  });
  }

  goToInicio(params){
    
    //this.tab = this.navCtrl.parent;
    //this.navCtrl.push(TabsControllerPage, {index:2});
    
    var body = this.myForm;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    (body as any).email="hudson2@gmail.com"; 
    (body as any).pwd="1234";
    this.http
    .post('http://104.131.121.55/loginPaciente?email=hudson2@gmail.com&pwd=1234', body, { headers: headers })
    .toPromise().then(data => {
      console.log(data);
      // SUCCESS =====================================
      
    }).catch(error => {
      console.log(error);
      let alert = this.alertCtrl.create({
        title: 'Error al Registrar',
        subTitle: 'Hubo un error al procesar su solicitud, verifique su información, o intentelo más tarde.',
        buttons: ['Aceptar']
      });
      alert.present();
    });
    

          //Guardar datos del compa
          localStorage.setItem("usrEmail", this.user.email);
          localStorage.setItem("usrPass", this.user.password);
          
          //le dice a cual pestana de tabs debe abrir
          this.navCtrl.push(TabsControllerPage,{index:0}, this.user);   
          //con este comando puedes obtener un json de los datos
          //alert(JSON.stringify(this.myForm.value));


  }

  pasa(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage);
  }
  goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.push(OlvideContrasenaPage);
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
  goToPreReg(params){
    
    if (!params) params = {};
    this.navCtrl.push(PreRegistroPage);
  }
}
