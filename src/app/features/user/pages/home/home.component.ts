import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, Input, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../../core/services/http.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { SplitCharsPipe } from '../../../../shared/pipes/global.pipe';
import { CardsComponent } from '../../components/cards/cards.component';
import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, FormsModule, CardsComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[SplitCharsPipe]

})
export class HomeComponent implements OnInit{


  constructor(private el: ElementRef, private renderer: Renderer2,private httpService : HttpService) {}
  homeArr : any = []
  activeIndex = 0;
  dynamicImages! : any;
  @Input() homeArray: { home_title_5_para?: string }[] = [];
  currentIndex = 0;
  progress = 0;
  carouselData: { facilities: string; reports: string; posters: string;events:string }[] = [];
  isSliding = false;

  activeWrapper: 'posters' | 'events' = 'posters';

  activateWrapper(wrapper: 'posters' | 'events') {
    this.activeWrapper = wrapper;
  }



  @HostListener('window:resize')
  onResize() {
    this.setFullHeight();
  }
  ngOnInit(): void {

this.getData();
// this.fetchImagesFromBackend();
// this.startAutoSlide();
this.setFullHeight();

    // setInterval(() => {
    //   this.activeIndex = (this.activeIndex + 1) % this.images.length;
    // }, 3000); 
  }

  // fetchImagesFromBackend(): void {
  //   // Simulated dynamic image data from backend
  //   const dynamicImages = [
  //     this.dynamicImages,
  //     null, 
  //     undefined, 
  //   ];
  
  //   const baseUrl = 'https://ccitr.emeetify.com';
  
  //   const backendImages = dynamicImages
  //     .filter((path) => path) // Remove null or undefined values
  //     .map((path) => ({
  //       src: `${baseUrl}${path}`, // Construct full URL
  //       text: 'Default Text',
  //       newImg : `${baseUrl}${path}`,
  //       eventsImg : `${baseUrl}${path}` // Placeholder text for now
  //     }));
  //   this.images = backendImages;
  
  //   // Log the resulting images array
  //   console.log('Processed images:', this.images);
  // }
  

  // getData(): void {
  //   this.httpService.getMethod('Homes').then(
  //     (res: any) => {
  //       this.homeArr = res;
  //       this.carouselData = res.map((item: any) => ({
  //         facilities: `https://ccitr.emeetify.com${item.facilities_image?.url}`,
  //         reports: `https://ccitr.emeetify.com${item.home_title_image?.url}`,
  //         posters: `https://ccitr.emeetify.com${item.home_title_4_image?.url}`,
  //         events: `https://ccitr.emeetify.com${item.events_image?.url}`,
  //       }));
        
  //       console.log('carouselData', this.carouselData);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }


  


  getData(): void {
    this.httpService.getMethod('Homes').then(
      (res: any) => {
        this.homeArr = res;
        this.carouselData = res
          .map((item: any) => ({
            facilities: `https://ccitr.emeetify.com${item.facilities_image?.url}`,
            reports: `https://ccitr.emeetify.com${item.home_title_image?.url}`,
            posters: item.home_title_4_image?.url
            ? `https://ccitr.emeetify.com${item.home_title_4_image.url}`
            : null,
          events: item.events_image?.url
            ? `https://ccitr.emeetify.com${item.events_image.url}`
            : null,
        }))
          .filter((item: any) => item.posters || item.events);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  

  setActiveSlide(index: number): void {
    this.currentIndex = index;
  }

  prevImg(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselData.length) %
      this.carouselData.length;
  }

  nextImg(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;
  }
  isDropdownOpen = false;

  // startAutoSlide(): void {
  //   setInterval(() => {
  //     this.activeIndex = (this.activeIndex + 1) % this.images.length;
  //   }, 3000);
  // }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }


  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

 
  /**1st carousel  Start*/

 



  customOptions: OwlOptions = {
    loop: true,
    center: true, // Ensures the center image is in focus
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: ['<','>'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2, // Display 3 items on medium screens
      },
      1000: {
        items: 2, // Display 3 items with focus on center
      },
    },
  };
  /**1st carousel  End*/



  ////carousel 
  private setFullHeight() {
    const sections = document.querySelectorAll('section');
    const height = `${window.innerHeight}px`;
    sections.forEach(section => {
      section.style.height = height;
    });
  }


  carouselOptions: OwlOptions = {
    loop: true,
    center: true,
    nav: false,
    dots: false,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    items: 5,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 5 },
    },
  };


  get carouselTransform(): string {
    const offset = this.currentIndex * -100;
    return `translateX(${offset}%)`;
  }

  updateProgress() {
    this.progress = ((this.currentIndex + 1) / this.homeArr.length) * 100;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.homeArr.length;
    this.updateProgress();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.homeArr.length) % this.homeArr.length;
    this.updateProgress();
  }


 



}






