import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllTablesRoutingModule } from './all-tables-routing.module';
import { AllTablesComponent } from './all-tables.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    AllTablesComponent
  ],
  imports: [
    CommonModule,
    AllTablesRoutingModule,
    TableModule,
    CardModule
  ]
})
export class AllTablesModule { }
