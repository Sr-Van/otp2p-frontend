import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {

  formDeposit: FormGroup
  depositPrice: string = ''
  isLoaded: boolean = false

  constructor() {

    this.formDeposit = new FormGroup({
      deposit: new FormControl
    })

    this.loadContent(1000)
  }

  sendDeposit() {

    //add here logic to insert deposit and deal with the response
    console.log(this.formDeposit.value)
    this.formDeposit.reset()
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
