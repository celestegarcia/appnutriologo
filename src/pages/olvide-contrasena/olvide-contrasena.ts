import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InicioPage } from '../inicio/inicio';
import { SMS } from '@ionic-native/sms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-olvide-contrasena',
  templateUrl: 'olvide-contrasena.html'
})
export class OlvideContrasenaPage {
  telefono:string;
  pass:string;
  public correo:string;
  sampleForm: FormGroup;
  constructor(public navCtrl: NavController,private sms: SMS, public http : Http,private alertCtrl: AlertController) {

  }
  ionViewWillLoad() {
    this.sampleForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
    this.sampleForm.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onValueChanged(data));
  }
  formErrors = {
    'email': []
  };
  validationMessages = {
    'email': {
      'required':      'Ingrese una direccion de correo',
      'pattern':       'Introdusca una direccion de correo valida'
    }
  };
  onValueChanged(data?: any) {
    if (!this.sampleForm) { return; }
    const form = this.sampleForm;
    for (const field in this.formErrors) {
      // Limpiamos los mensajes anteriores
      this.formErrors[field] = [];
      this.sampleForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }  
  
  
  sendSMS(){
    this.telefono="0000000000";
    this.http.get("http://104.131.121.55/getPacienteByCorreo?correo="+this.correo).subscribe(res=>{
      let result = res.json().result;
      this.telefono = result.telefono;      
      console.log(this.telefono);
      console.log(this.correo);

      this.pass=this.generarContra();
      console.log(this.pass);
      let body = {
          id:result.paciente_id,
          pwd:this.pass
      };
      let headers: any = new Headers({'Content-Type': 'multipart/form-data'});
      headers = new Headers({ 'Content-Type': 'application/json' });
      //headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
      this.http.post("http://104.131.121.55/updateRegistro",body, { headers: headers }).toPromise().then(data => {
        console.log((data as any)._body);
        this.sms.send(this.telefono, 'Tu contraseña temporal es: '+this.pass+'\n Cambiala en la ventana de Configuracion',{
          replaceLineBreaks: true});//this.confirmarPost((data as any)._body);
          this.navCtrl.push(LoginPage);
      }).catch(error => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Error al Subir',
          subTitle: 'Hubo un error al Actualizar el registro: Verifique la direccion de correo',
          buttons: ['Aceptar']
        });
        alert.present();
      });        
    },error=> {
      console.log(error);  
    });
    
  }
  generarContra() {
    var pas = "";
    for (let i = 1; i <= 6; i++) {
        pas += Math.floor((Math.random() * 9) + 0);

    }
    return pas;

}


  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(InicioPage);
  }goToOlvideContrasena(params){
    if (!params) params = {};
    this.navCtrl.push(OlvideContrasenaPage);
  }
}
