import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { UtilService } from '../../shared/services/util.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  private formBuilder = inject(FormBuilder);
  private login$ = inject(LoginService);
  private utS$ = inject(UtilService);

  public feedbackForm: FormGroup;

  constructor() {
    this.utS$.setPageName('Feedback - OTP2P');
    this.feedbackForm = this.formBuilder.group({
      name: [this.login$.playerName, [Validators.required]],
      message: ['', [Validators.required]]
    })
  }

  public sendFeedback() {
    //adicionar integraçao ao backend depois
    console.log(this.feedbackForm.value)
    this.utS$.runActionLoading(2000);
  }
}
