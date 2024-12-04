import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

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
  }
  


}
