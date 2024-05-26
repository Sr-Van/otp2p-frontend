import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="loading">
      <img src="../../../../assets/img/OTP2PLOGOVERTICAL.png" alt="loading-logo">
    </div>
  `,
  styles: `
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    img {
      width: 250px;
      height: 150px;
      animation: load 1s ease-in-out infinite;
    }

    @keyframes load {
      0% {
        opacity: 0.2;
      }
      100% {
        opacity: 1;
      }
    }
  `
})
export class LoadingSpinnerComponent {

}
