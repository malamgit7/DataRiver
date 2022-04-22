import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlServerComponent } from './sql-server.component';
import { SqlServerRoutingModule } from './sql-server-routing.module';
import { SidebarComponent } from './_sidebar/sidebar.component';


@NgModule({
  declarations: [
    SqlServerComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SqlServerRoutingModule
  ]
})
export class SqlServerModule { }
