import { Component, inject } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-offer.component.html',
  styleUrl: './new-offer.component.css'
})
export class NewOfferComponent {

  offerService = inject(OfferService)
  subs: Subscription
  subsOffers: Subscription
  pokes: any = []
  servidores: any = []
  type: string = ''
  form: FormGroup;
  player: string = 'no fingers - sz' //get player name with auth login when have it
  playerOffers: any []

  ngOnInit() {
    this.subs = this.offerService.getAllPokes().subscribe(data => {

      Object.keys(data).forEach(key => {
        this.pokes.push({key, poke: data[key]})
      })

      this.servidores = this.offerService.getServers()

    }) 


    this.form = new FormGroup({
      header: new FormControl,
      description: new FormControl,
      type: new FormControl,
      price: new FormControl,
      mundo: new FormControl
    })

    this.subsOffers = this.offerService.getPlayerOffers(this.player).subscribe(data => {
      this.playerOffers = data.anuncios
    })

  }

  changeType(tipo: any) {
    this.type = tipo
  }

  sendForm(form: any) {
    this.playerOffers.push(form.value)

    this.offerService.addOffer(this.player, this.playerOffers)

    this.form.reset()
  }

  filterNumber(number: any, event: any) {
    const pattern = '0123456789'
    let previousValue = ""
    let actualValue = event.key

    pattern.split("").forEach(num => {
      if(num === actualValue) {
        previousValue = number
      }

      else {
        event.target.value = previousValue
      }
    })
  }

}
