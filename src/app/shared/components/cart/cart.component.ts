import { Component, effect, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Anuncio } from '../../interfaces/arrays';
import { CartCardComponent } from './cart-card/cart-card.component';
import { CurrencyPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TradeService } from '../../services/trade.service';
import { Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';


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

  addTrade() {

    if(!this.verifyPlayerAmount()) {
      return
    }
    
    for (const item of this.cart) {
      const tradeBody = {
        itemId: item.itemId,
        player: item.player,
        trade_player: this.loginService.playerName
      }

      this.tradeService.addTrade(tradeBody).subscribe(
        {
          next: (data) => {
            console.log(data.msg)
          }, error: (err) => {
            console.log(err)
          }, complete: () => {
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
