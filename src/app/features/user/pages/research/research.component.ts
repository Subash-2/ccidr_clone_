import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./research.component.html',
  styleUrl: './research.component.scss'
})
export class ResearchComponent implements OnInit,OnDestroy{

  constructor(private httpService : HttpService){}
  contentArr : any = []
  isSliding = false;
  carouselData: { left: string; right: string; text: string;span:string }[] = [];;
  currentIndex = 0;
  autoScrollInterval!: any;

  ngOnInit(): void {

    this.getData()
    // this.startAutoScroll();

    
  }
  ngOnDestroy() {
    clearInterval(this.autoScrollInterval);
  }


  next() {
    if (this.isSliding) return;
  
    this.isSliding = true;
  
    // Preload next images to avoid visual glitches
    const nextIndex = (this.currentIndex + 1) % this.carouselData.length;
    this.preloadImages(nextIndex).then(() => {
      requestAnimationFrame(() => this.triggerSlideAnimation());
      setTimeout(() => {
        this.currentIndex = nextIndex;
        this.isSliding = false;
      }, 800);  // Match with animation duration
    });
  }
  
  prev() {
    if (this.isSliding) return;
  
    this.isSliding = true;
  
    // Preload previous images to avoid visual glitches
    const prevIndex = (this.currentIndex - 1 + this.carouselData.length) % this.carouselData.length;
    this.preloadImages(prevIndex).then(() => {
      requestAnimationFrame(() => this.triggerSlideAnimation());
      setTimeout(() => {
        this.currentIndex = prevIndex;
        this.isSliding = false;
      }, 800);
    });
  }
  
  // Preload images to ensure they are ready before showing
  preloadImages(index: number): Promise<void> {
    const leftImage = new Image();
    const rightImage = new Image();
  
    leftImage.src = this.carouselData[index].left;
    rightImage.src = this.carouselData[index].right;
  
    return Promise.all([
      this.imageLoadPromise(leftImage),
      this.imageLoadPromise(rightImage),
    ]).then(() => {});
  }
  
  imageLoadPromise(img: HTMLImageElement): Promise<void> {
    return new Promise((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();  // Fallback in case of an error
    });
  }
  
  
  startAutoScroll() {
    clearInterval(this.autoScrollInterval); // Prevent multiple intervals
    this.autoScrollInterval = setInterval(() => {
      this.next();
    }, 3000); // Reduced for testing (3 seconds)
  }

  triggerSlideAnimation() {
    this.isSliding = true;
  }

  getData(){
    
    this.httpService.getMethod('inventions').then((res: any)=>
      {
        this.contentArr = res
        this.carouselData = res.map((item: any) => ({
          left: `https://ccitr.emeetify.com${item.research_left_image?.url}`,
          right: `https://ccitr.emeetify.com${item.research_right_image?.url}`,
          text: item.research_bullet_1,
          span: item.research_highlighter,

        }));
        console.log('item',this.carouselData);

        // this.startAutoScroll();
      });
    }



    
    
  }


 


