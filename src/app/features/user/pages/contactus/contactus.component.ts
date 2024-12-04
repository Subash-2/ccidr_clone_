import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent implements OnInit{

  ngOnInit(): void {
    
  }


  latitude: number = 12.9814812; // Example: Space Needle latitude
  longitude: number = 77.585361; // Example: Space Needle longitude
  apiKey: string = 'AIzaSyBGzK5REYl1icyJd-Bgu4A6Af9vbH-y1FM'; // Replace with your actual API key
  mapUrl: SafeResourceUrl;
  
  constructor(private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?key=${this.apiKey}&q=${this.latitude},${this.longitude}`
    );
  }

  
}
