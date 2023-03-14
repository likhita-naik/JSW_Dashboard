import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageCarousalComponent } from './image-carousal/image-carousal.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbdSortableHeader } from './sortable.directive';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LightboxModule } from 'ngx-lightbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    // NgbdSortableHeader,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NgxImageZoomModule,NgMultiSelectDropDownModule.forRoot(),LightboxModule
    
   ],
   exports:[
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    NgxImageZoomModule,
    NgMultiSelectDropDownModule,LightboxModule,
    FormsModule,
    NgbModule
           
            
            ]

            
})
export class CommonModules { 
  constructor(lib: FaIconLibrary) {
   lib.addIconPacks(fas);
}
}
