import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQueriesComponent } from './create-queries.component';

const routes: Routes = [
  { path: '', component: CreateQueriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateQueriesRoutingModule { }
