import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';
import { ItemComponent } from './pages/item/item.component';
import { PlayerComponent } from './pages/player/player.component';
import { NotLoggedComponent } from './pages/not-logged/not-logged.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { LoginGuard } from './shared/guard/login.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { TradesComponent } from './pages/trades/trades.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add/offer', component: NewOfferComponent, canActivate: [AuthGuard]},
    {path: 'item/:item', component: ItemComponent},
    {path: 'player/:player', component: PlayerComponent},
    {path: 'not-logged', component: NotLoggedComponent, canActivate: [LoginGuard]},
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'trades', component: TradesComponent, canActivate: [AuthGuard]}
];
