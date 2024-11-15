import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, Input, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../../core/services/http.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { SplitCharsPipe } from '../../../../shared/pipes/global.pipe';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[SplitCharsPipe]


 


})
export class HomeComponent implements OnInit{

  

 

  constructor(private el: ElementRef, private renderer: Renderer2,private httpService : HttpService) {}
  homeArr : any = []


 


  ngOnInit(): void {
    // Automatically update the active index based on a timer if autoplay is enabled

this.getData();


    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 3000); // Change every 3 seconds (or adjust as needed)
  }



  


  images = [
    { id: 1, src: 'https://picsum.photos/id/545/698/420', alt: 'Cybercrime Investigation Summit 2024' },
    { id: 2, src: 'https://picsum.photos/id/503/698/420', alt: 'CID Police Hackathon – CIDCODE' },
    { id: 3, src: 'https://picsum.photos/id/523/698/420', alt: 'Workshop on Cyber Security' },
    // Add more images as needed
  ];



  getData(){
    this.httpService.getMethod('Homes').then((res:any)=>{
      console.log('res',res);

      this.homeArr = res
      
    })
  }

  isDropdownOpen = false;

  activeIndex = 0; // Track the active image index

 

  isActive(image: { id: number }): boolean {
    // Check if the current image is active
    return this.images[this.activeIndex].id === image.id;

  }


  
  currentIndex = 0;

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }



 

  /**1st carousel  Start*/
  /**1st carousel  End*/




  

}
