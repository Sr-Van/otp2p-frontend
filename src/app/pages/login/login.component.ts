import { Component, inject } from '@angular/core';
import { 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';


import { LoginService } from '../../shared/services/login.service';
import { OfferService } from '../../shared/services/offer.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //dependency injection
  loginService = inject(LoginService)
  offerService = inject(OfferService)
  router = inject(Router)
  snack = inject(MatSnackBar)

  //forms
  formLogin: FormGroup
  formRegister: FormGroup

  //variables
  showLog: boolean
  errorMsg: string
  isRegister: boolean = false

  // arrays
  servers: any[] = []

  //angular material snackbar configuration
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {
    //formulario de login
    this.formLogin = new FormGroup({
      email: new FormControl,
      senha: new FormControl
    })

    //formulario de registro
    this.formRegister = new FormGroup({
      nome: new FormControl,
      player: new FormControl,
      email: new FormControl,
      senha: new FormControl,
      confirmSenha: new FormControl,
      mundo: new FormControl,
      cpf: new FormControl
    })

    this.servers = this.offerService.getServers()

  }

  sendLogin(form: any) {

    const {email, senha} = form.value

    this.formLogin.reset()
    
    this.loginService.login(email, senha).subscribe((data: any) => {

      this.openSnack(data.msg, 'success')

      this.loginService.saveLoginToken(data.token, data.player)
      this.loginService.userIsLogedIn = true

      setTimeout(() => {
        this.router.navigate(["/"])
      }, 1500);
      
    }, (error) => {
      
      this.errorMsg = error.error.msg
      this.showLog = true

    }) 
  }

  sendRegister(form: any) {

    let register = form.value

    //creating default attributes to be used in db
    register.player_type = "player"
    register.badge = "bronze"
    register.avaliacao = []
    register.anuncios = []
    register.compras = []
    register.vendas = []

    this.loginService.register(register).subscribe((response) => {

      this.openSnack(response.msg, 'success')

    }, (error) => {

      this.showLog = true
      this.errorMsg = error.error.msg

    })
  }

  changeType() {

    this.showLog = false
    this.isRegister = !this.isRegister

  }

  openSnack(msg: string, type: string) {
    this.snack.open(msg, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition : this.verticalPosition,
      panelClass: ['snack', `snack_${type}`],
      duration: 3000
    })
  }

}