import { Routes } from '@angular/router';

import { AuthGuard } from './shared/guard/auth.guard';
import { LoginGuard } from './shared/guard/login.guard';


export const routes: Routes = [
    {path: '', 
        loadComponent: () => import('./pages/home/home.component')
        .then(c => c.HomeComponent)},
    {path: 'add/offer', 
        loadComponent: () => import('./pages/new-offer/new-offer.component')
        .then(c => c.NewOfferComponent), canActivate: [AuthGuard]},
    {path: 'item/:item', 
        loadComponent: () => import('./pages/item/item.component')
        .then(c => c.ItemComponent)},
    {path: 'player/:player', 
        loadComponent: () => import('./pages/player/player.component')
        .then(c => c.PlayerComponent)},
    {path: 'not-logged', 
        loadComponent: () => import('./pages/not-logged/not-logged.component')
        .then(c => c.NotLoggedComponent), canActivate: [LoginGuard]},
    {path: 'login', 
        loadComponent: () => import('./pages/login/login.component')
        .then(c => c.LoginComponent), canActivate: [LoginGuard]},
    {path: 'profile', 
        loadComponent: () => import('./pages/profile/profile.component')
        .then(c => c.ProfileComponent), 
        canActivate: [AuthGuard]},
    {path: 'trades', 
        loadComponent: () => import('./pages/trades/trades.component')
        .then(c => c.TradesComponent), 
        canActivate: [AuthGuard]},
    {path: 'faq', 
        loadComponent: () => import('./pages/faq-page/faq-page.component')
        .then(c => c.FaqPageComponent), children :[
            {path: 'filter/:filterParam', loadComponent: () => import('./shared/components/faq-content/faq-content.component')
            .then(c => c.FaqContentComponent)}
        ]
    },
    {path: 'deposit',
        loadComponent: () => import('./pages/deposit/deposit.component')
        .then(c => c.DepositComponent), canActivate: [AuthGuard]
    },
    {path: 'cashout',
        loadComponent: () => import('./pages/cashout/cashout.component')
        .then(c => c.CashoutComponent), canActivate: [AuthGuard]
    },
    {
        path:'your-offers',
        loadComponent: () => import('./pages/your-offers/your-offers.component')
        .then(c => c.YourOffersComponent), canActivate: [AuthGuard]
    },
    {
        path: 'confirm/acc/verification/:email/:token',
        loadComponent: () => import('./pages/email-verification/email-verification.component')
        .then(c => c.EmailVerificationComponent)
    }
];
