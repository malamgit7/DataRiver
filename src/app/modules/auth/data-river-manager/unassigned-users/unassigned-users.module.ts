import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnassignedUsersRoutingModule } from './unassigned-users-routing.module';
import { UnassignedUsersComponent } from './unassigned-users.component';


@NgModule({
  declarations: [
    UnassignedUsersComponent
  ],
  imports: [
    CommonModule,
    UnassignedUsersRoutingModule
  ]
})
export class UnassignedUsersModule { }
