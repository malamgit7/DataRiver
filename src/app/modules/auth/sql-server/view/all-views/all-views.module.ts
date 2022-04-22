import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllViewsRoutingModule } from './all-views-routing.module';
import { AllViewsComponent } from './all-views.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    AllViewsComponent
  ],
  imports: [
    CommonModule,
    AllViewsRoutingModule,
    RouterModule,
    TableModule,
    CardModule
  ]
})
export class AllViewsModule { }
