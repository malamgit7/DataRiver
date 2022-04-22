import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataRiverManagerComponent } from './data-river-manager.component';

const routes: Routes = [
  {
    path: '',
    component: DataRiverManagerComponent,
    children: [
      { path: '', redirectTo: 'groups', pathMatch: 'full' },
      { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
      { path: 'users', loadChildren: () => import("./users/users.module").then(m => m.UsersModule) },
      { path: 'roles', loadChildren: () => import("./roles/roles.module").then(m => m.RolesModule) }
      // { path: 'assigned-users', loadChildren: () => import("./assigned-users/assigned-users.module").then(m => m.AssignedUsersModule) },
      // { path: 'unassigned-users', loadChildren: () => import("./unassigned-users/unassigned-users.module").then(m => m.UnassignedUsersModule) }
    ]
  },
  { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRiverManagerRoutingModule { }
