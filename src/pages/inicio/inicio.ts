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
  @ViewChild('barCanvasImc') barCanvasImc;
  @ViewChild('barCanvasGrasa') barCanvasGrasa;  
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  barChartI: any;
  barChartG: any;

  lineChart: any;

  public user:any = {
    email:"",
    password:""
  }
  public base64Image: string;
  public datosTabla: string;
  public pesoActual: any = [];
  public imc: any = [];
  public percentgrasa: any = [];
  public fecha: any = [];

  
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

  obtenerDatosTabla(){
    let id = localStorage.getItem("paciente_id");
      this.http.get("http://104.131.121.55/getResumenCitas?paciente_id="+id).subscribe(res=>{
          let result = res.json().result;
          this.datosTabla = result;
          result.forEach(element => {
            if(element.antropometria != null)  
            {
            this.fecha.push(element.fecha );
              console.log(element.antropometria);    
              var datos = JSON.parse(element.antropometria);
              console.log(datos);    
              this.pesoActual.push(datos.peso_actual );
              this.imc.push(datos.imc );
              this.percentgrasa.push(datos.percent_grasa );
            }
          });
          console.log(this.fecha);
          console.log(this.pesoActual);
          console.log(this.imc);
          console.log(this.percentgrasa);
          this.barChart.update();
          this.barChartI.update();
          this.barChartG.update();
          this.lineChart.update();
          //this.enviarFormulario(res.json());
          //return this.data;
      },error=> {
        console.log("error get resumen citas");  
      });
  }

  ionViewDidLoad() {

    this.obtenerImg();
    

           this.barChart = new Chart(this.barCanvas.nativeElement, {
               type: 'bar',
               data: {
                   labels: this.fecha,//["Sesion Anterior", "Sesion Actual"],
                   datasets: [{
                       label: 'Peso',
                       data: this.pesoActual,//[12, 19],
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
                   }
                   /*,{
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
              }*/
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
    
           this.barChartI = new Chart(this.barCanvasImc.nativeElement, {
            type: 'bar',
            data: {
                labels: this.fecha,//["Sesion Anterior", "Sesion Actual"],
                datasets: [{
                    label: 'Masa Corporal',
                    data: this.imc,
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


        this.barChartG = new Chart(this.barCanvasGrasa.nativeElement, {
            type: 'bar',
            data: {
                label: '% Grasa',
                data: this.percentgrasa,
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
                           labels: this.fecha,
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
                                   data: this.pesoActual,
                                   spanGaps: false,
                               }, {
                                label: "IMC",
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
                                data: this.imc,
                                spanGaps: false,
                            },
                            {
                              label: "% Grasa",
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
                              data: this.percentgrasa,
                              spanGaps: false,
                          }
        
                           ]
                       }
            
                   });
                   //setInterval(function(){ this.barChart.update(); }, 3000);
                   this.obtenerDatosTabla();
       }



  
}
