import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import { ReportAlertComponent } from "./report-alert.component";


const routes:Routes=[{path:'',component:ReportAlertComponent}]
@NgModule({
    declarations:[ReportAlertComponent],

 imports:[CommonModules,RouterModule.forChild(routes)],

})

export class ReportAlertModule{

}