import { Component, Input, inject } from '@angular/core';
import { Anuncio } from '../../../interfaces/arrays';
import { CurrencyPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { UtilService } from '../../../services/util.service';
import { LoginService } from '../../../services/login.service';
import { HeaderPipe } from '../../../pipes/header.pipe';

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

  @Input() item: Anuncio

  sourceImg: string = ''

  ngOnInit() {
    this.sourceImg = this.utilService.getImgSource(this.item)
  }

  removeItem(item: Anuncio) {
    this.loginService.removeItem(item)
    this.loginService.cartItemEvent.emit()
  }
}
