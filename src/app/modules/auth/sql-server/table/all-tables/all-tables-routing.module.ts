import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTablesComponent } from './all-tables.component';

const routes: Routes = [
  { path: '', component: AllTablesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllTablesRoutingModule { }
