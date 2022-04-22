import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'storage', loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule) },
      { path: 'sql-server', loadChildren: () => import('./sql-server/sql-server.module').then(m => m.SqlServerModule) },
      { path: 'analysis', loadChildren: () => import("./analysis/analysis.module").then(m => m.AnalysisModule) },
      { path: 'connections', loadChildren: () => import('./connections/connections.module').then(m => m.ConnectionsModule) },

      { path: 'data-river-manager', loadChildren: () => import('./data-river-manager/data-river-manager.module').then(m => m.DataRiverManagerModule) }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
