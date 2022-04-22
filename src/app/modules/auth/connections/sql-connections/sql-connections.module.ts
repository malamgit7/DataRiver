import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlConnectionsRoutingModule } from './sql-connections-routing.module';
import { SqlConnectionsComponent } from './sql-connections.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    SqlConnectionsComponent
  ],
  imports: [
    CommonModule,
    SqlConnectionsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    CardModule
  ],
  providers: [ConfirmationService]
})
export class SqlConnectionsModule { }
