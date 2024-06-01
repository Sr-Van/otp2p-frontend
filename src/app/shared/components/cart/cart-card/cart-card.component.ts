import { Component, Input, inject } from '@angular/core';
import { Anuncio } from '../../../interfaces/arrays';
import { CurrencyPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CurrencyPipe, MatTooltip],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {

  utilService = inject(UtilService)

  @Input() item: Anuncio

  sourceImg: string = ''

  ngOnInit() {
    console.log(this.item)
    this.sourceImg = this.utilService.getImgSource(this.item)
  }
}
