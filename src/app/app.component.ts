import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

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

  @HostListener('window:scroll', ['$event'])
  onMove(event: any) {
    if(event) {
      this.canFooterShow = true
    } else {
      this.canFooterShow = false
    }
  }

  cookieService = inject(CookieService)
  loginService = inject(LoginService)
  router = inject(Router)

  title = 'OTP2P - Trocas';
  userConsent: boolean = false
  canFooterShow: boolean = false

  constructor() {

    setTimeout(() => {
      this.getCookieConsent()
    }, 3000);

    this.router.events.subscribe(() => {
      this.canFooterShow = false
    })
  }

  getCookieConsent() {
    const isConsented = this.cookieService.get('userConsent');
    this.loginService.userConsent.update(() => !!isConsented)
    this.userConsent = !!isConsented
  }
}
