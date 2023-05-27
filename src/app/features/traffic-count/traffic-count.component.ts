import { Component, OnInit } from '@angular/core';
import { BarControllerChartOptions, ChartOptions, ChartConfiguration,ChartType, LabelItem } from 'chart.js';
import { BarController } from 'chart.js/dist';
import { Moment } from 'moment';
import { utils } from 'xlsx';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-traffic-count',
  templateUrl: './traffic-count.component.html',
  styleUrls: ['./traffic-count.component.css']
})
export class TrafficCountComponent implements OnInit {
  selectedMoments: { startDate: Moment | any, endDate: Moment | any }

  barChartOptions: any= {
    // barThickness:30,
    borderRadius:4,
    spacing:0.2,//not worked
    spanGaps:5,
    categoryPercentage:0.5,
    barPercentage:0.5,

    
    // barThickness:3,
    
    responsive: true,
    elements: {
      line: {
              fill: false
      },
    bar:{
      datasets:{
        barThickness:3,
        barPercentage:0.5
      }
    },
    scales:{

      x: {
        border: {
          display: false
        },
        lineWidth:10,
        grid: {
          display: false,
          drawOnChartArea: true,
          drawTicks: false,
        }},
        y: {
          border: {
            display: false
          },
          grid: {
            color: '#000000'
  
          
            
          },
    },
   
    plugins: {
      legend: {
        display: true,
      },
      
    }
    }
    }}
   
  
  barControllerChartOptions:any={barThickness:6}
  barChartLabels: any[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins:any = [];
  barChartData: any[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits',backgroundColor:'#da688a',barThickness:5 },
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits',backgroundColor:'#134276',barThickness:5}
  ];
  constructor() { }

  ngOnInit(): void {
  }

  dateUpdated(event:any){

  }

}
