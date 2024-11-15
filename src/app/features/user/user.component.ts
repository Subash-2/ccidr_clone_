import { Component,HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../core/layout/header/header.component';
import { FooterComponent } from "../../core/layout/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent,CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50; // Change the threshold as needed
  }

  isDropdownOpen = false;
  isDropdownOpens = false;
  isDropdownOpening = false;


  isDrawerOpen = false;

  sidebarVisible = false;

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.sidebarVisible = !this.sidebarVisible;

  }
  toogleDrawerClose() : void {
    this.isDrawerOpen = this.isDrawerOpen

  }

   toggleSidebar() {
    // document.getElementById("sidebar").classList.toggle("active");
  }
  

}
