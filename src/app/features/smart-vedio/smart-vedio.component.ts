import { Component, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { VideoModalComponent } from 'src/app/common/video-modal/video-modal.component';

@Component({
  selector: 'app-smart-vedio',
  templateUrl: './smart-vedio.component.html',
  styleUrls: ['./smart-vedio.component.css']
})
export class SmartVedioComponent {
  selectedMoments: { startDate: Moment | any, endDate: Moment | any }
  fromDate:any
  toDate:any
  @ViewChild('modal') private modalComponent: VideoModalComponent
  Data:any[]=[{
    si_no:1,
    coin_id:"Coin_25",
    camera_name:"sm2_entry_gate",
    video_name:"https://www.w3schools.com/html/mov_bbb.mp4#t=0.5",
    poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    si_no:2,
    coin_id:"Coin_25",
    camera_name:"sm2_entry_gate",
    video_name:"https://www.w3schools.com/html/mov_bbb.mp4#t=0.5",
    poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    si_no:3,
    coin_id:"Coin_25",
    camera_name:"sm2_entry_gate",
    video_name:"https://www.w3schools.com/html/mov_bbb.mp4",
    poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
,
{
  si_no:4,
  coin_id:"Coin_25",
  camera_name:"sm2_entry_gate",
  vedio_name:"https://player.vimeo.com/video/403652508?title=0&portrait=0&byline=0&autoplay=1&muted=true",
  poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  si_no:5,
  coin_id:"Coin_25",
  camera_name:"sm2_entry_gate",
  vedio_name:"https://player.vimeo.com/video/403652508?title=0&portrait=0&byline=0&autoplay=1&muted=true",
  poster_image:"https://images.pexels.com/photos/5420465/pexels-photo-5420465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}]
  coinIdList:Observable<any[]>= of([])
  cameraList:Observable<any[]>=of([])
  selectedCoinId:any
  selectedCamera:any
  dateUpdated(event:any){
    console.log(event)
    this.fromDate=this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss')
    this.toDate=this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')

  }
  OnCoinIdSelect(event:any){
  

  }


  openVideoModal()
  {
    this.modalComponent.open()
  }

}
