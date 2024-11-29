import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss'
})
export class ResearchComponent implements OnInit,OnDestroy{

  constructor(private httpService : HttpService){}
  contentArr : any = []
  isSliding = false;

  carouselData: { left: string; right: string; text: string;span:string }[] = [];

  // images = [
  //   { left: '../../../../../assets/images/16-min.JPG', right: '../../../../../assets/images/10-min.png' },
  //   { left: '../../../../../assets/images/17-min.jpg', right: '../../../../../assets/images/8-min.jpg' },
  //   { left: '../../../../../assets/images/18-min.png', right: '../../../../../assets/images/9-min (1)_11zon.png' },
  //   // { left: 'assets/image3-left.jpg', right: 'assets/image3-right.jpg' },
  // ];
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
    
    this.httpService.getMethod('inventions').then((res: any)=>
      {
        this.contentArr = res
        this.carouselData = res.map((item: any) => ({
          left: `https://ccitr.emeetify.com${item.research_left_image?.url}`,
          right: `https://ccitr.emeetify.com${item.research_right_image?.url}`,
          text: item.research_bullet_1,
          span: item.research_highlighter,

        }));
        this.startAutoScroll();
      });
    }



    
    
  }


 


