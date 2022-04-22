import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRiverManagerRoutingModule } from './data-river-manager-routing.module';
import { DataRiverManagerComponent } from './data-river-manager.component';
import { DataRiverManagerSharedModule } from './data-river-manager-shared/data-river-manager-shared.module';


@NgModule({
  declarations: [
    DataRiverManagerComponent
  ],
  imports: [
    CommonModule,
    DataRiverManagerRoutingModule,
    DataRiverManagerSharedModule
  ]
})
export class DataRiverManagerModule { }
