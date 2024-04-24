import { Component, inject } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Anuncio } from '../../shared/interfaces/arrays';

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
  playerOffers: Anuncio[]
  
  type: string = ''
  form: FormGroup;
  player: string = 'no fingers - sz' //get player name with auth login when have it

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
    let newForm = form.value
    newForm.itemId = this.randomId()
    this.playerOffers.push(newForm)

    this.offerService.addOffer(this.player, this.playerOffers).subscribe(response => console.log(`Resposta da api: ${response}`))

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

  randomId() {    
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
  }
}
