import { HttpClient } from '@angular/common/http';
import { Injectable, inject, EventEmitter, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Anuncio } from '../interfaces/arrays';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  cookie = inject(CookieService)
  http = inject(HttpClient)
  document = inject(DOCUMENT)

  userIsLoggedIn = signal<boolean>(false)

  playerName: string
  token: string
  private apiUrl: string = "https://otp-p2p-api.vercel.app/"
  cart: Anuncio[] = []
  //private apiUrl: string = "http://localhost:3000/"


  UserConsentCookieEvent = new EventEmitter<boolean>()
  cartMenuEvent = new EventEmitter<boolean>()
  cartItemEvent = new EventEmitter<any>()

  constructor() {

    if (this.cookie.get('loginToken')) {
      this.userIsLoggedIn.update(() => true)
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
    this.userIsLoggedIn.update(() => true)
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
    this.cart = JSON.parse(this.document.defaultView?.localStorage?.getItem('cart') || '[]')

    if(!this.cart) {
      this.document.defaultView?.localStorage?.setItem('cart', JSON.stringify([]))
    }

    return this.cart
  }

  setCart() {
    this.document.defaultView?.localStorage?.setItem('cart', JSON.stringify(this.cart))
  }

  addItem(item: Anuncio) {
    this.cart.push(item)

    this.setCart()
  }

  removeItem(item: Anuncio) {
    try {
      if (!this.cart) {
        throw new Error('Cart is null or undefined');
      }
      const itemId = item.itemId;

      const index = this.cart.map((anuncio: Anuncio) => anuncio.itemId).indexOf(itemId);

      if (index === -1) {
        throw new Error('Item not found in cart');
      }

      this.cart.splice(index, 1);
      this.setCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }
}
