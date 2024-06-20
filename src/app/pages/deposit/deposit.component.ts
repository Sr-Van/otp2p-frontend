import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { OfferService } from '../../shared/services/offer.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {

  offerService = inject(OfferService)
  snack = inject(MatSnackBar)
  $uS = inject(UtilService)
  
  formDeposit: FormGroup
  depositPrice: string = ''
  isLoaded: boolean = false

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor() {

    this.$uS.setPageName('Deposito - OTP2P')

    this.formDeposit = new FormGroup({
      ammount: new FormControl,
      password: new FormControl
    })

    this.loadContent(1000)
  }

  sendDeposit() {

    if(!this.formDeposit.valid) return

    this.offerService.addAmmount(this.formDeposit.value).subscribe(
      {
        next: (data) => {

          this.openSnack(data.msg, 'success')
          this.offerService.updateAmmount()
          
        },
        error: ({error}) => {
          this.openSnack(error.msg, 'fail')
        }
      }
    )
    this.formDeposit.reset()
  }

  openSnack(msg: string, type: string) {
    this.snack.open(msg, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition : this.verticalPosition,
      panelClass: ['snack', `snack_${type}`],
      duration: 3000
    })
  }

  filterNumber(number: any, event: any) {
    const isNumber = /^[0-9]$/i.test(event.key)

    if(event.key === '.' && number.length > 1 && !this.depositPrice.includes('.')) {
      this.depositPrice = number
      return
    }

    if(event.key === 'Backspace') {
      this.depositPrice = number
      return
    }
    if(!isNumber) {
      event.target.value = this.depositPrice
      return
    }

    this.depositPrice = number

  }

  loadContent(time: number) {
    this.isLoaded = false
    setTimeout(() => {
      this.isLoaded = true
    }, time);
  }
}
