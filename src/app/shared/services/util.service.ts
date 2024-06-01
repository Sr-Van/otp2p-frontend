import { Injectable } from '@angular/core';
import { Anuncio } from '../interfaces/arrays';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getImgSource(card: Anuncio): string {
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
}
