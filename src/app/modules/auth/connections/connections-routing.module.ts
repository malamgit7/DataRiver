import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionsComponent } from './connections.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectionsComponent,
    children: [
      { path: '', redirectTo: 'sql-connections', pathMatch: 'full' },
      { path: 'sql-connections', loadChildren: () => import('./sql-connections/sql-connections.module').then(m => m.SqlConnectionsModule) },
      { path: 'storage-connections', loadChildren: () => import('./storage-connections/storage-connections.module').then(m => m.StorageConnectionsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsRoutingModule { }
