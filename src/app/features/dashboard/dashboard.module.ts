import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import { DashboardComponent } from "./dashboard.component";
import * as CanvasJSAngularChart from '../../../assets/canvasjs/canvasjs.angular.component';
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";

const routes:Routes=[{path:'',component:DashboardComponent}]
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
    declarations:[DashboardComponent,CanvasJSChart
    ],
    imports:[CommonModules,RouterModule.forChild(routes),    NgxDaterangepickerMd.forRoot({}),
    ],
    exports:[RouterModule]
})

export  class DashboardModule{

}