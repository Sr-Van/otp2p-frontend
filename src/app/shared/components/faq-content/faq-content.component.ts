import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq-content',
  standalone: true,
  imports: [],
  templateUrl: './faq-content.component.html',
  styleUrl: './faq-content.component.css'
})
export class FaqContentComponent {
  activateRoute = inject(ActivatedRoute)

  paramSubscription: Subscription
  title: any
  content: any
  constructor() {
    this.title = this.activateRoute.snapshot.paramMap.get('filterParam')
    this.paramSubscription = this.activateRoute.paramMap.subscribe({
      next: (params) => {
        this.title = params.get('filterParam')
      },
      error: (error) => {
        throw new Error(error)
      }
    })
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe()
  }
}
