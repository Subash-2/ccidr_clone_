import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, OnDestroy, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';

interface Bullet {
  mainText: string;
  subTexts: string[];
}

@Component({
  selector: 'app-internship',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './internship.component.html',
  styleUrl: './internship.component.scss'
})




export class InternshipComponent implements OnInit {
  fullText = 'Your Topic Title';
  textToShow = 'Your Topic Title';
  // private currentIndex = 0;
  private delay = 100; // Adjust for typing speed (ms)

  @Input() internshipData : {
    heading: string; 
    subheading : string; 
    image: string[];
    bullets: Bullet[];
    paragraph:string;
    id: string;
  }[] = []



  @HostListener('click')
  toggleAnimation(): void {
    this.isActive = !this.isActive;
  }

  constructor(private httpService : HttpService){}

  internshipArr : any = []
  newArr : any

  currentIndex = 2;
  

  isActive = false;
  activeIndustry: string = '';
  activeTab: number = 0;


  images: any[] = [];





  ngOnInit(): void {
    this.getData();
    this.toggleAnimation();  
  }

  setActiveIndustry(id: string) {
    console.log('Selected Industry ID:', id);
    this.activeIndustry = id;
  }


  // getData(){

  //   this.httpService.getMethod('internships').then((res:any)=> {
  //     this.internshipArr = res
  //     console.log(this.internshipArr)


  //     this.internshipData = res.map((item: any) => ({
  //       heading: item.internship_pills,
  //       subheading: item.internship_subheader?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
  //       paragraph: item.internship_para?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
  //       image: item.internship_image.map(
  //         (img: any) => `https://ccitr.emeetify.com${img.url}`
  //       ),
  //       bullets: item.internship_subheader_bullets?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
  //     }));
  //     // this.activeIndustry = this.internshipData[0]?.id ?? ''; 
  //     this.updateImages(0);
  //   })
  //   }

  getData() {
    this.httpService.getMethod('internships').then((res: any) => {
      this.internshipArr = res;
      console.log(this.internshipArr);
  
      this.internshipData = res.map((item: any) => {
        const bullets: Bullet[] = item.internship_subheader_bullets
          ?.split('\n\n\n')
          .map((section: string) => {
            const [mainText, ...subTexts] = section.split('\n');
            return {
              mainText: mainText.trim(),
              subTexts: subTexts.map((text: string) => text.trim()),
            };
          }) || [];
  
        return {
          heading: item.internship_pills,
          paragraph: item.internship_para?.split('\n').map((line: string) => `<p>${line.trim()}</p>`).join(''),
          image: item.internship_image.map(
            (img: any) => `https://ccitr.emeetify.com${img.url}`
          ),
          bullets: bullets,
        };
      });
  
      this.updateImages(0);
    });
  }
  

    updateImages(index: number) {
      this.currentIndex = 0;
      this.images = this.internshipData[index]?.image || [];
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
}
