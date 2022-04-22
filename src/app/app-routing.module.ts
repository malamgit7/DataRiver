import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./modules/unauth/home/home.module').then(m => m.HomeModule) },

  { path: '**', loadChildren: () => import('./modules/unauth/notfound/notfound.module').then(m => m.NotfoundModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
