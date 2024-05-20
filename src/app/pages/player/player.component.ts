import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { OfferService } from '../../shared/services/offer.service';

import { InfocardComponent } from '../../shared/components/infocard/infocard.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { RatingCardComponent } from '../../shared/components/rating-card/rating-card.component';
import { Anuncio, Trade } from '../../shared/interfaces/arrays';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    InfocardComponent,
    CardComponent,
    RatingCardComponent,
    ReactiveFormsModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  activateRoute = inject(ActivatedRoute)
  offerServ = inject(OfferService)

  player: any
  subs: Subscription
  form: FormGroup
  myDate = new Date()

  // change type any for interfaces when exists
  anuncios: Anuncio[]
  compras: Trade[]
  vendas: Trade[]
  avaliacao: Comment[]
  playerItem: any
  isLoaded: boolean = false

  ngOnInit() {
    this.player = this.activateRoute.snapshot.paramMap.get('player')

    if(this.player === "") {
      window.location.reload()
    }

    this.subs = this.offerServ.getPlayerOffers(this.player).subscribe(data => {
      this.anuncios = data.anuncios
      this.vendas = data.vendas
      this.compras = data.compras
      this.avaliacao = data.avaliacao

      this.playerItem = data
      this.isLoaded = true

    })

    this.form = new FormGroup({
      text: new FormControl,
      denuncia: new FormControl
    })
  }

  sendForm(form: FormGroup) {

    let obj = form.value
    let arr = this.avaliacao

    obj.denuncia = obj.denuncia == true ? true : false
    obj.player = this.player
    obj.date = `${this.myDate.getDate()}/${this.myDate.getMonth()+ 1}/${this.myDate.getFullYear()}`

    arr.push(obj)
    this.form.reset()

    this.offerServ.addComment(this.player, arr).subscribe(
      response => {
        console.log(`Resposta da api: ${response}`)
      },
      error => {
        console.log(`deu algo errado ${error}`)
      }
    )
  }
}
