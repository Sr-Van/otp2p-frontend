import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-not-logged',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-logged.component.html',
  styleUrl: './not-logged.component.css'
})
export class NotLoggedComponent {

  $uS = inject(UtilService)

  constructor() {
    this.$uS.setPageName('Not Logged')
  }

}
