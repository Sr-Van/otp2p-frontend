import { Component, inject } from '@angular/core';
import { 
  FormBuilder,
  FormGroup, 
  ReactiveFormsModule, 
  Validators} from '@angular/forms';
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
  formBuilder = inject(FormBuilder)

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
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })

    //formulario de registro
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmSenha: ['', [Validators.required, Validators.minLength(6)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(9)]],
      player: ['', [Validators.required, Validators.minLength(3)]],
      mundo: ['', [Validators.required]]
    })

    this.servers = this.offerService.getServers()

  }

  sendLogin(form: FormGroup) {

    const {email, senha} = form.value

    this.formLogin.reset()
    
    this.loginService.login(email, senha).subscribe({

      next: (data) => {
        this.openSnack(data.msg, 'success')

        this.loginService.saveLoginToken(data.token, data.player)
        this.loginService.userIsLoggedIn.update(() => true)

        setTimeout(() => {
          this.router.navigate(["/"])
        }, 1500);
        
        }, error: (err) => {
          this.showLog = true
          this.errorMsg = err.error.msg
        }
          
      })
  }

  sendRegister(form: FormGroup) {

    let register = form.value

    //creating default attributes to be used in db
    register.player_type = "player"
    register.badge = "bronze"
    register.avaliacao = []
    register.anuncios = []
    register.compras = []
    register.vendas = []

    this.loginService.register(register).subscribe({

      next: (data) => {
        this.openSnack(data.msg, 'success')
        this.loginService.login(register.email, register.senha).subscribe({
          next: (data) => {
            this.loginService.saveLoginToken(data.token, data.player)
            this.loginService.userIsLoggedIn.update(() => true)
            setTimeout(() => {
              this.router.navigate(["/"])
            }, 1500);
          }
        })
      }, error: (err) => {
        this.showLog = true
        this.errorMsg = err.error.msg
      }
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