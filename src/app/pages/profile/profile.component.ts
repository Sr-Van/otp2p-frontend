import { Component, inject } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';
import { Register } from '../../shared/interfaces/register';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoadingSpinnerComponent],
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

  ngOnInit() {

    this.player = this.loginService.playerName

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


}
