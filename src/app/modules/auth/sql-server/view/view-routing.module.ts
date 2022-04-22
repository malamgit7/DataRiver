import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all-views' },
      { path: 'all-views', loadChildren: () => import('./all-views/all-views.module').then(m => m.AllViewsModule) },
      { path: 'create-view', loadChildren: () => import('./create-view/create-view.module').then(m => m.CreateViewModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
