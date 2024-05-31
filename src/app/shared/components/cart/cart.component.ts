import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { Anuncio } from '../../interfaces/arrays';
import { CartCardComponent } from './cart-card/cart-card.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartCardComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  loginService = inject(LoginService)

  eventSubscription: Subscription
  isCartOpen: boolean = false
  cart: Anuncio[] = []

  total: any

  constructor() {

    this.eventSubscription = this.loginService.cartMenuEvent.subscribe(bool => {
      this.renderCart()
      this.isCartOpen = bool
    })
  }

  ngOnInit() {
    this.renderCart()
  }

  renderCart() {
    this.cart = this.loginService.getCart()
    this.getTotalCartPrice()
  }

  getTotalCartPrice() {
    this.total = this.cart.reduce((accumulator, {price}) => accumulator + Number(price), 0) || 0
  }
}
