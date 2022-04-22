import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilingComponent } from './profiling.component';

const routes: Routes = [
  { path: '', component: ProfilingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilingRoutingModule { }
