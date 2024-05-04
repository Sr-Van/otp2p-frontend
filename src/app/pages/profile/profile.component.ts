import { Component, inject } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';
import { Register } from '../../shared/interfaces/register';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  offerService = inject(OfferService)
  loginService = inject(LoginService)


  getOnePlayerSubscription: Subscription
  player: string
  playerInfo: Register

  ngOnInit() {

    this.player = this.loginService.playerName

    this.getOnePlayerSubscription = this.offerService.getPlayerOffers(this.player)
      .subscribe({
        next: data => {
          this.playerInfo = data
          console.log(this.playerInfo)
        }, 

        error: error => {
          throw new Error(error)
        }
    })

  }


}
