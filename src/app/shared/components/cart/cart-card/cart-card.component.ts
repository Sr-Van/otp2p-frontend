import { Component, Input, inject } from '@angular/core';
import { Anuncio } from '../../../interfaces/arrays';
import { CurrencyPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { UtilService } from '../../../services/util.service';
import { LoginService } from '../../../services/login.service';
import { HeaderPipe } from '../../../pipes/header.pipe';
import { SalesService } from '../../../services/sales.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CurrencyPipe, MatTooltip, HeaderPipe],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {

  utilService = inject(UtilService)
  loginService = inject(LoginService)
  salesService = inject(SalesService)

  @Input() item: Anuncio

  sourceImg: string = ''
  saleSubscription: Subscription
  ngOnInit() {
    this.sourceImg = this.utilService.getImgSource(this.item)

    this.saleSubscription = this.salesService.getAllSales().subscribe({
      next: (data) => {
        const arr = data.results.map((item: Anuncio) => item.itemId)

        const filteredArr = arr.filter((item: any) => item === this.item.itemId)

        if (filteredArr.length <= 0) {
          this.loginService.removeItem(this.item)
          this.loginService.cartItemEvent.emit()
        }
      },
      error: (error) => {
        throw new Error(error)
      }, complete: () => {}
    })
  }

  removeItem(item: Anuncio) {
    this.loginService.removeItem(item)
    this.loginService.cartItemEvent.emit()
  }
}
