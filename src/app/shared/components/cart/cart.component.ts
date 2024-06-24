import { Component, effect, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Anuncio } from '../../interfaces/arrays';
import { CartCardComponent } from './cart-card/cart-card.component';
import { CurrencyPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TradeService } from '../../services/trade.service';
import { Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { UtilService } from '../../services/util.service';
import { filter, switchMap } from 'rxjs';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartCardComponent, CurrencyPipe, LoadingSpinnerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  loginService = inject(LoginService)
  tradeService = inject(TradeService)
  ofS$ = inject(OfferService)
  utS$ = inject(UtilService)
  router = inject(Router)

  isCartOpen: boolean = false
  isLoaded: boolean = false
  cart: Anuncio[] = []

  total: any
  playerAmmount: number = 0

  constructor() {

    this.renderCart()

    effect(() => {
      this.playerAmmount = this.ofS$.userAmmount()
      this.isCartOpen = this.loginService.cartMenu()
      if(this.loginService.cartItem() >= 0) {
        this.renderCart()
        this.loadCart()
        this.getTotalCartPrice()
      }
    })

  }


  loadCart() {
    this.isLoaded = false
    setTimeout(() => {
      this.isLoaded = true
    }, 500);
  }

  renderCart() {
    this.cart = this.loginService.getCart()
    this.getTotalCartPrice()
  }

  getTotalCartPrice() {
    this.total = this.cart.reduce((accumulator, {price}) => accumulator + Number(price), 0) || 0
  }

  addTrade(pass: string) {
    console.log('addTrade method called')

    if(!this.verifyPlayerAmount()) {
      console.log('Player amount is not sufficient')
      return
    }
    
    // TODO: trocar para metodos separados que enviam para um endpoint quando for apenas um ou para um endpoint quando for muitos
    
    for (const item of this.cart) {
      console.log('Processing item:', item)
      const tradeBody = {
        itemId: item.itemId,
        player: item.player,
        trade_player: this.loginService.playerName
      }

      this.ofS$.removeAmmount({
        ammount: item.price,
        password: pass
      }).pipe(
        filter(({msg}) => msg === 'Retirada feita com sucesso!'),
        switchMap(() => this.tradeService.addTrade(tradeBody))
      ).subscribe({
        next: (data) => {
          console.log('Trade added successfully:', data.msg)
        }, error: (err) => {
          console.log('Error adding trade:', err)
        }, complete: () => {
          console.log('Trade addition process completed')
          this.ofS$.updateAmmount()
          this.loginService.removeItem(item)
          this.loadCart()
          this.router.navigate(['/trades'])
        }
      })

    }
  }

  verifyPlayerAmount(): boolean {
    return this.playerAmmount >= this.total
  }

  goToRoute(route: string) {
    this.router.navigate(['/' + route])
  }

}
