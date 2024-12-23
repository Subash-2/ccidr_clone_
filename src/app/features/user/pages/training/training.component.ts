import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, Input, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';


import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';
import { FormsModule } from '@angular/forms';
import { BeneficiaryComponent } from "../beneficiary/beneficiary.component";


@Component({
  selector: 'app-training',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxEchartsModule, BeneficiaryComponent],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
  
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {
        echarts,
      },
    },
  ],
})
export class TrainingComponent implements OnInit,AfterViewInit{
  chartOptions: any;
  pieName: any;
  pieYear: any;
  pieValue: any;
  selectedYear: string = '';
  
 @Input() carouselData: { 
  heading: string; 
  image: string[]; 
  bullets: string;
  paragraph :string;
}[] = [];


@Input() curriculamData : {
  heading: string; 
  subheading : string; 
  image: string[];
  bullets: string;
  paragraph:string
}[] = []

activeTab: number = 0;

setActiveTab(index: number) {
  this.activeTab = index;
}


  constructor(private el: ElementRef, private renderer: Renderer2,private httpService : HttpService) {}

  contentArr : any = []
  beneficiaryArr : any = []
  judiciaryArr : any = []
  buildingArr : any = []
  programArr : any = []
  items: number[] = [];  
  isLoading = false;   
  curriculaArr : any =[]
  
  
  groupedData: any[] = [];

    
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

  groupDataByYear(data: any[]) {
    return data.reduce((acc: any, item: any) => {
      const year = item.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({ value: item.value, name: item.name });
      return acc;
    }, {});
  }


  getData(){


    this.httpService.getMethod('Curricula').then((res:any)=>{
      this.curriculaArr = res;
      console.log('this.curriculaArr',this.curriculaArr)
      this.curriculamData = res.map((item: any) => ({
        heading: item.curriculam_pills,
        subheading: item.curriculam_subtitle,
        paragraph: item.curriculam_paragraph?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
        image: item.curricualm_image.map(
          (img: any) => `https://ccitr.emeetify.com${img.url}`
        ),
        bullets: item.curriculam_bullets?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),

      }));
    })

  
    this.httpService.getMethod('Judiciaries').then((res: any)=>
      {
        this.judiciaryArr = res
      })

      this.httpService.getMethod('buildings').then((res: any)=>
        {
          this.buildingArr = res
          console.log('building Response',this.buildingArr);


          this.carouselData = res.map((item: any) => ({
            heading: item.capacity_subtitle,
            // image: item.resource_image_array.map(
            //   (img: any) => `https://ccitr.emeetify.com${img.url}`
            // ),
            paragraph: item.main_paragraph?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),

            bullets: item.capacity_subtitle_bullets?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
          }));
          

          this.groupedData = this.processData(this.buildingArr);

          // Set the default year to the first year's data
          if (this.groupedData.length > 0) {
            this.selectedYear = this.groupedData[0].year;
            this.updateChart(this.selectedYear);
          }
    
    
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

 



  processData(data: any[]) {
    return data.map(item => {
      // Split the names and values to create pie chart data
      const names = item.capactiy_pie_chart_name.split('  ');
      const values = item.capactiy_pie_chart_value.split(',').map(Number);

      // Map names and values to chart data format
      const chartData = names.map((name: string, index: number) => ({
        name,
        value: values[index]
      }));

      return {
        year: item.capactiy_pie_chart_year,
        data: chartData
      };
    });
  }

  // Update chart based on the selected year
  updateChart(selectedYear: string) {
    const selectedData = this.groupedData.find(group => group.year === selectedYear);

    if (selectedData) {
      this.chartOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
     
        series: [
          {
            name: `Year: ${selectedData.year}`,
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              formatter: '{b}: {c} ({d}%)',
              show: true
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            data: selectedData.data
          }
        ]
      };
    }
  }

  // Handle year tab selection
  onYearTabClick(year: string) {
    this.selectedYear = year;
    this.updateChart(year);
  }




}
