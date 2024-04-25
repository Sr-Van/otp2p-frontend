import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  loginService = inject(LoginService)

  isMenuOpen: boolean = false

  ngOnInit() {
    this.loginService.menuLoggedEvent.subscribe(bool => {
      this.isMenuOpen = bool
    })
  }

}
