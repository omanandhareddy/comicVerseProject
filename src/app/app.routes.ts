import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'SignUp', pathMatch: 'full' },
    {path:'SignUp',loadComponent:()=>(import('./sign-up/sign-up.component').then(m=>m.SignUpComponent))},
    {path:'login-page',loadComponent:()=>(import('./login-page/login-page.component').then(m=>m.LoginPageComponent))},
    { path: 'home-page', loadComponent: () => import('./home-page/home-page.component').then(m => m.HomePageComponent), canActivate: [authGuard] },
    { path: 'popular', loadComponent: () => import('./popular/popular.component').then(m => m.PopularComponent), canActivate: [authGuard] },
    { path: 'input-page', loadComponent: () => import('./input-page/input-page.component').then(m => m.InputPageComponent), canActivate: [authGuard] },
    { path: 'favourites', loadComponent: () => import('./favourites/favourites.component').then(m => m.FavouritesComponent), canActivate: [authGuard] },
    { path: 'charecter', loadComponent: () => import('./charecter/charecter.component').then(m => m.CharecterComponent), canActivate: [authGuard] },
    { path: 'overview', loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent), canActivate: [authGuard] },
    {path:'userDetails',loadComponent:()=>import('./user-details/user-details.component').then(m=>m.UserDetailsComponent),canActivate:[authGuard]}
];
