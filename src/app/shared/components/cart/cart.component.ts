import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { Anuncio } from '../../interfaces/arrays';
import { CartCardComponent } from './cart-card/cart-card.component';
import { CurrencyPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartCardComponent, CurrencyPipe, LoadingSpinnerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  loginService = inject(LoginService)

  eventSubscription: Subscription
  cartEventSubscription: Subscription
  isCartOpen: boolean = false
  isLoaded: boolean = false
  cart: Anuncio[] = []

  total: any

  constructor() {

    this.eventSubscription = this.loginService.cartMenuEvent.subscribe(bool => {
      this.renderCart()
      this.isCartOpen = bool
      this.loadCart()
    })

    this.cartEventSubscription = this.loginService.cartItemEvent.subscribe(() => {
      this.loadCart()
      this.renderCart()
      this.getTotalCartPrice()
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
}
