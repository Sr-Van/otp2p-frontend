import { Component, effect, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  animations: [
    trigger('enterAnim', [
      transition(':enter', [
        style({
          height: 0,
          scale: .9,
          overflow: 'hidden'
        }),
        animate('200ms ease-out', style({
          height: '*',
          scale: 1
        }))
      ]),
      transition(':leave', [
        style({
          height: '*',
          scale: 1,
          overflow: 'hidden'
        }),
        animate('150ms ease-out', style({
          height: 0,
          scale: .8
        }))
      ])
    ])
  ]
})
export class MenuComponent {

  loginService = inject(LoginService)
  utilService = inject(UtilService)
  router = inject(Router)

  isMenuOpen: boolean = false
  lastMenuRouteVisited: string

  constructor() {
    effect(() => {
      if(!this.utilService.menu()) {
        setTimeout(() => {
          this.isMenuOpen = this.utilService.menu()
        }, 200);
      } else {
        this.isMenuOpen = this.utilService.menu()
      }
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
