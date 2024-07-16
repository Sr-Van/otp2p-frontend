import { AfterViewInit, Component, HostListener, inject } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { Trade } from '../../shared/interfaces/arrays';
import { TradesCardComponent } from '../../shared/components/trades-card/trades-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { UtilService } from '../../shared/services/util.service';
import { TradeService } from '../../shared/services/trade.service';

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
  tS$ = inject(TradeService)
  $uS = inject(UtilService)

  player: string
  isLoaded: boolean = false
  isLoadedFilter: boolean = false
  filterType: string
  itemToDelete: string
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

  public openModal(id: string): void {
    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal();

    this.itemToDelete = id
  }
  public cancelTrade(senha: string, id: string): void {

    const reqBody = {
      player: this.loginService.playerName,
      itemId: id,
      password: senha
    }

    if(this.verifyItemIsSale(id)) {
      this.cancelTradeSeller(reqBody);
      this.$uS.runActionLoading(2000);
      return
    }
    this.cancelTradeBuyer(reqBody);
    this.$uS.runActionLoading(2000);
  }

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    const dialog = document.querySelector('dialog') as HTMLDialogElement
    if(dialog.hasAttribute('open') && event.target.tagName === 'DIALOG') {
      dialog.close()
    }
  }

  private verifyItemIsSale(id: any): boolean {
    return this.playerSales.filter((i: any) => i.itemId === id).length > 0
  }

  private cancelTradeBuyer(body: any): void {

    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    dialog.close();

    this.tS$.cancelTradeBuyer(body).subscribe({
      next: (data) => {
        this.$uS.openSnack(data.msg, 'success')
        setTimeout(() => {
          window.location.reload()
        }, 400);
      }, error: (err) => {
        this.$uS.openSnack(err.error.msg, 'fail')
        throw new Error(err)
      }
    })
  }

  private cancelTradeSeller(body: any): void {
    this.tS$.cancelTradeSeller(body).subscribe({
      next: (data) => {
        this.$uS.openSnack(data.msg, 'success')
        setTimeout(() => {
          window.location.reload()
        }, 400);
      }, error: (err) => {
        this.$uS.openSnack(err.error.msg, 'fail')
        throw new Error(err)
      }
    })
  }

}
