import { Component, Input } from '@angular/core';
import { HeaderPipe } from '../../pipes/header.pipe';

@Component({
  selector: 'app-infocard',
  standalone: true,
  imports: [HeaderPipe],
  templateUrl: './infocard.component.html',
  styleUrl: './infocard.component.css'
})
export class InfocardComponent {

  @Input() card: any

  ngOnInit(){
    console.log(this.card)
  }

}
