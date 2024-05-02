import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
  <nav>
    <div class="itens container">
        <div class="logo">
            <a routerLink="/" class="poppins-bold">OtP2P</a>
        </div>
    
        @if(userLogged) {

          <div class="logged" (click)="toggleMenu()">
            <i class="fa-solid fa-user"></i>
          </div>
        }
        @else {
          <div class="login">
              <a routerLink="/login" class="poppins-thin box_shadow">Login</a>
          </div>
        }
    </div>
  </nav>
`,
  styles: `
  nav {
    width: 100%;
    height: 50px;
    padding: 10px 20px;

    background-color: #5f0d76;

    margin-bottom: 20px;
  }

  .itens {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
  }

  nav .login > a { 
      font-size: 12px;
      padding: 8px 16px;
      border-radius: 5px;

      background-color: #232323;

      transition: all 300ms ease-out;
  }

  nav .login > a:hover { 
      box-shadow: none;
  }

  nav .logged {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    background-color: #232323;
  }

  nav .logged{
    cursor: pointer;
  }
  a {
      text-decoration: none;
      font-size: 18px;
      color: #fff;
  }
  `
})
export class HeaderComponent {

  loginService = inject(LoginService)

  userLogged: boolean = false
  isMenuOpen: boolean = false

  loginEventSubscription: Subscription

  ngOnInit() {
    this.userLogged = this.loginService.userIsLogedIn

    if(!this.userLogged) {

      this.loginEventSubscription = this.loginService.loginEvent.subscribe(bool => {  
        this.userLogged = bool
      })

    }

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
    this.loginService.menuLoggedEvent.emit(this.isMenuOpen)
  }

}
