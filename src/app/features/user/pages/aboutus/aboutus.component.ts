import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent implements OnInit{

  constructor(private httpService : HttpService){}
  contentArr : any = []
  bullet! : number
  imagesArr! : any

  ngOnInit(): void {

    this.getData()
    
  }
  

  getData(){
    
    this.httpService.getMethod('about-uses').then((res: any)=>
      {
        this.contentArr = res
         for (let myArr = 0;myArr > 0;myArr++){
        }
      })
      this.httpService.getMethod('Whos').then((res:any)=>{
        this.imagesArr = res
      })
  }
}

