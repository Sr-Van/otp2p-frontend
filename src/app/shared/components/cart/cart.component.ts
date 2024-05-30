import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { Anuncio } from '../../interfaces/arrays';
import { CartCardComponent } from './cart-card/cart-card.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartCardComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  loginService = inject(LoginService)

  eventSubscription: Subscription
  isCartOpen: boolean = false
  cart: Anuncio[] = []

  constructor() {

    this.renderCart()

    this.eventSubscription = this.loginService.cartMenuEvent.subscribe(bool => {
      this.renderCart()
      this.isCartOpen = bool
    })
  }

  renderCart() {
    this.cart = this.loginService.getCart()
  }

}
