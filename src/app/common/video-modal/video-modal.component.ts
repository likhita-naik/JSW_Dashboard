import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../models.model';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})
export class VideoModalComponent {
   @Input() public Data:any
   @Input() SelectedId:string
  @Input() public modalConfig?:any 
  @ViewChild('modal') modalContainer:TemplateRef<VideoModalComponent>
  // @ViewChild('carousal',{static:true}) carousal:any

constructor(private modalService:NgbModal,public config: NgbCarouselConfig){
  console.log(this.SelectedId)
  config.wrap=false
}

open(){
this.modalService.open(this.modalContainer,{size:'lg'})
console.log(this.modalContainer)
// this.carousal.select(String(this.SelectedId))
console.log(this.SelectedId)
}

}
