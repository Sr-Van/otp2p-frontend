import { Injectable, inject } from '@angular/core';
import { Anuncio } from '../interfaces/arrays';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loginService = inject(LoginService)

  constructor() { }

  getImgSource(card: any): string {
    if(card.type === "pokemon") {
      return `../../assets/img/${card.header}.png`
    }

    if(card.type === "hd") {
      return `../../assets/img/hds.png`
    }

    if(card.type === "tm") {
      return `../../assets/img/tm.png`
    }

    return `../../assets/img/item.png`

  }

  verifyItemOnCart(item: Anuncio): boolean {
    const arr = this.loginService.getCart();
    return arr?.filter((i: Anuncio) => i.itemId === item.itemId).length > 0 
      ? true 
      : false
  }
}
