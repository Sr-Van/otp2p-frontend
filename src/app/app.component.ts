import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { CookieService } from 'ngx-cookie-service';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    MenuComponent, 
    CookieConsentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  cookieService = inject(CookieService)
  cookieDialog = inject(MatDialog)

  title = 'OTP2P - Trocas';
  cookieIsConsent: boolean = false

  ngOnInit() {

    if(this.cookieService.get('userConsent')) {
      this.cookieIsConsent = true
    } else {
      
      this.cookieDialog.open(CookieConsentComponent, {
        panelClass: 'cookie_dialog'
      })
      
    }

  }
}
