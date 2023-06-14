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
import { ServerService } from './Services/server.service';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { AuthGuard } from './Services/auth.guard';
import { alertComponent } from './common/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  DaterangepickerDirective,
  NgxDaterangepickerMd,
} from 'ngx-daterangepicker-material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import 'fabric';
import * as CanvasJSAngularChart from '../assets/canvasjs/canvasjs.angular.component';

import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AlertSettingsComponent } from './settings/alert-settings/alert-settings.component';
import { SmartVedioService } from './features/smart-vedio/smartVideo.service';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
   
    alertComponent,
        AlertSettingsComponent,

   // RackEditComponent,
  ],
  imports: [
    NgChartsModule,
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
  providers: [ServerService, DatePipe, AuthGuard,  { provide: NgChartsConfiguration, useValue: { generateColors: false }},SmartVedioService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(lib: FaIconLibrary) {
    lib.addIconPacks(fas);
  }
}
