import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { HeaderPipe } from '../../pipes/header.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trades-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, HeaderPipe, MatTooltipModule],
  templateUrl: './trades-card.component.html',
  styleUrl: './trades-card.component.css'
})
export class TradesCardComponent {

  route = inject(Router)

  @Input('item') item: any
  @Input('type') type: string

  progressBarWidth: number = 0
  progressColor: string = ""
  imgSource: string = ""

  quotes: any = {
    buy: {
      ordered: "Seu pedido foi enviado! nós notificamos o vendedor, depois que ele enviar seu pedido ele confirmará que enviou, mas só ira receber o dinheiro depois da sua confirmação. 😉",
      sended: "O vendedor enviou o seu pedido, confirme que recebeu por aqui para finalizar o pedido.",
      received: "Aproveite seu item!"
    },
    sale: {
      ordered: "Seu pedido foi comprado! Por favor, envie seu item para o player in-game, o valor já está conosco e confiscado. Após enviar, confirme aqui que ja entregou e peça para o comprador confirmar que recebeu, assim te enviaremos o dinheiro da venda.",
      sended: "Você enviou o seu item para o comprador, aguarde a confirmação dele para finalizar o pedido.",
      received: "Seu item foi vendido, parabéns!"
    }
  }

  ngOnInit() {

    this.imgSource = `../../../../assets/img/${this.item.header}.png`
    console.log(this.type)

    this.getProgressBarInfos()

  }

  getProgressBarInfos() {

    if(this.item.situation === "received") {
      this.progressColor = "#209513"
      this.progressBarWidth = 100
      return
    }
    if(this.item.situation === "sended") {
      this.progressColor = "#3393FF"
      this.progressBarWidth = 55
      return
    }
    this.progressColor = "#F7CE17"
    this.progressBarWidth = 20
  }

  goToPlayerProfile(player: string) {

    this.route.navigate([`player/${player}`])

  }

}
