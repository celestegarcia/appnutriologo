import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-seguimiento',
  templateUrl: 'seguimiento.html'
})
export class SeguimientoPage {

  @ViewChild('pesoCanvas') pesoCanvas;
  @ViewChild('masaCanvas') masaCanvas;
  @ViewChild('muscCanvas') muscCanvas;
  
    masaChart: any;
    pesoChart: any;
    muscChart: any;

    public datosTabla: string;
    public pesoActual: any = [];
    public imc: any = [];
    public percentgrasa: any = [];
    public fecha: any = [];

  constructor(public navCtrl: NavController, public http : Http ) {
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
          this.pesoChart.update();
          this.masaChart.update();
          this.muscChart.update();
          
          //this.enviarFormulario(res.json());
          //return this.data;
      },error=> {
        console.log("error get resumen citas");  
      });
  }


  ionViewDidLoad() {
            this.pesoChart = new Chart(this.pesoCanvas.nativeElement, {
        
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
                            }
    
                        ]
                    }
        
                });

    

    this.masaChart = new Chart(this.masaCanvas.nativeElement, {
      
                 type: 'line',
                 data: {
                     labels: this.fecha,
                     datasets: [
                         {
                             label: "IMC",
                             fill: false,
                             lineTension: 0.1,
                             backgroundColor: "rgba(192,192,75,0.4)",
                             borderColor: "rgba(192,192,75,1)",
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
                             data: this.imc,
                             spanGaps: false,
                         }
  
                     ]
                 }
      
             });   
             
             this.muscChart = new Chart(this.muscCanvas.nativeElement, {
              
                         type: 'line',
                         data: {
                             labels: this.fecha,
                             datasets: [
                                 {
                                     label: "% Grasa",
                                     fill: false,
                                     lineTension: 0.1,
                                     backgroundColor: "rgba(192,75,192,0.4)",
                                     borderColor: "rgba(192,75,192,1)",
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
                                     data: this.percentgrasa,
                                     spanGaps: false,
                                 }
          
                             ]
                         }
              
                     });   

                     this.obtenerDatosTabla();
 
    } //onviewdidload
    
    
}
  

