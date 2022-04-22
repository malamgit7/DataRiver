import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalTableComponent } from './external-table.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalTableComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all-external-tables' },
      { path: 'all-external-tables', loadChildren: () => import('./all-external-tables/all-external-tables.module').then(m => m.AllExternalTablesModule) },
      { path: 'create-external-table', loadChildren: () => import('./create-external-table/create-external-table.module').then(m => m.CreateExternalTableModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalTableRoutingModule { }
