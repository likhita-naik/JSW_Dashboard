import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ServerService } from "src/app/Services/server.service";

@Injectable({
    providedIn:'root'
})

export class ReportService{
   IP:any

    constructor(public webServer:ServerService,public httpClient:HttpClient,public snackbar:MatSnackBar){
     this.IP= this.webServer.IP
    }

    AddReportDetails(data:any){
      return this.httpClient.post(this.IP+'/insert_email_details',data)

    }
    GetThresholdDetails(){
      return  this.httpClient.get(this.IP+'/modelthresshold')
    }

    UpdateThreshold(data:any){
      return this.httpClient.post(this.IP+'/updatethreshold',{data})
    }

notification(message: string, action?: string,duration?:number) {
  console.log('snackbar')
  this.snackbar.open(message, action ? action : '', ({
    duration:duration?duration:4000, panelClass: ['error'],
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  })

  )
}


GetReportsDetails(){
  return this.httpClient.get(this.IP+'/get_email_details')
}

EditReportDetails(details:any){
  return this.httpClient.post(this.IP+'/edit_email_details',details)
}
DeleteReportDetails(data:any){
  return this.httpClient.post(this.IP+'/delete_email_detail',data)
}
}