import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  http = inject(HttpClient)

  servidores: any [] = ['red','blue','green','yellow','orange','black','white','purple','pink']

  constructor() { }

  getAllPokes(): Observable<any> {
    return this.http.get('../../../assets/files/pokes.json')
  }

  getServers() {
    return this.servidores
  }
}
