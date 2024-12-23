import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';
@Component({
  selector: 'app-beneficiary',
  standalone: true,
  imports: [FormsModule,CommonModule,NgxEchartsModule],
  templateUrl: './beneficiary.component.html',
  styleUrl: './beneficiary.component.scss',
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {
        echarts,
      },
    },
  ],
})
export class BeneficiaryComponent implements OnInit{


  chartOptions: any;

  images = [
    '../../../../../assets/images/10-min.png',
    '../../../../../assets/images/11-min.png',
    '../../../../../assets/images/12-min.png',
    '../../../../../assets/images/13-min.png',
    '../../../../../assets/images/14-min.png',
  ];
  currentIndex = 2;



  isActive = false;



  @HostListener('click')
  toggleAnimation(): void {
    this.isActive = !this.isActive;
  }



  getLeftIndex(): number {
    return (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  getRightIndex(): number {
    return (this.currentIndex + 1) % this.images.length;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }








  beneficiaryArr: any;
  carouselData: { id: string; heading: string; bullets: string }[] = [];
  activeIndustry: string = '';

  ngOnInit(): void {
    this.getData();
    this.toggleAnimation();

  }
  
  constructor(private httpService : HttpService) {
    this.chartOptions = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    };
  }



  setActiveIndustry(id: string) {
    console.log('Selected Industry ID:', id);
    this.activeIndustry = id;
  }

    getData() {
      this.httpService.getMethod('beneficiaries').then((res: any) => {
        this.carouselData = res.map((item: any) => ({
          id: item.id,
          heading: item.beneficiary_heading,
          bullets: item.beneficiary_points
            ?.split('\n')
            .map((line: string) => `<p>${line.trim()}</p>`)
            .join(''),
        }));
        this.activeIndustry = this.carouselData[0]?.id ?? ''; // Set default
      });
    }

} 
