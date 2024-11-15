import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';


@Component({
  selector: 'app-internship',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './internship.component.html',
  styleUrl: './internship.component.scss'
})
export class InternshipComponent implements OnInit,OnDestroy {
  fullText = 'Your Topic Title';
  textToShow = 'Your Topic Title';
  private currentIndex = 0;
  private delay = 100; // Adjust for typing speed (ms)

  constructor(private httpService : HttpService){}

  internshipArr : any = []
  newArr : any


  currentSlide = 0;
  slides = [
    { imageUrl: 'assets/images/slide1.jpg' },
    { imageUrl: 'assets/images/slide2.jpg' },
    { imageUrl: 'assets/images/slide3.jpg' },
    { imageUrl: 'assets/images/slide4.jpg' }
  ];
  private slideInterval: any;





  ngOnInit(): void {
    this.initializeScrollObserver();
    this.getData();
    this.startAutoSlide();
  
  }

  initializeScrollObserver(): void {
    const titleElement = document.getElementById('title');
    if (titleElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.startTypingAnimation();
              titleElement.classList.add('active');
              observer.unobserve(titleElement); // Run animation once per scroll
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% of element is visible
      );
      observer.observe(titleElement);
    }
  }

  startTypingAnimation(): void {
    this.textToShow = ''; // Reset text
    this.currentIndex = 0; // Start from beginning
    this.typeNextCharacter();
  }

  private typeNextCharacter(): void {
    if (this.currentIndex < this.fullText.length) {
      this.textToShow += this.fullText[this.currentIndex];
      this.currentIndex++;
      setTimeout(() => this.typeNextCharacter(), this.delay);
    }
  }

  getData(){

    this.httpService.getMethod('internships').then((res:any)=> {
      this.internshipArr = res
      console.log(this.internshipArr)

      for(var myArr of this.internshipArr){
        this.newArr = myArr.internship_para
        console.log('ParagraphArr>>>>>>>>',this.newArr);
        
      }
    })
    
  }







  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  private startAutoSlide() {
    console.log('caros');
    
    this.slideInterval = setInterval(() => this.nextSlide(), 3000);
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }   
}