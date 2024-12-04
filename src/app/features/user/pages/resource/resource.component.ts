import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss'
})
export class ResourceComponent implements OnInit{
  @Input() carouselData: { 
    heading: string; 
    image: string[]; 
    text: string; 
    subheading: string; 
    bullets: string 
  }[] = [];
  
  carouselIndices: number[] = [];
  resourceArr: any = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.httpService.getMethod('assets').then((res: any) => {
      this.resourceArr = res;
      this.carouselData = res.map((item: any) => ({
        heading: item.resource_header,
        image: item.resource_image_array.map(
          (img: any) => `https://ccitr.emeetify.com${img.url}`
        ),
        text: item.resource_para.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
        subheading: item.resource_subheader,
        bullets: item.resource_bullets?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
      }));

      // Initialize carouselIndices after loading data
      this.carouselIndices = Array(this.carouselData.length).fill(0);
      console.log('Formatted Carousel Data:', this.carouselData[0]);
    });
  }

  nextImage(carouselIndex: number, imageCount: number) {
    this.carouselIndices[carouselIndex] = 
      (this.carouselIndices[carouselIndex] + 1) % imageCount;
  }

  prevImage(carouselIndex: number, imageCount: number) {
    this.carouselIndices[carouselIndex] = 
      (this.carouselIndices[carouselIndex] - 1 + imageCount) % imageCount;
  }
}
