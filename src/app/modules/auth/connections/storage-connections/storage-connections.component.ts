import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-storage-connections',
  templateUrl: './storage-connections.component.html',
  styleUrls: ['./storage-connections.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(1000)),
    ])
  ]
})
export class StorageConnectionsComponent implements OnInit {

  userName!: string;
  todayDate = new Date().toISOString();

  storageConnectionStringForm!: FormGroup;
  storageConnectionStringForm_loading = false

  storageConnectionStrings: any[] = [];
  selectedConnectionString: any;


  constructor(
    private msalAuthenticationService: MsalAuthenticationService,
    private bridgeManagerService: BridgeManagerService,
    public sidebarService: SideBarService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) {
    this.userName = this.msalAuthenticationService.userName();
    this.buildStorageConnectionStringForm();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.GetStorageConnectionStrings();
  }

  get f() { return this.storageConnectionStringForm.controls; }

  buildStorageConnectionStringForm() {
    this.storageConnectionStringForm = this.formBuilder.group({
      ConnectionStringId: null,
      ConnectionName: ['', Validators.required],
      StorageName: ['', Validators.required],
      SAS: ['', Validators.required],
      AddedBy: null,
      AddedDate: null,
      UpdatedBy: null,
      UpdatedDate: null
    });
  }

  GetStorageConnectionStrings() {
    this.bridgeManagerService.GetStorageConnectionStrings().subscribe(
      (res) => {
        if (res.length >= 1) {
          for (let i = 0; i < res.length; i++) {
            let item = res[i];
            setTimeout(() => {
              this.storageConnectionStrings.push(item);
            }, 1000 * (i + 1));
          }
          // this.storageConnectionStrings_loading = false;
        }
        else {
          // this.storageConnectionStrings_loading = false;
          return;
        }
        // this.storageConnectionStrings = res;
      },
      (err) => {
        
      }
    );
  }

  onSubmitStorageConnectionStringForm() {
    this.storageConnectionStringForm.patchValue({
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });
    this.storageConnectionStringForm_loading = true;
    if (this.storageConnectionStringForm.invalid) {
      this.storageConnectionStringForm_loading = false
      this.toastr.warning('Please fill all the required fields', 'Warning', { positionClass: 'toast-bottom-center' })
      return;
    }
    this.bridgeManagerService.CreateStorageConnectionString(this.storageConnectionStringForm.value).subscribe(
      data => {
        this.GetStorageConnectionStrings();
        this.toastr.success('Successfully created Connection String', 'Success', { positionClass: 'toast-bottom-center' })
        this.storageConnectionStringForm_loading = false
        this.ResetForm();
      },
      error => {
        this.toastr.error('Error while creating Connection String', 'Error', { positionClass: 'toast-bottom-center' })
        this.storageConnectionStringForm_loading = false;
      }
    );
  }

  DeleteStorageConnectionString(connectionString: any) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete ' + connectionString.connectionName + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bridgeManagerService.DeleteStorageConnectionString(connectionString.connectionStringId).subscribe(
          data => {
            this.GetStorageConnectionStrings();
            this.toastr.success('Successfully deleted Connection String', 'Success', { positionClass: 'toast-bottom-center' })
          },
          error => {
            this.toastr.error('Error while deleting Connection String', 'Error', { positionClass: 'toast-bottom-center' })
          }
        );
      },
      reject: () => { }
    });


  }

  SetValueToEdit(connectionString: any) {
    this.storageConnectionStringForm.patchValue({
      ConnectionStringId: connectionString.connectionStringId,
      ConnectionName: connectionString.connectionName,
      StorageName: connectionString.storageName,
      SAS: connectionString.sas,
      AddedBy: connectionString.addedBy,
      AddedDate: connectionString.addedDate,
      UpdatedBy: connectionString.updatedBy,
      UpdatedDate: connectionString.updatedDate
    });
  }

  ResetForm() {
    this.storageConnectionStringForm.reset();
  }

}
