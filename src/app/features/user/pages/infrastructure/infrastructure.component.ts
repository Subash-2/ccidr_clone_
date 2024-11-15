import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-infrastructure',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './infrastructure.component.html',
  styleUrl: './infrastructure.component.scss'
})
export class InfrastructureComponent implements AfterViewInit{

  @ViewChildren('imageElement') imageElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.typeWriter();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Add the visible class when in view
          observer.unobserve(entry.target); // Stop observing once the animation has been applied
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the image is visible

    this.imageElements.forEach((image) => {
      observer.observe(image.nativeElement);
    });
  }

  // slides = [
  //   {
  //     imgUrl: 'https://picsum.photos/id/545/698/420',
  //     caption: 'The Lorem Ipsum for photos.',
  //     title: 'Lorem ipsum',
  //   },
  //   {
  //     imgUrl: 'https://picsum.photos/id/503/698/420',
  //     caption: 'The Lorem Ipsum for photos.',
  //     title: 'Lorem ipsum',
  //   },
  //   {
  //     imgUrl: 'https://picsum.photos/id/523/698/420',
  //     caption: 'The Lorem Ipsum for photos.',
  //     title: 'Lorem ipsum',
  //   },
   
  // ];

  title: string = 'Welcome to Angular 27!';
  displayedText: string = '';
  private currentIndex: number = 0;

  images  = [{imgUrl :  'https://picsum.photos/id/545/698/420',title : 'First Image'},
    {imgUrl :   'https://picsum.photos/id/503/698/420',title : 'Second Image'},
    {imgUrl :  'https://picsum.photos/id/523/698/420',title : 'Third Image'},
  ];
  typeWriter() {
    if (this.currentIndex < this.title.length) {
      this.displayedText += this.title.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.typeWriter(), 100); // Adjust timing as needed
    }
  }
}
