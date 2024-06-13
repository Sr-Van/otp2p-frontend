import { Component, effect, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  loginService = inject(LoginService)
  utilService = inject(UtilService)
  router = inject(Router)

  isMenuOpen: boolean = false
  lastMenuRouteVisited: string

  constructor() {
    effect(() => {
      this.isMenuOpen = this.utilService.menu()
    })
  }
  ngOnInit() {

  }

  logOut() {
    this.loginService.cookie.delete('loginToken')
    this.loginService.userIsLoggedIn.update(() => false)
    window.location.reload()
  }

  goToRoute(route: string) {

    if (this.lastMenuRouteVisited == route) {
      window.location.reload()
    }

    this.router.navigate([route])
    .then(() => {
      this.utilService.toggleMenu()

      this.lastMenuRouteVisited = route
    })
    .catch(erro => console.log(erro))
  }

}
