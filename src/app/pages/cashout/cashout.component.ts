import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cashout',
  standalone: true,
  imports: [LoadingSpinnerComponent, ReactiveFormsModule],
  templateUrl: './cashout.component.html',
  styleUrl: '../deposit/deposit.component.css'
})
export class CashoutComponent {

  cashoutForm: FormGroup
  isLoaded: boolean = false
  cashoutPrice: string = ''
  constructor() {
    
    this.cashoutForm = new FormGroup({
      price: new FormControl
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

    console.log(this.cashoutForm.value)
  }
}
