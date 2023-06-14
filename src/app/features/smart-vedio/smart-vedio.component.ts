import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { VideoModalComponent } from 'src/app/common/video-modal/video-modal.component';
import { SmartVedioService } from './smartVideo.service';

@Component({
  selector: 'app-smart-vedio',
  templateUrl: './smart-vedio.component.html',
  styleUrls: ['./smart-vedio.component.css']
})
export class SmartVedioComponent implements AfterViewInit {
  selectedMoments: { startDate: Moment | any, endDate: Moment | any }
  fromDate:any
  toDate:any
  selectedVideoId:Observable< string>=of('')
  pageSize:number=2;
  collectionSize:number=4
  page=0;
  @ViewChild('modal',{static:false}) private modalComponent: any
  Data:any[]=[{
    si_no:1,
    coin_id:"Coin_1",
    camera_name:"sm2_entry_gate",
    video_name:"https://www.w3schools.com/html/mov_bbb.mp4#t=0.5",
    poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    si_no:2,
    coin_id:"Coin_2",
    camera_name:"sm2_entry_gate",
    video_name:"https://www.w3schools.com/html/mov_bbb.mp4#t=0.5",
    poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    si_no:3,
    coin_id:"Coin_3",
    camera_name:"sm2_entry_gate",
    video_name:"https://www.w3schools.com/html/mov_bbb.mp4",
    poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
,
{
  si_no:4,
  coin_id:"Coin_4",
  camera_name:"sm2_entry_gate",
  vedio_name:"https://player.vimeo.com/video/403652508?title=0&portrait=0&byline=0&autoplay=1&muted=true",
  poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  si_no:5,
  coin_id:"Coin_5",
  camera_name:"sm2_entry_gate",
  vedio_name:"https://player.vimeo.com/video/403652508?title=0&portrait=0&byline=0&autoplay=1&muted=true",
  poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}]
  coinIdList:Observable<any[]>= of([])
  cameraList:Observable<any[]>=of([])
  total:Observable<number>=of(4)
  selectedCoinId:any
  selectedCamera:any
constructor(public modalService:NgbModal,private SmartVideoService:SmartVedioService){

}

  dateUpdated(event:any){
    console.log(event)
    this.fromDate=this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss')
    this.toDate=this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')

  }
  OnCoinIdSelect(event:any){
  

  }


  openVideoModal(id:number)
  {
    this.selectedVideoId=of( String(id))
   
    setTimeout(() => {
      this.modalService.open(this.modalComponent,{centered:true,size:'xl'})

  });

  }

  modalClose(event:any){
    console.log('close event enitted')
   this.modalService.dismissAll() 
  }
 
  ngAfterViewInit(): void {
   
  }

  sliceData(){

  }


  StartApplication(){
    this.SmartVideoService.StartApplication().subscribe((response:any)=>{
      this.SmartVideoService.notification(response.message)
       
    })
  }
}
