import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedUsersRoutingModule } from './assigned-users-routing.module';
import { AssignedUsersComponent } from './assigned-users.component';


@NgModule({
  declarations: [
    AssignedUsersComponent
  ],
  imports: [
    CommonModule,
    AssignedUsersRoutingModule
  ]
})
export class AssignedUsersModule { }
