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
  onMouseMove(event: MouseEvent) {
    const card = (event.currentTarget as HTMLElement);
    const rect = card.getBoundingClientRect();
    const xAxis = ((event.clientX - rect.left) / rect.width - 0.5) * 30;
    const yAxis = ((event.clientY - rect.top) / rect.height - 0.5) * 30;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) perspective(1000px)`;
  }

  resetTransform() {
    document.querySelectorAll<HTMLElement>('.image-card').forEach(card => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
  
}

