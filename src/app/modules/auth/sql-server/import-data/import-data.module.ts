import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportDataRoutingModule } from './import-data-routing.module';
import { ImportDataComponent } from './import-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ImportDataComponent
  ],
  imports: [
    CommonModule,
    ImportDataRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    AlertModule.forRoot()
  ]
})
export class ImportDataModule { }
