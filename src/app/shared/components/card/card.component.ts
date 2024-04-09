import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() card: any
  source: string

  ngOnInit() {
    //substituir a string pelo valor do header correto
    this.source = `../../assets/img/1.png`
  }

}
