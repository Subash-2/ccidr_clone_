import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef,Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';
declare var $: any;

@Component({
  selector: 'app-infrastructure',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './infrastructure.component.html',
  styleUrl: './infrastructure.component.scss'
})
export class InfrastructureComponent implements OnInit{
  constructor(private httpService : HttpService){}
  contentArr : any = []
  isSliding = false;
  carouselData: { left: string; right: string; text: string }[] = [];;
  currentIndex = 0;
  autoScrollInterval!: any;

  ngOnInit(): void {

    this.getData()
    this.startAutoScroll();

    
  }
  ngOnDestroy() {
    clearInterval(this.autoScrollInterval);
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.next();
    }, 100000); // Auto-scroll every 3 seconds
  }

  next() {
    this.triggerSlideAnimation();
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;
      this.isSliding = false;
    }, 500);
  }

  prev() {
    this.triggerSlideAnimation();
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.carouselData.length) % this.carouselData.length;
      this.isSliding = false;
    }, 500);
  }

  triggerSlideAnimation() {
    this.isSliding = true;
  }

  getData(){
    
    this.httpService.getMethod('infrastructures').then((res: any)=>
      {
        this.contentArr = res
        console.log('res',this.contentArr);
        
        this.carouselData = res.map((item: any) => ({
          
          left: `https://ccitr.emeetify.com${item.infrastructure_left_image?.url}`,
          right: `https://ccitr.emeetify.com${item.infrastructure_right_image?.url}`,
          text: item.infrastructure_heading,
          
        }));
        console.log('item',this.carouselData);
        this.startAutoScroll();
      });
    }



  // @ViewChildren('imageElement') imageElements!: QueryList<ElementRef>;

  // ngAfterViewInit() {
  //   this.typeWriter();

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('visible'); // Add the visible class when in view
  //         observer.unobserve(entry.target); // Stop observing once the animation has been applied
  //       }
  //     });
  //   }, { threshold: 0.1 }); // Trigger when 10% of the image is visible

  //   this.imageElements.forEach((image) => {
  //     observer.observe(image.nativeElement);
  //   });
  // }

 

  // title: string = 'Welcome to Angular 27!';
  // displayedText: string = '';
  // private currentIndex: number = 0;

  // images  = [{imgUrl :  'https://picsum.photos/id/545/698/420',title : 'First Image'},
  //   {imgUrl :   'https://picsum.photos/id/503/698/420',title : 'Second Image'},
  //   {imgUrl :  'https://picsum.photos/id/523/698/420',title : 'Third Image'},
  // ];
  // typeWriter() {
  //   if (this.currentIndex < this.title.length) {
  //     this.displayedText += this.title.charAt(this.currentIndex);
  //     this.currentIndex++;
  //     setTimeout(() => this.typeWriter(), 100); // Adjust timing as needed
  //   }
  // }
}
