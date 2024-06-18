import { Component, Input, inject } from "@angular/core";
import { UtilService } from "../../shared/services/util.service";


@Component({
    selector: 'app-trade-list',
    template: `
    <div class="rounded_medium" style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
        <span [style]="{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '5px',
            color: '#fff'
        }">
            <div class="server_bg" [style]="{
                background: 'linear-gradient(90deg, ' + mundo + ' 0%, rgba(0,212,255,0) 100%)'
            }"></div>
            <img [src]="getImgSource()" [alt]="itemName">
            <div style="display: flex; flex-direction: column;">
                <span 
                    style="font-size: 10px; color: #9EA7B1;">{{ itemType }}</span>
                <span>{{ itemName }}</span>
            </div>
        </span>
        <span [style]="
        {
            padding: '5px',
            color: situation === 'received' ? 'green' : '#fff',
            fontSize: '12px'
        }">
            {{ situation }}
        </span>
    </div>
    `,
    styles: `
        img {
            width: 30px;
            height: 30px;
            object-fit: contain;
            aspect-ratio: 1 / 1;
        }
        .server_bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.2;
            z-index: 0;
            filter: blur(2px);
        }

    `,
    standalone: true
})
export class TradeListComponent {

    utilSerivce = inject(UtilService)

    @Input() imgSource: string
    @Input() itemType: string
    @Input() itemName: string
    @Input() mundo: string
    @Input() situation: string

    constructor() {
        this.getImgSource()
    }

    getImgSource() {
        const imgSrc = this.utilSerivce.getImgSource(this.itemType, this.imgSource);
        return imgSrc;
    }

}