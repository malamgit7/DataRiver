import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryOutputComponent } from './query-output.component';

const routes: Routes = [
  { path: '', component: QueryOutputComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryOutputRoutingModule { }
