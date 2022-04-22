import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateViewRoutingModule } from './create-view-routing.module';
import { CreateViewComponent } from './create-view.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateViewComponent
  ],
  imports: [
    CommonModule,
    CreateViewRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateViewModule { }
