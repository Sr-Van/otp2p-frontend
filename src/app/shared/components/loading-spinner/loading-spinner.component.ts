import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  `,
  styles: `
    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-top-color: var(--primary-color);
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

  `
})
export class LoadingSpinnerComponent {

}
