import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './cookie-consent.component.html',
  styles: `
    :host div > p {
      color: #fff !important;
      font-size: 14px;
    }

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

  data = inject(MAT_DIALOG_DATA)
  cookie = inject(CookieService)

  acceptCookies() {
    this.cookie.set('userConsent', 'true', 365)
  }

}
