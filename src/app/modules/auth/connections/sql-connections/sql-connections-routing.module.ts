import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SqlConnectionsComponent } from './sql-connections.component';

const routes: Routes = [
  { path: '', component: SqlConnectionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlConnectionsRoutingModule { }
