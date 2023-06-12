import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../models.model';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})
export class VideoModalComponent implements OnInit {
   @Input() public Data:any
   @Input() public  SelectedId:string
  @Input() public modalConfig?:any 
  @ViewChild('modal') modalContainer:TemplateRef<any>
  //@ViewChild('carousal',{static:false}) carousal:NgbCarousel

constructor(private modalService:NgbModal,public config: NgbCarouselConfig){
  
  config.wrap=false

}

ngOnInit(): void {
}

open(){
  //this.carousal.activeId=this.SelectedId
  
  console.log(this.SelectedId)
  console.log(this.SelectedId)
  console.log(this.Data)
this.modalService.open(this.modalContainer,{size:'lg'})
console.log(this.modalContainer)
// this.carousal.select(String(this.SelectedId))
console.log(this.SelectedId)
}

}
