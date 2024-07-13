import { Component, effect, HostListener, inject } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'Warning',
  standalone: true,
  imports: [],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.4)' }),
        animate('200ms ease', style({ opacity: 1, transform: 'scale(1.1)' })),
      ]),
      transition('* => open', [
        animate('200ms ease', style({  transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0, transform: 'scale(.6)' })),
      ]),
    ]),
  ]
})
export class WarningComponent {

  private utS$ = inject(UtilService);

  public isOpen: boolean = false;

  constructor() {
    effect(() => {
      if(!this.utS$.showWarning()) {
        setTimeout(() => {
          this.isOpen = this.utS$.showWarning()          
        }, 200)
      } else {
        this.isOpen = this.utS$.showWarning()
      }
    })
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if(event.key === 'Escape') {
      this.closeWarning()
    }
  }

  private closeWarning(): void {
    if(this.isOpen) {
      this.isOpen = false
      this.utS$.showWarning.update(bool => !bool)
    }
  }
}
