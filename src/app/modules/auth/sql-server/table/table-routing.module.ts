import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    children: [
      { path: '', redirectTo: 'all-tables', pathMatch: 'full' },
      { path: 'all-tables', loadChildren: () => import("./all-tables/all-tables.module").then(m => m.AllTablesModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
