import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl: string = "https://otp-p2p-api.vercel.app/"
  http = inject(HttpClient)

  constructor() { }

  ngOnInit() {
  }
  
  getAllSales():Observable<any> {
    return this.http.get<any>(this.apiUrl + "sales")
  }
}
