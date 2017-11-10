import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController,   Tabs } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { OlvideContrasenaPage } from '../olvide-contrasena/olvide-contrasena';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { PreRegistroPage } from '../pre-registro/pre-registro';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public error: boolean;
  public valido: boolean;
  public emaill: string;
  public pass: string;


  myForm: FormGroup;
  public user:any = {
    email:"",
    password:""
  }

  constructor(public navCtrl: NavController, public fb: FormBuilder) {
    this.error = false;
    this.valido = false;
    this.myForm = this.fb.group({
      emaill: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      pass: ['', [Validators.required]]
    });

  }

  //guarda los datos del formulario
  saveData(){
    //alert(JSON.stringify(this.myForm.value));
  }

  goToInicio(params){
    if (!params) params = {};
    //this.tab = this.navCtrl.parent;
    //this.navCtrl.push(TabsControllerPage, {index:2});   

    //Guardar datos del compa
    localStorage.setItem("usrEmail", this.user.email);
    localStorage.setItem("usrPass", this.user.password);
    //le dice a cual pestana de tabs debe abrir
    this.navCtrl.push(TabsControllerPage,{index:0}, this.user);   
    //con este comando puedes obtener un json de los datos
    //alert(JSON.stringify(this.myForm.value));

  }goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.push(OlvideContrasenaPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
  goToPreReg(params){
    
    if (!params) params = {};
    this.navCtrl.push(PreRegistroPage);
  }
}
