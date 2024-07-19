import { Component, inject } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';
import { Register } from '../../shared/interfaces/register';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import {  Trade } from '../../shared/interfaces/arrays';
import { CurrencyPipe } from '@angular/common';
import { TradeListComponent } from './trade-list.component';
import { UtilService } from '../../shared/services/util.service';


const filtrosProfile: {[index: number]: any} = {
  0: 'infos',
  1: 'trades',
  2: 'offers',
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoadingSpinnerComponent, CurrencyPipe, TradeListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  offerService = inject(OfferService)
  loginService = inject(LoginService)
  utSerivce = inject(UtilService)

  getOnePlayerSubscription: Subscription
  player: string
  playerInfo: Register
  isContentLoaded: boolean = false
  public loadCon: boolean = true;
  actualFilter: string = filtrosProfile[0]
  emailVisible: boolean = false
  allTrades: Trade[] = []

  ngOnInit() {

    setTimeout(() => {
      this.loadCon = false;
    }, 2100);
    
    this.player = this.loginService.playerName
    this.utSerivce.setPageName(`${this.player} - OTP2P`)

    if(!this.player) {
      window.location.reload()
    }

    this.getOnePlayerSubscription = this.offerService.getPlayerOffers(this.player)
      .subscribe({
        next: data => {
          this.playerInfo = data
          this.isContentLoaded = true
          this.allTrades = data.compras.concat(data.vendas)
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
  }

  changeVisibility(event: any) {
    const target = event.target
    target.classList.toggle('fa-eye-slash')
    target.classList.toggle('fa-eye')

    this.emailVisible = !this.emailVisible
  }
}
