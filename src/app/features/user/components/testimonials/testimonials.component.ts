import { Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
    imports: [CommonModule, CarouselModule, FormsModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit{


  constructor(private el: ElementRef, private renderer: Renderer2,private httpService : HttpService) {}
  homeArr: any[] = [];
  loopedHomeArr: any[] = [];
  currentSlide = 1; // Start at the first real slide
  carouselTransform = 'translateX(0%)';
  transitionStyle = 'transform 0.5s ease-in-out';
  progress = 0;




  @HostListener('window:resize')
  onResize() {
    this.setFullHeight();
  }
  ngOnInit(): void {

this.getData();

this.setFullHeight();

  }

  // getData(): void {
  //   this.httpService.getMethod('Homes').then(
  //     (res: any) => {
  //       this.homeArr = res;
  //       this.carouselData = res
  //         .map((item: any) => ({
  //           facilities: `https://ccitr.emeetify.com${item.facilities_image?.url}`,
  //           reports: `https://ccitr.emeetify.com${item.home_title_image?.url}`,
  //           posters: item.home_title_4_image?.url
  //           ? `https://ccitr.emeetify.com${item.home_title_4_image.url}`
  //           : null,
  //         events: item.events_image?.url
  //           ? `https://ccitr.emeetify.com${item.events_image.url}`
  //           : null,
  //       }))
  //         .filter((item: any) => item.posters || item.events);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }


  getData(): void {
    this.httpService.getMethod('Homes').then(
      (res: any) => {
        this.homeArr = res.filter((item: any) => item.home_title_5_para);
        this.setupLoopedArray();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  private setFullHeight() {
    const sections = document.querySelectorAll('section');
    const height = `${window.innerHeight}px`;
    sections.forEach(section => {
      section.style.height = height;
    });
  }




  // updateProgress() {
  //   this.progress = ((this.currentIndex + 1) / this.homeArr.length) * 100;
  // }

  // next() {
  //   this.currentIndex = (this.currentIndex + 1) % this.homeArr.length;
  //   this.updateProgress();
  // }

  // prev() {
  //   this.currentIndex =
  //     (this.currentIndex - 1 + this.homeArr.length) % this.homeArr.length;
  //   this.updateProgress();
  // }


  // next() {
  //   this.currentSlide = (this.currentSlide + 1) % this.homeArr.length;
  //   this.updateCarouselTransform();
  // }
  
  // prev() {
  //   this.currentSlide =
  //     (this.currentSlide - 1 + this.homeArr.length) % this.homeArr.length;
  //   this.updateCarouselTransform();
  // }
  
  // updateCarouselTransform() {
  //   this.carouselTransform = `translateX(-${this.currentSlide * 100}%)`;
  // }


  setupLoopedArray(): void {
    // Create a looped array by duplicating the first and last items
    this.loopedHomeArr = [
      this.homeArr[this.homeArr.length - 1],
      ...this.homeArr,
      this.homeArr[0],
    ];
    this.updateCarouselTransform();
  }

  updateCarouselTransform(): void {
    this.carouselTransform = `translateX(-${this.currentSlide * 100}%)`;
  }

  next(): void {
    if (this.currentSlide < this.loopedHomeArr.length - 1) {
      this.currentSlide++;
      this.updateCarouselTransform();
      this.checkLoop(true);
    }
  }

  prev(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateCarouselTransform();
      this.checkLoop(false);
    }
  }

  checkLoop(isNext: boolean): void {
    // Delay transition reset for smooth looping
    setTimeout(() => {
      if (isNext && this.currentSlide === this.loopedHomeArr.length - 1) {
        this.transitionStyle = 'none';
        this.currentSlide = 1; // Reset to first real slide
        this.updateCarouselTransform();
      } else if (!isNext && this.currentSlide === 0) {
        this.transitionStyle = 'none';
        this.currentSlide = this.homeArr.length; // Reset to last real slide
        this.updateCarouselTransform();
      }

      // Restore transition style
      setTimeout(() => {
        this.transitionStyle = 'transform 0.5s ease-in-out';
      });
    }, 500); // Match transition duration
  }
}






