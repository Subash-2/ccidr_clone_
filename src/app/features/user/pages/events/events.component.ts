import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  eventsArr: any = [];
  @Input() carouselData: {
    heading: string;
    image: string[];
    text: string;
    id: number;
  }[] = [];
  // carouselIndices: number[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.httpService.getMethod('events').then((res: any) => {
      this.eventsArr = res;
      this.carouselData = res.map((item: any) => ({
        id: item.id,
        heading: item.events_heading,
        image: item.events_image.map(
          (img: any) => `https://ccitr.emeetify.com${img?.url}`
        ),
        text: item.events_paragraph
          ?.split('\n')
          .map((line: string) => `<p>${line.trim()}</p>`)
          .join(''),
      }));
      this.carouselIndices = Array(this.carouselData.length).fill(0); // Initialize carousel indices
    });
  }

  // nextImage(carouselIndex: number, imageCount: number) {
  //   this.carouselIndices[carouselIndex] = (this.carouselIndices[carouselIndex] + 1) % imageCount;
  // }

  // prevImage(carouselIndex: number, imageCount: number) {
  //   this.carouselIndices[carouselIndex] = (this.carouselIndices[carouselIndex] - 1 + imageCount) % imageCount;
  // }

  activateImage(carouselIndex: number, imageIndex: number): void {
    this.carouselIndices[carouselIndex] = imageIndex;
  }
  


  carouselIndices = [0, 0]; // Adjust size to match `items` length

  // Navigate to the previous image
  prevImage(carouselIndex: number, length: number): void {
    this.carouselIndices[carouselIndex] =
      (this.carouselIndices[carouselIndex] - 1 + length) % length;
  }

  // Navigate to the next image
  nextImage(carouselIndex: number, length: number): void {
    this.carouselIndices[carouselIndex] =
      (this.carouselIndices[carouselIndex] + 1) % length;
  }
}




