import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
    providedIn:'platform'
})

export class  SmartVedioService{
    IP:any=''
  constructor(public http:HttpClient,  public   snackbar:MatSnackBar){
    var res=this.loadConfigFile('assets/config.json')
    console.log(res)
    res=JSON.parse(res)
    this.IP=res.IP
  }

    StartApplication(){
        return this.http.get(this.IP+'/create_smart_config')
    }

    loadConfigFile(filepath:any){
        const JSON=this.readConfigFile(filepath,'application/json')
        return JSON
      
      
      
      }
      readConfigFile(filepath:any,mimeType:any){
       var xmlRequest=new XMLHttpRequest() 
       xmlRequest.open('GET',filepath,false)
       if (mimeType != null) {
        if (xmlRequest.overrideMimeType) {
            xmlRequest.overrideMimeType(mimeType);
        }
        xmlRequest.send()
        if(xmlRequest.status){
            return xmlRequest.response
        }
        else{
            return null
        }
      }
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
}