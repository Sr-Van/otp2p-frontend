import { Injectable, inject, signal } from '@angular/core';
import { Anuncio } from '../interfaces/arrays';
import { LoginService } from './login.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loginService = inject(LoginService)
  title = inject(Title)
  
  menu = signal<boolean>(false)
  isOffersUpdated = signal<boolean>(false)
  showWarning = signal<boolean>(false)
  public loadAction = signal<boolean>(false);

  snackBar = inject(MatSnackBar)
  horizontalPosition: MatSnackBarHorizontalPosition = 'right'
  verticalPosition: MatSnackBarVerticalPosition = 'top'

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

  openSnack(msg: string, type: string) {
    this.snackBar.open(msg, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition : this.verticalPosition,
      panelClass: ['snack', `snack_${type}`],
      duration: 3000
    })
  }

  setPageName(pageName: string) {
    this.title.setTitle(pageName)
  }

  public runActionLoading(time: number): void {
    this.loadAction.set(true);

    setTimeout(() => {
      this.loadAction.set(false);
    }, time);
  }
}
