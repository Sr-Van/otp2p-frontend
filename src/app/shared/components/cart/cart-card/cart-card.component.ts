import { Component, Input } from '@angular/core';
import { Anuncio } from '../../../interfaces/arrays';
import { CurrencyPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CurrencyPipe, MatTooltip],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {

  @Input() item: Anuncio

  sourceImg: string = ''

  ngOnInit() {
    console.log(this.item)
    this.sourceImg = `../../assets/img/${this.item.header}.png`
  }
}
