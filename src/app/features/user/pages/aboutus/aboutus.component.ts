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
  onMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * 20;
    const rotateY = (x - 0.5) * 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onMouseLeave(): void {
    const card = document.querySelector('.image-card') as HTMLElement;
    card.style.transform = '';
  }
}

