import { Component, Input } from '@angular/core';
import { HeaderPipe } from '../../pipes/header.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-infocard',
  standalone: true,
  imports: [HeaderPipe,
    CurrencyPipe,
    DatePipe
  ],
  template: `
  <div class="card box_shadow">
    <span class="title_card">Item: {{ card.header | header: card.type}}</span>

    <div class="infos_card">
        <ol>
            <li>Descrição: {{ card.description }}</li>
            <li>Tipo: {{ card.type }}</li>
            <li>Mundo {{ card.mundo }}</li>
            <li>{{ card.price | currency: 'BRL' }}</li>
            <!-- add date pipe when date is working -->
            <li>Vendido: {{ card.date }}</li>
            <li>vendido para: {{ card.trade_player }}</li>

        </ol>
    </div>
  </div>

  `,
  styles: `
    .card, .card .infos_card ol {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card {
      padding: 10px;
      width: 250px;
      background-color: #232323;
      
  }

  .card .infos_card ol {
      list-style: none;
  }

  .card .infos_card ol li {
      font-size: 12px;
  }
  `
})
export class InfocardComponent {

  @Input() card: any

  ngOnInit(){
    console.log(this.card)
  }

}
