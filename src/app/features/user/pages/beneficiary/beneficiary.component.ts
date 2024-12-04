import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beneficiary',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './beneficiary.component.html',
  styleUrl: './beneficiary.component.scss'
})
export class BeneficiaryComponent implements OnInit{
  beneficiaryArr: any;
  carouselData: { 
    heading: string; 
    image: string[]; 
    text: string; 
    subheading: string; 
    bullets: string 
  }[] = [];
  ngOnInit(): void {
    this.getData()
  }
  constructor(private httpService : HttpService){}


  getData(){

    this.httpService.getMethod('beneficiaries').then((res: any)=>
      {
        this.beneficiaryArr = res
        this.carouselData = res.map((item: any) => ({
          heading: item.beneficiary_heading,
          bullets: item.beneficiary_points?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
        }));

  
      })
  }

} 
