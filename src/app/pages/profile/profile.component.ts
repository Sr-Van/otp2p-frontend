import { Component, inject } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';
import { Register } from '../../shared/interfaces/register';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Anuncio, Trade } from '../../shared/interfaces/arrays';
import { CurrencyPipe } from '@angular/common';


const filtrosProfile: {[index: number]: any} = {
  0: 'infos',
  1: 'trades',
  2: 'offers',
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoadingSpinnerComponent, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  offerService = inject(OfferService)
  loginService = inject(LoginService)


  getOnePlayerSubscription: Subscription
  player: string
  playerInfo: Register
  isContentLoaded: boolean = false
  actualFilter: string = filtrosProfile[0]

  ngOnInit() {

    this.player = this.loginService.playerName

    if(!this.player) {
      window.location.reload()
    }

    this.getOnePlayerSubscription = this.offerService.getPlayerOffers(this.player)
      .subscribe({
        next: data => {
          console.log(data)
          this.playerInfo = data
          this.isContentLoaded = true
        }, 

        error: error => {
          throw new Error(error)
        }
    })

  }


  calcTotal(arr: Array<Trade>) {
    let total = arr
      .map((sale: Trade) => sale.price)
      .reduce((acc, curr) => acc + Number(curr), 0)

    return total
  }

  changeFilter(event: any, filter: number) {
    const target = event.target
    if(target?.getAttribute('activated') !== null) return

    const btnActv = document?.querySelector('[activated]')
    btnActv?.removeAttribute('activated')
    target?.setAttribute('activated', '')

    this.actualFilter = filtrosProfile[filter]
    console.log(this.actualFilter, event.target)
  }
}
