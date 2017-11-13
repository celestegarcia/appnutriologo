import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

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

  constructor(public navCtrl: NavController) {
  }


  ionViewDidLoad() {

        this.pesoChart = new Chart(this.pesoCanvas.nativeElement, {
        
                    type: 'line',
                    data: {
                        labels: ["7 Oct", "14 Oct","21 Oct","28 Oct","4 Nov","11 Nov"],
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
                                data: [68, 85, 72,68,80,62],
                                spanGaps: false,
                            }
    
                        ]
                    }
        
                });

    

    this.masaChart = new Chart(this.masaCanvas.nativeElement, {
      
                 type: 'line',
                 data: {
                     labels: ["7 Oct", "14 Oct","21 Oct","28 Oct","4 Nov","11 Nov"],
                     datasets: [
                         {
                             label: "Masa corporal",
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
                             data: [36, 38, 32,28,30,29],
                             spanGaps: false,
                         }
  
                     ]
                 }
      
             });   
             
             this.muscChart = new Chart(this.muscCanvas.nativeElement, {
              
                         type: 'line',
                         data: {
                             labels: ["7 Oct", "14 Oct","21 Oct","28 Oct","4 Nov","11 Nov"],
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
                                     data: [22, 20, 19,21,16,14],
                                     spanGaps: false,
                                 }
          
                             ]
                         }
              
                     });   
 
    } //onviewdidload
    
    
}
  

