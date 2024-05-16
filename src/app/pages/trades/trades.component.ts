import { Component, inject } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { Trade } from '../../shared/interfaces/arrays';
import { TradesCardComponent } from '../../shared/components/trades-card/trades-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [
    TradesCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './trades.component.html',
  styleUrl: './trades.component.css'
})
export class TradesComponent {

  loginService = inject(LoginService)
  offerService = inject(OfferService)

  player: string
  isLoaded: boolean = false
  getplayerTradesSubscription: Subscription
  playerSales: Trade[] = []
  playerBuys: Trade[] = []

  ngOnInit() {

    this.player = this.loginService.playerName
    this.getPlayerTrades()
    
  }

  getPlayerTrades() {
    this.getplayerTradesSubscription = this.offerService.getPlayerOffers(this.player)
      .subscribe({
        next: (data: any) => {

        this.playerSales = data.vendas

        this.playerBuys = data.compras

        
        this.isLoaded = true


      }, error: error => {

        throw new Error(error)
      }
    })
  }

}
