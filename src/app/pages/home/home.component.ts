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
  tipos: any [] = ['Pokemon', 'HDs', 'TMs', 'Itens']
  sales: any [] = []
  filteredSales: any []
  subs: Subscription
  salesService = inject(SalesService)

  constructor() {
    this.subs = this.salesService.getAllSales().subscribe(data =>
      {
        this.sales = data.results
        this.filteredSales = this.sales
      })
  }


  addFilter(type: string, event: any) {
    const value = event.target.dataset.filter
    if (type === 'server') {
      this.filteredSales = this.sales.filter(sale => sale.mundo == value)
      return
    }

    this.filteredSales = this.sales.filter(sale => sale.type.toLowerCase() == value.toLowerCase())
  }

  searchItens(search: any) {
    if(search.length === 0) {return}

    this.filteredSales = this.sales.filter(sale => {
      return sale.header.toLowerCase().includes(search.toLowerCase())
    })
    
  }
}
