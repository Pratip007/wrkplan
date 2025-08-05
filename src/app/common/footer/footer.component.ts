import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  talkToSales() {
    // Handle Talk to Sales button click
    // You can integrate with your CRM or contact form here
    console.log('Talk to Sales button clicked');
    // Example: window.open('mailto:sales@wrkplan.com', '_blank');
    // Example: this.router.navigate(['/contact']);
  }

}
