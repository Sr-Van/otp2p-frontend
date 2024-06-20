import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {

  activatedRoute = inject(ActivatedRoute);
  loginService = inject(LoginService)
  $uS = inject(UtilService)

  isLoaded: boolean = false
  logMsg: string = ""

  constructor() {

    this.$uS.setPageName('Verificação - OTP2P')

    this.sendConfirmation(
      this.activatedRoute.snapshot.paramMap.get('email'),
      this.activatedRoute.snapshot.paramMap.get('token')
    )
  }

  sendConfirmation(email: any, token: any) {
    const e = email;
    const t = token;

    this.loginService.sendConfirmation(e, t).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.logMsg = data.msg
          this.isLoaded = true
        }, 2000);
        },
        error: (err) => {
          setTimeout(() => {
            this.isLoaded = true
            this.logMsg = err.error.msg
          }, 2000)
      }
    });
  }
}
