import { AfterViewInit, Component, inject } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { Trade } from '../../shared/interfaces/arrays';
import { TradesCardComponent } from '../../shared/components/trades-card/trades-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { UtilService } from '../../shared/services/util.service';

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
export class TradesComponent implements AfterViewInit {

  loginService = inject(LoginService)
  offerService = inject(OfferService)
  $uS = inject(UtilService)

  player: string
  isLoaded: boolean = false
  isLoadedFilter: boolean = false
  filterType: string
  getplayerTradesSubscription: Subscription
  playerSales: Trade[] = []
  playerBuys: Trade[] = []

  ngOnInit() {

    this.$uS.setPageName('Trocas - OTP2P')

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.switchFilter('buys')
    }, 900);
  }

  switchFilter(type: string) {

    const btnActv = document?.querySelector('[actived-filter]')
    btnActv?.removeAttribute('actived-filter')


    const btn = document?.getElementById(type)
    btn?.setAttribute('actived-filter', '')

    this.filterType = type

    this.isLoadedFilter = false
    setTimeout(() => {
      this.isLoadedFilter = true
      
    }, 500);
  }

}
