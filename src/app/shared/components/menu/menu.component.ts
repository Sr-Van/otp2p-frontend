import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  loginService = inject(LoginService)
  router = inject(Router)

  isMenuOpen: boolean = false
  lastMenuRouteVisited: string

  ngOnInit() {
    this.loginService.menuLoggedEvent.subscribe(bool => {
      this.isMenuOpen = bool
    })
  }

  logOut() {
    this.loginService.cookie.delete('loginToken')
    this.loginService.loginEvent.emit(false)
    window.location.reload()
  }

  goToRoute(route: string) {

    if (this.lastMenuRouteVisited == route) {
      window.location.reload()
    }

    this.router.navigate([route])
    .then(bool => {
      //esse metodo retorna um boolean, se conseguir navegar ate a rota ele retorna true, se for o caso o menu tem que ser fechado, emitindo "false" no evento
      this.loginService.menuLoggedEvent.emit(!bool)

      this.lastMenuRouteVisited = route
    })
    .catch(erro => console.log(erro))
  }

}
