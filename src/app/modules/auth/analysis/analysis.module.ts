import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';
import { AnalysisSharedModule } from './analysis-shared/analysis-shared.module';


@NgModule({
  declarations: [
    AnalysisComponent
  ],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    AnalysisSharedModule
  ]
})
export class AnalysisModule { }
