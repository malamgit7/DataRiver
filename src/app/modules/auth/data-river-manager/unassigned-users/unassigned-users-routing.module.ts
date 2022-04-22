import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnassignedUsersComponent } from './unassigned-users.component';

const routes: Routes = [
  { path: '', component: UnassignedUsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnassignedUsersRoutingModule { }
