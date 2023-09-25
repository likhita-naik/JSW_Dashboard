import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { AuthGuard } from 'src/app/Services/auth.guard';
import { ServerService } from 'src/app/Services/server.service';
import { TrafficCountComponent } from './traffic-count.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HeatmapComponent } from 'src/app/common/heatmap/heatmap.component';
import { CommonModules } from 'src/app/common/common.module';
const routes:Routes=[{path:'',component:TrafficCountComponent}];

@NgModule({
    declarations:[TrafficCountComponent,HeatmapComponent],
    imports:[CommonModules,RouterModule.forChild(routes),NgbModule,NgChartsModule, NgxDaterangepickerMd.forRoot({})
  ],
    exports:[RouterModule],
    providers: [ServerService, DatePipe, AuthGuard,{ provide: NgChartsConfiguration, useValue: { generateColors: false }}],


})

export class TrafficCountModule{

}