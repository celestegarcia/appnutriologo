import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import  {PostPreReg} from "../../services/postprereg";
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';


import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-pre-registro',
  templateUrl: 'pre-registro.html'
})
export class PreRegistroPage {
  myForm: FormGroup;
  public password1:string;
  public password2:string;
  public errMsg:boolean = true;
  public prereg:any = {
    nombre:"",
    ape_paterno:"",
    ape_materno:"",
    email:"",
    fecha_naci:"",
    sexo:"",
    telefono:"",
    meta:"",
    patologias:"",
    alergias:"",
    medicamentos:""
  }
  /*  ?nombre=Carlos
      &ape_paterno=Hudson
      &ape_materno=Diaz
      &email=hudson@gmail.com
      &sexo=m
      &telefono=3118472056
      &meta=bajar
      &patologias=ninguna
      &alergias=ninguna
      &medicamentos=ninguna
      &fecha_naci=1994-11-20
    */

  public cliente: any;
  public data: any;

  constructor(public navCtrl: NavController,public http : Http, public client: PostPreReg, private alertCtrl: AlertController, public fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      pat: ['', [Validators.required]],
      mat: ['', [Validators.required]],
      email: ['', [Validators.required,  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      fec: null,
      sexo : null,
      telefono:null,
      meta : null,
      patologias : null,
      alergias :null,
      medicamentos : null,

    },{
   
    }
  
  
  );


}
saveData(){
//alert(JSON.stringify(this.myForm.value));
}

  confirmarPost(respuesta){


    
    let alert = this.alertCtrl.create({
      title: 'Registro exitoso',
      subTitle: JSON.parse(respuesta).result,
      buttons: ['Aceptar']
    });
    alert.present();
    //this.navCtrl.push(LoginPage);
    
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
    
  }

  pruebaGet(){
    this.http.get("http://104.131.121.55/").subscribe(res=>{
        this.data = res.json();
        console.log(this.data);
        //this.enviarFormulario(res.json());
        //return this.data;
    },error=> {
      console.log(error);  
    });
}

prepararPost(){
  //this.prereg.sexo= "F";
  //this.prereg.fecha_naci="1991-01-01";
  var body = this.prereg;
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //headers.append('access-control-allow-origin', '*');
  
  this.http
    .post('http://104.131.121.55/setPreRegistro?nombre='+this.prereg.nombre+
          '&ape_paterno='+this.prereg.ape_paterno+'&ape_materno='+this.prereg.ape_materno+
          '&email='+this.prereg.email+'&sexo='+this.prereg.sexo+'&telefono='+this.prereg.telefono+
          '&meta='+this.prereg.meta+'&patologias='+this.prereg.patologias+'&alergias='+this.prereg.alergias+
          '&medicamentos='+this.prereg.medicamentos+'&fecha_naci='+this.prereg.fecha_naci,
           null, { headers: headers }).toPromise()
    .then(data => {
      console.log((data as any)._body);
      this.confirmarPost((data as any)._body);
    }).catch(error => {
      console.log(error);
      let alert = this.alertCtrl.create({
        title: 'Error al Registrar',
        subTitle: 'Hubo un error al procesar su solicitud, verifique su información, o intentelo más tarde.',
        buttons: ['Aceptar']
      });
      alert.present();
    });
}
  
}
