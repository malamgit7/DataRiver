import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateViewComponent } from './create-view.component';

const routes: Routes = [
  { path: '', component: CreateViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateViewRoutingModule { }
