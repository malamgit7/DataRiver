import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllExternalTablesRoutingModule } from './all-external-tables-routing.module';
import { AllExternalTablesComponent } from './all-external-tables.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    AllExternalTablesComponent
  ],
  imports: [
    CommonModule,
    AllExternalTablesRoutingModule,
    RouterModule,
    TableModule,
    CardModule
  ]
})
export class AllExternalTablesModule { }
