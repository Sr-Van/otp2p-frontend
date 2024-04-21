import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';
import { ItemComponent } from './pages/item/item.component';
import { PlayerComponent } from './pages/player/player.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add/offer', component: NewOfferComponent},
    {path: 'item/:item', component: ItemComponent},
    {path: 'player/:player', component: PlayerComponent}
];
