import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { Anuncio } from '../../shared/interfaces/arrays';

import { OfferService } from '../../shared/services/offer.service';
import { LoginService } from '../../shared/services/login.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-new-offer',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent, MatAutocompleteModule],
  templateUrl: './new-offer.component.html',
  styleUrl: './new-offer.component.css'
})
export class NewOfferComponent {

  offerService = inject(OfferService)
  loginService = inject(LoginService)
  private formBuilder = inject(FormBuilder);
  $uS = inject(UtilService)
  snack = inject(MatSnackBar)

  subs: Subscription
  subsOffers: Subscription

  pokes: any = []
  filteredPokes: any = []
  servidores: any = []
  playerOffers: Anuncio[]
  
  type: string = ''
  form: FormGroup;
  player: string 
  isLoaded: boolean = false
  newItemFormPriceString: string = ''

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {

    this.$uS.setPageName('Novo Anúncio - OTP2P')

    this.player = this.loginService.playerName

    this.subs = this.offerService.getAllPokes().subscribe(data => {

      Object.keys(data).forEach(key => {
        this.pokes.push({key, poke: data[key]})
      })

      this.filteredPokes = this.pokes

      this.servidores = this.offerService.getServers()

    }) 

    this.form = this.formBuilder.group({
      header: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required]],
      mundo: ['', [Validators.required]]
    })

    this.subsOffers = this.offerService.getPlayerOffers(this.player).subscribe(data => {
      this.playerOffers = data.anuncios
      this.isLoaded = true
    })

  }

  searchPokemon(event: any) {
    const value = event.target.value
    this.filteredPokes = this.pokes.filter((poke: any) => poke.poke.toLowerCase().includes(value.toLowerCase()))
  }

  changeType(tipo: any) {
    this.type = tipo
  }

  sendForm(form: any) {

    if(!this.form.valid) return

    let newForm = form.value
    newForm.itemId = this.randomId()

    this.offerService.addOffer(this.player, newForm).subscribe(response => {
      this.openSnack(response.msg, 'success')
    })

    this.form.reset()
  }

  filterNumber(number: any, event: any) {
    const isNumber = /^[0-9]$/i.test(event.key)

    if(event.key === '.' && number.length > 1 && !this.newItemFormPriceString.includes('.')) {
      this.newItemFormPriceString = number
      return
    }

    if(event.key === 'Backspace') {
      this.newItemFormPriceString = number
      return
    }
    if(!isNumber) {
      event.target.value = this.newItemFormPriceString
      return
    }

    this.newItemFormPriceString = number

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
