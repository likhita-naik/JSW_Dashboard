import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import { CameraSettingsComponent } from "./camera-settings.component";


const routes:Routes=[{path:'',component:CameraSettingsComponent}]
@NgModule({
    declarations:[CameraSettingsComponent],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule]

})

export class CameraSettingsModule{

}