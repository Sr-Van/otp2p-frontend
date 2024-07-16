import { trigger, transition, style, animate } from '@angular/animations';
import { Component, effect, inject } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
  @if(isOpen) {
  <div class="cont rounded_small box_shadow" [@loading]>
    <span class="loader"></span>
  </div>
  } 
  `,
  styles: `
  :host {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100dvh;
    z-index: 999;
    display: grid;
    place-items: center;
  }

  .cont {
    width: 50px;
    height: 50px;
    background-color: var(--skeleton-color);

    position:relative;
  }
  .loader {
  color: #fff;
  font-size: 5px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-indent: -9999em;
  animation: mulShdSpin 1.3s infinite linear;
  transform: translateZ(0), scale(.5);
}

@keyframes mulShdSpin {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 
    2em -2em 0 0em, 3em 0 0 -1em, 
    2em 2em 0 -1em, 0 3em 0 -1em, 
    -2em 2em 0 -1em, -3em 0 0 -1em, 
    -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 
    3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, 
    -2em 2em 0 -1em, -3em 0 0 -1em, 
    -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 
    2em -2em 0 0, 3em 0 0 0.2em, 
    2em 2em 0 0, 0 3em 0 -1em, 
    -2em 2em 0 -1em, -3em 0 0 -1em, 
    -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
     3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, 
     -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
     3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, 
     -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
     3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, 
     -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 
    3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
    -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 
    3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
    -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
  
  `,
  animations: [
    trigger('loading', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.5)' }),
        animate('0.2s ease', style({ opacity: 1, transform: 'scale(1.1)' })),
      ]),
      transition('* => open', [
        style({ transform: 'scale(1)' }),
      ]),
      transition(':leave', [
        animate('0.2s ease', style({ transform: 'scale(.8)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoadingComponent {

  private ut$ = inject(UtilService);
  public isOpen: boolean = false;

  constructor() {

    effect(() => {
      this.isOpen = this.ut$.loadAction();
    })
  }

}
