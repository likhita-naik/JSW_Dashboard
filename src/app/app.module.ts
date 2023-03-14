import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faBridgeCircleCheck, fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './NavigationBar/header/header.component';
import { SidebarComponent } from './NavigationBar/sidebar/sidebar.component';
import { JobSheetUploadComponent } from './features/job-sheet-upload/job-sheet-upload.component';
import { ESIMoniterComponent } from './features/esi-moniter/esi-moniter.component';
import { FooterComponent } from './NavigationBar/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoiSettingsComponent } from './features/roi-settings/roi-settings.component';
import { ServerService } from './Services/server.service';
import { ToastrModule } from 'ngx-toastr';
import { LightboxModule } from 'ngx-lightbox';
import { DatePipe } from '@angular/common';
import { PanelViolationsComponent } from './features/panel-violations/panel-violations.component';
import { CameraSettingsComponent } from './settings/camera-settings/camera-settings.component';
import { CameraRoiComponent } from './settings/camera-roi/camera-roi.component';
import { AuthGuard } from './Services/auth.guard';
import { AuthGuardLogin } from './Services/authLogin.guard';
import { alertComponent } from './common/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbdSortableHeader } from './common/sortable.directive';
import {
  DaterangepickerDirective,
  NgxDaterangepickerMd,
} from 'ngx-daterangepicker-material';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import 'fabric';
import * as CanvasJSAngularChart from '../assets/canvasjs/canvasjs.angular.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NgxImageZoomComponent, NgxImageZoomModule } from 'ngx-image-zoom';
import { LogHistoryComponent } from './features/log-history/log-history.component';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
   
    alertComponent

   // RackEditComponent,
  ],
  imports: [
  
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatSnackBarModule,
   
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000000,
      toastComponent: alertComponent,
      progressBar: true,
      newestOnTop: true,
    }),
    NgxDaterangepickerMd.forRoot({}),
   
    NgMultiSelectDropDownModule.forRoot(),
  ],
  entryComponents: [alertComponent],
  providers: [ServerService, DatePipe, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(lib: FaIconLibrary) {
    lib.addIconPacks(fas);
  }
}
