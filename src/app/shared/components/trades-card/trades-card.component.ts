import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { HeaderPipe } from '../../pipes/header.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { TradeService } from '../../services/trade.service';
import { LoginService } from '../../services/login.service';


import { Subscription } from 'rxjs';



interface ItemTrading {
  header: string;
  description: string;
  type: string;
  price: number;
  mundo: string;
  itemId: string;
  situation: string;
  trade_player: string
}

@Component({
  selector: 'app-trades-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, HeaderPipe, MatTooltipModule],
  templateUrl: './trades-card.component.html',
  styleUrl: './trades-card.component.css'
})
export class TradesCardComponent {

  route = inject(Router)
  utilService = inject(UtilService)
  tradeService = inject(TradeService)
  loginService = inject(LoginService)

  @Input('item') item: ItemTrading
  @Input('type') type: string
  @Output() cancelPopup = new EventEmitter(); 

  progressBarWidth: number = 0
  progressColor: string = ""
  imgSource: string = ""
  sendedSubscription: Subscription
  receivedSubscription: Subscription

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

    this.imgSource = this.utilService.getImgSource(this.item.type, this.item.header)

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

  confirmSended() {
    const body = {
      buyer: this.item.trade_player,
      seller: this.loginService.playerName,
      itemId: this.item.itemId
    }

    this.sendedSubscription = this.tradeService.confirmSended(body).subscribe({
      next: (data) => {
        this.utilService.openSnack(data.msg, 'success')
        this.utilService.runActionLoading(1200);
        setTimeout(() => {
          window.location.reload()
        }, 400);
      }, error: (err) => {
        throw new Error(err)
      }
    })
  }

  confirmReceived() {

    const body = {
      seller: this.item.trade_player,
      buyer: this.loginService.playerName,
      itemId: this.item.itemId
    }

    this.receivedSubscription = this.tradeService.confirmReceived(body).subscribe({
      next: (data) => {
        this.utilService.openSnack(data.msg, 'success')
        this.utilService.runActionLoading(1200);
        setTimeout(() => {
          window.location.reload()
        }, 400);
      }, error: (err) => {
        throw new Error(err)
      }
    })
    
  }


}
