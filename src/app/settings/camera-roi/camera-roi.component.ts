import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config, observable, Observable, of, Subject } from 'rxjs';
import { ServerService } from 'src/app/Services/server.service';
//import { Canvas, IEvent, Polygon, Rect } from 'fabric/fabric-impl';
import { v4 as uuid, validate } from 'uuid'
import { arrow, bottom, right } from '@popperjs/core';
//import { fabric } from 'fabric' 
import 'fabric'
//import { CustomFabricPolygon, CustomFabricRect } from '../../common/models.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckboxControlValueAccessor, CheckboxRequiredValidator, FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RoiSettingsComponent } from 'src/app/features/roi-settings/roi-settings.component';
declare const fabric: any
export interface polygonPoints {
  x: number,
  y: number
}

export interface ROI {
  roi_name_canvas?: any,
  roi_data?: any,
  roi_id?: string,
  roi_name?: string,
  class_id?: any[]
  roi_canvas?: any
}
@Component({
  selector: 'app-camera-roi',
  templateUrl: './camera-roi.component.html',
  styleUrls: ['./camera-roi.component.css']
})

export class CameraRoiComponent implements OnInit, AfterViewInit, OnDestroy {
  cameraData: any = {}
  CameraDataObservable: Observable<any> = of({})
  ID: string
  IP: string
  isCameraData: boolean = false
  canvas: any
  ROIsRoiPoints: any[] = []
  newROIPoints: polygonPoints[] = []
  imageName: string
  isAddROI: boolean = false
  CcRois: any[] = []
  newPt: any
  newROI: any
  isPolygonDrawn: boolean = false
  isEdit: boolean = false
  isLock1: boolean = false
  isTag: boolean = false
  isLock2: boolean = false
  isRackWindow: boolean = false
  AllROIs: {}[] = []
  rectangle: any
  TCData: any[] = []
  tempData: any[] = []
  allCameraData: ROI[] = []
  isEditText: boolean = false
  selectedId: number
  selectedEditId: number
  ppeConfig: any = { helmet: false, vest: false }
  isLoading: boolean = false
  personCrowdConfig: any
  vehicleCrowdConfig: any
  isChanges: boolean = false
  deleteID: number
  trafficCountLineROIS: any[] = []
  trafficCountData: any[] = []
  tempTCData: any[] = []
  tempTCLineROIS: any[] = []
  TCCanvasData: any[] = []
  TCLineList: any[] = []
  isAddCC: boolean = false
  tempTCCanvas: any[] = []
  ppeObjects: any[] = []
  raObjects: any[] = []
  ccObjects: any[] = []
  ppeAlarmObjects: any[] = []
  raAlarmObjects: any[] = []
  CCValid: number = 0
  CCpoints: any[] = []
  CCClasses: any[] = []
  AISolutions: any[] = []

  CCObjectCounts: any[] = []
  CCObjectsCount: any[] = []
  fireAndSmoke = {
    fire: false,
    smoke: false,
  }

  ccObjectsMinMax: any[] = [new FormGroup({
    object: new FormControl('person'),
    person: new FormControl(true, Validators.requiredTrue),
    min: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/)),
    max: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/))
  }), new FormGroup({
    object: new FormControl('car'),
    car: new FormControl(false, Validators.requiredTrue),
    min: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/)),
    max: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/))
  }),
  new FormGroup({
    object: new FormControl('truck'),
    truck: new FormControl(false, Validators.requiredTrue),
    min: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/)),
    max: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/))
  }),

  new FormGroup({
    object: new FormControl('bike'),
    bike: new FormControl(false, Validators.requiredTrue),
    min: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/)),
    max: new FormControl(0, Validators.pattern(/^[^-\D]\d*$/))

  }),
  ]



  alarmPPEObjects: FormGroup = new FormGroup({
    helemet: new FormControl(Validators.requiredTrue),
    vest: new FormControl(Validators.requiredTrue)
  })
  alarmRAObjects: FormGroup = new FormGroup({
    person: new FormControl(Validators.requiredTrue),
    car: new FormControl(Validators.requiredTrue),
    truck: new FormControl(Validators.requiredTrue),
    bike: new FormControl(Validators.requiredTrue),




  })
  crowdCountRoiName: FormControl = new FormControl('', Validators.required)
  @ViewChild('roiInfo') infoModal: ElementRef<any>
  @ViewChild('crowdCount') CCNameModal: ElementRef<any>
  @ViewChild('CCNameChangeModal') CCNameChangeModal: ElementRef<any>
  crowdConfig: any[] = []
  tcName: FormControl = new FormControl('', Validators.required)
  TrafficConfig: any
  isTCRoi: any


  peopleCrowdForm: FormGroup = new FormGroup(
    {
      min: new FormControl(null, Validators.pattern('^(?!-)\d+$')),
      max: new FormControl(null, Validators.pattern(/\d+/))
    }
  )
  CrowdForm: FormGroup = new FormGroup(
    {
      min: new FormControl(null, [Validators.pattern(/^[^-a-zA-Z]+$/), Validators.required]),
      max: new FormControl(null, [Validators.pattern(/\d+/), Validators.required])
    }
  )
  vehicleCrowdForm: FormGroup = new FormGroup(
    {
      min: new FormControl(null, Validators.pattern(/\d+/)),
      max: new FormControl(null, Validators.pattern(/\d+/))
    }
  )
  tempROIID: FormControl = new FormControl('', Validators.required)
  ratio: number = 1
  polygonOptions: any = {
    fill: 'rgba(0,0, 0,0)',
    strokeWidth: 3,
    stroke: 'rgb(127, 255, 0)',
    scaleX: 1,
    scaleY: 1,
    objectCaching: false,
    selectable: false,
    transparentCorners: false,
    cornerColor: 'blue'
  }

  classIds: any[] = ['person']
  classIDPerson: FormControl = new FormControl('person', Validators.required)
  classIDCar: FormControl = new FormControl(0, Validators.required)
  classIDBike: FormControl = new FormControl(0, Validators.required)
  classIDTruck: FormControl = new FormControl(0, Validators.required)
  CrowdData: any[] = []
  ppeForm: FormGroup = new FormGroup({
    helmet: new FormControl('helmet'),
    vest: new FormControl('person')
  })

  fireSmokeForm: FormGroup = new FormGroup({
    fire: new FormControl(false, Validators.requiredTrue),
    smoke: new FormControl(false, Validators.requiredTrue),
    water: new FormControl(false, Validators.requiredTrue)
  })
  vehicleForm: FormGroup = new FormGroup({
    type: new FormControl(),
    make: new FormControl()
  })

  roiNameControl: FormControl = new FormControl('', Validators.required)
  roiPoints: any[] = []
  @ViewChild('ROINameChangeModal', { static: false }) ROIChangeModal: TemplateRef<any>
  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef
  @ViewChild('ROINameModal', { static: false }) RoiNameModal: TemplateRef<any>
  @ViewChild('TCNameModal', { static: false }) TCNameModal: TemplateRef<any>
  @ViewChild('ccForFrame', { static: false }) CCForFrame: TemplateRef<any>
  @ViewChild('CCType', { static: false }) CCTYpe: TemplateRef<any>
  //traffic count roi variables
  isMouseDown: boolean = false
  btnIndex: number
  line: any
  activeObj: any
  deltaX: any
  deltaY: any
  triangle: any
  roiType: any = 0
  currentArea: any
  currentPlant: any
  selectedCCType: any
  ccTypeList: any[] = [{ label: '+ Crowd Count Types', items: [{ label: 'ROI', command: (onclick: any) => { console.log(onclick), this.AddCCRoi(); } },] }]

  constructor(
    private ActiveRoute: ActivatedRoute,
    private server: ServerService,
    private router: Router,
    private modalService: NgbModal) {
    this.IP = server.IP
    this.ccTypeList[0].items[1] = { label: 'Full Frame', command: (onclick: any) => { console.log(onclick), this.AddCCForFrame() } }
    this.ActiveRoute.queryParams.subscribe((params: any) => {
      console.log(params)
      this.ID = params.id
      this.imageName = params.image
      this.currentArea = params.area
      this.currentPlant = params.plant
      console.log(this.currentArea, this.currentPlant)
      this.server.GetRACameraData(this.ID).subscribe((response: any) => {
        console.log(response.message)
        this.cameraData = response.message
        this.AISolutions = this.cameraData[0].ai_solutions ? this.cameraData[0].ai_solution : []
        console.log(this.AISolutions)
        this.currentArea = response.area
        this.currentPlant = response.plant
        this.CameraDataObservable = of(response.message)
        this.isCameraData = true

        if (this.cameraData[0].ppe_data.length > 0) {
          this.ppeForm.get('helmet').valueChanges.subscribe((value: any) => {
            console.log(value)
          })
          this.ppeConfig = this.cameraData[0].ppe_data[0]
          console.log(this.ppeConfig)
          if (this.cameraData[0].ppe_data[0].helmet) {
            //this.ppeForm.get('helmet').
            this.ppeForm.get('helmet').setValue(true)
            this.ppeForm.get('helmet').markAsUntouched()


          }
          else {
            console.log('ppe not vest')
            this.ppeForm.get('helmet').setValue(false)

            // var temp: any = document.getElementById('helmet')
            // temp.checked = false

          }
          if (this.cameraData[0].ppe_data[0].vest) {
            //this.ppeForm.get('helmet').
            // this.ppeForm.get('helmet').markAsUntouched()

            this.ppeForm.get('vest').setValue(true)

          }
          else {
            console.log('ppe not vest')
            this.ppeForm.get('vest').setValue(false)


            // var temp: any = document.getElementById('vest')
            // temp.checked = false

          }
        }
        else {
          console.log('ppe not vest')

          this.ppeForm.get('vest').setValue(false)
          this.ppeForm.get('helmet').setValue(false)




        }
        //edited
        // if (this.cameraData[0].fire_smoke_data.length > 0) {
        //   this.fireSmokeForm.get('fire').setValue(this.cameraData[0].fire_smoke_data[0].fire)
        //   this.fireSmokeForm.get('smoke').setValue(this.cameraData[0].fire_smoke_data[0].smoke)



        // }
        // else {
        //   console.log('ppe not vest')

        //   this.fireSmokeForm.get('fire').setValue(false)
        //   this.fireSmokeForm.get('smoke').setValue(false)




        // }

        console.log(this.cameraData)

      })


    })
  }

  ngOnInit(): void {
    //  this.canvas.on('mouse:down',(options:any)=>{

    //  })



  }

  ngAfterViewInit(): void {
    this.canvasSetup()
    console.log(document.getElementById('helmet'))
    this.makeNewROI()

    this.ccObjectsMinMax.forEach((form: FormGroup) => {
      form.valueChanges.subscribe(() => {
        if (form.get(form.get('object').value).value && form.get('min').valid && form.get('min').valid) {
          this.CCValid++
        }
        else {
          this.CCValid = 0;
        }

        if (form.get('min').value > form.get('max').value || (form.get('min').value == form.get('max').value)) {
          this.CCValid = 0;
        }

        console.log(this.CCValid)
      })
    })

    console.log(this.allCameraData)
    // this.canvasContainer.nativeElement.
    this.canvas.on('mouse:up', (options: any) => {
      console.log('mouse up', options, options.e.type)
      if (options.e.type === 'mouseup') {
        if (this.roiType == 1 || this.AddCCRoi) {
          if (options.button === 1) {
            if (!((options.transform == null ? false : options.transform.action === 'modifyPolygon' ? false : true)) && !this.isEdit
            ) {
              console.log('polygon  is 1creating')

              this.getClickCoords(options.e);

            }
          }
          if (options.button === 3) {
            if (this.isAddROI || this.isAddCC) {
              if (this.newROIPoints.length < 4) {
                console.log('polygon is  3creating')
                this.isPolygonDrawn = false;
              } else {
                console.log('polygon is  3creating')
                this.isPolygonDrawn = true;
              }
            }

          }
        }
      }

      if (this.roiType == 2 && !this.isAddCC) {
        this.isMouseDown = false
        console.log('traffic count')
        this.SaveTrafficCountROI()

      }
    });

    this.canvas.on('mouse:down', (event: any) => {
      console.log('mouse down')



      if (event.type == 'mousedown') {
        //this.CreateRectangle(event)
        if (this.roiType === 1 || this.isAddCC) {
          if (this.isAddROI || this.isAddCC
          ) {
            if (event.button === 3) {
              if (this.newROIPoints.length < 3) {
                this.isPolygonDrawn = false;
              } else {
                //this.makePolygon();
                //this.OnAddingNewROI()
                this.roiNameControl.markAsUntouched()
                this.RoiName()
                this.isPolygonDrawn = true;

              }

            }
          }
        }
        else if (this.roiType === 2) {
          if ((event.transform == null ? true : event.transform.action === 'drag' ? false : true)) {
            this.addingShapeOnMouseDown(event)
          }

        }

        this.canvas.on('mouse:move', (options: any) => {
          // this.createRect2(options)
          this.creatingShapeOnMouseMove(options)
        })

        this.canvas.on('touch:orientation', (options: any) => {
          // this.createRect2(options)
          console.log(options, "touch events")
          // this.creatingShapeOnMouseMove(options)
        })
        this.canvas.on('touch:drag', (event: any) => {
          // Handle touch drag event
          console.log('Touch drag event:', event);
        });

        const context = this.canvas.getContext("2d");
        console.log(context, 'context')
      }
      })




    this.canvas.on('object:moving', (options: any) => {
      console.log(options)
      // this.Modify()
    })


    //toouch events
    var cContainer:any = document.getElementById('canvas-container')
    cContainer=cContainer.getContext("2d")
    cContainer.addEventListener("touchstart", (options: any) => {
      console.log("touch start", options)
      console.log(options)
      if (this.roiType == 1 || this.AddCCRoi) {
        if (!this.isEdit
        ) {
          console.log('polygon  is 1creating')

          this.getClickCoords(options);

        }

        if (this.isAddROI || this.isAddCC) {
          if (this.newROIPoints.length < 4) {
            console.log('polygon is  3creating')
            this.isPolygonDrawn = false;
          } else {
            console.log('polygon is  3creating')
            this.isPolygonDrawn = true;
          }
        }


      }
      else if (this.roiType === 2) {

        this.addingShapeOnMouseDown(event)


      }




    }, false);
    cContainer.addEventListener("touchmove", () => { console.log("touch move") }, false);
    cContainer.addEventListener("touchcancel", () => { console.log("touch cancel") }, false);
    cContainer.addEventListener("touchend", (options: any) => {

      // console.log("touch end")
      // if (this.roiType == 1 || this.AddCCRoi) {
      //   if (!this.isEdit
      //   ) {
      //     console.log('polygon  is 1creating on mobile')

      //     this.getClickCoords(options);

      //   }

      //   if (this.isAddROI || this.isAddCC) {
      //     if (this.newROIPoints.length < 4) {
      //       console.log('touch 1')
      //       this.isPolygonDrawn = false;
      //     } else {
      //       console.log('touch2')
      //       this.isPolygonDrawn = true;
      //     }
      //   }


      // }
      // else if (this.roiType === 2) {

      //   this.addingShapeOnMouseDown(event)


      // }
    },
      false);

  }
  canvasSetup() {
    var cContainer = document.getElementById('canvas-container')
    console.log(cContainer, 'canvas')
    this.canvas = new fabric.Canvas('canvasROI', { fireRightClick: true })
    console.log(this.canvas)
    this.canvas.selection = false
    this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    this.canvas.setWidth(cContainer.clientWidth)
    // console.log(this.canvasContainer.clientx)
    // this.canvas.setWidth(img.width)
    fabric.Image.fromURL(this.IP + '/get_roi_image/' + this.imageName, (img: any) => {
      console.log(img.width)
      console.log(img.height)
      this.canvas.setWidth(img.width)

      //var newHeight= this.CalculateAspectRatio(img.width,img.height,cContainer.clientWidth)
      this.canvas.setHeight(img.height)
      //  this.canvas.setHeight(newHeight)


      // console.log(img.height)
      // scale image down, and flip it, before adding it onto canvas
      //img.scale(0.5)
      this.canvas.setBackgroundImage(img, this.canvas.requestRenderAll.bind(this.canvas), {
        scaleX: this.canvas.width / img.width,
        scaleY: this.canvas.height / img.height
      });

      // this.canvas.renderAll()
      // console.log(this.canvas.height)
      // console.log(this.canvas.width)
      //this.canvas.add(oImg);
    });
    this.cameraData.length > 0 ? this.cameraData[0].roi_data !== null ? this.GetPanelPoints() : '' : ''

  }


  RoiName() {
    this.isPolygonDrawn = true
    this.isAddROI = false
    this.classIds = ['person']
    if (this.isAddCC) {

      this.modalService.open(this.CCNameModal).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
        //  this.roiNameControl.setValue(null)
        //  this.OnAddingNewROI()
        // this.download = '',
        //   this.isalert = false
        console.log('cancel')
        this.roiNameControl.setValue(null)
        this.roiNameControl.reset()
        this.CrowdForm.get('min').reset()
        this.newROIPoints.splice(0, this.newROIPoints.length)

        this.CrowdForm.get("min").setValidators(Validators.required)
        this.CrowdForm.get('min').setValidators(Validators.pattern(/^[^-a-zA-Z]+$/))

        this.CrowdForm.get('max').reset()

        this.CrowdForm.get("max").setValidators(Validators.required)
        this.CrowdForm.get('max').setValidators(Validators.pattern(/^[^-a-zA-Z]+$/))

        this.roiNameControl.addValidators(Validators.required)
        console.log(this.roiNameControl.value)
        this.classIds = ['person']
        this.DeleteNewRoi()
        // this.newROIPoints.splice(0,this.newROIPoints.length)
        // this.OnAddingNewROI()
      }, (reason) => {
        console.log('submit')

        /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // this.download = '',
        //   this.isalert = false
        this.CrowdForm.get('min').reset()
        this.CrowdForm.get("min").setValidators(Validators.required)
        this.CrowdForm.get('min').setValidators(Validators.pattern(/\d+/))

        this.CrowdForm.get('max').reset()

        this.CrowdForm.get("max").setValidators(Validators.required)
        this.CrowdForm.get('max').setValidators(Validators.pattern(/\d+/))

          ;
      }
      )
    }
    else {
      this.modalService.open(this.RoiNameModal, { size: 'small', centered: true, backdrop: 'static' }).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
        //  this.roiNameControl.setValue(null)
        //  this.OnAddingNewROI()
        // this.download = '',
        //   this.isalert = false
        console.log('cancel')
        this.roiNameControl.setValue(null)
        this.roiNameControl.reset()
        this.roiNameControl.addValidators(Validators.required)
        console.log(this.roiNameControl.value)
        this.classIds = ['person']
        this.DeleteNewRoi()
        // this.newROIPoints.splice(0,this.newROIPoints.length)
        // this.OnAddingNewROI()
      }, (reason) => {
        console.log('submit')

          /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          // this.download = '',
          //   this.isalert = false

          ;
      }
      )
    }
  }

  ModalOpen(modal: any) {
    console.log('full frame')
    this.modalService.open(modal, { backdrop: 'static', keyboard: true })
  }

  onCCTypeSelect(event: any) {
    console.log(event)
    console.log('crowd count select')
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  nameSubmit() {
    this.modalService.dismissAll()
    console.log('name submit')
    this.OnAddingNewROI()
  }


  getClickCoords(event: any) {
    console.log(event)
    if (this.isAddROI) {
      this.newPt = {
        x: Math.round(event.pointer.X),
        y: Math.round(event.pointer.Y)
      };
      this.newROIPoints.push(this.newPt);
      console.log(this.newPt, this.newROIPoints)

      // console.log(this.newROI)
      this.canvas.add(this.newROI);

      // console.log(this.points)
      // if (this.points.length > 3) {
      //   this.isPolygonDrawn = true;
      // }
    }
  }


  Back() {
    // this.router.navigate(['app/CameraSettings'])
    window.close()

  }

  makeNewROI() {
    this.newROI = new fabric.Polygon(this.newROIPoints, this.polygonOptions)

  }


  AddNewROI() {
    this.classIds = ['person']
    this.polygonOptions.stroke = 'rgb(127, 255, 0)'
    this.newROI.stroke = 'rgb(127, 255, 0)'

    this.isAddROI = true
    this.isEdit = false
    this.roiType = 1
    this.newROIPoints.splice(0, this.newROIPoints.length)
    this.canvas.requestRenderAll()
    this.isAddCC = false

  }

  AddNewLine() {
    this.classIds = ['person']

    this.roiType = 2
    this.btnIndex = 1
    this.isEdit = false
    this.isAddROI = false
    this.isAddCC = false
    this.newROIPoints.splice(0, this.newROIPoints.length)
  }
  AddNewArrow() {
    this.classIds = ['person']

    this.roiType = 2
    this.btnIndex = 2
    this.isEdit = false
  }



  AddCCRoi() {
    console.log('addcc')
    this.newROIPoints.splice(0, this.newROIPoints.length)
    this.isAddCC = true
    this.isAddROI = true
    this.isEdit = false
    this.roiType = 1
    this.CrowdForm.get('min').reset()
    this.CrowdForm.get("min").setValidators(Validators.required)
    this.CrowdForm.get('min').setValidators(Validators.pattern(/\d+/))

    this.CrowdForm.get('max').reset()

    this.CrowdForm.get("max").setValidators(Validators.required)
    this.CrowdForm.get('max').setValidators(Validators.pattern(/\d+/))
    this.newROI.stroke = 'rgb(0, 255, 255)'

  }

  AddCCForFrame() {
    // var ele:HTMLElement=document.getElementById('ccWholeFrame')
    // if(ele!=null){
    //   ele.style.display='block'
    // }

    console.log('add cc for frame')
    this.modalService.open(this.CCForFrame).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      //  this.roiNameControl.setValue(null)
      //  this.OnAddingNewROI()
      // this.download = '',
      //   this.isalert = false
      console.log('cancel')
      this.roiNameControl.setValue(null)
      this.roiNameControl.reset()
      this.roiNameControl.addValidators(Validators.required)
      console.log(this.roiNameControl.value)
      this.classIds = ['person']
      this.DeleteNewRoi()
      // this.newROIPoints.splice(0,this.newROIPoints.length)
      // this.OnAddingNewROI()
    }, (reason) => {
      console.log('submit')

        /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // this.download = '',
        //   this.isalert = false

        ;
    }
    )






  }
  onSaveCCFrame() {
    this.isAddROI = false
    this.CCClasses = []
    this.CCObjectCounts = []
    this.ccObjectsMinMax.forEach((form: FormGroup) => {
      if (form.get(form.get('object').value).value) {
        var obj = { class_name: form.get('object').value, min_count: form.get('min').value, max_count: form.get('max').value }
        //this.CCClasses.push(form.get('object').value)
        this.CCObjectCounts.push(obj)


      }
      form.get(form.get('object').value).reset()
      form.get('min').markAsUntouched()
      form.get('min').setValue(0)

      form.get('max').reset()
      form.get('max').reset()

      //  form.get('object').reset()

    })

    var tempObj: any = {
      roi_name_canvas: null,
      roi_canvas: null,
      roi_id: null,
      roi_name: null,
      cr_data: { bb_box: '', full_frame: true, roi_id: null, area_name: '', data_object: this.CCObjectCounts }
    }
    this.CcRois.push(tempObj)
    // this.CameraData[0].ROI_data.push(tempObj.ROI_data)
    this.CrowdForm.get('min').reset()
    this.CrowdForm.get('max').reset()

    this.newROIPoints.splice(0, this.newROIPoints.length)

    this.classIDPerson.reset()
    this.classIDBike.reset()
    this.classIDCar.reset()
    this.classIDPerson.setValue('person')
    this.classIds = ['person']
    this.CrowdForm.get('min').reset()
    this.CrowdForm.get("min").setValidators(Validators.required)
    this.CrowdForm.get('min').setValidators(Validators.pattern(/\d+/))

    this.CrowdForm.get('max').reset()

    this.CrowdForm.get("max").setValidators(Validators.required)
    this.CrowdForm.get('max').setValidators(Validators.pattern(/\d+/))
    this.modalService.dismissAll()
    this.AddCCData()

  }


  OnAddingNewROI() {
    this.isAddROI = false
    if (this.roiNameControl.value !== null) {
      fabric.util.resetObjectTransform(this.newROI)
      var roi_points: any[] = []
      const tempPoints = [...this.newROIPoints]
      console.log(tempPoints)
      this.polygonOptions.stroke = 'rgb(127, 255, 0)'
      var dimensions = this.newROI._calcDimensions()
      const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions)
      console.log(currentROI)
      var ROIName = this.roiNameControl.value
      if (ROIName !== null) {
        console.log(ROIName)
        this.isChanges = true
        this.canvas.add(currentROI)
        this.canvas.renderAll()
        console.log(this.newROI)
        for (let i = 0; i < this.newROIPoints.length; i++) {

          let tempX = (this.newROIPoints[i].x)

          let tempY = (this.newROIPoints[i].y)
          roi_points.push(`${tempX};${tempY};`)
        }
        //to remove the ,
        var comma = /,/g
        var roiPointsString = roi_points.toString().replace(comma, '')
        console.log(roiPointsString)
        var ROINameObject = new fabric.Text(ROIName, {
          fontSize: 20,
          // bottom:5
          backgroundColor: 'black',

          selectable: false,
          left: dimensions.left,
          top: dimensions.top - 20,
          stroke: 'rgb(127, 255, 0)',
          fill: 'rgb(127, 255, 0)',
        });
        console.log(ROINameObject)
        this.canvas.add(ROINameObject)
        this.canvas.renderAll()

        var tempObj: any = {
          roi_name_canvas: ROINameObject,
          roi_canvas: currentROI,
          // roi_id: ROIName,need to check this one
          roi_name: ROIName,
          roi_id: this.allCameraData.length - 1,
          roi_data: { bb_box: roiPointsString, roi_name: ROIName, roi_id: this.allCameraData.length - 1, label_name: this.classIds }
        }
      }
      console.log(roiPointsString)
      // this.CameraData[0].ROI_data.push(tempObj.ROI_data)

      this.allCameraData.push(tempObj)

      console.log(this.allCameraData)
      this.newROIPoints.splice(0, this.newROIPoints.length)
      this.roiNameControl.setValue(null)
      this.roiNameControl.reset()
      this.roiNameControl.setValidators(Validators.required)
      this.classIDPerson.reset()
      this.classIDBike.reset()
      this.classIDCar.reset()
      this.classIDPerson.setValue('person')
      this.classIds = ['person']

      this.SaveChanges()

    }
    else {
      // this.newROIPoints.splice(0, this.newROIPoints.length) 
      // this.canvas.renderAll()
      console.log('elsepart')
      this.classIds = ['person']

      this.DeleteNewRoi()
    }
  }

  OnAddingNewCCRoi() {
    this.CCClasses = []
    this.CCObjectCounts = []
    this.isAddROI = false

    if (this.crowdCountRoiName.value !== null) {
      fabric.util.resetObjectTransform(this.newROI)
      var roi_points: any[] = []
      const tempPoints = [...this.newROIPoints]
      console.log(tempPoints)
      var dimensions = this.newROI._calcDimensions()
      this.polygonOptions.stroke = 'rgb(0, 255, 255)'
      const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions)
      console.log(currentROI)
      var ccName = this.crowdCountRoiName.value
      if (ccName !== null) {
        console.log(ccName)
        this.isChanges = true
        this.canvas.add(currentROI)
        this.canvas.renderAll()
        console.log(this.newROI)
        for (let i = 0; i < this.newROIPoints.length; i++) {

          let tempX = (Math.round(this.newROIPoints[i].x))

          let tempY = Math.round((this.newROIPoints[i].y))
          roi_points.push(`${tempX};${tempY};`)
        }
        //to remove the ,
        var comma = /,/g
        var roiPointsString = roi_points.toString().replace(comma, '')
        console.log(roiPointsString)
        var ROINameObject = new fabric.Text(ccName, {
          fontSize: 20,
          // bottom:5
          backgroundColor: 'black',

          selectable: false,
          left: dimensions.left,
          top: dimensions.top - 20,
          stroke: 'rgb(0, 255, 255)',
          fill: 'rgb(0, 255, 255)',
        });
        console.log(ROINameObject)
        this.canvas.add(ROINameObject)
        this.canvas.renderAll()

        this.ccObjectsMinMax.forEach((form: FormGroup) => {
          if (form.get(form.get('object').value).value) {
            var obj = { class_name: form.get('object').value, min_count: form.get('min').value, max_count: form.get('max').value }
            //this.CCClasses.push(form.get('object').value)
            this.CCObjectCounts.push(obj)


          }
          form.get(form.get('object').value).reset()
          form.get('min').markAsUntouched()
          form.get('min').setValue(0)

          form.get('max').reset()
          form.get('max').reset()

          //  form.get('object').reset()

        })

        console.log(this.CCClasses, this.CCObjectCounts)

        var tempObj = {
          roi_name_canvas: ROINameObject,
          roi_canvas: currentROI,
          roi_id: ccName,
          roi_name: ccName,
          cr_data: { bb_box: roiPointsString, full_frame: false, roi_id: this.CcRois.length, area_name: ccName, data_object: this.CCObjectCounts }
        }
      }
      console.log(tempObj)
      // this.CameraData[0].ROI_data.push(tempObj.ROI_data)

      this.CcRois.push(tempObj)
      this.modalService.dismissAll()
      this.AddCCData()
      console.log(this.allCameraData)
      this.newROIPoints.splice(0, this.newROIPoints.length)
      this.crowdCountRoiName.setValue(null)
      this.CrowdForm.get('min').reset()

      this.CrowdForm.get("min").setValidators(Validators.required)
      this.CrowdForm.get('min').setValidators(Validators.pattern(/\d+/))

      this.CrowdForm.get('max').reset()

      this.CrowdForm.get("max").setValidators(Validators.required)
      this.CrowdForm.get('max').setValidators(Validators.pattern(/\d+/))
      this.classIds = ['person']
      console.log('cc rois', this.CcRois)

    }
    else {
      // this.newROIPoints.splice(0, this.newROIPoints.length) 
      // this.canvas.renderAll()
      console.log('elsepart')
      this.classIds = ['person']

      this.DeleteNewRoi()
      this.CrowdForm.get('min').reset()
      this.CrowdForm.get('max').reset()
    }

  }

  OnAddingNewRw() {


    this.isAddROI = false
    if (this.roiNameControl.value !== null) {
      fabric.util.resetObjectTransform(this.newROI)
      var roi_points: any[] = []
      const tempPoints = [...this.newROIPoints]
      console.log(tempPoints)
      var dimensions = this.newROI._calcDimensions()
      const currentROI = new fabric.Polygon(tempPoints, this.polygonOptions)
      console.log(currentROI)
      var ROIName = this.roiNameControl.value
      if (ROIName !== null) {
        console.log(ROIName)
        this.isChanges = true
        this.canvas.add(currentROI)
        this.canvas.renderAll()
        console.log(this.newROI)
        for (let i = 0; i < this.newROIPoints.length; i++) {

          let tempX = (this.newROIPoints[i].x)

          let tempY = (this.newROIPoints[i].y)
          roi_points.push(`${tempX};${tempY};`)
        }
        //to remove the ,
        var comma = /,/g
        var roiPointsString = roi_points.toString().replace(comma, '')
        console.log(roiPointsString)
        var ROINameObject = new fabric.Text(ROIName, {
          fontSize: 20,
          // bottom:5
          backgroundColor: 'black',

          selectable: false,
          left: dimensions.left,
          top: dimensions.top - 20,
          stroke: 'rgb(127, 255, 0)',
          fill: 'rgb(127, 255, 0)',
        });
        console.log(ROINameObject)
        this.canvas.add(ROINameObject)
        this.canvas.renderAll()

        var tempObj = {
          roi_name_canvas: ROINameObject,
          roi_canvas: currentROI,
          roi_id: ROIName,
          roi_name: ROIName,
          roi_data: { bb_box: roiPointsString, roi_name: ROIName, class_id: this.classIds }
        }
      }
      console.log(roiPointsString)
      // this.CameraData[0].ROI_data.push(tempObj.ROI_data)

      this.allCameraData.push(tempObj)

      console.log(this.allCameraData)
      this.newROIPoints.splice(0, this.newROIPoints.length)
      this.roiNameControl.setValue(null)
      this.classIds = ['person']

    }
    else {
      // this.newROIPoints.splice(0, this.newROIPoints.length) 
      // this.canvas.renderAll()
      console.log('elsepart')
      this.classIds = ['person']

      this.DeleteNewRoi()
    }

  }


  CreateRectangle(e: any) {
    console.log(e.e)
    var pointer = this.canvas.getPointer(e.e)
    var orgX = e.pointer.x
    var orgY = e.pointer.y
    this.rectangle = new fabric.Rect({ left: orgX, top: orgY, width: pointer.x - orgX, height: pointer.y - orgY, stroke: 'red', type: 'rect', strokeWidth: 2 })
    this.canvas.add(this.rectangle)
    if (orgX > pointer.x) {
      this.rectangle.set({ left: Math.abs(pointer.x) });
    }
    if (orgY > pointer.y) {
      this.rectangle.set({ top: Math.abs(pointer.y) });
    }

    this.rectangle.set({ width: Math.abs(orgX - pointer.x) });
    this.rectangle.set({ height: Math.abs(orgY - pointer.y) })

    this.canvas.renderAll()
  }

  createRect2(e: any) {
    var pointer = this.canvas.getPointer(e.e)
    var orgX = e.pointer.x
    var orgY = e.pointer.y
    if (e.button === 1) {
      if (orgX > pointer.x) {
        this.rectangle.set({ left: Math.abs(pointer.x) });
      }
      if (orgY > pointer.y) {
        this.rectangle.set({ top: Math.abs(pointer.y) });
      }

      this.rectangle.set({ width: Math.abs(orgX - pointer.x) });
      this.rectangle.set({ height: Math.abs(orgY - pointer.y) })
      this.canvas.renderAll()
    }
  }

  public Edit(i: number) {
    this.selectedEditId = i
    var canvasObject = this.allCameraData[i].roi_canvas
    this.isEdit = true
    if (this.isEdit) {

      //var polygonPositionHandler=
      var anchorWrapper = (anchorIndex: any, fn: any) => {
        return (eventData: any, transform: any, x: any, y: any) => {
          var fabricObject = transform.target,
            absolutePoint = fabric.util.transformPoint(
              new fabric.Point(
                fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
                fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y
              ),
              fabricObject.calcTransformMatrix()
            ),
            actionPerformed = fn(eventData, transform, x, y),
            newDim = fabricObject._setPositionDimensions({}),
            polygonBaseSize = fabricObject._getNonTransformedDimensions(),
            newX =
              (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) /
              polygonBaseSize.x,
            newY =
              (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) /
              polygonBaseSize.y;
          fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
          return actionPerformed;
        };
      }
      var actionHandler = (eventData: any, transform: any, x: number, y: number) => {
        console.log(eventData)
        var polygon = transform.target,
          currentControl = polygon.controls[polygon.__corner],
          mouseLocalPosition = polygon.toLocalPoint(
            new fabric.Point(x, y),
            'center',
            'center'
          ),
          polygonBaseSize = polygon._getNonTransformedDimensions(),
          size = polygon._getTransformedDimensions(0, 0),
          finalPointPosition = {
            x:
              (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
              polygon.pathOffset.x,
            y:
              (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
              polygon.pathOffset.y
          };
        polygon.points[currentControl.pointIndex] = finalPointPosition;
        console.log(polygon.points)
        return true;
      }

      let poly = canvasObject
      console.log(poly)
      this.canvas.setActiveObject(this.allCameraData[i].roi_canvas);
      poly = this.canvas.getActiveObject()
      // console.log(poly.edit)
      // poly.edit = !poly.edit;
      if (true) {
        console.log('poly first')
        let lastControl = poly.points.length - 1;
        poly.cornerStyle = 'circle';
        poly.cornerColor = 'rgba(0,0,255,0.5)';
        poly.controls = poly.points.reduce((acc: any, point: number, index: number) => {
          // this.pointIndex=index
          // console.log(this.pointIndex)
          acc['p' + index] = new fabric['Control']({
            pointIndex: index,
            positionHandler: (dim: any, finalMatrix: any, fabricObject: any) => {

              // fabricObject.points=points
              console.log(fabricObject)
              let x =
                fabricObject.points[index].x - fabricObject.pathOffset.x,
                y = fabricObject.points[index].y - fabricObject.pathOffset.y;
              return fabric.util.transformPoint(
                new fabric.Point(x, y),
                fabric.util.multiplyTransformMatrices(
                  fabricObject.canvas.viewportTransform,
                  fabricObject.calcTransformMatrix()
                )
              );
            },
            actionHandler: anchorWrapper(
              index > 0 ? index - 1 : lastControl,
              actionHandler
            ),
            actionName: 'modifyPolygon'
          });
          console.log(acc)
          return acc;
        }, {});
      }
      console.log(new fabric['Control'])
      // poly.hasBorders = !poly.edit;
      this.canvas.renderAll();
    }
  }

  EditROI(id: string) {
    console.log(id)
    this.isChanges = true
    var currentObject: any = this.allCameraData.filter((ROI: any) => {
      return ROI.roi_id === id ? ROI.roi_canvas : ''
    })
    var currentPolygon = currentObject[0].roi_canvas
    console.log(currentPolygon)

    //this.Edit(currentPolygon)
    console.log(this.allCameraData)
  }

  isDelete(i: number, modal: any) {
    this.deleteID = i
    this.modalService.open(modal, { centered: true, backdrop: 'static' })
  }


  // delete ra roi
  DeleteROI() {
    var id = this.deleteID
    //var confirmDelete=confirm('Do you want to delete this ROI?')
    if (true) {
      var tempRoiCanvas = this.allCameraData[id].roi_canvas
      var tempTextCanvas = this.allCameraData[id].roi_name_canvas
      this.canvas.remove(tempRoiCanvas)
      this.canvas.remove(tempTextCanvas)
      var roi = this.allCameraData[id]
      var roi_id = roi.roi_data.roi_id
      console.log(roi_id)
      this.allCameraData.splice(id, 1)
      this.cameraData[0].roi_data.splice(id, 1)
      var data = {
        id: this.ID,
        roi_id: String(roi_id),
        ai_solutions: ['RA']
      }
      this.server.DeleteRoi(data).subscribe((data: any) => {
        this.server.notification(data.message)
        console.log(data)
        this.modalService.dismissAll()
      },
        Err => {
          this.modalService.dismissAll()
          this.server.notification('Something went wrong', 'Retry')
        })
      this.canvas.renderAll()
    }

  }

  //delete roi in backend 
  DeleteCCROI() {
    var id = this.deleteID
    //var confirmDelete=confirm('Do you want to delete this ROI?')
    if (true) {
      var tempRoiCanvas = this.CcRois[id].roi_canvas
      var tempTextCanvas = this.CcRois[id].roi_name_canvas
      this.canvas.remove(tempRoiCanvas)
      this.canvas.remove(tempTextCanvas)
      var roi = this.CcRois[id]
      var roi_id = roi.cr_data.roi_id
      console.log(roi_id)
      this.CcRois.splice(id, 1)
      this.cameraData[0].cr_data.splice(id, 1)
      var data = {
        id: this.ID,
        roi_id: String(roi_id),
        ai_solutions: this.AISolutions
      }
      this.modalService.dismissAll()

      this.server.deleteCCData(data).subscribe((data: any) => {
        this.server.notification(data.message)
        console.log(data)
        this.modalService.dismissAll()
      },
        Err => {
          this.modalService.dismissAll()
          this.server.notification('Something went wrong', 'Retry')
        })
      this.canvas.renderAll()
    }

  }
  AlterROIName(id: number) {
    this.isEditText = !this.isEditText
    this.selectedId = id
    this.selectedEditId = id
    this.tempROIID.setValue(this.allCameraData[id].roi_name)
    this.modalService.open(this.ROIChangeModal, { size: 'small', animation: true, centered: true, backdrop: 'static' })
  }

  ChangeROIName() {
    //this.cameraData[0].roi_data[this.selectedId].roi_id=this.tempROIID
    this.allCameraData[this.selectedId].roi_name = this.tempROIID.value

    this.allCameraData[this.selectedId].roi_name_canvas.text = this.tempROIID.value
    this.allCameraData[this.selectedId].roi_data.roi_name = this.tempROIID.value
    this.canvas.renderAll()
    this.modalService.dismissAll()
    this.SaveEditedRoi()

  }
  ChangeCCName() {
    //this.cameraData[0].roi_data[this.selectedId].roi_id=this.tempROIID
    this.CcRois[this.selectedId].roi_name = this.tempROIID.value

    this.CcRois[this.selectedId].roi_name_canvas.text = this.tempROIID.value
    this.CcRois[this.selectedId].roi_data.roi_name = this.tempROIID.value
    this.canvas.renderAll()
    this.modalService.dismissAll()
    var crowdCountData: any;
    if (this.CcRois.length > 0) {
      crowdCountData = this.CcRois[this.CcRois.length - 1].cr_data
      console.log('crowd data', crowdCountData)
    }
    this.CcRois.length > 0 && this.AISolutions.indexOf('CR') < 0 ? this.AISolutions.push('CR') : ''
    var data = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      cr_data: [crowdCountData]

    }

    console.log(data)
    this.server.AddCrowdCount(data).subscribe((response: any) => {

      console.log(response)


    })
    this.SaveEditedRoi()

  }
  SaveChanges() {
    console.log(this.isLoading = true)
    console.log(this.peopleCrowdForm.get('min').value)
    console.log(this.peopleCrowdForm.get('max').value)
    var crowd_Data: any[] = []
    var crowdCountData: any[] = []
    if (this.CcRois.length > 0) {
      this.CcRois.forEach(element => {
        crowdCountData.push(element.cr_data)

      });
      console.log('crowd data', crowdCountData)
    }
    if (this.peopleCrowdForm.get('min').value || this.peopleCrowdForm.get('max').value) {
      var crowTemp = {
        label_name: 'people',
        min_count: this.peopleCrowdForm.get('min').value ? this.peopleCrowdForm.get('min').value : 0,
        max_count: this.peopleCrowdForm.get('max').value ? this.peopleCrowdForm.get('max').value : 0

      }
      this.crowdConfig.push(crowTemp)
    }
    if (this.vehicleCrowdForm.get('min').value || this.vehicleCrowdForm.get('max').value) {
      var crowTemp = {
        label_name: 'vehicle',
        min_count: this.vehicleCrowdForm.get('min').value ? this.vehicleCrowdForm.get('min').value : 0,
        max_count: this.vehicleCrowdForm.get('max').value ? this.vehicleCrowdForm.get('max').value : 0

      }
      this.crowdConfig.push(crowTemp)
    }
    console.log()
    console.log(this.allCameraData)
    var roiData: any[] = []
    this.allCameraData.forEach((element: any, id: number) => {
      roiData.push({ ...element.roi_data, roi_id: id + 1 })


    });
    console.log(roiData)
    var cameraData: any = {
      id: this.ID,
      ai_solutions: ['RA'],
      imagename: this.imageName,
      roi_data: roiData,
      tc_data: this.trafficCountData,
      ppe_data: [this.ppeConfig],
      cr_data: crowdCountData,
      //edited
      fire_smoke_data: [{
        fire: this.fireSmokeForm.get('fire').value,
        smoke: this.fireSmokeForm.get('smoke').value,
        water: this.fireSmokeForm.get('water').value

      }]


    }


    console.log(cameraData)
    this.server.AddROI(cameraData).subscribe((response: any) => {
      console.log(response)
      this.isLoading = false
      if (response.success) {
        this.server.notification(response.message)
        window.location.reload();

      }
      else {
        this.server.notification(response.message, 'Retry')
      }
    },
      Err => {
        this.isLoading = false
        this.server.notification('Something went wrong', 'Retry')

      })
  }


  AddCCData() {
    this.crowdCountRoiName.reset()
    var crowdCountData: any;
    if (this.CcRois.length > 0) {
      crowdCountData = this.CcRois[this.CcRois.length - 1].cr_data
      console.log('crowd data', crowdCountData)
    }
    this.CcRois.length > 0 && this.AISolutions.indexOf('CR') < 0 ? this.AISolutions.push('CR') : ''
    var data = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      cr_data: [crowdCountData]

    }

    console.log(data)
    this.server.AddCrowdCount(data).subscribe((response: any) => {

      console.log(response)
      if (response.success) {
        this.server.notification(response.message)
        this.RefreshCameraData()

      }
      else {
        this.server.notification(response.message, 'Retry')
        this.canvas.remove(this.CcRois[this.CcRois.length - 1].roi_canvas)
        this.canvas.remove(this.CcRois[this.CcRois.length - 1].roi_name_canvas)
        this.canvas.renderAll()

      }


    }, Err => {
      this.canvas.remove(this.CcRois[this.CcRois.length - 1].roi_canvas)
      this.canvas.remove(this.CcRois[this.CcRois.length - 1].roi_name_canvas)
      this.canvas.renderAll()
      this.server.notification('Something went wrong', 'Retry')
    })

  }

  AddTCData() {
    var tcData: any = []
    if (this.trafficCountData.length > 0) [
      tcData = []
    ]
    this.trafficCountData.length > 0 && this.AISolutions.indexOf('TC') < 0 ? this.AISolutions.push('TC') : ''

    var obj = {
      id: this.ID,
      ai_solutions: this.AISolutions,
      tc_data: [this.trafficCountData[this.trafficCountData.length - 1]]

    }

    this.server.AddTCData(obj).subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.RefreshCameraData()
        this.server.notification(response.message)
      }
      else {
        this.server.notification(response.message)
      }
    }, Err => {
      this.server.notification("Something went wrong", 'Retry')
    })

  }
  savePpeConfig() {
    var roiData: any[] = []
    this.allCameraData.forEach((element: any, id: number) => {
      roiData.push({ ...element.roi_data, roi_id: id + 1 })


    });
    console.log(roiData)
    var cameraData: any = {
      id: this.ID,
      ai_solutions: ['RA', 'PPE'],
      imagename: this.imageName,
      roi_data: roiData,
      tc_data: [],
      ppe_data: [this.ppeConfig],
      cr_data: this.crowdConfig,
      //edited
      fire_smoke_data: [{
        fire: this.fireSmokeForm.get('fire').value,
        smoke: this.fireSmokeForm.get('smoke').value
      }]
    }


    console.log(cameraData)
    this.server.AddROI(cameraData).subscribe((response: any) => {
      console.log(response)
      this.isLoading = false
      if (response.success) {
        this.server.notification(response.message)
      }
      else {
        this.server.notification(response.message, 'Retry')
      }
    },
      Err => {
        this.isLoading = false
        this.server.notification('Something went wrong', 'Retry')

      })

  }
  DeleteNewRoi() {
    this.newROIPoints.splice(0, this.newROIPoints.length)
    this.canvas.renderAll()
    if (this.roiType == 2 || this.btnIndex == 1) {
      this.DeleteNewTCRoi()
    }

  }


  GetPanelPoints() {
    this.cameraData[0].roi_data.forEach((points: any, id: number) => {
      console.log(points)
      //accessing roi points
      var roi_points = points.bb_box.split(';')
      this.raObjects.push(...points.label_name)
      console.log(roi_points)
      var polyGon: any[] = []
      for (let i = 0; i < roi_points.length - 1; i = i + 2) {
        var tempPoint = {
          x: Number(roi_points[i]) * this.ratio,
          y: Number(roi_points[i + 1]) * this.ratio
        }
        polyGon.push(tempPoint)

      }
      var tempObj = {

        roi: polyGon,
        roi_name: points.roi_name
      }
      this.roiPoints.push(tempObj)
      console.log(tempObj)
    });
    this.raObjects = this.RemoveDuplicates(this.raObjects)
    console.log(this.raObjects)

    this.GetCCRoiPoints()

    this.DrawExistPanels()
  }

  GetCCRoiPoints() {
    this.cameraData[0].cr_data.forEach((points: any, id: number) => {
      console.log(points)
      //accessing roi points
      var roi_points = points.bb_box.split(';')
      console.log(roi_points)
      var polyGon: any[] = []
      for (let i = 0; i < roi_points.length - 1; i = i + 2) {
        var tempPoint = {
          x: Number(roi_points[i]) * this.ratio,
          y: Number(roi_points[i + 1]) * this.ratio
        }
        polyGon.push(tempPoint)

      }
      var tempObj = {
        min_count: points.min_count,
        max_count: points.max_count,
        class_name: points.class_name,
        bbox_points: polyGon,
        area_name: points.area_name
      }
      this.CCpoints.push(tempObj)
      console.log(tempObj)
    });
    //this.GetTCPoints()
    this.DrawExistCCRois()
  }
  DrawExistCCRois() {
    this.CCpoints.forEach((element: any, id: number) => {
      console.log(element)
      console.log(element.roi)
      this.polygonOptions.stroke = 'rgb(0, 255, 255)'
      var Polygon = new fabric.Polygon(element.bbox_points, this.polygonOptions)
      // Polygon.id = uuid()
      console.log(Polygon)
      var text = new fabric.Text(element.area_name, {
        fontSize: 20,
        // bottom:5
        backgroundColor: 'black',
        selectable: false,
        left: Polygon.left,
        top: (Polygon.top != 0) && !(Polygon.top - 20 < 0) && (Polygon.top - 20 != 0) ? Polygon.top - 20 : 20,
        stroke: 'rgb(0, 255, 255)',
        fill: 'rgb(0, 255, 255)',
      });
      console.log(Polygon)

      // var tempObj = {

      //   roi_name_canvas: text,
      //   roi_canvas: Polygon,
      //   roi_name: this.cameraData[0].roi_data[id].roi_name,
      //   cc_data: this.cameraData[0].roi_data[id]

      // }
      var tempObj = {
        roi_name_canvas: text,
        roi_canvas: Polygon,
        roi_id: id,
        roi_name: this.cameraData[0].cr_data[id].area_name,
        cr_data: this.cameraData[0].cr_data[id]

      }

      //      this.allCameraData.push(tempObj)
      this.CcRois.push(tempObj)

      this.canvas.add(Polygon, text);
      // console.log(this.canvas.get)
      this.canvas.renderAll()
    }
    )
    this.GetTCPoints()
  }

  GetTCPoints() {
    var temp = {}
    this.trafficCountData = this.cameraData[0].tc_data
    this.cameraData[0].tc_data.forEach((points: any, index: number) => {
      console.log(points)
      var tempPoints = points.line_bbox.line.split(';')
      var tempArrowPoints = points.line_bbox.arrow.split(';')
      // var tempELPoints = points.line_bbox.exit_line.split(';')
      // var tempExAPoints = points.line_bbox.exit_arrow.split(';')
      //  for (let index = 0; index < tempPoints.length-1; index++) {
      //   const element = tempPoints[index];
      console.log(Number(tempPoints[index]))
      temp = [
        { points: { x1: Number(tempArrowPoints[0]), y1: Number(tempArrowPoints[1]), x2: Number(tempArrowPoints[2]), y2: Number(tempArrowPoints[3]) }, type: 'arrow', area_name: points.area_name, roi_id: index },
        { points: { x1: Number(tempPoints[0]), y1: Number(tempPoints[1]), x2: Number(tempPoints[2]), y2: Number(tempPoints[3]) }, type: 'line', area_name: points.area_name, roi_id: index },

      ]
      this.tempTCData.push(temp)

    }





    );
    console.log(this.tempTCData)
    this.drawExistTCRois(this.tempTCData)
  }

  DrawExistPanels() {
    this.roiPoints.forEach((element: any, id: number) => {
      console.log(element.roi)
      this.polygonOptions.stroke = 'rgb(127, 255, 0)'
      var Polygon = new fabric.Polygon(element.roi, this.polygonOptions)
      // Polygon.id = uuid()
      console.log(Polygon)
      var text = new fabric.Text(element.roi_name, {
        fontSize: 20,
        // bottom:5
        backgroundColor: 'black',
        selectable: false,
        left: Polygon.left + 10,
        // top: (Polygon.top != 0) && !(Polygon.top - 20 < 0) && (Polygon.top - 20 != 0) ? Polygon.top + 20 : 20,
        top: Polygon.top + 30,
        stroke: 'rgb(127, 255, 0)',
        fill: 'rgb(127, 255, 0)',
      });
      console.log(Polygon)

      var tempObj = {

        roi_name_canvas: text,
        roi_canvas: Polygon,
        roi_name: this.cameraData[0].roi_data[id].roi_name,
        roi_data: this.cameraData[0].roi_data[id]

      }

      this.allCameraData.push(tempObj)


      this.canvas.add(Polygon, text);
      // console.log(this.canvas.get)
      this.canvas.renderAll()

      // this.canvas.add(Polygon)
      // this.canvas.requestRenderAll()


    });
    console.log(this.allCameraData)


  }

  drawExistTCRois(data: any) {
    this.isMouseDown = true
    this.tempTCCanvas = []
    var temp: any[] = []
    var line: any
    var triangle: any
    data.forEach((TCROI: any, i: number) => {

      temp = []
      for (let index = 0; index < TCROI.length; index++) {
        const pointer = TCROI[index];


        console.log(pointer)
        if (pointer.type == 'line') {
          // var linePath = 'M ' + pointer.x + ' ' + pointer.y + ' L ' + pointer.x + ' ' + pointer.y
          var linePath = [pointer.points.x1, pointer.points.y1, pointer.points.x2, pointer.points.y2];

          console.log(linePath)
          line = new fabric.Line(linePath,
            {
              stroke: 'rgb(255, 81, 148)',
              strokeWidth: 3,
              fill: 'rgb(255, 81, 148)',
              originX: 'center',
              originY: 'center',
              hasControls: false,
              hasBorders: false,
              selectable: false,
              //uuid : this.generateUUID(),trafficCountROIS
              objectCaching: false,
              type: 'line'
            });
          console.log(line)
          temp.push(line)
          line.set({ x1: Math.round(pointer.points.x1), y1: Math.fround(pointer.points.y1) })
          this.canvas.add(line)
          // this.activeObj = this.line;

        }
        if (pointer.type == 'arrow') {
          var points = [pointer.points.x1, pointer.points.y1, pointer.points.x2, pointer.points.y2];
          line = new fabric.Line(points, {
            strokeWidth: 3,
            fill: 'rgb(255, 81, 148)',
            stroke: 'rgb(255, 81, 148)',
            originX: 'center',
            originY: 'center',
            id: 'arrow_line',
            selectable: false,
            lockScalingFlip: true,
            objectCaching: false,
            //uuid : this.generateUUID(),
            type: 'arrow'
          });


          var centerX = (line.x1 + line.x2) / 2;
          var centerY = (line.y1 + line.y2) / 2;
          this.deltaX = line.left - centerX;
          this.deltaY = line.top - centerY;
          console.log(line)
          triangle = new fabric.Triangle({
            left: line.get('x2') + this.deltaX,
            top: line.get('y2') + this.deltaY,
            originX: 'center',
            originY: 'center',
            selectable: false,
            pointType: 'arrow_start',
            angle: this._FabricCalcArrowAngle(line.x1, line.y1, line.x2, line.y2),
            width: 20,
            height: 20,
            fill: 'rgb(255, 81, 148)',
            id: 'arrow_triangle',
            uuid: line.uuid
          });
          temp.push(line, triangle)

          this.canvas.add(line, triangle);
          var text = new fabric.Text(pointer.area_name, {
            fontSize: 16,
            // bottom:5
            backgroundColor: 'black',
            selectable: false,
            left: line.left - 60,
            top: (line.top != 0) && !(line.top - 20 < 0) && (line.top - 20 != 0) ? line.top - 20 : 20,
            stroke: 'rgb(255, 81, 148)',
            fill: 'rgb(255, 81, 148)',
          });
          temp.push(text)
          this.canvas.add(text)
          this.canvas.renderAll()
          //this.activeObj = this.line;
        }
      }
      this.canvas.requestRenderAll()

      this.tempTCCanvas[i] = temp
    }
    )
    console.log(this.tempTCCanvas)
    this.canvas.requestRenderAll()

  }

  SaveEditedRoi() {

    if (this.peopleCrowdForm.get('min').value || this.peopleCrowdForm.get('max').value) {
      var crowTemp: any = {
        label_name: ['people'],
        min_count: this.peopleCrowdForm.get('min').value ? this.peopleCrowdForm.get('min').value : 0,
        max_count: this.peopleCrowdForm.get('max').value ? this.peopleCrowdForm.get('max').value : 0,
        roi_id: null
      }
      this.crowdConfig.push(crowTemp)
    }
    if (this.vehicleCrowdForm.get('min').value || this.vehicleCrowdForm.get('max').value) {
      var crowTemp: any = {
        label_name: ['vehicle'],
        min_count: this.vehicleCrowdForm.get('min').value ? this.vehicleCrowdForm.get('min').value : 0,
        max_count: this.vehicleCrowdForm.get('max').value ? this.vehicleCrowdForm.get('max').value : 0,
        roi_id: null
      }
      this.crowdConfig.push(crowTemp)
    }
    var roiData: any[] = []
    //  this.allCameraData.forEach((element:any,id:number) => {
    // roiData.push({...element.roi_data,roi_id:id+1})


    //  })
    console.log(this.selectedEditId)
    var roi_points: any[] = []
    if (this.selectedEditId != null) {
      // roiData.push(this.allCameraData[this.selectedEditId].roi_data)
      for (let i = 0; i < this.allCameraData[this.selectedEditId].roi_canvas.points.length; i++) {
        console.log(this.allCameraData[this.selectedEditId].roi_canvas.points)
        var points = this.allCameraData[this.selectedEditId].roi_canvas.points
        let tempX = (Math.round(points[i].x))

        let tempY = (Math.round(points[i].y))
        roi_points.push(`${tempX};${tempY};`)
      }
      //to remove the ,
      var comma = /,/g
      var roiPointsString = roi_points.toString().replace(comma, '')
      console.log(roiPointsString)
      console.log(this.allCameraData[this.selectedEditId].roi_data)
      this.allCameraData[this.selectedEditId].roi_data.bb_box = roiPointsString
      console.log(this.allCameraData[this.selectedEditId].roi_data)

      roiData.push({ ...this.allCameraData[this.selectedEditId].roi_data })
    }
    var cameraData: any = {
      id: this.ID,
      ai_solutions: ['RA'],
      imagename: this.imageName,
      roi_data: roiData,
      ppe_data: [this.ppeConfig],
      // cr_data: this.crowdConfig,
      // tc_data: []

    }
    console.log(cameraData)
    this.server.EditROI(cameraData).subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.server.notification(response.message)
      }
      else {
        this.server.notification(response.message, 'Retry')

      }
    }, Err => {
      this.server.notification('Something went wrong', 'Retry')

    })
  }

  CalculateAspectRatio(orgWidth: any, orgHeight: any, newWidth: any) {
    this.ratio = orgHeight / orgWidth
    var newHeight = this.ratio * newWidth
    return newHeight
  }
  ClassId(event: any) {
    console.log(event.target.defaultValue)
    console.log(event.target.checked)
    // console.log(this.classIDPerson.value)
    // console.log(this.classIDCar.value)
    // console.log(this.classIDBike.value)
    if (event.target.checked) {
      this.classIds.push(event.target.value)

    }
    else {
      var index = this.classIds.indexOf(event.target.defaultValue)
      this.classIds.splice(index, 1)
    }
    console.log(this.classIds)
  }

  OnRAAlarmObjects(event: any) {
    console.log(event.target.defaultValue)
    console.log(event.target.checked)
    // console.log(this.classIDPerson.value)
    // console.log(this.classIDCar.value)
    // console.log(this.classIDBike.value)
    if (event.target.checked) {
      this.raAlarmObjects.push(event.target.value)

    }
    else {
      var index = this.raAlarmObjects.indexOf(event.target.defaultValue)
      this.raAlarmObjects.splice(index, 1)
    }
    console.log(this.raAlarmObjects)
  }


  OnPPEAlarmObjects(event: any) {
    console.log(event.target.defaultValue)
    console.log(event.target.checked)
    // console.log(this.classIDPerson.value)
    // console.log(this.classIDCar.value)
    // console.log(this.classIDBike.value)
    if (event.target.checked) {
      this.ppeAlarmObjects.push(event.target.value)

    }
    else {
      var index = this.ppeAlarmObjects.indexOf(event.target.defaultValue)
      this.ppeAlarmObjects.splice(index, 1)
    }
    console.log(this.ppeAlarmObjects)
  }


  TrafficCountConfig(event: any) {
    console.log(event)
    if (event.target.checked) {
      this.TrafficConfig = event.target.value
    }

    this.modalService.dismissAll()
  }

  PPE_Config(event: any) {
    console.log(this.ppeForm)
    console.log(event.target.value)
    if (event.target.checked) {
      if (event.target.value === 'helmet') {
        this.isEdit = true
        this.ppeConfig.helmet = true
        console.log(this.ppeConfig)
      }
      if (event.target.value === 'vest') {
        this.isEdit = true
        this.ppeConfig.vest = true
      }

    }
    else {
      this.isEdit = true
      if (event.target.value === 'helmet') {

        this.ppeConfig.helmet = false
      }
      if (event.target.value === 'vest') {
        this.ppeConfig.vest = false
      }

    }
    this.savePpeConfig()
    console.log('fire', this.fireSmokeForm.get('fire').value, 'smoke', this.fireSmokeForm.get('smoke').value)
    console.log(this.ppeConfig)

  }
  VehicleConfig(event: any) {

    console.log(event.target.value)
  }

  DeleteNewTCRoi() {
    this.trafficCountLineROIS.forEach((element: any) => {
      this.canvas.remove(element)
    })
    this.btnIndex = 1
    this.trafficCountLineROIS = []
  }
  SaveTrafficCountROI() {
    this.TCCanvasData.push(this.line)
    this.TCCanvasData.push(this.triangle)
    console.log(this.line)


    this.btnIndex == 1 ? this.trafficCountLineROIS.push(this.line) : this.trafficCountLineROIS.push(this.line, this.triangle)
    if (this.trafficCountLineROIS.length == 1) {



      this.btnIndex = 2
    }
    if (this.trafficCountLineROIS.length == 3) {
      this.modalService.open(this.TCNameModal, { backdrop: 'static' }).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
        //  this.roiNameControl.setValue(null)
        //  this.OnAddingNewROI()
        // this.download = '',
        //   this.isalert = false
        console.log('cancel')
        this.tcName.setValue(null)
        this.tcName.reset()
        this.tcName.addValidators(Validators.required)
        console.log(this.tcName.value)
        this.classIds = ['person']
        this.DeleteNewTCRoi()
        // this.newROIPoints.splice(0,this.newROIPoints.length)
        // this.OnAddingNewROI()
      }, (reason) => {
        console.log('submit')

          /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          // this.download = '',
          //   this.isalert = false

          ;
      }
      )
      console.log(this.TCCanvasData)

    }








    console.log(this.trafficCountLineROIS)
  }

  AddTrafficCountData() {


    var temp: any = {}
    var tempCanvas: any[] = []
    temp.line = Math.round(this.trafficCountLineROIS[0].x1).toString() + ';' + Math.round(this.trafficCountLineROIS[0].y1).toString() + ';' + Math.round(this.trafficCountLineROIS[0].x2).toString() + ';' + Math.round(this.trafficCountLineROIS[0].y2).toString() + ';'
    temp.arrow = Math.round(this.trafficCountLineROIS[1].x1).toString() + ';' + Math.round(this.trafficCountLineROIS[1].y1).toString() + ';' + Math.round(this.trafficCountLineROIS[1].x2).toString() + ';' + Math.round(this.trafficCountLineROIS[1].y2).toString() + ';'

    var tempObj = { class_name: this.classIds, line_bbox: temp, area_name: this.tcName.value, roi_id: (this.trafficCountData.length) }
    fabric.util.resetObjectTransform(this.newROI)
    var dimensionsLeft = this.line._getLeftToOriginX()
    var dimensionsTop = this.line._getTopToOriginY()
    var ROINameObject = new fabric.Text(this.tcName.value, {
      fontSize: 15,
      // bottom:5
      backgroundColor: 'black',

      selectable: false,
      left: dimensionsLeft - 20,
      top: dimensionsTop - 30,
      stroke: 'rgb(255, 81, 148)',
      fill: 'rgb(255, 81, 148)',
    });
    tempCanvas = [...this.trafficCountLineROIS, ROINameObject]
    console.log(ROINameObject)
    this.canvas.add(ROINameObject)
    this.canvas.renderAll()
    this.trafficCountData[this.trafficCountData.length] = tempObj
    //  this.trafficCountData[this.trafficCountData.length].line_bbox=temp

    console.log()
    console.log('traffic count', this.trafficCountData)
    this.tempTCLineROIS.push(...this.trafficCountLineROIS)
    console.log(this.trafficCountLineROIS)
    this.trafficCountLineROIS = []
    this.btnIndex = 1
    this.tempTCCanvas.push(tempCanvas)
    // this.SaveChanges()
    this.AddTCData()
    this.modalService.dismissAll()
  }

  //traffic count roi
  addingShapeOnMouseDown(event: any) {
    this.isMouseDown = true
    var pointer = this.canvas.getPointer(event.e)

    console.log(this.line)
    if (this.btnIndex == 1) {
      // var linePath = 'M ' + pointer.x + ' ' + pointer.y + ' L ' + pointer.x + ' ' + pointer.y
      var linePath = [pointer.x, pointer.y, pointer.x, pointer.y];

      console.log(linePath)
      this.line = new fabric.Line(linePath,
        {
          stroke: 'rgb(255, 81, 148)',
          strokeWidth: 3,
          fill: 'rgb(255, 81, 148)',
          originX: 'center',
          originY: 'center',
          hasControls: false,
          hasBorders: false,
          selectable: false,
          //uuid : this.generateUUID(),trafficCountROIS
          objectCaching: false,
          type: 'line'
        });
      console.log(this.line)
      this.line.set({ x1: Math.round(pointer.x), y1: Math.fround(pointer.y) })
      this.canvas.add(this.line)
      this.activeObj = this.line;
    }
    if (this.btnIndex === 2) {
      var points = [pointer.x, pointer.y, pointer.x, pointer.y];
      this.line = new fabric.Line(points, {
        strokeWidth: 3,
        fill: 'rgb(255, 81, 148)',
        stroke: 'rgb(255, 81, 148)',
        originX: 'center',
        originY: 'center',
        id: 'arrow_line',
        selectable: false,
        lockScalingFlip: true,
        objectCaching: false,
        //uuid : this.generateUUID(),
        type: 'arrow'
      });
      var centerX = (this.line.x1 + this.line.x2) / 2;
      var centerY = (this.line.y1 + this.line.y2) / 2;
      this.deltaX = this.line.left - centerX;
      this.deltaY = this.line.top - centerY;

      this.triangle = new fabric.Triangle({
        left: this.line.get('x2') + this.deltaX,
        top: this.line.get('y2') + this.deltaY,
        originX: 'center',
        originY: 'center',
        selectable: false,
        pointType: 'arrow_start',
        angle: -45,
        width: 20,
        height: 20,
        fill: 'rgb(255, 81, 148)',
        id: 'arrow_triangle',
        uuid: this.line.uuid
      });
      // var arrow= new fabric.([this.line,this.triangle],{
      //   left:this.triangle.left,
      //   top:this.triangle.transparentCorners
      // })
      this.canvas.add(this.line, this.triangle);
      this.activeObj = this.line;
    }
    this.canvas.requestRenderAll()
  }

  IsDeleteTC(modal: any, index: any) {
    this.deleteID = index
    this.modalService.open(modal, { backdrop: 'static', size: 'xs' })

  }
  OnDeleteTCROI() {
    var index = this.deleteID
    console.log(this.deleteID)
    console.log(this.tempTCCanvas)
    console.log(this.TCCanvasData[index])

    console.log(this.trafficCountData[index])
    this.tempTCCanvas[index].forEach((roi: any) => {
      this.canvas.remove(roi)
      this.canvas.renderAll()
    });
    this.trafficCountLineROIS = []
    this.btnIndex = 1
    var data = {
      id: this.ID,
      roi_id: this.trafficCountData[index].roi_id,
      ai_solutions: this.AISolutions
    }
    this.server.deleteTCData(data).subscribe((response: any) => {
      this.server.notification(response.message)
      if (response.success) {
        this.trafficCountData.splice(index, 1)
        this.modalService.dismissAll()
      }
    })
    //to modify need to implement  api to delete  tc roi

  }


  SaveCCPeople() {
    var temp: any = {}
    temp.label = ['people']
    temp.min_count = this.peopleCrowdForm.get('min').value
    temp.max_count = this.peopleCrowdForm.get('max').value
    temp.roi_id = null


    console.log(temp)
  }

  SaveCCVehicle() {
    var temp: any = {}
    temp.label = ['vehicle']
    temp.min_count = this.peopleCrowdForm.get('min').value
    temp.max_count = this.peopleCrowdForm.get('max').value
    temp.roi_id = null
    console.log(temp)
  }
  creatingShapeOnMouseMove(event: any) {
    if (this.isMouseDown === true) {

      console.log('mouse move')
      var pointer = this.canvas.getPointer(event.e)
      if (this.btnIndex === 1) {
        // this.line.path[1][1] = pointer.x
        // this.line.path[1][2] = pointer.y
        //this.line.setCoords()
        this.line.set({
          x2: pointer.x,
          y2: pointer.y
        });


      }
      if (this.btnIndex === 2) {
        console.log(this.line.x1)
        console.log(this.line.y1)
        this.line.set({
          x2: pointer.x,
          y2: pointer.y
        });
        // var width = Math.abs(pointer.x - this.line.x1)
        // var height = Math.abs(pointer.y - this.line.y1)
        // this.line.width=width
        // this.line.height=height
        console.log(this.line)
        if (this.btnIndex == 2) {
          this.triangle.set({
            'left': pointer.x + this.deltaX,
            'top': pointer.y + this.deltaY,
            'angle': this._FabricCalcArrowAngle(this.line.x1,
              this.line.y1,
              this.line.x2,
              this.line.y2)
          });
        }
      }

    }
    this.canvas.requestRenderAll()
  }

  ngOnDestroy() {
    this.modalService.dismissAll()
  }

  RefreshCameraData() {
    this.server.GetRACameraData(this.ID).subscribe((response: any) => {

      if (response.success) {
        this.cameraData = response.message
        this.trafficCountData = this.cameraData[0].tc_data

      }
    })

  }
  _FabricCalcArrowAngle(x1: any, y1: any, x2: any, y2: any) {
    var angle = 0, x, y;
    x = (x2 - x1);
    y = (y2 - y1);
    if (x === 0) {
      angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
    } else if (y === 0) {
      angle = (x > 0) ? 0 : Math.PI;
    } else {
      angle = (x < 0) ? Math.atan(y / x) + Math.PI :
        (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
    }
    return (angle * 180 / Math.PI + 90);
  };

  RemoveDuplicates(arr: any[]) {
    return arr.filter((item,
      index) => arr.indexOf(item) === index);
  }


}

