import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  {PostPreReg} from "../../services/postprereg";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";


import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-pre-registro',
  templateUrl: 'pre-registro.html'
})
export class PreRegistroPage {

  public prereg:any = {
    nombre:"",
    ape_paterno:"",
    ape_materno:"",
    email:"",
    fecha_naci:"",
    sexo:"  - - -",
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

  constructor(public navCtrl: NavController,public http : Http, public client: PostPreReg) {
    //this.cliente=http;
    //this.cliente.pruebaGet();
  }

  enviarFormulario(respuesta){


    //this.pruebaGet();
    
    alert(respuesta.name);
  }

  pruebaGet(){
    this.http.get("http://104.131.121.55/").subscribe(res=>{
        this.data = res.json();
        console.log(this.data);
        this.enviarFormulario(res.json());
        //return this.data;
    },error=> {
      console.log(error);  
    });
}

prepararPost(){
  var body = this.prereg;
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
  this.http
    .post('http://104.131.121.55/setPreRegistro', body, { headers: headers }).toPromise()
    .then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error.status);
    });

    

}
  
}
