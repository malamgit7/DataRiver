import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateQueriesRoutingModule } from './create-queries-routing.module';
import { CreateQueriesComponent } from './create-queries.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplitterModule } from "primeng/splitter";
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { AngularSplitModule } from "angular-split";
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AngularResizeEventModule } from 'angular-resize-event';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    CreateQueriesComponent
  ],
  imports: [
    CommonModule,
    CreateQueriesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    EditorModule,
    SplitterModule,
    CardModule,
    ListboxModule,
    DragDropModule,
    TableModule,
    DialogModule,
    TreeModule,
    ContextMenuModule,
    ScrollPanelModule,
    AngularSplitModule,
    CodemirrorModule,
    PanelMenuModule,
    AngularResizeEventModule,
    InputTextModule,
    TypeaheadModule,
    FormsModule
  ]
})
export class CreateQueriesModule { }
