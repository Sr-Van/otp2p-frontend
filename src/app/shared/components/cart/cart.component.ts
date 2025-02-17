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
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartCardComponent, CurrencyPipe, LoadingSpinnerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  animations: [
    trigger('enterAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms ease', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
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
      
      if(this.loginService.cartItem() >= 0) {
        this.renderCart()
        this.loadCart()
        this.getTotalCartPrice()
      }

      if(!this.loginService.cartMenu()) {
        setTimeout(() => {
          this.isCartOpen = this.loginService.cartMenu();
        }, 300);
      } else {
        this.isCartOpen = this.loginService.cartMenu()
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
          this.utS$.runActionLoading(2000);
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
