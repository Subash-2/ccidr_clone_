import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit{

  eventsArr : any = []

  constructor(private httpServie : HttpService){}

  ngOnInit(): void {
    this.getData()
  }

  getData(){
this.httpServie.getMethod('events').then((res:any)=>{
  this.eventsArr = res
})
  }

}
