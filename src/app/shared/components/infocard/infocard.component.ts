import { Component, Input, inject } from '@angular/core';
import { HeaderPipe } from '../../pipes/header.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-infocard',
  standalone: true,
  imports: [HeaderPipe,
    CurrencyPipe,
    DatePipe
  ],
  template: `
  <div class="card box_shadow rounded_medium" [class.loading_cont]="loadCont">
    <span class="title_card">{{ card.header | header: card.type}}</span>

    <div class="infos_card">
        <ol>
            <li>
              <img [src]="getImgSource()" [alt]="card.header" alt="">
            </li>
            <li [style]="
            {
              backgroundColor: card.mundo,
              color: getCardColor()
            }">{{ card.mundo }}</li>
            <li>{{ card.price | currency: 'BRL' }}</li>
            @if(type === "compra") {
              <li>Comprado de: {{ card.trade_player }}</li>
              
            } @else {

              <li>Vendido para: {{ card.trade_player }}</li>
            }

        </ol>
    </div>
  </div>

  `,
  styles: `
    .card, .card .infos_card ol {
    display: flex;
    flex-direction: column;
    gap: 10px;

    position: relative;
  }

  .card {
      padding: 10px;
      width: 200px;
      background-color: #232323;
      
  }

  .card .infos_card ol {
      list-style: none;
  }

  .card .infos_card ol li {
      font-size: 12px;
  }

  .loading_cont {
    & ol li:nth-child(2) {
      background-color: transparent !important;
      color: transparent !important;
    }
  }
  .card ol li:nth-child(2) {
      position: absolute;
      right: 0;
      top: -30px;

      padding: 1px 5px;
      border-radius: 7px;

      font-size: 10px;
  }

  img {
    width: 50px;
    height: 50px;
    aspect-ratio: 1/1;}
  `
})
export class InfocardComponent {

  utilService = inject(UtilService)

  @Input() card: any
  @Input() type: any

  public loadCont: boolean = true;

  ngOnInit(){
    setTimeout(() => {
      this.loadCont = false;
    }, 2300);
  }

  getCardColor(): string {
    const server = this.card.mundo
    if(server === 'yellow' || server === 'white' || server === 'pink') {
      return '#000'
    }
    return '#fff'
  }

  getImgSource(): string {
    return this.utilService.getImgSource(this.card.type, this.card.header)
  }
}
