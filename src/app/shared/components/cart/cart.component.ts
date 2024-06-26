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

    if(!this.verifyPlayerAmount()) {
      return
    }
    
    if(this.cart.length > 0) {
      this.utS$.openSnack('Por estar no beta, talvez precisa fazer mais de um trade para mais de um item.', 'warning')
    }

    for (const item of this.cart) {
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
          this.utS$.openSnack(data.msg, 'success')
        }, error: (err) => {
          this.utS$.openSnack(err.error.msg, 'fail')
        }, complete: () => {
          this.ofS$.updateAmmount()
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
