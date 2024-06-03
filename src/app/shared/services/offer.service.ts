import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  http = inject(HttpClient)

  private apiUrl: string = "https://otp-p2p-api.vercel.app/"
  //private apiUrl: string = "http://localhost:3000/"
  servidores: any [] = ['red','blue','green','yellow','orange','black','white','purple','pink']

  constructor() {
  }

  getPlayerOffers(player: string): Observable<any> {
    if(!player) {
      window.location.reload()
    }
    return this.http.get(`${this.apiUrl}register/${player}`)
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

  addComment(player: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}add/rating/${player}`, data)
  }
}
