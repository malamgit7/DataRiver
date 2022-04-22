import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExternalTablesComponent } from './all-external-tables.component';

const routes: Routes = [
  { path: '', component: AllExternalTablesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllExternalTablesRoutingModule { }
