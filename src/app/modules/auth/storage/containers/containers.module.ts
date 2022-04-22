import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainersRoutingModule } from './containers-routing.module';
import { ContainersComponent } from './containers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { FileSizePipe } from 'src/app/pipes/filesize.pipe';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [
    ContainersComponent
  ],
  imports: [
    CommonModule,
    ContainersRoutingModule,
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
    DialogModule,
    SidebarModule,
    FileUploadModule
  ],
  providers: [MessageService, ConfirmationService, FileSizePipe]
})
export class ContainersModule { }
