import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/components/header/header.component';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './shared/services/login.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CartComponent } from './shared/components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    CookieConsentComponent,
    FooterComponent,
    CartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  cookieService = inject(CookieService)
  loginService = inject(LoginService)

  title = 'OTP2P - Trocas';
  userConsent: boolean = false

  constructor() {

    setTimeout(() => {
      this.getCookieConsent()
    }, 3000);

  }

  getCookieConsent() {
    const isConsented = this.cookieService.get('userConsent');
    this.loginService.UserConsentCookieEvent.emit(!!isConsented);
    this.userConsent = !!isConsented
  }
}
