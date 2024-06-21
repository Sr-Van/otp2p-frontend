import { Component, effect, inject } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { SalesService } from '../../shared/services/sales.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';
import { Anuncio } from '../../shared/interfaces/arrays';
import { CardComponent } from '../../shared/components/card/card.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-your-offers',
  standalone: true,
  imports: [LoadingSpinnerComponent, CardComponent],
  templateUrl: './your-offers.component.html',
  styleUrl: './your-offers.component.css'
})
export class YourOffersComponent {

  salesService = inject(SalesService)
  loginService = inject(LoginService)
  $uS = inject(UtilService)

  isLoaded: boolean = false
  salesSub: Subscription
  yourSalesArr: Anuncio[] = []

  constructor() {
    effect(() => {
      if(!!this.$uS.isOffersUpdated()) {
        this.loadSales()
      }
    })
    this.$uS.setPageName('Suas Ofertas - OTP2P')
    this.loadSales()
  }
  
  loadContent(time: number) {
    this.isLoaded = false
    setTimeout(() => {
      this.isLoaded = true
    }, time);
  }

  loadSales() {
    this.salesSub = this.salesService.getAllSales().subscribe({
      next: (data) => {

        this.yourSalesArr = data.results.filter((item: any) => item.player === this.loginService.playerName) 
        this.loadContent(1000)

      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
