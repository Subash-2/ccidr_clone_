import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infinite-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-carousel.component.html',
  styleUrl: './infinite-carousel.component.scss'
})
export class InfiniteCarouselComponent implements OnInit{

  homeArr : any = []
  images: { src: string; text: string,newImg : string }[] = [];
  activeIndex = 0;
  dynamicImages! : any;
  currentIndex = 0;
  progress = 0;

  constructor(private httpService : HttpService){}


  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.httpService.getMethod('Homes').then(
      (res:any) => {
        this.homeArr = res
        this.images = res
          .filter((item:any) => item?.home_title_4_image?.url)
          .map((item:any) => ({
            src: `https://ccitr.emeetify.com${item.home_title_4_image.url}`, 
            text: item.home_subheader_bullet_2 || 'Default Text', 
            newImg : `https://ccitr.emeetify.com${item.facilities_image.url}`
          }));  
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    ); 
  }



  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

}
