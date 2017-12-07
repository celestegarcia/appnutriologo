import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { ModalController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  lineChart: any;

  public user:any = {
    email:"",
    password:""
  }
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http : Http , private modalCtrl: ModalController, private alertCtrl: AlertController) {
    let tmpUsr: any ={
      email:localStorage.getItem("email"),
      ape_materno: localStorage.getItem("ape_materno"),
      nombre: localStorage.getItem("nombre")
    }
    /*
        ape_materno:"DIAZ"
        ape_paterno:"HUDSON"
        email:"hudson2@gmail.com"
        nombre:"CARLOS"
        paciente_id:1
      */
    this.user=tmpUsr;    // navParams; // <- No funciona esta basura
    console.log(this.user);

       
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


           this.barChart = new Chart(this.barCanvas.nativeElement, {

               type: 'bar',
               data: {
                   labels: ["Sesion Anterior", "Sesion Actual"],
                   datasets: [{
                       label: 'Peso',
                       data: [12, 19],
                       backgroundColor: [
                           
                           'rgba(54, 162, 235, 0.2)',
                           'rgba(54, 162, 235, 0.2)',
                           'rgba(54, 162, 235, 0.2)'
                           
                       ],
                       borderColor: [
                           
                           'rgba(54, 162, 235, 1)',
                           'rgba(54, 162, 235, 1)',
                           'rgba(54, 162, 235, 1)'
                           
                       ],
                       borderWidth: 1
                   },
                   {
                    label: 'Masa Corporal',
                    data: [1, 1],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)'
                        
                    ],
                    borderWidth: 1
                }, {
                  label: '% Muscular',
                  data: [12, 30],
                  backgroundColor: [
                      
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                      
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)'

                  ],
                  borderWidth: 1
              }
                  ]
               },
               options: {
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero:true
                           }
                       }]
                   },
                   
               }
    
           });
    
           this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            
                       type: 'line',
                       data: {
                           labels: ["Sesion Anterior", "Sesion Actual"],
                           datasets: [
                               {
                                   label: "Peso",
                                   fill: false,
                                   lineTension: 0.1,
                                   backgroundColor: "rgba(75,192,192,0.4)",
                                   borderColor: "rgba(75,192,192,1)",
                                   borderCapStyle: 'butt',
                                   borderDash: [],
                                   borderDashOffset: 0.0,
                                   borderJoinStyle: 'miter',
                                   pointBorderColor: "rgba(75,192,192,1)",
                                   pointBackgroundColor: "#fff",
                                   pointBorderWidth: 1,
                                   pointHoverRadius: 5,
                                   pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                   pointHoverBorderColor: "rgba(220,220,220,1)",
                                   pointHoverBorderWidth: 2,
                                   pointRadius: 1,
                                   pointHitRadius: 10,
                                   data: [65, 59, 80],
                                   spanGaps: false,
                               }, {
                                label: "Masa Corporal",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(54, 162, 235, 0.2)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(54, 162, 235, 1))",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(54, 162, 235, 1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: [75, 69, 90],
                                spanGaps: false,
                            },
                            {
                              label: "% Muscular",
                              fill: false,
                              lineTension: 0.1,
                              backgroundColor: "rgba(255, 206, 86, 0.2)",
                              borderColor: "rgba(255,99,132,1)",
                              borderCapStyle: 'butt',
                              borderDash: [],
                              borderDashOffset: 0.0,
                              borderJoinStyle: 'miter',
                              pointBorderColor: "rgba(255,99,132,1)",
                              pointBackgroundColor: "#fff",
                              pointBorderWidth: 1,
                              pointHoverRadius: 5,
                              pointHoverBackgroundColor: "rgba(255,99,132,1)",
                              pointHoverBorderColor: "rgba(220,220,220,1)",
                              pointHoverBorderWidth: 2,
                              pointRadius: 1,
                              pointHitRadius: 10,
                              data: [45, 80, 50],
                              spanGaps: false,
                          }
        
                           ]
                       }
            
                   });
    
       }


  
}
