import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AuthService } from "../../providers/auth-service/auth-service";
import { Http, Headers, RequestOptions } from '@angular/http';

// import {
//   FileTransfer,
//   FileUploadOptions,
//   FileTransferObject
// } from "@ionic-native/file-transfer";
// import { File } from "@ionic-native/file";
@Component({
  selector: "page-album",
  templateUrl: "album.html"
})
export class AlbumPage {
  public photos: any = [];
  public base64Image: string;
  public fileImage: string;
  public responseData: any;
  userData = { user_id: "", token: "", imageB64: "" };
  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl: AlertController,
    public authService: AuthService,
    public http : Http
    //private transfer: FileTransfer, private file: File, private fileUploadOptions: FileUploadOptions
  ) {}
  //const fileTransfer = this.transfer.create();
 
  ionViewDidLoad() {
    
        let headers: any = new Headers({'Content-Type': 'multipart/form-data'});
        headers = new Headers({ 'Content-Type': 'application/json' });
        //headers.append('access-control-allow-origin', '*');
        let id = localStorage.getItem("paciente_id");
        this.http.get('http://104.131.121.55/getPicturesSeg?id='+id).subscribe(res => {
          var resultado = res.json().result;
          this.photos = resultado;
        }, error => {
          let alert = this.alertCtrl.create({
            title: 'Error al Obtener las fotos',
            subTitle: 'Hubo un error al obtener sus fotos, intentelo más tarde.',
            buttons: ['Regresar']
          });
          alert.present();
        });
    
      }
 


  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "Deseas eliminar esta foto?, es parte de tu avance!",
      message: "",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Eliminar",
          handler: () => {
            console.log("Agree clicked");
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
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

    enviarImg(){
      let id = localStorage.getItem("paciente_id");
      let body = {id:id,
                 foto:this.base64Image}
       let headers: any = new Headers({'Content-Type': 'multipart/form-data'});
       headers = new Headers({ 'Content-Type': 'application/json' });
       //headers.append('Content-Type', 'application/x-www-form-urlencoded');
         this.http
         .post('http://104.131.121.55/setPicturesSeg',
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

  
}