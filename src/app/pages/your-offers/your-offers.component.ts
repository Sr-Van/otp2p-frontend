import { Component, inject } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { SalesService } from '../../shared/services/sales.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';
import { Anuncio } from '../../shared/interfaces/arrays';

@Component({
  selector: 'app-your-offers',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './your-offers.component.html',
  styleUrl: './your-offers.component.css'
})
export class YourOffersComponent {

  salesService = inject(SalesService)
  loginService = inject(LoginService)

  isLoaded: boolean = false
  salesSub: Subscription
  yourSalesArr: Anuncio[] = []

  constructor() {
    this.salesSub = this.salesService.getAllSales().subscribe({
      next: (data) => {

        this.yourSalesArr = data.results.filter((item: any) => item.player === this.loginService.playerName) 
        this.loadContent(1000)
        
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  
  loadContent(time: number) {
    this.isLoaded = false
    setTimeout(() => {
      this.isLoaded = true
    }, time);
  }
}
