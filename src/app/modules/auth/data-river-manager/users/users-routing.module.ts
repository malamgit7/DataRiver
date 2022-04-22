import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    // children: [
    //   { path: '', redirectTo: 'assigned', pathMatch: 'full' },
    //   { path: 'assigned', loadChildren: () => import("../assigned-users/assigned-users.module").then(m => m.AssignedUsersModule) },
    //   { path: 'unassigned', loadChildren: () => import("../unassigned-users/unassigned-users.module").then(m => m.UnassignedUsersModule) }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
