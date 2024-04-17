import { Component, Input } from '@angular/core';
import { HeaderPipe } from '../../pipes/header.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-infocard',
  standalone: true,
  imports: [HeaderPipe,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './infocard.component.html',
  styleUrl: './infocard.component.css'
})
export class InfocardComponent {

  @Input() card: any

  ngOnInit(){
    console.log(this.card)
  }

}
