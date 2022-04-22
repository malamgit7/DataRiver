import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateExternalTableComponent } from './create-external-table.component';

const routes: Routes = [
  { path: '', component: CreateExternalTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateExternalTableRoutingModule { }
