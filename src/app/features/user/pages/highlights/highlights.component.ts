import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [],
  // providers:[HttpService],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.scss'
})
export class HighlightsComponent implements OnInit{
  
  constructor(private http : HttpService){}

  ngOnInit(): void {

    console.log('highlights called');
    

    this.http.getMethod('ccitrdemos').then((res:any)=>{

      console.log('res',res);
      

    })
    
  }

  

}
