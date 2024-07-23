
import { Component, inject, ViewChild } from '@angular/core';

import { SalesService } from '../../shared/services/sales.service';
import { LoginService } from '../../shared/services/login.service';

import { Anuncio } from '../../shared/interfaces/arrays';

import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Subscription } from 'rxjs';

import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, MatPaginatorModule, LoadingSpinnerComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  salesService = inject(SalesService)
  loginService = inject(LoginService)
  $uS = inject(UtilService)

  servidores: string [] = ['red','blue','green','yellow','orange','black','white','purple','pink']
  tipos: string [] = ['pokemon', 'hd', 'tm', 'item']
  sales: Anuncio[] = []
  filteredSales: Anuncio[]
  paginatorSales: Anuncio[]
  
  subs: Subscription
  isload: boolean = false
  public isFiltersOpen: boolean = false;
  player: string
  currentPage: number = 0

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {
    this.$uS.setPageName('OTP2P - Compra & Venda')
    
    this.player = this.loginService.playerName
    if(!this.player && this.loginService.userIsLoggedIn()) {
      window.location.reload()
    }
    this.loadContent()    
  }

  toggleFilter (event: any, filter: any){

    const targetStr = event.target.textContent
    let newStr = ""

    if(targetStr.includes('Esconder')) {
      newStr = targetStr.replace('Esconder', 'Mostrar')
      event.target.removeAttribute('using-filter', '')
    } else {
      event.target.setAttribute('using-filter', '')
      newStr = targetStr.replace('Mostrar', 'Esconder')
    }
    
    event.target.textContent = newStr
    filter.classList.toggle('hidden')
  }

  loadContent() {
    this.player = this.loginService.playerName
    this.subs = this.salesService.getAllSales().subscribe(data =>
      {
        this.sales = this.player ? data.results.filter((item: Anuncio) => item.player !== this.player) : data.results
        this.filteredSales = this.sales
        this.paginatorSales = this.filteredSales

        this.loading(2000)
      })
  }

  addFilter(type: string, event: any) {

    const value = event.target.dataset.filter
    this.handleFilterBtn(event.target)
    
    if (type === 'server') {
      this.filteredSales = this.sales.filter(sale => sale.mundo == value)
    } else {
      this.filteredSales = this.sales.filter(sale => sale.type.toLowerCase() == value.toLowerCase())
    }

    this.paginatorSales = this.filteredSales
    this.currentPage = 0
    this.loading(2000)
  }

  searchItens(search: any) {
    if(search.length === 0) {return}

    this.filteredSales = this.sales.filter(sale => {
      return sale.header.toLowerCase().includes(search.toLowerCase())
    })
    this.paginatorSales = this.filteredSales
    this.currentPage = 0

    this.loading(1500)
    
  }

  loading(time: number) {
    this.isload = false
    setTimeout(() => {
      this.isload = true
    }, time);
  }

  handleFilterBtn(target: HTMLElement) {
    
    const actualBtn = document.querySelector('[using-filter-serv]')
    
    actualBtn?.removeAttribute('using-filter-serv')
    target.setAttribute('using-filter-serv', '')

  }

  public showFilters() {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  handlePagation(event: PageEvent) {
    const from = event.pageIndex * 10;
    const to = from + 10;
    this.loading(1500)
    this.paginatorSales = this.filteredSales.slice(from, to)
    this.currentPage = event.pageIndex
  }

  ngAfterViewInit() {
    if(this.player) {
      this.loadContent()
    }
  }
}
