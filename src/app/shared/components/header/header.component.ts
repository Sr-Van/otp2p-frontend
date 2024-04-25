import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

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
            <div class="img">
              
            </div>
          </div>
        }
        @else {
          <div class="login">
              <a href="#" class="poppins-thin box_shadow">Login</a>
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

  nav .logged .img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    background-color: red;
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

  ngOnInit() {
    this.userLogged = this.loginService.userIsLogedIn

    console.log(this.userLogged)
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
    this.loginService.menuLoggedEvent.emit(this.isMenuOpen)
  }

}
