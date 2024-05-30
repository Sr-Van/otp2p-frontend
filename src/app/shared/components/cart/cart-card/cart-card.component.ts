import { Component, Input } from '@angular/core';
import { Anuncio } from '../../../interfaces/arrays';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {

  @Input() item: Anuncio
}
