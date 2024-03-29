import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ServerService } from 'src/app/Services/server.service';
import { validate } from 'uuid';
import { NgbdSortableHeader } from 'src/app/common/sortable.directive';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-camera-settings',
  templateUrl: './camera-settings.component.html',
  styleUrls: ['./camera-settings.component.css']
})
export class CameraSettingsComponent implements OnInit, OnDestroy, AfterViewInit {
  RACameraList: Observable<any[]> = of([])
  responseMessage: string = ''
  IP: string = ''
  selectedSense:any[]=[]
  isFail: boolean = false
  isSuccess: boolean = false
  isLoading: boolean = false
  isDownloading: boolean = false
  cameraData: any[] = []
  roiPoints: any[] = []
  showCamName: boolean = true
  showCamImage: boolean = true
  showCamIP:boolean=true
  showSI: boolean = true
  showPlant: boolean = true
  showArea: boolean = true
  showCamBrand: boolean = true
  showAlarmType: boolean = true
  showAlarmIp = true
  selectedColumn: any
  showAiSolutions: boolean = true
  isFormValid: boolean = false
  selectedDeleteID: number
  CameraList: any[] = []
  isHooter: boolean = false
  isRelay: boolean = false
  total: Observable<number> = of(0)
  page: number = 1
  pageSize: number = 10
  tempData: any[] = []
  isVoiceAlert: boolean = false
  isActive: boolean = false
  isActive2:boolean=false
  AppConfig: number = 0
  isDownload: boolean = false
  alarmEnabledViolations: any[] = []
  isSensgiz:boolean=false
  sensgiz:any = new FormArray([])
  SensGizInfo:any[]=[]
  sensgizModal:any
  selectedCamera:any
  licenseMessage: string = "You have reached the limit of cameras that you can add to this application"
  startAppConfig: FormControl = new FormControl('0', Validators.required)
  voiceLanguages: Observable<any[]> = of([{ text: 'English', id: 0 },
  { text: 'Hindi', id: 1 }, { text: 'Kannada', id: 2 }, { text: 'Telugu', id: 3 }])


  @ViewChild('singleSelect') singleSelect: any

  dropdownSettings: IDropdownSettings
  dropdownSettings2: Observable<IDropdownSettings> = of({
    singleSelection: true,
    idField: "id",
    textField: "text",
    disabledField: "isDisabled",

    // enableCheckAll: true,
    // selectAllText: "Select All",
    // unSelectAllText: "UnSelect All",
    // allowSearchFilter: false,
    // limitSelection: 1,
    closeDropDownOnSelection: true,

    clearSearchFilter: true,
    // maxHeight: 197,
    // itemsShowLimit: 999999999999,
    searchPlaceholderText: "Search",
    noDataAvailablePlaceholderText: "No data available",
    noFilteredDataAvailablePlaceholderText: "No filtered data available",
    showSelectedItemsAtTop: false,
    defaultOpen: false,
    allowRemoteDataSearch: false,
  })

  cameraBrandList: Observable<any[]> = of([{ id: 1, text: 'cp_plus' }])
  selectedBrand: FormControl = new FormControl()
  cameraImages: any[] = []

  headers: any[] = [{ item_text: 'SI No', item_id: 0 },
  { item_text: 'Camera Name', item_id: 1 },
  { item_text: 'Camera Image', item_id: 2 },
  { item_text: 'Camera IP', item_id: 9 },

  { item_text: 'Plant', item_id: 3 },
  { item_text: 'Area', item_id: 4 },
  { item_text: 'Camera brand', item_id: 5 },
  { item_text: 'Alarm Type', item_id: 6 },
  { item_text: 'Alarm Ip Address', item_id: 7 },

  { item_text: 'Settings', item_id: 8 },
  ]


  @ViewChildren(NgbdSortableHeader) sortableHeaders: QueryList<NgbdSortableHeader>

  @ViewChild('errorMessage', { static: false }) ErrorModal: TemplateRef<any>
  AddCameraForm: FormGroup = new FormGroup({
    cameraname: new FormControl('', Validators.required),
    camera_brand: new FormControl('', Validators.required),
    cameraip: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    plant: new FormControl('', Validators.required),
    department:new FormControl('',Validators.required),
    area: new FormControl('', Validators.required),
    port: new FormControl('', Validators.required),
    rtsp_url: new FormControl(''),
    isHooter: new FormControl(''),
    isRelay: new FormControl(''),

    isSensgiz:new FormControl(''),
    hooterIp: new FormControl(''),
    hooterConfig: new FormControl(''),
    relayIp: new FormControl(''),
    voiceLang: new FormControl('')//altered voice language settings

  })


  EditCameraForm:FormGroup=  new FormGroup({
    cameraname: new FormControl('', Validators.required),
    // camera_brand: new FormControl('', Validators.required),
    cameraip: new FormControl('', Validators.required),
    // username: new FormControl('', Validators.required),
    // password: new FormControl('', Validators.required),
    plant: new FormControl('', Validators.required),
    department:new FormControl('',Validators.required),
    area: new FormControl('', Validators.required),
    //port: new FormControl('', Validators.required),
    rtsp_url: new FormControl(''),
    isHooter: new FormControl(''),
    isRelay: new FormControl(''),
    isSensgiz:new FormControl(''),
    hooterIp: new FormControl(''),
    hooterConfig: new FormControl(''),
    relayIp: new FormControl(''),
    voiceLang: new FormControl('')//altered voice language settings

  })

  constructor(public server: ServerService,
    public modalService: NgbModal,
    public _lightBox: Lightbox,
    private toasterService: ToastrService,

    public _lightBoxConfig: LightboxConfig,
    public router: Router) {
    this.IP = server.IP
    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'No data',
      maxHeight: 197
    };

    this.sensgiz.push(new FormGroup({
      coinId:new FormControl('',Validators.required),
      coinLocation:new FormControl('',Validators.required),
      presetId:new FormControl('',Validators.required)
    }))
    this.server.CheckApplicationStatus().subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        //this.isActive=true
        localStorage.setItem('appStatus', response.message[0].process_status)
        var process = response.message.find((el: any) => {

          return el.process_name =='docketrun-app' ? el : ''
        })
        this.isActive = process.process_status

        var process2 = response.message.find((el: any) => {

          return el.process_name == 'smrec' ? el : ''
        })

        this.isActive2 = process2.process_status
      }
    })
    this.AddCameraForm.valueChanges.subscribe(value => {
      console.log(value)
      if (this.AddCameraForm.get('cameraname').value && this.AddCameraForm.get('cameraip').value && this.AddCameraForm.get('department').value && this.AddCameraForm.get('port').value && this.AddCameraForm.get('camera_brand').value && this.AddCameraForm.get('username').value && this.AddCameraForm.get('password').value && this.AddCameraForm.get('plant').value && this.AddCameraForm.get('area').value && this.AddCameraForm.get('cameraip').value) {
        console.log('adding manually')
        this.isFormValid = true
      }

      else if (this.AddCameraForm.get('cameraname').value && this.AddCameraForm.get('camera_brand').value&& this.AddCameraForm.get('department').value && this.AddCameraForm.get('rtsp_url').value && this.AddCameraForm.get('area').value && this.AddCameraForm.get('plant').value) {
        this.isFormValid = true

      }
      else {
        this.isFormValid = false
      }
    })
    this._lightBoxConfig.showDownloadButton = true
    this._lightBoxConfig.showZoom = true
    this._lightBoxConfig.showImageNumberLabel = true
    this._lightBoxConfig.fitImageInViewPort = true
    this._lightBoxConfig.disableScrolling = false
    this._lightBoxConfig.centerVertically = false
    this.GetCameraBrands()
    console.log(this.AddCameraForm.value)
    this.AddCameraForm.valueChanges.subscribe(() => {
      this.isSuccess = false
      this.isFail = false
    })
  }

  ngOnInit(): void {
    this.startAppConfig.setValue(0)
    this.GetCameraList()


    this.toasterService.clear()
    //   this.dropdownSettings2=  {
    //     singleSelection: true,
    //     idField: "id",
    //     textField: "text",
    //     disabledField: "isDisabled",
    //     enableCheckAll: true,
    //     selectAllText: "Select All",
    //     unSelectAllText: "UnSelect All",
    //     allowSearchFilter: false,
    //     limitSelection: -1,
    //     clearSearchFilter: true,
    //     maxHeight: 197,
    //     itemsShowLimit: 999999999999,
    //     searchPlaceholderText: "Search",
    //     noDataAvailablePlaceholderText: "No data available",
    //     noFilteredDataAvailablePlaceholderText: "No filtered data available",
    //     closeDropDownOnSelection: true,
    //     showSelectedItemsAtTop: false,
    //     defaultOpen: false,
    //     allowRemoteDataSearch: false,
    // }
  }

  ngAfterViewInit(): void {

    this.AddCameraForm.get('rtsp_url').valueChanges.subscribe((value: any) => {
      if (value) {
        console.log(value)

        this.AddCameraForm.get('username').removeValidators(Validators.required)
        this.AddCameraForm.get('password').removeValidators(Validators.required)
        this.AddCameraForm.get('cameraip').removeValidators(Validators.required)
        this.AddCameraForm.get('port').removeValidators(Validators.required)

      }
      else {
        console.log(value)
        this.AddCameraForm.get('username').addValidators(Validators.required)
        this.AddCameraForm.get('password').addValidators(Validators.required)
        this.AddCameraForm.get('cameraip').addValidators(Validators.required)
        this.AddCameraForm.get('port').addValidators(Validators.required)
      }
    })
  }
  openCameraAddModal(modal: any) {

    var container = document.getElementById('page')
    container.classList.add('loading')
    this.SensGizInfo=[]
    this.sensgiz=new FormArray([])
    this.sensgiz.push(new FormGroup({
      coinId:new FormControl('',Validators.required),
coinLocation:new FormControl('',Validators.required),
presetId:new FormControl('',Validators.required)
    }))
    this.server.CheckLicense().subscribe((response: any) => {
      if (response.success) {
        container.classList.remove('loading')

        this.modalService.open(modal, { size: 'lg' }).result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
          //  this.roiNameControl.setValue(null)
          //  this.OnAddingNewROI()
          // this.download = '',
          //   this.isalert = false.
          this.isHooter = false
          this.isRelay = false
          this.isVoiceAlert = false
          console.log('cancel')
          this.AddCameraForm.reset()
          this.isFail = false
          this.isSuccess = false
          this.isLoading = false
          this.sensgiz.reset()


          
          // this.newROIPoints.splice(0,this.newROIPoints.length)
          // this.OnAddingNewROI()
        }, (reason) => {
          this.isHooter = false
          this.isRelay = false
          this.isVoiceAlert = false
          this.sensgiz.reset()

          this.sensgiz=new FormArray([])
          this.sensgiz.push(new FormGroup({
            coinId:new FormControl('',Validators.required),
      coinLocation:new FormControl('',Validators.required),
      presetId:new FormControl('',Validators.required)
          }))
         
          console.log('submit')
          this.isLoading = false
          /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          // this.download = '',
          //   this.isalert = false
          this.AddCameraForm.reset()
          this.isFail = false
          this.isSuccess = false
          this.sensgiz.reset()
          this.SensGizInfo=[]
            
        }
        )
      }
      else{
        this.licenseMessage=response.message
        container.classList.remove('loading')
        this.modalService.open(this.ErrorModal,{centered:true,backdrop:'static'})

      }
    }, Err=>{container.classList.remove('loading')
  this.server.notification('Something went wrong','Retry')}

    )

  }
  EnableAnalytics(camera: any, event: any) {
    console.log(event.target.checked, 'event')
    var value = event.target.checked.toString()
    this.server.notification("Camera Analytics Updated")
    this.server.UpdateCameraAnalytics(camera._id.$oid, value).subscribe((response: any) => {
      this.GetCameraList()
      if (response.success) {
        this.server.notification(response.message)
      }
      else {
        this.server.notification(response.message)
      }
    })


  }
  isDelete(modal: any, id: number) {
    this.selectedDeleteID = id - 1
    console.log(id)
    this.modalService.open(modal, { centered: true, backdrop: 'static' })
  }
  StopAppModal(modal: any) {
    this.modalService.open(modal, { centered: true, backdrop: "static" })
  }
  StartAppModal(modal: any) {
    this.startAppConfig.setValue(0)
    this.modalService.open(modal, { centered: true, backdrop: 'static' })

  }
  DeleteCamera() {
    this.server.DeleteCameraDetails(this.CameraList[this.selectedDeleteID]._id.$oid).subscribe((response: any) => {
      if (response.success) {
        this.server.notification(response.message)
        this.modalService.dismissAll()
        this.GetCameraList()
      }
      else {
        this.server.notification(response.message)
      }
    },
      Err => {
        this.server.notification('Something went wrong', 'Retry')
      })

  }

  hooterOrRelayConfig(event: any,modal?:any) {
    console.log(event.target.checked)
    if (event.target.value == 'hooter') {
      this.isHooter = true
      this.isRelay = false
      this.isSensgiz=false
      this.isVoiceAlert = false

    }
    if (event.target.value == 'relay') {
      this.isHooter = false
      this.isRelay = true
      this.isSensgiz=false
      this.isVoiceAlert = false

    }

    if (event.target.value == 'voiceAlert') {
      this.isVoiceAlert = true
      this.isHooter = false
      this.isRelay = false
      this.isSensgiz=false

    }
    if (event.target.value == 'sensegiz') {
      this.isVoiceAlert = false
      this.isSensgiz=true
      this.isHooter = false
      this.isRelay = false
      this.SensgizModal(modal)
    
    }


  }

  editSensgiz(modal:any){
    this.sensgiz=new FormArray([])
    //this.SensGizInfo=this.SensGizInfo.coin_details
    this.isHooter=false
    this.isRelay=false
    this.isSensgiz=true
    if(this.SensGizInfo!=null || this.SensGizInfo.length>0){

 

    this.SensGizInfo.forEach((value:any,index:number) => {
      
   
    this.sensgiz.push(new FormGroup({
      coinId:new FormControl('',Validators.required),
      coinLocation:new FormControl('',Validators.required),
      presetId:new FormControl('',Validators.required)
    }))

    this.sensgiz.controls[index].get('coinId').setValue(value.coin_id)
    this.sensgiz.controls[index].get('coinLocation').setValue(value.coin_location)
    this.sensgiz.controls[index].get('presetId').setValue(value.preset_id)


  });
   this.sensgizModal= this.modalService.open(modal,{size:'lg'})

  }
}
  HooterSettings(event: any) {
    console.log(event)
    if (event.target.checked) {
      this.alarmEnabledViolations.push(event.target.value)
    }
    else {
      var index = this.alarmEnabledViolations.indexOf(event.target.value)
      this.alarmEnabledViolations.splice(index, 1)
    }
    console.log(this.alarmEnabledViolations)

  }

  OnAddCameraDetails() {
    // this.AddCameraForm.get('rtsp_url').value?this.removeValidators():''
    this.AddCameraForm.updateValueAndValidity()
    if (this.isFormValid) {

      this.isLoading = true
      var formData = new FormData()
      this.isFail = false
      this.isSuccess = false
      console.log(this.AddCameraForm.value)
      for (let k in this.AddCameraForm.value) {
        console.log(k, this.AddCameraForm.value[k])
        if (k === 'camera_brand') {
          formData.append(k, this.AddCameraForm.value[k].text)
        }
        else {
          formData.append(k, this.AddCameraForm.value[k])

        }
      }

      if (this.AddCameraForm.get('rtsp_url').value) {
        console.log('rtsp adding')
        var ai_solution = Array
        console.log(ai_solution)
        if (this.isHooter) {
          var data1: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            department:this.AddCameraForm.value['department'],
            rtsp_url: this.AddCameraForm.value['rtsp_url'],
            ai_solution: [],
            alarm_type: 'hooter',
            alarm_enable:true,
            coin_details:null,
            alarm_ip_address: this.AddCameraForm.value['hooterIp']

          }
          console.log(data1)
        }
        else if (this.isRelay) {
          var data1: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            rtsp_url: this.AddCameraForm.value['rtsp_url'],
            alarm_type: 'relay',
            alarm_ip_address: this.AddCameraForm.value['relayIp'],
            ai_solution: [],
            coin_details:null,
            alarm_enable:true,

            department:this.AddCameraForm.value['department'],


          }

        }
        //altered
        else if (this.isVoiceAlert) {
          var data1: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            rtsp_url: this.AddCameraForm.value['rtsp_url'],
            alarm_type: 'voiceAlert',
            coin_details:null,
            department:this.AddCameraForm.value['department'],
            alarm_enable:true,

            alarm_ip_address: this.AddCameraForm.value['voiceLanguage'],
            ai_solution: []

          }
        }
        else if (this.isSensgiz) {
          var data1: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            rtsp_url: this.AddCameraForm.value['rtsp_url'],
            department:this.AddCameraForm.value['department'],
            alarm_enable:true,

            alarm_type: 'sensegiz',
            // alarm_type: null,
            alarm_ip_address: '',
            coin_details:this.SensGizInfo,
            // alarm_ip_address: this.AddCameraForm.value['voiceLanguage'],
            ai_solution: []

          }
        }
        else {
          var data1: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            rtsp_url: this.AddCameraForm.value['rtsp_url'],
            ai_solution: [],
            alarm_type: null,
            coin_details:null,
            department:this.AddCameraForm.value['department'],
            alarm_enable:true,

            alarm_ip_address: null,


          }
        }
        // this.AddCameraForm.removeControl('username')
        // this.AddCameraForm.removeControl('password')
        // this.AddCameraForm.removeControl('cameraip')
        // this.AddCameraForm.removeControl('port')
        this.server.AddRACamerabyRtsp(data1).subscribe((response: any) => {
          console.log(response)
          // this.AddCameraForm.addControl('username', new FormControl('', Validators.required))
          // this.AddCameraForm.addControl('password', new FormControl('', Validators.required))
          // this.AddCameraForm.addControl('cameraip', new FormControl('', Validators.required))
          // this.AddCameraForm.addControl('port', new FormControl('', Validators.required))

          if (response.success) {
            this.isLoading = false
            this.isSuccess = true

            this.responseMessage = response.message

            this.isHooter = false
            this.isRelay = false
            setTimeout(() => {
              this.modalService.dismissAll()

            }, 500);
            this.GetCameraList()
          }
          else {
            this.isLoading = false
            this.responseMessage = response.message
            this.isFail = true
            //this.AddCameraForm.reset()
          }
        },
          Err => {
            this.isFail = true
            this.responseMessage = "Error while adding camera,retry"
            this.isLoading = false
            // this.AddCameraForm.reset()
          })


      }

      else {
        //var ai_solution = Array
        console.log(this.AddCameraForm.value['camera_brand'].text)
        if (this.isHooter) {
          var data: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            username: this.AddCameraForm.value['username'],
            password: this.AddCameraForm.value['password'],
            cameraip: this.AddCameraForm.value['cameraip'],
            port: this.AddCameraForm.value['port'],
            alarm_type: 'hooter',
            alarm_ip_address: this.AddCameraForm.value['hooterIp'],
            coin_details:null,
            alarm_enable:true,
            department:this.AddCameraForm.value['department'],

            ai_solution: []
          }
        }
        else if (this.isRelay) {
          var data: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            username: this.AddCameraForm.value['username'],
            password: this.AddCameraForm.value['password'],
            cameraip: this.AddCameraForm.value['cameraip'],
            port: this.AddCameraForm.value['port'],
            alarm_type: 'relay',
            alarm_ip_address: this.AddCameraForm.value['relayIp'],
            ai_solution: [],
            coin_details:null,
            alarm_enable:true,
            department:this.AddCameraForm.value['department'],

          }
        }
        else if(this.isSensgiz){
          var data: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            username: this.AddCameraForm.value['username'],
            password: this.AddCameraForm.value['password'],
            cameraip: this.AddCameraForm.value['cameraip'],
            port: this.AddCameraForm.value['port'],
            alarm_type: 'sensegiz',
            alarm_ip_address: '',
            alarm_enable:true,
            department:this.AddCameraForm.value['department'],

            coin_details:this.SensGizInfo,

            // alarm_ip_address: this.AddCameraForm.value['relayIp'],
            ai_solution: []
          }
        }
        else {
          var data: any = {
            cameraname: this.AddCameraForm.value['cameraname'],
            camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
            plant: this.AddCameraForm.value['plant'],
            area: this.AddCameraForm.value['area'],
            username: this.AddCameraForm.value['username'],
            password: this.AddCameraForm.value['password'],
            cameraip: this.AddCameraForm.value['cameraip'],
            port: this.AddCameraForm.value['port'],
            ai_solution: [],
            coin_details:null,
            alarm_enable:true,
            department:this.AddCameraForm.value['department'],

            alarm_type: null,
            alarm_ip_address: null,
          }
        }
        //    this.AddCameraForm.removeControl('rtsp_url')

        this.server.AddCameraDetails(data).subscribe((response: any) => {
          console.log(response)
          //  this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))

          if (response.success) {
            this.responseMessage = response.message
            this.isSuccess = true
            this.isLoading = false
            this.isHooter = false
            this.isRelay = false

            setTimeout(() => {
              this.modalService.dismissAll()
            }, 500);
            this.GetCameraList()
          }
          else {

            this.isLoading = false
            this.responseMessage = response.message
            this.isFail = true
          }
        },
          (error: any) => {
            //this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))
            this.isFail = true
            this.responseMessage = "Error while adding camera,retry"
            this.isLoading = false
            // this.AddCameraForm.reset()
          })
      }

    }

    else {
      this.isFail = true
      this.responseMessage = "Above Fields are required"
    }
  }

  StartApplication() {
    this.server.ConfigRtsp(this.AppConfig).subscribe((res: any) => {
      if (res.success) {

        this.server.StartApplication().subscribe((response: any) => {
          if (response.success) {
            this.isActive = true
            this.server.notification(response.message)
            this.modalService.dismissAll()
          }
          else {
            this.server.notification(response.message)
          }
        },
          Err => {
            this.server.notification('Something went wrong', 'Retry')
          })
      }
      else {
        this.server.notification(res.message, 'Retry')
      }
    }, err => {
      this.server.notification("Error while the process", "Retry")
    })
  }

  removeValidators() {
    this.AddCameraForm.get('username').removeValidators(Validators.required)
    this.AddCameraForm.get('password').removeValidators(Validators.required)
    this.AddCameraForm.get('cameraip').removeValidators(Validators.required)
    this.AddCameraForm.get('port').removeValidators(Validators.required)
    return true
  }
  GetCameraList() {
    this.AddCameraForm.reset()
    var container = document.getElementById('dataTable')
    container.classList.add('loading')
    this.server.getCameras().subscribe((response: any) => {
      container.classList.remove('loading')

      if (response.success) {
        this.cameraImages = []
        this.CameraList = response.message
        this.total = of(response.message.length)
        this.tempData = response.message
        //this.RACameraList = of(response.message)
        this.slice()
        response.message.forEach((element: any, index: number) => {
          this.cameraImages[index] = {
            src: this.IP + '/get_roi_image/' + element.imagename,

            thumb: this.IP + '/get_roi_image/' + element.imagename,
            caption: element.imagename,

          }

        });
      }
      else {
        this.cameraImages = []
        this.CameraList = []
        this.total = of(0)
        this.tempData = []
        this.RACameraList = of([])
        this.server.notification(response.message)
      }
    }, Err => {
      container.classList.remove('loading')
      this.server.notification('Error ')
    })
  }
  goToRoiEdit(id: string, image: string) {
    var link = this.router.serializeUrl(this.router.createUrlTree(['app/ROISettings'], { queryParams: { id: id, image: image } }))
    window.open(link, '_blank')
    //this.router.navigate(['app/ROISettings'], { queryParams: { id: id, image: image } })

  }

  onHideColumn(event: any) {
    console.log(event)
    this.selectedColumn.push(event.item_text)
    switch (event.item_id) {
      case 0: {
        this.showSI = false
        break;
      }
      case 1: {
        this.showCamName = false
        break;
      }
      case 2: {
        this.showCamImage = false
        break;
      }
      case 3: {
        this.showPlant = false
        break;
      }
      case 4: {
        this.showArea = false
        break;
      }
      case 5: {
        this.showCamBrand = false
        break;
      }
      case 6: {
        this.showAlarmType = false
        break;
      }
      case 7: {
        this.showAlarmIp = false
        break;
      }
      case 8: {
        this.showAiSolutions = false
        break;
      }
      case 9: {
        this.showCamIP = false
        break;
      }
    }



  }
  onShowColumn(event: any) {
    switch (event.item_id) {
      case 0: {
        this.showSI = true
        break;
      }
      case 1: {
        this.showCamName = true
        break;
      }
      case 2: {
        this.showCamImage = true
        break;
      }
      case 3: {
        this.showPlant = true
        break;
      }
      case 4: {
        this.showArea = true
        break;
      }
      case 5: {
        this.showCamBrand = true
        break;
      }
      case 6: {
        this.showAlarmType = true
        break;
      }
      case 7: {
        this.showAlarmIp = true
        break;
      }
      case 8: {
        this.showAiSolutions = true
        break;
      }
      case 9: {
        this.showCamIP = true
        break;
      }
    }


  }

  GetCameraBrands() {
    this.server.GetCameraBrandDetails().subscribe((response: any) => {
      console.log(response)
      var temp: any[] = []
      if (response.success) {
        response.message.forEach((element: any, id: number) => {
          temp.push({ text: element, id: id })

        });
      }
      console.log(temp)

      this.cameraBrandList = of(temp)
    })
  }


  open(index: number): void {
    // open lightbox
    var imgindex = index - 1
    console.log(imgindex)
    console.log(this.cameraImages)
    this._lightBox.open(this.cameraImages, imgindex);
  }

  OnSelectCameraBrand(event: any) {
    // console.log(this.AddCameraForm.get('camera_brand').patchValue(event.text))
    console.log(this.AddCameraForm.get('camera_brand').value)
  }

  slice() {
    this.total = of((this.tempData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)).length)
    this.total = of(this.tempData.length)
    this.RACameraList = of((this.tempData.map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))

  }

  StopApplication() {
    this.server.stopApp().subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.isActive = false
        this.server.notification(response.message)
        this.modalService.dismissAll()
      }
      else {
        this.server.notification(response.message)
      }
    },
      err => {
        this.server.notification('Error while the process', 'Retry')
      })
  }


  StartAppConfig(event: any) {
    console.log(typeof (event.target.value))
    this.AppConfig = Number(event.target.value)
  }

  DownloadCameraExcel() {
    this.isDownloading = true
    this.server.DownloadCameraSheet().subscribe(
      (response: any) => {
        var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        var fileName;

        console.log(response)
        const blob = new Blob([response], { type: '.xlsx' });
        // var fileName =  response.headers.get('Content-Disposition').split(';')[1];
        fileName = "camera_status_excel_sheet" + "_" + (this.server.dateTransformbyPattern(new Date, 'yyyy_MM_dd_HH_mm_ss')) + '.xlsx'
        const file = new File([blob], fileName, { type: '.xlsx' });
        this.isLoading = false
        saveAs(blob, fileName);
        this.isDownloading = false



      },
      err => {
        this.isDownloading = false
        console.log(err)
      })

  }

  OnFileSelect($event: any) {
    var container = document.getElementById('ExcelContainer')
    container.classList.add('loading')
    this.isDownload = false
    var file = $event.target.files[0]
    var formData = new FormData()
    formData.append('excel_file', file)
    this.server.UploadCameraIPsFile(formData).subscribe((response: any) => {
      this.server.notification(response.message)

      if (response.success) {
        this.server.TestCameraIps().subscribe((response: any) => {
          if (response.success) {
            this.isDownload = true
            container.classList.remove('loading')


          }
          else {
            this.isDownload = false
          }
        }, Err => {
          this.isDownload = false
          container.classList.remove('loading')

          this.server.notification("Error during the process", 'Retry')
        })



      }
      else {
        this.isDownload = false
        container.classList.remove('loading')

        this.server.notification(response.message)
      }

    }, Err => {
      this.isDownload = false
      container.classList.remove('loading')

      this.server.notification('Error while uploading the file')
    })
    console.log(file)
  }
AddSensgizData(){
  this.sensgiz.push(new FormGroup({
    coinId:new FormControl('',Validators.required),
    coinLocation:new FormControl('',Validators.required),
    presetId:new FormControl('',Validators.required)
  }))
 // this.sensgiz.valueChanges.subscribe ((value:any)=>{
   // this.sensgiz.updateValueAndValidity()

 //q })
 
 
}

DeleteSensgizData(i:number){
  this.sensgiz.controls.splice(i,1)
 // this.sensgiz.updateValueAndValidity()
}

SensgizModal(modal:any){
 this.sensgizModal =this.modalService.open(modal,{size:'lg'})
}


SaveSensgizInfo(){
  this.SensGizInfo=[]
  this.sensgiz.controls.forEach((element:any,index:number) => {
    this.SensGizInfo.push({coin_id:element.value['coinId'],coin_location:element.value['coinLocation'],coin_key_id:index,preset_id:element.value['presetId']})
    
  }); 
  this.sensgizModal.close()

  console.log(this.SensGizInfo)
}

EditCameraModal(modal:any,data:any){
  this.SensGizInfo=[]
  this.sensgiz.reset()
  this.sensgiz =new FormArray([])
  this.sensgiz.push(new FormGroup({
    coinId:new FormControl('',Validators.required),
    coinLocation:new FormControl('',Validators.required),
    presetId:new FormControl('',Validators.required)
  }))

  this.selectedCamera=data
  this.EditCameraForm.get('cameraname').setValue(data.cameraname)
  // this.EditCameraForm.get('camera_brand').setValue(data.camera_brand)
  this.EditCameraForm.get('plant').setValue(data.plant)
  this.EditCameraForm.get('area').setValue(data.area)
  this.EditCameraForm.get('cameraip').setValue(data.camera_ip)
  this.EditCameraForm.get('department').setValue(data.department)
  if(data.alarm_type=='hooter'){
    this.isHooter=true
    this.isRelay=false
    this.isSensgiz=false
    this.EditCameraForm.get('hooterIp').setValue(data.alarm_ip_address?data.alarm_ip_address:'')
    this.EditCameraForm.get('isHooter').setValue('hooter')
  }

  if(data.alarm_type=='relay'){
    this.isHooter=false
    this.isRelay=true
    this.isSensgiz=false
    this.EditCameraForm.get('relayIp').setValue(data.alarm_ip_address?data.alarm_ip_address:'')

    this.EditCameraForm.get('isHooter').setValue('relay')
  }


  if(data.alarm_type=='sensegiz'){
    this.sensgiz=new FormArray([])
    this.SensGizInfo=data.coin_details
    this.isHooter=false
    this.isRelay=false
    this.isSensgiz=true
    if(data.coin_details!=null){

 

    data.coin_details.forEach((value:any,index:number) => {
      
   
    this.sensgiz.push(new FormGroup({
      coinId:new FormControl('',Validators.required),
      coinLocation:new FormControl('',Validators.required),
      presetId:new FormControl('',Validators.required)
    }))


    console.log('value in edit function',value,index)
    this.sensgiz.controls[index].get('coinId').setValue(value.coin_id)
    this.sensgiz.controls[index].get('coinLocation').setValue(value.coin_location)
    this.sensgiz.controls[index].get('presetId').setValue(Number( value.preset_id))


  });
}
      this.EditCameraForm.get('isHooter').setValue('sensegiz')
  }

  // this.AddCameraForm.get('password').setValue(data.password)
  // this.AddCameraForm.get('useraname').setValue(data.camera_name)
  // this.AddCameraForm.get('port').setValue(data.camera_name)




  this.modalService.open(modal,{size:'lg'}).result.then((result) => {
    // this.closeResult = `Closed with: ${result}`;
    //  this.roiNameControl.setValue(null)
    //  this.OnAddingNewROI()
    // this.download = '',
    //   this.isalert = false.
    this.isHooter = false
    this.isRelay = false
    this.isVoiceAlert = false
    console.log('cancel')
    this.sensgiz.reset()
    this.sensgiz=new FormArray([])
    
    this.AddCameraForm.reset()
    this.isFail = false
    this.isSuccess = false
    this.isLoading = false
    // this.newROIPoints.splice(0,this.newROIPoints.length)
    // this.OnAddingNewROI()
  }, (reason) => {
    this.isHooter = false
    this.isRelay = false
    this.isVoiceAlert = false
    console.log('submit')
    this.isLoading = false
    /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // this.download = '',
    //   this.isalert = false
    this.AddCameraForm.reset()
    this.isFail = false
    this.sensgiz.reset()
    this.sensgiz=new FormArray([])
    this.sensgiz.push(new FormGroup({
      coinId:new FormControl('',Validators.required),
      coinLocation:new FormControl('',Validators.required),
      presetId:new FormControl('',Validators.required)
    }))    
    
    this.isSuccess = false

      ;
  }
  )

}



OnEditCameraDetails() {
  // this.AddCameraForm.get('rtsp_url').value?this.removeValidators():''
  this.EditCameraForm.updateValueAndValidity()
  if (true) {  
    this.isLoading = true
    var formData = new FormData()
    this.isFail = false
    this.isSuccess = false
    console.log(this.EditCameraForm.value)
    for (let k in this.EditCameraForm.value) {
      console.log(k, this.EditCameraForm.value[k])
      if (k === 'camera_brand') {
        formData.append(k, this.EditCameraForm.value[k].text)
      }
      else {
        formData.append(k, this.EditCameraForm.value[k])

      }
    }

    // if (this.AddCameraForm.get('rtsp_url').value) {
      console.log('rtsp adding')
      var ai_solution = Array
      console.log(ai_solution)
      if (this.isHooter) {
        var data1: any = {
          id:this.selectedCamera._id.$oid,

          cameraname: this.EditCameraForm.value['cameraname'],
         // camera_brand: this.EditCameraForm.value['camera_brand'][0].text,
          plant: this.EditCameraForm.value['plant'],
          area: this.EditCameraForm.value['area'],
          department:this.EditCameraForm.value['department'],
         // rtsp_url: this.EditCameraForm.value['rtsp_url'],
        //  ai_solution: [],
          alarm_type: 'hooter',
          // coin_details:null,
          alarm_ip_address: this.EditCameraForm.value['hooterIp']

        }
        console.log(data1)
      }
      else if (this.isRelay) {
        var data1: any = {
          id:this.selectedCamera._id.$oid,

          cameraname: this.EditCameraForm.value['cameraname'],
          // camera_brand: this.EditCameraForm.value['camera_brand'][0].text,
          plant: this.EditCameraForm.value['plant'],
          area: this.EditCameraForm.value['area'],
         // rtsp_url: this.EditCameraForm.value['rtsp_url'],
          alarm_type: 'relay',
          alarm_ip_address: this.EditCameraForm.value['relayIp'],
         // ai_solution: [],
          // coin_details:null,
          department:this.EditCameraForm.value['department'],


        }

      }
      //altered
      else if (this.isVoiceAlert) {
        var data1: any = {
          id:this.selectedCamera._id.$oid,

          cameraname: this.EditCameraForm.value['cameraname'],
          // camera_brand: this.EditCameraForm.value['camera_brand'][0].text,
          plant: this.EditCameraForm.value['plant'],
          area: this.EditCameraForm.value['area'],
          // rtsp_url: this.EditCameraForm.value['rtsp_url'],
          alarm_type: 'voiceAlert',
          // coin_details:null,
          department:this.EditCameraForm.value['department'],

          alarm_ip_address: this.EditCameraForm.value['voiceLanguage'],
        //  ai_solution: []

        }
      }
      else if (this.isSensgiz) {
        var data1: any = {
          id:this.selectedCamera._id.$oid,

          cameraname: this.EditCameraForm.value['cameraname'],
          // camera_brand: this.EditCameraForm.value['camera_brand'][0].text,
          plant: this.EditCameraForm.value['plant'],
          area: this.EditCameraForm.value['area'],
         // rtsp_url: this.EditCameraForm.value['rtsp_url'],
          department:this.EditCameraForm.value['department'],

          alarm_type: 'sensegiz',
          // alarm_type: null,
          // alarm_ip_address: '',
          coin_details:this.SensGizInfo,
          // alarm_ip_address: this.AddCameraForm.value['voiceLanguage'],
         // ai_solution: []

        }
      }
      else {
        var data1: any = {
          id:this.selectedCamera._id.$oid,

          cameraname: this.EditCameraForm.value['cameraname'],
          // camera_brand: this.AddCameraForm.value['camera_brand'][0].text,
          plant: this.EditCameraForm.value['plant'],
          area: this.EditCameraForm.value['area'],
          //rtsp_url: this.AddCameraForm.value['rtsp_url'],
          ai_solution: [],
          alarm_type: null,
          coin_details:null,
          department:this.EditCameraForm.value['department'],

          alarm_ip_address: null,


        }
      }
      // this.AddCameraForm.removeControl('username')
      // this.AddCameraForm.removeControl('password')
      // this.AddCameraForm.removeControl('cameraip')
      // this.AddCameraForm.removeControl('port')
      this.server.EditCamera(data1).subscribe((response: any) => {
        console.log(response)
        // this.AddCameraForm.addControl('username', new FormControl('', Validators.required))
        // this.AddCameraForm.addControl('password', new FormControl('', Validators.required))
        // this.AddCameraForm.addControl('cameraip', new FormControl('', Validators.required))
        // this.AddCameraForm.addControl('port', new FormControl('', Validators.required))

        if (response.success) {
          this.isLoading = false
          this.isSuccess = true

          this.responseMessage = response.message

          this.isHooter = false
          this.isRelay = false
          this.server.notification(response.message)
          setTimeout(() => {
            this.modalService.dismissAll()

          }, 500);
          this.GetCameraList()
        }
        else {
          this.isLoading = false
          this.responseMessage = response.message
          this.isFail = true
          //this.AddCameraForm.reset()
        }
      },
        Err => {
          this.isFail = true
          this.responseMessage = "Error while adding camera,retry"
          this.isLoading = false
          // this.AddCameraForm.reset()
        })


    // }

      }

    }


    StartSensgizApp(){
      this.server.ConfigRtsp(this.AppConfig).subscribe((res: any) => {
        if (res.success) {
      this.server.StartSmartApp().subscribe((response:any)=>{
        this.server.notification(response.message)
        if(response.success){
          this.isActive2=true
          this.modalService.dismissAll()

        }
      },
      Err=>{
        this.server.notification('Something Went Wrong','Retry')
      })}
    else{
      this.server.notification(res.message)
    }
  },
  Err=>{
    this.server.notification('Error while Setting the flag','Retry')
  })
    }

    StopSensgizApp(){
      this.server.StopSmartApp().subscribe((response:any)=>{
        this.server.notification(response.message)
        if(response.success){
          this.isActive2=false
          this.modalService.dismissAll()
        }

      },
      Err=>{
        this.server.notification('Something Went Wrong','Retry')
      })
    }

GetCameraSampleSheet(){
   this.server.getCameraExcelSample().subscribe((response:any)=>{
    // var blob=new Blob([response.body],{type:'.xlsx'})
    // var fileName="Camera_Ref_Excel_Sheet.xlsx"
    // var file= new File([blob],fileName,{type:'xlsx'})
    const contentDispositionHeader = response.headers.get('content-disposition');
    console.log(response.headers)
    const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = fileNameRegex.exec(contentDispositionHeader);
    const fileName = matches && matches.length > 1 ? matches[1] : 'Add_camera_excel.xlsx';
    
    saveAs(response.body,fileName)
  },
  Err=>{
    console.log(Err)
    this.server.notification('Error while Downloading the Sheet','Retry')
  })
}
 
NextControl(el:any){
console.log(el)}


ViewSenseInfo(data:any,modal:any){
  this.selectedSense=data.coin_details
  this.modalService.open(modal,{centered:true})
}
  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }
}
