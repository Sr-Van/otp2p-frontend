import {  AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { DOCUMENT } from '@angular/common';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [RouterModule, LoadingSpinnerComponent],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.css'
})
export class FaqPageComponent implements AfterViewInit {

  activatedRoute = inject(ActivatedRoute)
  route = inject(Router)
  $uS = inject(UtilService)
  document = inject(DOCUMENT)
  
  filterParam: any
  routeSubscription: Subscription
  isLoaded: boolean = false

  constructor() {

    this.$uS.setPageName('FAQ - OTP2P')

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


  ngAfterViewInit() {
    const url = this.route.url.split('/')
    this.filterParam = url[3]
    setTimeout(() => {
      this.addFilterByRoute(this.filterParam)
    }, 1000);
  }


  addFilterByRoute(filter: string) {
    this.document.querySelector('[actived-filter]')?.removeAttribute('actived-filter')

    const el = this.document?.querySelector(`#${filter}`)
    el?.setAttribute('actived-filter', '')

  }


}
