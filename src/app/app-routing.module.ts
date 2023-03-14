import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ESIMoniterComponent } from './features/esi-moniter/esi-moniter.component';
import { JobSheetUploadComponent } from './features/job-sheet-upload/job-sheet-upload.component';
import { LogHistoryComponent } from './features/log-history/log-history.component';
import { PanelViolationsComponent } from './features/panel-violations/panel-violations.component';

import { RoiSettingsComponent } from './features/roi-settings/roi-settings.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CameraRoiComponent } from './settings/camera-roi/camera-roi.component';
import { CameraSettingsComponent } from './settings/camera-settings/camera-settings.component';
import {AuthGuard} from './Services/auth.guard'
import {AuthGuardLogin} from './Services/authLogin.guard'
import { DashboardComponent } from './features/dashboard/dashboard.component';


const routes: Routes = 
             [{path:'login',
             loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
            },
              {path:'app/Home',component:HomeComponent},
              {path:'app',component:HomeComponent,
               canActivate:[AuthGuard],
               children:[
                {
                path:'violations',loadChildren:()=>import('./features/log-history/logHistory.module').then(m => m.LogHistoryModule),
                },
              
                {
                  path:'dashboard',loadChildren:()=>import('./features/dashboard/dashboard.module').then(m=>m.DashboardModule)
                  },
             
                    {
                      path:'panelViolation',loadChildren:()=>import('./features/panel-violations/panel-violations.module').then(m=>m.PanelViolationsModule)
                      },
                    {
                      path:'CameraSettings',loadChildren:()=>import('./settings/camera-settings/camera-settings.module').then(m=>m.CameraSettingsModule)
                      },
                      {
                        path:'ROISettings',loadChildren:()=>import('./settings/camera-roi/camera-roi.module').then(m=>m.CameraRoiModule)
                        },
                        {
                          path:'panelROISettings',loadChildren:()=>import('./features/roi-settings/roi-settings.module').then(m=>m.ROIEditModule)
                          },
                          

                         
                {
                  path:'jobsheetUpload',loadChildren:()=>import('./features/job-sheet-upload/job-sheet-upload.module').then(m=>m.JobsheetUploadModule)
                },
                {
                  path:'rackEdit',loadChildren:()=>import('./features/rack-edit/rack-edit.module').then(m=>m.RackEditModule)
                },
                {
                  path:'jobsheetMoniter',loadChildren: () => import('./features/esi-moniter/esi-monitor.module').then(m => m.ESIMonitorModule)
                },{
                  path:'jobsheetViolation',component:RoiSettingsComponent
                }] },
{path:'',pathMatch:'full',canActivate:[AuthGuardLogin] ,loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
