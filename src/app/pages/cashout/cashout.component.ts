import { Component, inject } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OfferService } from '../../shared/services/offer.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-cashout',
  standalone: true,
  imports: [LoadingSpinnerComponent, ReactiveFormsModule],
  templateUrl: './cashout.component.html',
  styleUrl: '../deposit/deposit.component.css'
})
export class CashoutComponent {

  ofService = inject(OfferService)
  utService = inject(UtilService)

  cashoutForm: FormGroup
  isLoaded: boolean = false
  cashoutPrice: string = ''
  constructor() {

    this.utService.setPageName('Saque - OTP2P')
    
    this.cashoutForm = new FormGroup({
      ammount: new FormControl,
      password: new FormControl
    })
    this.loadContent(1000)
  }

  loadContent(time: number) {

    this.isLoaded = false
    setTimeout(() => {
      this.isLoaded = true
    }, time);
  }

  filterNumber(number: any, event: any) {
    const isNumber = /^[0-9]$/i.test(event.key)

    if(event.key === '.' && number.length > 1 && !this.cashoutPrice.includes('.')) {
      this.cashoutPrice = number
      return
    }

    if(event.key === 'Backspace') {
      this.cashoutPrice = number
      return
    }
    if(!isNumber) {
      event.target.value = this.cashoutPrice
      return
    }

    this.cashoutPrice = number

  }

  cashout() {
    this.utService.runActionLoading(2000);

    this.ofService.removeAmmount(this.cashoutForm.value).subscribe({
      next: (data) => {
        this.utService.openSnack(data.msg, 'success')
        this.ofService.updateAmmount()
      },
      error: ({error}) => {
        this.utService.openSnack(error.msg, 'fail')
      }
    })

    this.cashoutForm.reset()
  }
}
