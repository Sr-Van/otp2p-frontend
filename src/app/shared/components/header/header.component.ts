import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CurrencyPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuComponent } from '../menu/menu.component';
import { CartComponent } from '../cart/cart.component';
import { UtilService } from '../../services/util.service';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, MatTooltipModule, MenuComponent, CartComponent],
  template: `
  <nav>
    <div class="itens container">
        <div class="logo" style="height: 100;">
            <a routerLink="/" class="poppins-bold" style="height: 100%; position: relative;">
              <img src="./../../../../assets/img/OTP2PLOGOgengar.png" alt="Logo"
              >
            </a>
        </div>

        <div class="actions">
          
          @if(userLogged) {
            <a matTooltip="Carrinho" 
             (click)="showCart()"
            >
              <i class="fa-solid fa-cart-shopping"></i>
            </a>
            <span matTooltip="Seu saldo">
              {{ userAmount | currency: 'BRL' }}
            </span>
  
            <div class="logged" (click)="toggleMenu()">
              <i class="fa-solid fa-user"></i>
            </div>
            @if(isMenuOpen) {
              <app-menu></app-menu>
            }
          }
          @else {
            <div class="login">
                <a routerLink="/login" class="poppins-thin box_shadow">Login</a>
            </div>
          }
        </div>
    
    </div>
  </nav>
`,
  styles: `
  nav {
    width: 100%;
    height: 80px;
    padding: 10px 20px;

    background-color: var(--primary-color);

    margin-bottom: 20px;
    display: flex;
    alingn-items: center;
    position: fixed;
    z-index: 999;
  }

  nav img {
    width: calc(50% + 5vw);
    max-width: 90px;
  }

  .itens, .actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      position: relative;
  }

  app-menu {
    position: fixed;
    top: 80px;

    z-index: 998;
}

  .actions {gap: var(--basic-gap);}

  .actions a {
    font-size: 18px;
    cursor: pointer;
  }

  .actions span {
    border-radius: var(--border-radius-medium);
    background-color: #27262e;
    padding: 6px;
    font-size: 14px;
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
    border-radius: var(--border-radius-medium);
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
  utilService = inject(UtilService)
  offerService = inject(OfferService)

  userLogged: boolean = false
  isMenuOpen: boolean = false
  isCartOpen: boolean = false


  userAmount: number = 0

  constructor() {
    effect(() => {
      this.userLogged = this.loginService.userIsLoggedIn()
      this.userAmount = this.offerService.userAmmount()

      if(!this.utilService.menu()) {
        setTimeout(() => {
          this.isMenuOpen = this.utilService.menu()
        }, 300);
      } else {
        this.isMenuOpen = this.utilService.menu();
      }
    })
  }


  toggleMenu() {
    this.utilService.toggleMenu()

    if(this.isCartOpen) {
      this.isCartOpen = !this.isCartOpen
      this.loginService.cartMenu.update(() => this.isCartOpen)
    }
  }

  showCart() {
    this.isCartOpen = !this.isCartOpen
    this.loginService.cartMenu.update(() => this.isCartOpen)

    if(this.utilService.menu()) {
      this.utilService.toggleMenu()
    }
  }
}
