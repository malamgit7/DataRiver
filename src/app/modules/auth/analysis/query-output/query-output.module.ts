import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard'

import { QueryOutputRoutingModule } from './query-output-routing.module';
import { QueryOutputComponent } from './query-output.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QueryOutputComponent
  ],
  imports: [
    CommonModule,
    QueryOutputRoutingModule,
    ReactiveFormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ContextMenuModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ClipboardModule,
    DialogModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class QueryOutputModule { }
