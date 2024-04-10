import { Component, inject } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-offer',
  standalone: true,
  imports: [],
  templateUrl: './new-offer.component.html',
  styleUrl: './new-offer.component.css'
})
export class NewOfferComponent {

  offerService = inject(OfferService)
  subs: Subscription
  pokes: any = []
  servidores: any = []
  type: string = 'poke'

  ngOnInit() {
    this.subs = this.offerService.getAllPokes().subscribe(data => {

      Object.keys(data).forEach(key => {
        this.pokes.push({key, poke: data[key]})
      })

      this.servidores = this.offerService.getServers()

    }) 
  }

  changeType(tipo: any) {
    this.type = tipo
  }

  sendForm(form: any) {
    console.log(form)
  }

}
