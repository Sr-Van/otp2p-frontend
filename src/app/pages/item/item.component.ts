import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SalesService } from '../../shared/services/sales.service';
import { OfferService } from '../../shared/services/offer.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { CurrencyPipe } from '@angular/common';
import { InfocardComponent } from '../../shared/components/infocard/infocard.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    MatTooltipModule,
    CardComponent,
    InfocardComponent,
    CurrencyPipe
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  router = inject(Router)
  activateRoute = inject(ActivatedRoute)
  salesService = inject(SalesService)
  offerService = inject(OfferService)

  subs: Subscription
  subsOff: Subscription
  itemId: any
  item: any
  isLoad: boolean = false

  //type this arrays
  anuncios: any[] = []
  vendas: any[] = []
  compras: any[] = []
  avaliacao: any[] = []
  
  source: string = ``
  tooltip: string
  color: string 

  ngOnInit() {
    this.itemId = this.activateRoute.snapshot.paramMap.get('item')

    this.subs = this.salesService.getAllSales().subscribe(data => {

      const arr = data.results
      
      this.item = arr.filter((item: any) => item.itemId === this.itemId)[0]

      this.getImgSource()
      
      this.tooltip = `Esse vendedor é um vendedor nivel ${this.item.badge}`

      this.color = `var(--${this.item.badge})`
    })

    setTimeout(() => {
      this.subsOff = this.offerService.getPlayerOffers(this.item?.player).subscribe(data => {
        this.anuncios = data.anuncios
        this.compras = data.compras
        this.vendas = data.vendas
        this.avaliacao = data.avaliacao

        const indexToDelete = this.anuncios.map((anuncio: any) => anuncio.itemId).indexOf(this.itemId)

        this.isLoad = true

        if(indexToDelete === -1) {
          return
        }
                
        this.anuncios.splice(indexToDelete, 1)
      })
      
    }, 1000);

  }

  //make this a service and dont repeat
  getImgSource() {
    if(this.item.type === "pokemon") {
      this.source = `../../assets/img/${this.item.header}.png`
      return
    }

    if(this.item.type === "hd") {
      this.source = `../../assets/img/hds.png`
      return
    }

    if(this.item.type === "tm") {
      this.source = `../../assets/img/tm.png`
      return
    }

    this.source = `../../assets/img/item.png`

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
