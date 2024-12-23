import { Component, Renderer2, ElementRef, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit, OnDestroy{
  homeArr: any;
  constructor(private renderer: Renderer2,private httpService : HttpService,private el: ElementRef) {}
  // images: { src: string; text: string }[] = [];
  images: { src: string; text: string }[] = [];
  visibleImages: { src: string; text: string }[] = [];
  currentTranslate = 0;
  slideWidth = 220; // Card width including margin
  transition = 'none';
  intervalId: any;



  ngOnInit(): void {
    this.getData()

  }
  // onMouseMove(event: MouseEvent) {
  //   const card = event.currentTarget as HTMLElement;
  //   const rect = card.getBoundingClientRect();
  //   const centerX = rect.left + rect.width / 2;
  //   const centerY = rect.top + rect.height / 2;
  //   const xAxis = ((event.clientX - centerX) / rect.width) * 20;
  //   const yAxis = ((event.clientY - centerY) / rect.height) * -20;

  //   this.renderer.setStyle(card, 'transform', `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`);
  // }

  // resetTransform() {
  //   const cards = document.querySelectorAll<HTMLElement>('.image-card');
  //   cards.forEach(card => {
  //     this.renderer.setStyle(card, 'transform', 'perspective(1000px) rotateY(0deg) rotateX(0deg)');
  //   });
  // }





  

//  ngAfterViewInit(): void {
//     const scrollers = this.el.nativeElement.querySelectorAll('.scroller');

//     if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
//       this.addAnimation(scrollers);
//     }
//   }

//   private addAnimation(scrollers: NodeListOf<HTMLElement>): void {
//     scrollers.forEach((scroller) => {
//       const scrollerInner = scroller.querySelector<HTMLElement>('.scroller__inner');

//       if (scrollerInner) {
//         const scrollerContent = Array.from(scrollerInner.children);

//         // Clone the content for infinite scrolling
//         const duplicatedContent = [...scrollerContent].map((item) => {
//           const duplicatedItem = item.cloneNode(true) as HTMLElement;
//           this.renderer.setAttribute(duplicatedItem, 'aria-hidden', 'true');
//           return duplicatedItem;
//         });

//         // Append the duplicated content to the scroller
//         duplicatedContent.forEach((item) => {
//           this.renderer.appendChild(scrollerInner, item);
//         });

//         this.renderer.setAttribute(scroller, 'data-animated', 'true');
//       }
//     });
//   }

getData(): void {
  this.httpService.getMethod('Homes').then(
    (res: any) => {

      this.homeArr = res;

      this.images = res
        .filter((item: any) => item?.main_image?.url)
        .map((item: any) => ({
          src: `https://ccitr.emeetify.com${item.main_image.url}`,
          text: item.home_subheader_bullet_2 || 'Default Text',
        }));

      // Prepare images for infinite loop after fetching
      this.visibleImages = [...this.images, ...this.images,...this.images,...this.images];
      this.startContinuousScroll();
    },
    (error:any) => {
      console.error('Error fetching data:', error);
    }
  );
}

pauseScroll() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

resumeScroll() {
  if (!this.intervalId) {
    this.startContinuousScroll();
  }
}



startContinuousScroll() {
  const totalWidth = this.slideWidth * this.images.length;

  this.intervalId = setInterval(() => {
    this.currentTranslate += 1; // Move by 1px each frame
    this.transition = 'none'; // Continuous smooth movement

    // Reset to the start when end of duplicate set is reached
    if (this.currentTranslate >= totalWidth) {
      this.currentTranslate = 0;
    }
  }, 16); // ~60fps smooth scrolling
}

ngOnDestroy() {
  clearInterval(this.intervalId);
}

}
