import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalTableRoutingModule } from './external-table-routing.module';
import { ExternalTableComponent } from './external-table.component';


@NgModule({
  declarations: [
    ExternalTableComponent
  ],
  imports: [
    CommonModule,
    ExternalTableRoutingModule
  ]
})
export class ExternalTableModule { }
