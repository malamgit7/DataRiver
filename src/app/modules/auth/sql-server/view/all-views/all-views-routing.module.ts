import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllViewsComponent } from './all-views.component';

const routes: Routes = [
  { path: '', component: AllViewsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllViewsRoutingModule { }
