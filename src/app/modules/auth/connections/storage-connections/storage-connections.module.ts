import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageConnectionsRoutingModule } from './storage-connections-routing.module';
import { StorageConnectionsComponent } from './storage-connections.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    StorageConnectionsComponent
  ],
  imports: [
    CommonModule,
    StorageConnectionsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})
export class StorageConnectionsModule { }
