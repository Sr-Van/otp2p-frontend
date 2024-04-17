import { CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router } from '@angular/router';
import { HeaderPipe } from '../../pipes/header.pipe';

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

  @Input() card: any
  source: string
  tooltip: string
  color: string

  ngOnInit() {
    this.getImgSource()

    this.tooltip = `Esse vendedor é um vendedor nivel ${this.card.badge}`
    this.color = `var(--${this.card.badge})`
  }

  // make this a service and dont repeat
  getImgSource() {
    if(this.card.type === "pokemon") {
      this.source = `../../assets/img/${this.card.header}.png`
      return
    }

    if(this.card.type === "hd") {
      this.source = `../../assets/img/hds.png`
      return
    }

    if(this.card.type === "tm") {
      this.source = `../../assets/img/tm.png`
      return
    }

    this.source = `../../assets/img/item.png`

  }

  goToItem() {
    this.router.navigate([''])
    
    setTimeout(() => {
      this.router.navigate([`item/${this.card.itemId}`])
    }, 100);
  }

}
