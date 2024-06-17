import { AfterViewInit, Component, OnDestroy, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SalesService } from '../../shared/services/sales.service';
import { OfferService } from '../../shared/services/offer.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { CurrencyPipe } from '@angular/common';
import { InfocardComponent } from '../../shared/components/infocard/infocard.component';

import { Trade, Anuncio } from '../../shared/interfaces/arrays';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { LoginService } from '../../shared/services/login.service';
import { UtilService } from '../../shared/services/util.service';
import { HeaderPipe } from '../../shared/pipes/header.pipe';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    MatTooltipModule,
    CardComponent,
    InfocardComponent,
    CurrencyPipe,
    HeaderPipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements AfterViewInit, OnDestroy {

  router = inject(Router)
  activateRoute = inject(ActivatedRoute)
  salesService = inject(SalesService)
  offerService = inject(OfferService)
  loginService = inject(LoginService)
  utilService = inject(UtilService)

  subs: Subscription
  subsOff: Subscription
  itemId: any
  item: any
  isLoad: boolean = false
  isOnCart: boolean = false

  //type this arrays
  anuncios: Anuncio[] = []
  vendas: Trade[] = []
  compras: Trade[] = []
  avaliacao: Comment[] = []
  
  source: string = ``
  tooltip: string
  color: string 

  constructor() { 
    effect(() => {
      this.isOnCart = this.utilService.verifyItemOnCart(this.item)
    })
  }

  ngAfterViewInit() {
    if(!this.loginService.userIsLoggedIn()) {
      this.router.navigate(['/login'])
    }
    this.itemId = this.activateRoute.snapshot.paramMap.get('item')

    if(this.itemId === "") {
      window.location.reload()
    }


    this.subs = this.salesService.getAllSales().subscribe(data => {

      const arr = data.results
      
      this.item = arr.filter((item: any) => item.itemId === this.itemId)[0]

      this.source = this.utilService.getImgSource(this.item)
      this.isOnCart = this.utilService.verifyItemOnCart(this.item)
      
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

  addToCart() {
    
    if(this.isOnCart) {
      this.loginService.removeItem(this.item)
      this.loginService.updateCartItem()

      return
    }
    this.loginService.addItem(this.item);
    this.loginService.updateCartItem()

  }

  goToPlayer(player: string) {
    this.router.navigate([`player/${player}`])
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
    this.subsOff.unsubscribe()
  }

}
