import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/register';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  http = inject(HttpClient)
  loginService = inject(LoginService)
  userAmmount = signal(0)

  private apiUrl: string = "https://otp-p2p-api.vercel.app/"
  //private apiUrl: string = "http://localhost:3000/"
  servidores: any [] = ['red','blue','green','yellow','orange','black','white','purple','pink']

  constructor() {
    if(this.loginService.userIsLoggedIn()){
      this.getPlayerOffers(this.loginService.playerName).subscribe({
        next: (data) => {
          this.userAmmount.set(data.ammount)
        },
        error: (err) => {
          throw new Error(err)
        }
      })
    }
  }

  getPlayerOffers(player: string): Observable<Register> {
    if(!player) {
      window.location.reload()
    }
    return this.http.get<Register>(`${this.apiUrl}register/${player}`)
  }

  addAmmount(body: object): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}add/ammount/${this.loginService.playerName}`, body)
  }

  removeAmmount(body: object): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}remove/ammount/${this.loginService.playerName}`, body)
  }

  updateAmmount() {
    this.getPlayerOffers(this.loginService.playerName).subscribe({
      next: (data) => {
        this.userAmmount.set(data.ammount)
      },
      error: (err) => {
        throw new Error(err)
      }
    })
  }
  getAllPokes(): Observable<any> {
    return this.http.get('../../../assets/files/pokes.json')
  }

  getServers() {
    return this.servidores
  }

  addOffer(player: string, data: any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}add/offer/${player}`, data)
  }

  removeOffer(data: any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}remove/offer`, data)
  }

  addComment(player: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}add/rating/${player}`, data)
  }
}
