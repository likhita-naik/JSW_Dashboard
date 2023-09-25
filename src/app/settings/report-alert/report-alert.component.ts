import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormGroupName, NgModel, Validators } from '@angular/forms';
import { NgbModal, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from './report-alert.server';
import { ServerService } from 'src/app/Services/server.service';
import { timestamp } from 'rxjs';
export function validateEmailArray(control: AbstractControl): { [key: string]: any } | null {
  const emailArray: string[] = control.value;

  if (emailArray && emailArray.length > 0) {
    for (const email of emailArray) {
      if (!isValidEmail(email)) {
        return { invalidEmail: true };
      }
    }
  }

  return null;
}

function isValidEmail(email: string): boolean {
  // You can implement your own email validation logic here
  // For a simple example, you can use a regular expression
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}


@Component({
  selector: 'app-report-alert',
  templateUrl: './report-alert.component.html',
  styleUrls: ['./report-alert.component.css']
})
export class ReportAlertComponent implements OnInit ,AfterViewInit{
  reportDetails: any[] = []
  AllReportDetails: any[] = []
  reportTime: any = { hour: 0, minute: 0 };
  reportAnalytics: any[] = []
  smtpDetails:any=null
  timeStampValues:any[]=[]
  selectedReport:any
  personValue:number=0
  vestValue:number=0
  helmetValue:number=0
  isOtherSmtp:boolean=false
  isSuccess:boolean=true
  responseMessage:string=''
  loader1:boolean=false
  timeStamps:FormArray<FormControl>=new FormArray([new FormControl<{hour:0,minute:0}>({hour:0,minute:0})])
  formGroup: FormGroup = new FormGroup({
    email:new FormControl<string[]>(null,Validators.email)
  })
  SMTPForm:FormGroup=new FormGroup({

    email:new FormControl(null,[Validators.email,Validators.required]),
    domain:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    port:new FormControl(null,Validators.required)
  })

  sensetivity:FormGroup=new FormGroup({
    person:new FormControl<string>('0',Validators.required),
    helmet:new FormControl<number>(0,Validators.required),
    vest:new FormControl<number>(0,Validators.required)

  })
  aiSolutions: any[] = [ { name: 'Restricted Area', value: 'ra' }, { name: 'PPE', value: 'ppe' }]
  reportForm: FormGroup = new FormGroup({
    toEmail: new FormControl<string[]>([], [Validators.required,validateEmailArray]),
    ccEmail: new FormControl<string[]>([], [validateEmailArray]),
  bccEmail:new FormControl<string[]>([],[validateEmailArray]),
    violationReport: new FormControl(true),
    // esiJobsheet: new FormControl(false)
  })
  reportEditForm:FormGroup=new FormGroup({
    toEmail: new FormControl<string[]>([], [Validators.required,validateEmailArray]),
    ccEmail: new FormControl<string[]>([], [Validators.email]),
  bccEmail:new FormControl<string[]>([],[Validators.email]),
    // violationReport: new FormControl(true),
    smtpEmail:new FormControl('',[Validators.required,Validators.email]),
    smtpPassword:new FormControl('',[Validators.required]),
    smtpPort:new FormControl('',Validators.required),
    smtpServer:new  FormControl('',Validators.required)
  })
  emailControl: FormControl = new FormControl('', Validators.required)
  constructor(private modalService: NgbModal,public ReportService:ReportService,public change:ChangeDetectorRef) {
    this.emailControl.setValidators(Validators.email)
  }


  ngOnInit(): void {
    this.GetThresholdValues()
    this.GetReportDetails()
    this.reportForm.get('ccEmail').valueChanges.subscribe((value:any)=>{
      console.log(value)
    })
    this.SMTPForm.get('domain').valueChanges.subscribe(value=>{
      console.log(value)
      if(value=='smtp.yandex.com'){
        this.isOtherSmtp=false
      this.SMTPForm.get('port').setValue(587)
    }
    if(value=='smtp.gmail.com'){
      this.isOtherSmtp=false
    this.SMTPForm.get('port').setValue(465)
  }
  if(value=='other'){
    this.isOtherSmtp=true
    this.SMTPForm.get('domain').setValue('')
    this.SMTPForm.get('port').setValue('')
  }
  }
    )
}

ngAfterViewInit(): void {
  // this.SMTPForm.valueChanges.subscribe((response:any)=>{
  //   this.SMTPForm.updateValueAndValidity()
  // })

  // this.reportForm.valueChanges.subscribe((response:any)=>{
  //   this.reportForm.updateValueAndValidity()
  // }
  // )
}

  AddReport(modal: any) {
    console.log(this.SMTPForm.value)
     this.isSuccess=true
     this.timeStampValues=[]
     this.reportAnalytics=[]
     this.reportForm.reset()
     this.SMTPForm.reset()
    this.modalService.open(modal,{size:'lg'}).result.then((result) => {
      // this.timeStamps.controls=[]
      // this.timeStamps.controls.push(new FormControl<{hour:0,minute:0}>(null))
    console.log('cancel')
    this.timeStampValues=[]
    this.reportAnalytics=[]
    // this.newROIPoints.splice(0,this.newROIPoints.length)
    // this.OnAddingNewROI()
  }, (reason) => {
    // console.log('submit')
    // this.timeStamps.controls=[]
    // this.timeStamps.controls.push(new FormControl<{hour:0,minute:0}>(null))
      /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // this.download = '',
      //   this.isalert = false
      this.timeStampValues=[]
      this.reportAnalytics=[]
      ;
  }
  )
    var containers=document.querySelectorAll('.radio-container')
  console.log(containers)
    containers.forEach((container:any) => {
      container.addEventListener('click',()=>{
        containers.forEach((tempContainer:any) => {
          tempContainer.classList.remove('selected')
          
        });
        container.classList.add('selected')
      })
      
    });
    var radioOptions=document.querySelectorAll('.radio-option')
    console.log(radioOptions)
    radioOptions.forEach(option=>{
      option.addEventListener('click',()=>{
        console.log('selecting email domain')
         radioOptions.forEach((tempOption:any)=>{
          tempOption.classList.remove('checked')
         })
           option.classList.add('checked')
          //  RadioInput.checked=true
      })
    })

  }

  OnDomainSelect(event:any){
   this.SMTPForm.get('domain').setValue(event)
   this.reportForm.updateValueAndValidity()
   this.SMTPForm.updateValueAndValidity()
  }
  OnDomainEdit(event:any){
    this.reportEditForm.get('smtpServer').setValue(event)
    // this.reportEditForm.get('smtpServer').valueChanges.subscribe((response:any)=>{
    //   console.log( this.reportEditForm.get('smtpServer').value)
    //   console.log(this.reportEditForm.valid,'form valid state')
    //   this.reportEditForm.updateValueAndValidity()
    // })
   }

  OnAddEmail() {
    var value = this.emailControl.value
    this.emailControl.setValue('')
    var data = {
      email: value,
      violation_alert: false,
      esi_alert: false
    }


    this.reportDetails.push(data)
    console.log(this.reportDetails)

  }

  PPEConfig(event: any, index: number) {
    if (event.target.checked) {
      if (event.target.value === 'violAlert') {
        this.reportDetails[index].violation_alert = true
      }
      if (event.target.value === 'ESIAlert') {
        this.reportDetails[index].esi_alert = true

      }

    }
    else {

      if (event.target.value === 'violAlert') {
        this.reportDetails[index].violation_alert = false

      }
      if (event.target.value === 'ESIAlert') {
        this.reportDetails[index].esi_alert = false

      }

    }

    console.log(this.reportDetails)

  }


  OnReportAnalytics(event: any) {
    console.log(event.target.defaultValue)
    console.log(event.target.checked)
    // console.log(this.classIDPerson.value)
    // console.log(this.classIDCar.value)
    // console.log(this.classIDBike.value)
    if (event.target.checked) {
      this.reportAnalytics.push(event.target.value)

    }
    else {
      var index = this.reportAnalytics.indexOf(event.target.defaultValue)
      this.reportAnalytics.splice(index, 1)
    }
    console.log(this.reportAnalytics)
  }


  submitDetails() {
    console.log(this.timeStamps.controls)
    this.timeStamps.controls.forEach((element:any,index:number) => {
      this.timeStampValues.push(this.toTimeString(element.value))
      
    }); 
    var report = {
      email_receivers:{
      to:  this.reportForm.get('toEmail').value==null?[]: this.reportForm.get('toEmail').value,
      cc:this.reportForm.get('ccEmail').value==null?[]:this.reportForm.get('ccEmail').value,
      bcc:this.reportForm.get('bccEmail').value==null?[]:this.reportForm.get('bccEmail').value
      },
      violation_report:true,
      analytics_types:this.reportAnalytics,
      // esi_report: this.reportForm.get('esiJobsheet').value,
      timestamp: this.timeStampValues,
      smtp_server:this.SMTPForm.get('domain').value,
      smtp_port:this.SMTPForm.get('port').value,
      sender_email:this.SMTPForm.get('email').value,
      sender_pwd:this.SMTPForm.get('password').value

    }

    // this.AllReportDetails.push(report)
    this.reportTime = {
      hour: 0,
      minute: 0
    }
    // this.reportForm.get('violationReport').setValue(false)
    // this.reportForm.get('esiJobsheet').setValue(false)

    console.log(JSON.stringify(report))

  this.ReportService.AddReportDetails(report).subscribe((response:any)=>{
if(response.success){
  this.ReportService.notification(response.message)
  this.GetReportDetails()
  this.isSuccess=true
  this.modalService.dismissAll()
}else{
  this.isSuccess=false
  this.responseMessage=response.message
this.ReportService.notification(response.message,'Retry')

}  },
Err=>{
  this.isSuccess=false
  this.responseMessage='Error while the process'
  this.ReportService.notification('Error while the process','Retry')
})
  }

  toTimeString(time: any) {
    return (time.hour < 10 ? '0' + time.hour.toString() : time.hour.toString()) + ':' + (time.minute < 10 ? 0 + time.minute.toString() : time.minute.toString())
  }

  GetReportDetails(){
    this.ReportService.GetReportsDetails().subscribe((response:any)=>{
      if(response.success){
          this.AllReportDetails=response.message
      }
    })

  }

  EditReport(modal:any,details:any){
    this.isSuccess=true
    this.reportAnalytics=[]
    this.selectedReport=details
    this.timeStamps.reset()
    this.timeStamps.controls=[]
    this.timeStamps.controls.push(new FormControl<{hour:0,minute:0}>({hour:0,minute:0}))
    this.timeStampValues=[]
    this.modalService.open(modal,{size:'lg'}).result.then((result) => {
        this.timeStamps.controls=[]
        this.timeStamps.controls.push(new FormControl<{hour:0,minute:0}>({hour:0,minute:0}))
      console.log('cancel')
      
      // this.newROIPoints.splice(0,this.newROIPoints.length)
      // this.OnAddingNewROI()
    }, (reason) => {
      console.log('submit')
      this.timeStamps.reset()
      this.timeStamps.controls=[]
      this.timeStamps.controls.push(new FormControl<{hour:0,minute:0}>({hour:0,minute:0}))
        /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // this.download = '',
        //   this.isalert = false
  
        ;
    }
    )
  
  
  
  
    this.selectedReport=details
    this.reportEditForm.get('toEmail').setValue(details.email_receivers.to)
    this.reportEditForm.get('ccEmail').setValue(details.email_receivers.cc)
    this.reportEditForm.get('bccEmail').setValue(details.email_receivers.bcc)
    details.timestamp.forEach((item:any,index:number) => {
      var time=item.split(':')
      var timeObj={hour:Number(time[0]),minute:Number(time[1])}
      this.timeStamps.controls[index].setValue(timeObj)
    index< (details.timestamp.length-1)?this.timeStamps.push(new FormControl<{hour:0,minute:0}>(null)):''
      
    });
  this.reportEditForm.get('smtpEmail').setValue(details.sender_email)
  this.reportEditForm.get('smtpPassword').setValue(details.sender_pwd)
  this.reportEditForm.get('smtpServer').setValue(details.smtp_server)
  this.reportEditForm.get('smtpPort').setValue(details.smtp_port)
  // this.reportEditForm.get('violationReport').setValue(details.violation_report)
  this.reportEditForm.get('smtpServer').valueChanges.subscribe(value=>{
    console.log(value)
    if(value=='smtp.yandex.com'){
    this.reportEditForm.get('smtpPort').setValue(587)
    this.isOtherSmtp=false
  }
         else if(value=='smtp.gmail.com'){
  this.reportEditForm.get('smtpPort').setValue(465)
  this.isOtherSmtp=false
}
else{
  this.isOtherSmtp=true
  this.reportEditForm.get('smtpServer').setValue('')
  this.reportEditForm.get('smtpPort').setValue('')
}

}
)
this.reportAnalytics=details.analytics_types.map((item:any)=>item.toLowerCase())
console.log(this.reportAnalytics)
  

this.reportEditForm.updateValueAndValidity()



  }
  AddTimeStamp(){
    this.timeStamps.push(new FormControl<{hour:0,minute:0}>({hour:0,minute:0}))
  }
  RemoveTimeStamp(i:number){
    this.timeStamps.length>1?   this.timeStamps.controls.splice(i,1):''
  }

  GetThresholdValues(){
    this.ReportService.GetThresholdDetails().subscribe((response:any)=>{
      if(response.success){
        var temp=response.message.threshold.find((item:any)=>item.class.toLowerCase()=='person')
        this.personValue=Number(temp.value)
        temp=response.message.threshold.find((item:any)=>item.class.toLowerCase()=='helmet')
        this.helmetValue=Number(temp.value)
        temp=response.message.threshold.find((item:any)=>item.class.toLowerCase()=='vest')
        this.vestValue=Number(temp.value)

      }
    })
  }

  UpdateThresholdValues(){
    this.loader1=true
    var data={
      data:{
        threshold:[{
          class:'person',
          value:this.personValue,
        },
        {
          class:'helmet',
          value:this.helmetValue,
        },
        {
          class:'vest',
          value:this.vestValue,
        }]
      }
    }

    this.ReportService.UpdateThreshold(data).subscribe((response:any)=>{
      this.loader1=false
      this.ReportService.notification(response.message)
      if(response.success){

      this.GetThresholdValues()
      }
    },Err=>{
      this.loader1=false
      this.ReportService.notification('Error while the process','Retry')
    })
  }



  handleBlur(event: any) {
    // Your existing logic here
    console.log(event)
    console.log(event.target.value)
    
    // Trigger change detection manually
    this.change.detectChanges();
  }
  
 isDeleteReport(modal:any,data:any){
   this.selectedReport=data
    this.modalService.open(modal,{centered:true,backdrop:'static'})
 }
  DeleteReport(){
    var data={
      _id: this.selectedReport._id.$oid
    }
    this.ReportService.DeleteReportDetails(data).subscribe((response:any)=>{
      this.ReportService.notification(response.message)

      if(response.success){
        this.modalService.dismissAll()
        this.GetReportDetails()
      }
    },
    Err=>{
      this.ReportService.notification('Error while the process','Retry')
    }
    )
  }


  UpdateReports(){
    this.timeStampValues=[]
    this.timeStamps.controls.forEach((element:any,index:number) => {
      this.timeStampValues.push(this.toTimeString(element.value))
      
    }); 
    var report = {
      _id:this.selectedReport._id.$oid,
      email_receivers:{
      to:  this.reportEditForm.get('toEmail').value,
      cc:this.reportEditForm.get('ccEmail').value==null?[]:this.reportEditForm.get('ccEmail').value,
      bcc:this.reportEditForm.get('bccEmail').value==null?[]:this.reportEditForm.get('bccEmail').value
      },
      violation_report: true,
      analytics_types:this.reportAnalytics,
      // esi_report: this.reportEditForm.get('esiJobsheet').value,
      timestamp: this.timeStampValues,
      smtp_server:this.reportEditForm.get('smtpServer').value,
      smtp_port:this.reportEditForm.get('smtpPort').value,
      sender_email:this.reportEditForm.get('smtpEmail').value,
      sender_pwd:this.reportEditForm.get('smtpPassword').value

    }

    this.ReportService.EditReportDetails(report).subscribe((response:any)=>{
      this.ReportService.notification(response.message)
      if(response.success){
        this.isSuccess=true
        this.GetReportDetails()
        this.modalService.dismissAll()
        this.ReportService.notification(response.message)
      }
      else{
        this.isSuccess=false
        this.responseMessage=response.message

      }
    },
    Err=>{
  this.isSuccess=false
  this.responseMessage="Error while the process     Retry"
    })
  }
}
