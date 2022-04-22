import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './storage.component';
import { SidebarComponent } from './_sidebar/sidebar.component';


@NgModule({
  declarations: [
    StorageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    StorageRoutingModule
  ]
})
export class StorageModule { }
