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

  ngOnInit(): void {

    this.getData()
    
  }

  getData(){
    
    this.httpService.getMethod('aboutuses').then((res: any)=>
      {
        this.contentArr = res
        console.log(res);
  
      })
  }

}


// https://ccitr.emeetify.com/aboutuses