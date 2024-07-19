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

    this.utS$.runActionLoading(2000);
    const { name, message } = this.feedbackForm.value;

    if(this.feedbackForm.valid) {
      this.feedbackForm.reset();
      this.login$.sendFeedback(message, name).subscribe({
        next: (data) => {
          this.utS$.openSnack(data.msg, 'success');
        },
        error: ({error}) => {
          this.utS$.openSnack(error.msg, 'fail');
        }
      })
    }

  }
}
