import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryOutputDetailsRoutingModule } from './query-output-details-routing.module';
import { QueryOutputDetailsComponent } from './query-output-details.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    QueryOutputDetailsComponent
  ],
  imports: [
    CommonModule,
    QueryOutputDetailsRoutingModule,
    CardModule,
    TableModule,
    RouterModule
  ]
})
export class QueryOutputDetailsModule { }
