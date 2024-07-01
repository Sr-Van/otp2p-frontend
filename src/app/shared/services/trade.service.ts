import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Trade {
  trade_player: string
  player: string
  itemId: string
}

export interface Confirmation {
  seller: string
  itemId: string
  buyer: string
}

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  http = inject(HttpClient)

  private apiUrl: string = "https://otp-p2p-api.vercel.app/"

  constructor() { }

  addTrade(body: Trade) :Observable<any> {
    return this.http.put<any>(this.apiUrl + "add/trade", body)
  }

  confirmSended(body: Confirmation) :Observable<any> {
    return this.http.put<any>(this.apiUrl + "trade/confirm/seller", body)
  }

  confirmReceived(body: Confirmation) :Observable<any> {
    return this.http.put<any>(this.apiUrl + "trade/confirm/buyer", body)
  }

  public cancelTradeBuyer(body: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "trade/cancel/buyer", body)
  }

  public cancelTradeSeller(body: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "trade/cancel/trade", body)
  }
}
