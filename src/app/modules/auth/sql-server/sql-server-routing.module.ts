import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SqlServerComponent } from './sql-server.component';

const routes: Routes = [
  {
    path: '',
    component: SqlServerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sql-editor' },
      { path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule) },
      { path: 'external-table', loadChildren: () => import('./external-table/external-table.module').then(m => m.ExternalTableModule) },
      { path: 'view', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) },
      { path: 'sql-editor', loadChildren: () => import('./create-queries/create-queries.module').then(m => m.CreateQueriesModule) },
      { path: 'import-data', loadChildren: () => import('./import-data/import-data.module').then(m => m.ImportDataModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlServerRoutingModule { }
