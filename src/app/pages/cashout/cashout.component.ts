import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-cashout',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './cashout.component.html',
  styleUrl: './cashout.component.css'
})
export class CashoutComponent {

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
