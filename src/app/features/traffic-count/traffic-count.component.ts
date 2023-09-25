import { Component, OnInit } from '@angular/core';
import { BarControllerChartOptions, ChartOptions, ChartConfiguration,ChartType, LabelItem } from 'chart.js';
import { BarController, Chart } from 'chart.js/dist';
import { Moment } from 'moment';
import chart from 'chart.js/dist';
import { utils } from 'xlsx';
import { ChartComponent } from 'ng-apexcharts';
// import { Label } from 'ng2-charts';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

@Component({
  selector: 'app-traffic-count',
  templateUrl: './traffic-count.component.html',
  styleUrls: ['./traffic-count.component.css']
})
export class TrafficCountComponent implements OnInit {
  selectedMoments: { startDate: Moment | any, endDate: Moment | any }

  barChartOptions: any= {
    // barThickness:30,
    scaleShowVerticalLines: false,

    borderRadius:10,
    spacing:0.2,//not worked
    spanGaps:5,
    categoryPercentage:0.75,
    barPercentage:0.9,

    
    // barThickness:3,
    
    responsive: true,
    elements: {
      line: {
              fill: false
      },
    
    },
    scales: {

        x: {
          grid: {
            display: false,
            stacked: true,
          }
        },
        y: {
          grid: {
            display: false,
            stacked: true,
          },
        },
        
      },
   
    plugins: {
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart - Stacked'
      // },
      legend: {
        display: true,
      },
      
    }
    
    }

    barChartOptions2: any= {
      // barThickness:30,
      scaleShowVerticalLines: false,
  
      borderRadius:10,
      spacing:0.2,//not worked
      spanGaps:5,
      categoryPercentage:0.75,
      barPercentage:0.9,
  
      
      // barThickness:3,
      
      responsive: true,
      elements: {
        line: {
                fill: false
        },
      
      },
  
        scales: {
          x: {
            display: false,
            min: 0.5,
            max: 2.5,
            offset: false
          },
          y: {
            display: false,
            min: 0.5,
            max: 2.5
          }
        }
     
        ,
     
      plugins: {
        // title: {
        //   display: true,
        //   text: 'Chart.js Bar Chart - Stacked'
        // },
        legend: {
          display: true,
        },
        
      }
      
      }
   
  
  barControllerChartOptions:any={barThickness:6}
  barChartLabels: any[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins:any = [];
  barChartData: any[] = [
    { data: [49, 30, 89, 90, 15, 33],label:'Occupiency', type:'line', borderColor:'orange',backgroundColor:'white', pointStyle: 'circle',
    pointRadius: 4,
    pointHoverRadius: 8},
  
    { data: [45, 37, 60, 70, 46, 33], label: 'Entry', stack: 'Stack 0',backgroundColor:'#ccc',barThickness:12,borderRadius:7},
    { data: [45, 37, 60, 70, 46, 33], label: 'Entry', stack: 'Stack 0',backgroundColor:'#D8D8D9',barThickness:12,borderRadius:7},

    { data: [78, 60, 40, 102, 34, 39], label: 'Exit', stack: 'Stack 1',backgroundColor:'#134276',barThickness:10,borderRadius:7},
    { data: [78, 60, 40, 102, 34, 39], label: 'Exit', stack: 'Stack 1',backgroundColor:'#82beff',barThickness:10,borderRadius:7},

   
  ];

  barChartData2: any[] = [
    { data: [49, 30, 89, 90, 15, 33],label:'Occupiency', type:'line', borderColor:'orange',backgroundColor:'white', pointStyle: 'circle',
    pointRadius: 4,
    pointHoverRadius: 8},
  
    {  data: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
     label: 'Entry',backgroundColor:'#ccc',barThickness:12,borderRadius:7,  width: (chart:any) => (chart.chartArea || {}).width / 2 - 1,
     height: (chart:any) => (chart.chartArea || {}).height / 2 - 1,},
    // { data: [45, 37, 60, 70, 46, 33], label: 'Entry', stack: 'Stack 0',backgroundColor:'#D8D8D9',barThickness:12,borderRadius:7},

    // { data: [78, 60, 40, 102, 34, 39], label: 'Exit', stack: 'Stack 1',backgroundColor:'#134276',barThickness:10,borderRadius:7},
    // { data: [78, 60, 40, 102, 34, 39], label: 'Exit', stack: 'Stack 1',backgroundColor:'#82beff',barThickness:10,borderRadius:7},

   
  ];

  constructor() { }

  ngOnInit(): void {
  }

  dateUpdated(event:any){

  }

}
