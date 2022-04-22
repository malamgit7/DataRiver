import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewProfileOutputRoutingModule } from './review-profile-output-routing.module';
import { ReviewProfileOutputComponent } from './review-profile-output.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    ReviewProfileOutputComponent
  ],
  imports: [
    CommonModule,
    ReviewProfileOutputRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ProgressBarModule
  ]
})
export class ReviewProfileOutputModule { }
