import { HttpClient } from '@angular/common/http';
import { Injectable, inject, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Anuncio } from '../interfaces/arrays';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  cookie = inject(CookieService)
  http = inject(HttpClient)

  userIsLogedIn: boolean = false
  playerName: string
  token: string
  private apiUrl: string = "https://otp-p2p-api.vercel.app/"
  cart: Anuncio[] = []
  //private apiUrl: string = "http://localhost:3000/"


  menuLoggedEvent = new EventEmitter<boolean>()
  loginEvent = new EventEmitter<boolean>()
  UserConsentCookieEvent = new EventEmitter<boolean>()
  cartMenuEvent = new EventEmitter<boolean>()

  constructor() {

    if (this.cookie.get('loginToken')) {
      this.userIsLogedIn = true
      this.playerName = this.cookie.get('player')
    }

  }

  login(email: string, senha: string): Observable<any> {

    const obj = {
      email,
      senha
    }

    return this.http.post(`${this.apiUrl}auth/login`, obj)
  }

  saveLoginToken(token: any, playerName: string) {
    this.loginEvent.emit(true)
    this.cookie.set('loginToken', token, 7)
    this.cookie.set('player', playerName, 7)
  }

  register(form: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add-register`, form)
  }

  getToken() {
    return this.cookie.get('loginToken')
  }

  getCart() {
    this.cart = JSON.parse(localStorage?.getItem('cart') || '[]')

    if(!this.cart) {
      localStorage.setItem('cart', JSON.stringify([]))
    }

    return this.cart
  }

  setCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  addItem(item: Anuncio) {
    this.cart.push(item)

    this.setCart()
  }
}
