import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  mobileDropdowns = {
    products: false,
    solutions: false,
    customerSuccess: false
  };

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleMobileDropdown(dropdown: keyof typeof this.mobileDropdowns) {
    this.mobileDropdowns[dropdown] = !this.mobileDropdowns[dropdown];
  }
}
