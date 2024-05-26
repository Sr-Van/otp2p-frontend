import { Component, inject, ViewChild } from '@angular/core';

import { SalesService } from '../../shared/services/sales.service';
import { LoginService } from '../../shared/services/login.service';

import { Anuncio } from '../../shared/interfaces/arrays';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { merge, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, MatPaginatorModule, LoadingSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  salesService = inject(SalesService)
  loginService = inject(LoginService)

  servidores: string [] = ['red','blue','green','yellow','orange','black','white','purple','pink']
  tipos: string [] = ['pokemon', 'hd', 'tm', 'item']
  sales: Anuncio[] = []
  filteredSales: Anuncio[]
  
  subs: Subscription
  isload: boolean = false
  player: string

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {
    this.player = this.loginService.playerName
    if(!this.player && this.loginService.userIsLogedIn) {
      window.location.reload()
    }
    this.loadContent()    
  }

  toggleFilter (filter: any){
    filter.classList.toggle('hidden')
  }

  loadContent() {
    this.player = this.loginService.playerName
    this.subs = this.salesService.getAllSales().subscribe(data =>
      {
        this.sales = this.player ? data.results.filter((item: Anuncio) => item.player !== this.player) : data.results
        this.filteredSales = this.sales

        this.loading(2000)
      })
  }

  addFilter(type: string, event: any) {
    const value = event.target.dataset.filter
    if (type === 'server') {
      this.filteredSales = this.sales.filter(sale => sale.mundo == value)
      this.loading(1500)
      return
    }

    this.filteredSales = this.sales.filter(sale => sale.type.toLowerCase() == value.toLowerCase())
  
    this.loading(2000)
  }

  searchItens(search: any) {
    if(search.length === 0) {return}

    this.filteredSales = this.sales.filter(sale => {
      return sale.header.toLowerCase().includes(search.toLowerCase())
    })

    this.loading(1500)
    
  }

  loading(time: number) {
    this.isload = false
    setTimeout(() => {
      this.isload = true
    }, time);
  }

  linkListToPaginator() {
    merge(this.paginator.page).pipe(
        startWith({}),
        switchMap(() => {
           return of(this.sales);
    }))
    .subscribe(res => {
        const from = this.paginator.pageIndex * 10;
        const to = from + 10;
        this.filteredSales = res.slice(from, to);
    });
    }

  ngAfterViewInit() {
    if(this.player) {
      this.loadContent()
    }
  }
}
