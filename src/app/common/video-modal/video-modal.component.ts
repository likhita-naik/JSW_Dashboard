import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../models.model';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})
export class VideoModalComponent {
   @Input() public Data:any
  @Input() public modalConfig?:any 
  @ViewChild('modal') modalContainer:TemplateRef<VideoModalComponent>
constructor(private modalService:NgbModal){
}

open(){
this.modalService.open(this.modalContainer,{size:'lg'})
console.log(this.Data)
}

}
