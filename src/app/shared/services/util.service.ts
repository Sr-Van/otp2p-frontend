import { Injectable, inject, signal } from '@angular/core';
import { Anuncio } from '../interfaces/arrays';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loginService = inject(LoginService)
  menu = signal<boolean>(false)

  constructor() { }

  toggleMenu() {
    this.menu.update(bool => !bool)
  }

  getImgSource(type: string, image: string): string {
    const imagePath = `../../assets/img/${type === 'pokemon' ? image : type}.png`;
    return imagePath;
  }

  verifyItemOnCart(item: Anuncio): boolean {
    const arr = this.loginService.getCart();
    return arr?.filter((i: Anuncio) => i.itemId === item.itemId).length > 0 
      ? true 
      : false
  }
}
