import { NgModule } from "@angular/core";
import { RouterModule, Routes, RoutesRecognized } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import 'fabric'
import { CameraRoiComponent } from "./camera-roi.component";
const routes:Routes=[{path:'',component:CameraRoiComponent}]
@NgModule({
    declarations:[CameraRoiComponent],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule],
    
})

export class CameraRoiModule{

}