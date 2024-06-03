import { LoginService } from './../../services/login.service';
import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router } from '@angular/router';
import { HeaderPipe } from '../../pipes/header.pipe';
import { UtilService } from '../../services/util.service';
import { Subscription } from 'rxjs';

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
export class CardComponent implements OnInit, OnDestroy{

  router = inject(Router)
  loginService = inject(LoginService)
  utilService = inject(UtilService)

  @Input() card: any
  source: string
  tooltip: string
  color: string
  isOnCart: boolean = false

  cartItemSubscription: Subscription

  ngOnInit() {
    this.source = this.utilService.getImgSource(this.card)

    this.tooltip = `Esse vendedor é um vendedor nivel ${this.card.badge}`
    this.color = `var(--${this.card.badge})`

    this.isOnCart = this.utilService.verifyItemOnCart(this.card)
    this.cartItemSubscription = this.loginService.cartItemEvent.subscribe(() => {
      this.isOnCart = this.utilService.verifyItemOnCart(this.card)
    })
  }

  goToItem(event: any) {
 
    if(event.target.tagName === 'BUTTON') return
    this.router.navigate([''])
    
    setTimeout(() => {
      this.router.navigate([`item/${this.card.itemId}`])
    }, 100);
  }

  addToCart() {
    
    if(this.isOnCart) {
      this.loginService.removeItem(this.card)
      this.loginService.cartItemEvent.emit()
      return
    }
    this.loginService.addItem(this.card);
    this.loginService.cartItemEvent.emit()
  }

  verifyItemOnCart() {
    const arr = this.loginService.getCart();

    arr?.filter((item: any) => item.itemId === this.card.itemId).length > 0 
    ? this.isOnCart = true 
    : this.isOnCart = false
  }

  ngOnDestroy(): void {
    this.cartItemSubscription.unsubscribe()
  }
}
