import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageComponent } from './storage.component';

const routes: Routes = [
  {
    path: '',
    component: StorageComponent,
    children: [
      { path: '', redirectTo: 'containers', pathMatch: 'full' },
      { path: 'containers', loadChildren: () => import('./containers/containers.module').then(m => m.ContainersModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }
