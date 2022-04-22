import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateExternalTableRoutingModule } from './create-external-table-routing.module';
import { CreateExternalTableComponent } from './create-external-table.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateExternalTableComponent
  ],
  imports: [
    CommonModule,
    CreateExternalTableRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateExternalTableModule { }
