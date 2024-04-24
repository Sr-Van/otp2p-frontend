import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-rating-card',
  standalone: true,
  imports: [MatTooltipModule],
  template: `
    <div class="card box_shadow">

      <div class="title">
          <b> {{ item.player }}</b>
      </div>

      <div class="body">
          <p class="poppins-regular-italic"> {{ item.text }} </p>
      </div>

      <small> {{ item.date }} </small>

      @if(item.denuncia) {
          
          <div class="warning" 
          matTooltip="Cuidado, Isto é uma denuncia!"
          matTooltipPosition="above">
              <i class="fa-solid fa-triangle-exclamation"></i>
          </div>

      }
    </div>
  `,
  styles: `
    .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;

    background-color: #232323;

    width: 250px;
    overflow: auto;
  }

  .card .body p {
      font-size: 12px;
  }

  .card .warning {
      position: absolute;
      right: 10px;
      bottom: 0;

      color: red;

      font-size: 20px;
  }
  `
})
export class RatingCardComponent {

  @Input() item: any
}
