import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

import { Anuncio } from '../../shared/interfaces/arrays';

import { OfferService } from '../../shared/services/offer.service';
import { LoginService } from '../../shared/services/login.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-new-offer',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './new-offer.component.html',
  styleUrl: './new-offer.component.css'
})
export class NewOfferComponent {

  offerService = inject(OfferService)
  loginService = inject(LoginService)
  snack = inject(MatSnackBar)

  subs: Subscription
  subsOffers: Subscription

  pokes: any = []
  servidores: any = []
  playerOffers: Anuncio[]
  
  type: string = ''
  form: FormGroup;
  player: string 
  isLoaded: boolean = false

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {

    this.player = this.loginService.playerName

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
      this.isLoaded = true
    })

  }

  changeType(tipo: any) {
    this.type = tipo
  }

  sendForm(form: any) {
    let newForm = form.value
    newForm.itemId = this.randomId()

    this.offerService.addOffer(this.player, newForm).subscribe(response => {
      this.openSnack(response.msg, 'success')
    })

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

  openSnack(msg: string, type: string) {
    this.snack.open(msg, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition : this.verticalPosition,
      panelClass: ['snack', `snack_${type}`],
      duration: 3000
    })
  }
}
