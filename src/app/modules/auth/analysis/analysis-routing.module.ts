import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis.component';

const routes: Routes = [
  {
    path: '',
    component: AnalysisComponent,
    children: [
      { path: '', redirectTo: 'profiling', pathMatch: 'full' },
      { path: 'profiling', loadChildren: () => import("./profiling/profiling.module").then(m => m.ProfilingModule) },
      { path: 'review-profile', loadChildren: () => import("./review-profile-output/review-profile-output.module").then(m => m.ReviewProfileOutputModule) },
      { path: 'queries', loadChildren: () => import("./queries/queries.module").then(m => m.QueriesModule) },
      { path: 'query-output', loadChildren: () => import("./query-output/query-output.module").then(m => m.QueryOutputModule) },
      { path: 'query-output-details', loadChildren: () => import("./query-output-details/query-output-details.module").then(m => m.QueryOutputDetailsModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
