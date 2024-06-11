import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {

  formDeposit: FormGroup

  constructor() {

    this.formDeposit = new FormGroup({
      deposit: new FormControl
    })
  }

  sendDeposit() {

    console.log(this.formDeposit.value)
  }

}
