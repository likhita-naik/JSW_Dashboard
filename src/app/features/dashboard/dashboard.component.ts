import { DatePipe } from '@angular/common';
import { sanitizeIdentifier } from '@angular/compiler';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dayjs, { locale } from 'dayjs';
import { isDate, Moment } from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective, LocaleService, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SideEnum } from 'ngx-daterangepicker-material/daterangepicker.component';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { from } from 'rxjs';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedMoments: { startDate: Moment | any, endDate: Moment | any }
  ECDetails: any = { roi_cam_count: 0, ppe_data_count: 0, tc_data_count: 0, cr_data_count: 0 }
  cameraStatus: any = { total_cam_count: 0, enable_data_count: 0, disable_data_count: 0, not_working_cam_count: 0, working_cam_count: 0 }
  crCamDetails: any[] = []
  tcCamDetails: any[] = []
  ppeCamDetails: any[] = []
  raCamDetails: any[] = []
  disabledCamDetails: any[] = []
  violationsCount: any = { total_count: 0, ppe_count: 0, ra_count: 0 }
  NWCamDetails: any[] = []
  fromDate: any
  toDate: any
  violationList: any[] = []
  DaterangepickerDirective: DaterangepickerDirective
  IP: any
  dashboardDelay: number
  ppeViolations: any[] = []
  RAViolations: any[] = []
  chartOptionsBar: any;
  chartOptionsPie: any;
  chartOptionsline: any;
  isDatewise: boolean
  allViolationDetails: any[] = []
  images: any[] = []
  ranges: any = {
    'Today': [dayjs().hour(0).minute(0).second(0), dayjs()],
    'Yesterday': [dayjs().subtract(1, 'days').hour(0).minute(0).second(0), dayjs().subtract(1, 'days')],
    'Last 7 Days': [dayjs().subtract(6, 'days').hour(0).minute(0).second(0), dayjs()],
    'Last 30 Days': [dayjs().subtract(29, 'days').hour(0).minute(0).second(0), dayjs()],
    'This Month': [dayjs().startOf('month').hour(0).minute(0).second(0), dayjs().endOf('month')],
  }
  @ViewChild('reportrange', { static: true }) reportRange: any
  @ViewChild('datepicker', { static: true }) datePicker: any

  @ViewChild(DaterangepickerDirective, { static: true }) pickerDirective: DaterangepickerDirective
  constructor(private server: ServerService, private modalService: NgbModal, private Router: Router,
    private _lightbox: Lightbox,
    private _lightBoxConfig: LightboxConfig,
  ) {
    this.IP = this.server.IP
    this.dashboardDelay = this.server.dashboardInterval
    this.server.GetPPEViolCountCamWise().subscribe((response: any) => {
      console.log(response)
    })
    this.server.GetViolationList().subscribe((response: any) => {
      console.log(response)
      this.violationList = response.message
    })
    this.server.GetCamerasStatus().subscribe((data: any) => {
      console.log(data)
      this.cameraStatus = data.message[0]
    })
    this.server.GetLiveViolationCount().subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.violationsCount = response.message
      }
    })
    this.ChartDraw()

    setInterval(() => {
      this.server.GetCamerasStatus().subscribe((data: any) => {
        console.log(data)
        this.cameraStatus = data.message[0]
      })
      if (!this.isDatewise) {

        this.server.GetLiveViolationCount().subscribe((response: any) => {
          console.log(response)

          if (response.success) {

            if (!this.isDatewise) {
              this.violationsCount = response.message

            }
          }
        })
        this.ChartDraw()

      }

    }, this.dashboardDelay)
    //lightbox configaration
    this._lightBoxConfig.showDownloadButton = false
    this._lightBoxConfig.showZoom = true
    this._lightBoxConfig.showImageNumberLabel = true
    this._lightBoxConfig.fitImageInViewPort = true
    this._lightBoxConfig.disableScrolling = false
    this._lightBoxConfig.centerVertically = false

  }




  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    console.log(this.pickerDirective)
  }
  cb(start: any, end: any) {

    //datepicker.html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }
  RefreshData() {
    this.isDatewise = false
    this.server.GetLiveViolationCount().subscribe((response: any) => {
      console.log(response)

      if (response.success) {

        if (!this.isDatewise) {
          this.violationsCount = response.message

          this.ChartDraw()


        }
      }
    })


  }
  openDatePicker(e: MouseEvent) {
    //var datepicker:HTMLElement=document.getElementById('spanDateInput')
    //this.DaterangepickerDirective.inputChanged(datepicker.target.event)
    // console.log(this.selectedMoments.endDate.toDate())
    // console.log(datepicker)
    console.log(e)
    this.pickerDirective.open(e)

  }
  ChartDraw() {
    this.chartOptionsPie = {
      animationEnabled: true,
      // exportEnabled: true,
      title: {
        text: 'Violations',
      },
      subtitles: [
        {
          text: this.violationList.indexOf('RA') >= 0 && this.violationList.indexOf('PPE') >= 0 ? 'RA/PEE' : this.violationList.indexOf('RA') >= 0 ? 'RA' : this.violationList.indexOf('PPE') >= 0 ? 'PPE' : ''
        },
      ],
      data: [
        {
          type: 'pie', //change type to column, line, area, doughnut, etc
          indexLabel: '{name}: {y}',
          dataPoints: [
            {
              name: 'RA',
              y: this.violationsCount.ra_count,
              color: '#648eec',
            },
            {
              name: 'PPE',
              y: this.violationsCount.ppe_count,
              color: 'skyblue',
            },
          ],
        },
      ],
    };

    this.chartOptionsBar = {
      // theme:'',
      title: {
        text: 'Violations',
      },
      animationEnabled: true,
      axisY: {
        includeZero: true,
        suffix: '',
      },
      data: [
        {
          type: 'column',
          indexLabel: '{y}',

          yValueFormatString: '',
          dataPoints: [
            {
              label: 'PPE',
              y: this.violationsCount.ppe_count,
              color: '#2b9fc9',
            },
            {
              label: 'RA',
              y: this.violationsCount.ra_count,
              color: '#4f81bc',
            },
          ],
        },
      ],
    };
    console.log('Chart is drawing')
  }






  openDPByIcon() {
    var datePicker = this.datePicker.nativeElement
    var reportRange = this.reportRange.nativeElement
    console.log(datePicker)
    // document.getElementById('reportrange').click()
    reportRange.click()
    datePicker.click()

  }

  openECDetailsModal(modal: any) {
    this.modalService.open(modal, { scrollable: true, size: 'xl' })
    this.images.splice(0, this.images.length)
    var table = document.getElementById('dataTable')
    console.log(table)
    table.classList.add('loading')
    this.server.GetECSolutionCount().subscribe((response: any) => {
      this.ECDetails = response.message[0]
      // this.ECDetails.forEach((element: any, index: number) => {
      //   this.images[index] = {
      //     src: this.IP + '/get_roi_image/' + element.imagename,

      // //     thumb: this.IP + '/get_roi_image/' + element.imagename,
      // //     caption: element.imagename,

      // //   }
      // });
      console.log(response)
    })

    this.server.GetSolutionCameraDetails().subscribe((response: any) => {
      table.classList.remove('loading')
      console.log(response)
      if (response.success) {
        this.crCamDetails = response.message[0].cr_cam_details
        this.tcCamDetails = response.message[0].tc_cam_details
        this.raCamDetails = response.message[0].roi_cam_details
        this.ppeCamDetails = response.message[0].ppe_cam_details

      }

    },
      err => {
        table.classList.remove('loading')

      })
  }
  openAllViolationsModal(modal: any) {
    this.modalService.open(modal, { size: 'xl', scrollable: true })
    var table = document.getElementById('dataTable')
    console.log(table)
    table.classList.add('loading')
    if (this.isDatewise) {
      this.server.GetTotalViolDetailsDatewise(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss'))
        .subscribe((response: any) => {
          if (response.success) {
            this.allViolationDetails = response.message
          }
          table.classList.remove('loading')

        }, Err => {
          this.modalService.dismissAll()
          this.server.notification('Error while fetching the data')
        })

    }
    else {

      this.server.GetTotaliveViolationsDetails()
        .subscribe((response: any) => {
          if (response.success) {
            this.allViolationDetails = response.message
          }
          table.classList.remove('loading')


        }, Err => {
          table.classList.remove('loading')
          this.modalService.dismissAll()
          this.server.notification('Error while fetching the data')
        })


    }
  }

  openDCDetailsModal(modal: any) {
    this.images.splice(0, this.images.length)
    this.modalService.open(modal, { size: 'xl', scrollable: true })
    var table = document.getElementById('dataTable3')
    table.classList.add('loading')
    this.server.DisableCamDetails().subscribe((response: any) => {
      table.classList.remove('loading')
      if (response.success) {
        this.disabledCamDetails = response.message
        this.disabledCamDetails.forEach((element: any, index: number) => {
          this.images[index] = {
            src: this.IP + '/get_roi_image/' + element.imagename,

            thumb: this.IP + '/get_roi_image/' + element.imagename,
            caption: element.imagename,

          }
        });

      }
    },
      Err => {
        this.modalService.dismissAll()
        table.classList.remove('loading')

      })

  }
  openNWCDetailsModal(modal: any) {
    this.images.splice(0, this.images.length)
    this.modalService.open(modal, { size: 'xl', scrollable: true })
    var table = document.getElementById('dataTable2')
    table.classList.add('loading')
    this.server.GetNotWorkingCameraDetails().subscribe((response: any) => {
      table.classList.remove('loading')

      if (response.success) {
        this.NWCamDetails = response.message
        this.NWCamDetails.forEach((element: any, index: number) => {
          this.images[index] = {
            src: this.IP + '/get_roi_image/' + element.imagename,

            thumb: this.IP + '/get_roi_image/' + element.imagename,
            caption: element.imagename,

          }
        });
      }
    }, Err => {
      this.modalService.dismissAll()
    })

  }

  OpenImage(index: any) {
    this._lightbox.open(this.images, index)
  }

  OpenCameraImage(img:any){
    var tempImgs :any=[]
   var  temp = {
      src: this.IP + '/get_roi_image/' + img,

      thumb: this.IP + '/get_roi_image/' + img,
      caption: img,

    }
    tempImgs.push(temp)
    this._lightbox.open(tempImgs,0)

  }
  DateWiseViolationsCount() {

  }
  dateUpdated(event: any) {
    if (this.selectedMoments.startDate || this.selectedMoments.endDate) {
      console.log('dates Update')
      this.isDatewise = true
      var fromDate = this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss')
      var toDate = this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')
      console.log(fromDate, toDate)
      this.server.GetViolationCountDatewise(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')).subscribe((response: any) => {
        console.log(response)
        this.violationsCount = response.message
        this.ChartDraw()


        console.log(this.selectedMoments.startDate, new Date().getDate())

        if (this.selectedMoments.startDate.$D === new Date().getDate()) {
          this.isDatewise = false
          console.log('todays days matched')
          //this.ChartDraw()


          console.log(this.isDatewise)
        }
      },
        err => {
          this.server.notification('Error while fetching the data', 'Retry')
        })

    }
    else {
      console.log('dates else Matched')
      this.isDatewise = false

      this.server.GetViolationCountDatewise(this.server.dateTransform(new Date(new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0))), this.server.dateTransform(new Date())).subscribe((response: any) => {
        console.log(response)
        this.violationsCount = response.message
        this.ChartDraw()


      },
        err => {
          this.server.notification('Error while fetching the data', 'Retry')
        })

    }

  }

  ppeViolationsModal(modal: any) {
    this.modalService.open(modal, { size: 'xl', scrollable: true })
    var table = document.getElementById('dataTablePPE')
    console.log(table)
    table.classList.add('loading')
    if (this.isDatewise) {
      this.server.GetPPEViolationDetails(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss'))
        .subscribe((response: any) => {
          table.classList.remove('loading')
          if (response.success) {
            this.ppeViolations = response.message
          }
          else {
            this.server.notification(response.message)
          }
        }, Err => {
          table.classList.remove('loading')
          this.modalService.dismissAll()
          this.server.notification('Error while fetching the data', 'Retry')
        })
    }
    else {
      this.server.ppeViolCountCamwise().subscribe((response: any) => {
        table.classList.remove('loading')

        if (response.success) {
          this.ppeViolations = response.message
        } else {
          this.server.notification(response.message)
        }
      }, Err => {
        table.classList.remove('loading')

        this.server.notification('Error while fetching the data', 'Retry')
      })
    }

  }
  raViolationsModal(modal: any) {
    this.modalService.open(modal, { size: 'xl', scrollable: true })
    var table = document.getElementById('dataTableRA')
    console.log(table)
    table.classList.add('loading')
    if (this.isDatewise) {
      this.server.GetRAViolationsDetails(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')).subscribe((response: any) => {

        table.classList.remove('loading')
        if (response.success) {
          this.RAViolations = response.message

        } else {
          this.server.notification(response.message)
        }
      }, Err => {
        table.classList.remove('loading')

        this.modalService.dismissAll()
        this.server.notification('Error while fetching the data', 'Retry')
      })
    }

    else {
      this.server.RAViolCountCamWise().subscribe((response: any) => {
        if (response.success) {
          table.classList.remove('loading')
          this.RAViolations = response.message
        }
        else {
          this.server.notification(response.message)
        }
      }, Err => {
        table.classList.remove('loading')

        this.server.notification('Error while fetching the data', 'Retry')
      })
    }

  }

  BackToLive() {
    this.isDatewise = false
  }
  ToCameras() {
    this.Router.navigate(['/app/CameraSettings'])
  }
  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }


}
