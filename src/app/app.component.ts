import { Component, effect, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/components/header/header.component';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './shared/services/login.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { WarningComponent } from './shared/components/warning/warning.component';
import { UtilService } from './shared/services/util.service';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    CookieConsentComponent,
    FooterComponent,
    CartComponent,
    WarningComponent,
    LoadingComponent
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
  private utS$ = inject(UtilService);
  router = inject(Router)

  title = 'OTP2P - Trocas';
  userConsent: boolean = false
  canFooterShow: boolean = false
  public showWarning: boolean = true;

  constructor() {

    effect(() => {
      if(!this.utS$.showWarning()) {
        setTimeout(() => {
          this.showWarning = this.utS$.showWarning()
        }, 200);
      } else {
        this.showWarning = this.utS$.showWarning()
      }
    })

    setTimeout(() => {
      this.getCookieConsent()
      this.getWarningCookie();
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

  private getWarningCookie(): void {
    const isWarning = this.cookieService.get('warning');
    console.log(isWarning, ' iswarning value')

    if(!isWarning) {
      this.utS$.showWarning.update(() => true);
    }

    this.cookieService.set('warning', 'true', 1);
  }
}
