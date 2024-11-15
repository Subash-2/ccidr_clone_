import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, Input, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit,AfterViewInit{

  constructor(private el: ElementRef, private renderer: Renderer2,private httpService : HttpService) {}
  contentArr : any = []
  beneficiaryArr : any = []
  judiciaryArr : any = []
  buildingArr : any = []
  programArr : any = []

  items: number[] = [];  // Array to hold items
  isLoading = false;     // Loading state for the spinner


    
  /**Infinite Carousel */
  @Input() images: { src: string; alt: string }[] = [
    { src: 'https://a.storyblok.com/f/79434/x/df6a77389d/dhl-with-white-bg.svg', alt: 'dhl' },
    { src: 'https://a.storyblok.com/f/79434/x/b3ddb46ffd/fedex.svg', alt: 'fedex' },
    { src: 'https://a.storyblok.com/f/79434/x/13b7cfbff0/ups.svg', alt: 'ups' },
    { src: 'https://a.storyblok.com/f/79434/x/bed370f7c7/upsp.svg', alt: 'upsp' },
    { src: 'https://a.storyblok.com/f/79434/x/3d19ae9058/ems.svg', alt: 'ems' },
    { src: 'https://a.storyblok.com/f/79434/x/0a2ea7112b/dpd.svg', alt: 'dpd' },
    { src: 'https://a.storyblok.com/f/79434/x/fe62ffeb3c/gls.svg', alt: 'gls' },
    { src: 'https://a.storyblok.com/f/79434/x/863af19f44/auspost.svg', alt: 'auspost' },
  ];

 


 


  ngAfterViewInit() {
    const totalItems = this.images.length * 1; // original + cloned items
    this.renderer.setStyle(this.el.nativeElement, '--total-items', totalItems);
  }


  getData(){

    this.httpService.getMethod('beneficiaries').then((res: any)=>
      {
        this.beneficiaryArr = res
  
      })

      
    this.httpService.getMethod('Judiciaries').then((res: any)=>
      {
        this.judiciaryArr = res
        
  
      })

      this.httpService.getMethod('buildings').then((res: any)=>
        {
          this.buildingArr = res
    
        })

      this.httpService.getMethod('programs').then((res: any)=>
        {
          this.programArr = res
    
        })
    
    this.httpService.getMethod('Trainings').then((res: any)=>
      {
        this.contentArr = res

      })
    
  }


  ngOnInit() {
   
    this.getData()

  }

 
  loadItems() {
    this.isLoading = true;
    setTimeout(() => {
      // Simulate fetching data
      const nextItems = Array.from({ length: 20 }, (_, i) => this.items.length + i + 1);
      this.items.push(...nextItems);
      this.isLoading = false;
    }, 1000);
  }

}
