import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-your-offers',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './your-offers.component.html',
  styleUrl: './your-offers.component.css'
})
export class YourOffersComponent {

  isLoaded: boolean = false

  constructor() {
    this.loadContent(1000)
  }
  
  loadContent(time: number) {
    this.isLoaded = false
    setTimeout(() => {
      this.isLoaded = true
    }, time);
  }
}
