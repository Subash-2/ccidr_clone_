import { Component, OnInit } from '@angular/core';
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

  constructor(private httpService : HttpService){}


  resourceArr : any = []


  ngOnInit(): void {
   this.getData();
  }

  getData(){
    this.httpService.getMethod('resources').then((res:any)=>{

      this.resourceArr = res
      console.log('resource>>>>>',this.resourceArr);
      

    })
  }

}
