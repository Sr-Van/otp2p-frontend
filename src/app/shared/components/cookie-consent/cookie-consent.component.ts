import { Component, effect, inject } from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './cookie-consent.component.html',
  styles: `
    :host {
      position: fixed;
      top:0;
      display: flex;
      width: 100%;
      height: 100%;
    }

    :host .backdrop {
      background-color: rgba(0, 0, 0, 0.5);
      position: relative;
      width: 100%;
      height: 100%;
    }

    :host .container {
      background-color: #27262e;
      padding: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
    }
    :host div > p {
      color: #fff !important;
      font-size: 14px;
      height: 400px;
      overflow-y: scroll;
    }

    :host [hidden] {display: none !important;}

    :host div > span {
      display: flex;
      gap: 10px;
      align-items: center;

      width: 100%;
      padding: 10px;
    }

    :host div > span > i {
      color: #902E19;
    }

    :host .cookie_buttons {
      padding: var(--basic-padding);    
      margin-top: 10px;  
    }
    :host .cookie_buttons > button {
      color: #fff;
      background-color: var(--succes-color) !important;
    }
  `
})
export class CookieConsentComponent {

  cookie = inject(CookieService)
  loginService = inject(LoginService)

  show: boolean = false
  cookieConsentSubscription: Subscription

  constructor() {
    
    effect(() => {
      this.show = !this.loginService.userConsent()
    })

  }

  acceptCookies() {
    this.cookie.set('userConsent', 'true', 365)
    this.loginService.userConsent.update(() => true)  }

}
