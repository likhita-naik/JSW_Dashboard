import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, NgModel, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report-alert',
  templateUrl: './report-alert.component.html',
  styleUrls: ['./report-alert.component.css']
})
export class ReportAlertComponent implements OnInit {
  reportDetails: any[] = []
  AllReportDetails: any[] = []
  reportTime: any = { hour: 0, minute: 0 };
  reportAnalytics: any[] = []
  SMTPForm:FormGroup=new FormGroup({

    email:new FormControl(),
    domain:new FormControl(),
    password:new FormControl(),
    port:new FormControl('')
  })
  aiSolutions: any[] = [{ name: 'Trafffic count', value: 'traffic_count' }, { name: 'Restricted Area', value: 'restricted_area' }, { name: 'Crowd count', value: 'crowd_count' }]
  reportForm: FormGroup = new FormGroup({
    toEmail: new FormControl('', Validators.required),
    ccEmail: new FormControl('', Validators.required),

    violationReport: new FormControl(false, Validators.requiredTrue),
    esiJobsheet: new FormControl(false, Validators.requiredTrue)
  })
  emailControl: FormControl = new FormControl('', Validators.required)
  constructor(private modalService: NgbModal) {
    this.emailControl.setValidators(Validators.email)
  }


  ngOnInit(): void {
  }

  AddReport(modal: any) {

    this.modalService.open(modal)

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
    console.log(this.reportTime)
    var report = {
      to_email: [ this.reportForm.get('toEmail').value.split(',')],
      cc_email:[this.reportForm.get('ccEmail').value.split(',')],
      violation_report: this.reportForm.get('violationReport').value,
      alarm_analytics:this.reportAnalytics,
      esi_report: this.reportForm.get('esiJobsheet').value,
      report_time: this.toTimeString(this.reportTime)
    }

    this.AllReportDetails.push(report)
    this.reportTime = {
      hour: 0,
      minute: 0
    }
    this.modalService.dismissAll()
    this.reportForm.get('violationReport').setValue(false)
    this.reportForm.get('esiJobsheet').setValue(false)

    console.log(report)


  }

  toTimeString(time: any) {
    return (time.hour < 10 ? '0' + time.hour.toString() : time.hour.toString()) + ':' + (time.minute < 10 ? 0 + time.minute.toString() : time.minute.toString())
  }

}
