import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class PostPreReg {
    private http:any;
    public data: any;
    constructor(http:Http) {
        this.http=http;
    }
    
    pruebaGet(){
        this.http.get("http://104.131.121.55/").subscribe(res=>{
            this.data = res.json();
            console.log(this.data);
            //return this.data;
        },error=> {
          console.log(error);  
        });
    }

    enviarPreReg(preregistro: any){
        var body = preregistro;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        this.http
          .post('http://104.131.121.55/setPreRegistro', body, { headers: headers })
          .then(data => {
            console.log(data.data.result);
          }).catch(error => {
            console.log(error.status);
          });
    }

    /*
    http://104.131.121.55/  <- Retorna info basura
    http://104.131.121.55/setPreRegistro
    ?nombre=Carlos
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
    /*
    obtenerUsers(){
        this.http.get("http://104.131.121.55/").subscribe(res=>{
            this.data = res.json();
            console.log(this.data);
        },error=> {
          console.log(error);  
        });
    }
    */
}
