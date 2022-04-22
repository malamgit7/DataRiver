import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilingRoutingModule } from './profiling-routing.module';
import { ProfilingComponent } from './profiling.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    ProfilingComponent
  ],
  imports: [
    CommonModule,
    ProfilingRoutingModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    DropdownModule,
    ProgressBarModule
  ]
})
export class ProfilingModule { }
