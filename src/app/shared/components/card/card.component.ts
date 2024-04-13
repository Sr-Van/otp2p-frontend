import { Component, Input, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router } from 'express';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  route = inject(Router)
  @Input() card: any
  source: string
  tooltip: string

  ngOnInit() {
    this.getImgSource()

    this.tooltip = `Esse vendedor é um vendedor nivel ${this.card.badge}`
  }

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
    this.route.navigate([`/item/${this.card.player}`])
  }

}
