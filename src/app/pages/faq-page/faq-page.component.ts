import { Component, ElementRef, ViewChild, inject, viewChild, viewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [RouterModule, LoadingSpinnerComponent],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.css'
})
export class FaqPageComponent {

  activatedRoute = inject(ActivatedRoute)
  route = inject(Router)
  
  filterParam: any
  routeSubscription: Subscription
  isLoaded: boolean = false

  constructor() {
    const url = this.route.url.split('/')
    this.filterParam = url[3]

    this.routeSubscription = this.activatedRoute.paramMap.subscribe({
      next: (data: any) => {

        this.filterParam = data.get('filterParam')
        setTimeout(() => {
          this.isLoaded = true
          
        }, 500);
      }, error: error => {
        console.log(error)
      }
    })
  }

  

}
