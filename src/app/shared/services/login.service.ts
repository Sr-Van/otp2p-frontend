import { HttpClient } from '@angular/common/http';
import { Injectable, inject, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  cookie = inject(CookieService)
  http = inject(HttpClient)

  userIsLogedIn: boolean = false
  token: string
  private apiUrl: string = "https://otp-p2p-api.vercel.app/"
  //private apiUrl: string = "http://localhost:3000/"


  menuLoggedEvent = new EventEmitter<boolean>()
  loginEvent = new EventEmitter<boolean>()

  constructor() {

    if (this.cookie.get('loginToken')) {
      this.userIsLogedIn = true
    }

  }

  login(email: string, senha: string): Observable<any> {

    const obj = {
      email,
      senha
    }

    return this.http.post(`${this.apiUrl}auth/login`, obj)
  }

  saveLoginToken(token: any) {
    this.loginEvent.emit(true)
    this.cookie.set('loginToken', token, 7)
  }

  register(form: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add-register`, form)
  }

  getToken() {
    return this.cookie.get('loginToken')
  }
}
