import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() card: any
  source: string
  tooltip: string

  ngOnInit() {
    //substituir a string pelo valor do header correto
    this.source = `../../assets/img/1.png`

    this.tooltip = `Esse vendedor é um vendedor nivel ${this.card.badge}`
  }

}
