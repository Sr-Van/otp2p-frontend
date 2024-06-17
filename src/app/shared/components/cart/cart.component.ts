import { Component, effect, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { Anuncio } from '../../interfaces/arrays';
import { CartCardComponent } from './cart-card/cart-card.component';
import { CurrencyPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TradeService } from '../../services/trade.service';
import { Router } from '@angular/router';


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
  router = inject(Router)

  eventSubscription: Subscription
  cartEventSubscription: Subscription
  isCartOpen: boolean = false
  isLoaded: boolean = false
  cart: Anuncio[] = []

  total: any

  constructor() {

    effect(() => {
      this.isCartOpen = this.loginService.cartMenu()
      if(this.loginService.cartItem() > 0) {
        this.renderCart()
        this.loadCart()
        this.getTotalCartPrice()
      }
    })

  }

  ngOnInit() {
    this.renderCart()
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
}
