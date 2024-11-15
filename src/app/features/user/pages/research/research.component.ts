import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss'
})
export class ResearchComponent implements OnInit{

  constructor(private httpService : HttpService){}
  contentArr : any = []

  ngOnInit(): void {

    this.getData()
    
  }

  getData(){
    
    this.httpService.getMethod('inventions').then((res: any)=>
      {
        this.contentArr = res
        console.log(this.contentArr);
  
      })
  }

}
