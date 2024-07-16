import { LoginService } from './../../services/login.service';
import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router } from '@angular/router';
import { HeaderPipe } from '../../pipes/header.pipe';
import { UtilService } from '../../services/util.service';
import { Subscription } from 'rxjs';
import { Anuncio } from '../../interfaces/arrays';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatTooltipModule,
    CurrencyPipe,
    HeaderPipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  router = inject(Router)
  loginService = inject(LoginService)
  utilService = inject(UtilService)
  ofS$ = inject(OfferService)

  @Input() card: Anuncio
  @Input() isYours: boolean
  source: string
  tooltip: string
  color: string
  isOnCart: boolean = false
  public loadCont: boolean = true;

  cartItemSubscription: Subscription

  constructor() {
    effect(() => {
      this.isOnCart = this.utilService.verifyItemOnCart(this.card)
      if(this.loginService.cartItem() > 0) {
        this.isOnCart = this.utilService.verifyItemOnCart(this.card)
        
      }
    })
  }

  ngOnInit() {
    this.source = this.utilService.getImgSource(this.card.type, this.card.header)

    this.tooltip = `Esse vendedor é um vendedor nivel ${this.card.badge}`
    this.color = `var(--${this.card.badge})`

    this.isOnCart = this.utilService.verifyItemOnCart(this.card)

    setTimeout(() => {
      this.loadCont = false;
    }, 2500);
  }

  goToItem(event: any) {

    if(this.isYours) return
 
    if(event.target.tagName === 'BUTTON') return
    this.router.navigate([''])
    
    setTimeout(() => {
      this.router.navigate([`item/${this.card.itemId}`])
    }, 100);
  }

  handleButton() {

    if(this.isYours) {
      this.removeSale()
      return
    }
    
    if(this.isOnCart) {
      this.loginService.removeItem(this.card)
      this.loginService.updateCartItem()
      this.utilService.runActionLoading(1000);
      return
    }
    this.loginService.addItem(this.card);
    this.utilService.runActionLoading(1300);
    this.loginService.updateCartItem()
  }

  verifyItemOnCart() {
    const arr = this.loginService.getCart();

    arr?.filter((item: any) => item.itemId === this.card.itemId).length > 0 
    ? this.isOnCart = true 
    : this.isOnCart = false
  }

  removeSale() {
    if (!this.isYours) return

    const obj = {
      itemId: this.card.itemId,
      player: this.loginService.playerName
    }

    this.ofS$.removeOffer(obj).subscribe({
      next: () => {
        this.utilService.isOffersUpdated.update(bool => !bool)
        this.utilService.openSnack(`${this.card.header} removido dos seus anuncios`, 'success')
        this.utilService.runActionLoading(1800);
      }, error: (err) => {
        console.log(err)
      }, complete: () => {
        console.log('item removido')
      }
    })
  }

}
