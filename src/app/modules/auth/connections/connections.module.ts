import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionsRoutingModule } from './connections-routing.module';
import { ConnectionsComponent } from './connections.component';
import { SidebarComponent } from './_sidebar/sidebar.component';


@NgModule({
  declarations: [
    ConnectionsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ConnectionsRoutingModule
  ]
})
export class ConnectionsModule { }
