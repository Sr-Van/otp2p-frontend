import { LoginService } from './../../services/login.service';
import { CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router } from '@angular/router';
import { HeaderPipe } from '../../pipes/header.pipe';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatTooltipModule,
    CurrencyPipe,
    HeaderPipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  router = inject(Router)
  loginService = inject(LoginService)
  utilService = inject(UtilService)

  @Input() card: any
  source: string
  tooltip: string
  color: string

  ngOnInit() {
    this.source = this.utilService.getImgSource(this.card)

    this.tooltip = `Esse vendedor é um vendedor nivel ${this.card.badge}`
    this.color = `var(--${this.card.badge})`
  }

  goToItem(event: any) {
 
    if(event.target.tagName === 'BUTTON') return
    this.router.navigate([''])
    
    setTimeout(() => {
      this.router.navigate([`item/${this.card.itemId}`])
    }, 100);
  }

  addToCart() {
    this.loginService.addItem(this.card);
  }
}
