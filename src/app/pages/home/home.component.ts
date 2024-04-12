import { Component, inject } from '@angular/core';
import { SalesService } from '../../shared/services/sales.service';
import { Subscription, filter } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  servidores: any [] = ['red','blue','green','yellow','orange','black','white','purple','pink']
  tipos: any [] = ['pokemon', 'hd', 'tm', 'item']
  sales: any [] = []
  filteredSales: any []
  subs: Subscription
  salesService = inject(SalesService)
  isload: boolean = false

  constructor() {
    this.subs = this.salesService.getAllSales().subscribe(data =>
      {
        this.sales = data.results
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
}
