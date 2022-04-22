import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQueriesComponent } from './all-queries.component';

const routes: Routes = [
  { path: '', component: AllQueriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllQueriesRoutingModule { }
