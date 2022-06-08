import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { FieldToggleService } from 'src/app/services/field-toggle.service';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-sql-connections',
  templateUrl: './sql-connections.component.html',
  styleUrls: ['./sql-connections.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(1000)),
    ])
  ]
})
export class SqlConnectionsComponent implements OnInit {

  default_select = null

  userName!: string;
  todayDate = new Date().toISOString();
  sqlConnectionStringForm!: FormGroup;
  sqlConnectionStringForm_loading = false;
  sqlConnectionStrings: any[] = [];
  sqlConnectionStrings_loading = false;
  deleteSqlConnectionString_loading = false;

  connectionTypes: any[] = []
  connectionTypes_loading = false;

  constructor(
    private msalAuthenticationService: MsalAuthenticationService,
    private bridgeManagerService: BridgeManagerService,
    public sidebarService: SideBarService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    public fieldToggleService: FieldToggleService
  ) {
    this.userName = this.msalAuthenticationService.userName();
    this.buildSqlConnectionStringForm();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.GetSqlConnectionStrings();
    this.GetConnectionStringType();
  }

  get f() { return this.sqlConnectionStringForm.controls; }

  buildSqlConnectionStringForm() {
    this.sqlConnectionStringForm = this.formBuilder.group({
      ConnectionStringId: null,
      ConnectionTypeNumber: ['', Validators.required],
      ConnectionName: ['', Validators.required],
      ServerName: ['', Validators.required],
      DatabaseName: ['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      AddedBy: null,
      AddedDate: null,
      UpdatedBy: null,
      UpdatedDate: null
    });
  }

  GetSqlConnectionStrings() {
    this.sqlConnectionStrings_loading = true;

    this.bridgeManagerService.GetSqlConnectionStrings().subscribe(
      (res) => {
        if (res.length >= 1) {
          for (let i = 0; i < res.length; i++) {
            let item = res[i];
            setTimeout(() => {
              this.sqlConnectionStrings.push(item);
            }, 1000 * (i + 1));
          }
          this.sqlConnectionStrings_loading = false;
        }
        else {
          this.sqlConnectionStrings_loading = false;
          return;
        }

        // this.sqlConnectionStrings = res;
        // this.sqlConnectionStrings_loading = false;
      },
      (err) => {
        this.sqlConnectionStrings_loading = false;
        this.toastr.error('Error while getting Connection Strings', 'Error', { positionClass: 'toast-bottom-center' })
      }
    );
  }

  GetConnectionStringType() {
    this.connectionTypes_loading = true;
    this.bridgeManagerService.GetConnectionStringType().subscribe(
      (res) => {
        
        this.connectionTypes = res;
        this.connectionTypes_loading = false;
      },
      (err) => {
        this.connectionTypes_loading = false;
      }
    )
  }

  onSubmitSqlConnectionStringForm() {
    this.sqlConnectionStringForm.patchValue({
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });
    this.sqlConnectionStringForm_loading = true;
    if (this.sqlConnectionStringForm.invalid) {
      this.sqlConnectionStringForm_loading = false
      this.toastr.warning('Please fill all the required fields', 'Warning', { positionClass: 'toast-bottom-center' })
      return;
    }
    this.bridgeManagerService.CreateSqlConnectionString(this.sqlConnectionStringForm.value).subscribe(
      data => {
        this.GetSqlConnectionStrings();
        this.toastr.success('Successfully created Connection String', 'Success', { positionClass: 'toast-bottom-center' })
        this.sqlConnectionStringForm_loading = false
        this.sqlConnectionStringForm.reset()
      },
      error => {
        this.toastr.error('Error while creating Connection String', 'Error', { positionClass: 'toast-bottom-center' })
        this.sqlConnectionStringForm_loading = false;
      }
    );
  }

  DeleteSqlConnectionString(connectionString: any) {
    
    this.deleteSqlConnectionString_loading = true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete ' + connectionString.connectionName + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bridgeManagerService.DeleteSqlConnectionString(connectionString.connectionStringId).subscribe(
          data => {
            this.GetSqlConnectionStrings();
            this.deleteSqlConnectionString_loading = false;
            this.toastr.success('Successfully deleted Connection String', 'Success', { positionClass: 'toast-bottom-center' })
          },
          error => {
            this.deleteSqlConnectionString_loading = false;
            this.toastr.error('Error while deleting Connection String', 'Error', { positionClass: 'toast-bottom-center' })
          }
        );
      },
      reject: () => { }
    });


  }

  onSubmitTestSqlConnectionStringForm() {
    this.sqlConnectionStringForm.patchValue({
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });
    
    this.sqlConnectionStringForm_loading = true;
    if (this.sqlConnectionStringForm.invalid) {
      this.sqlConnectionStringForm_loading = false
      this.toastr.warning('Please fill all the required fields', 'Warning', { positionClass: 'toast-bottom-center' })
      return;
    }
    this.bridgeManagerService.TestSqlConnectionString(this.sqlConnectionStringForm.value).subscribe(
      data => {
        if (data == true) {
          
          this.toastr.success('Successfully tested Connection String', 'Success', { positionClass: 'toast-bottom-center' })
          this.sqlConnectionStringForm_loading = false
        }
        else {
          this.toastr.error('Error while testing Connection String', 'Error', { positionClass: 'toast-bottom-center' })
          this.sqlConnectionStringForm_loading = false
        }

      },
      error => {
        
        this.toastr.error('Error while testing Connection String', 'Error', { positionClass: 'toast-bottom-center' })
        this.sqlConnectionStringForm_loading = false;
      }
    );
  }

  SetValueToEdit(connectionString: any) {
    this.sqlConnectionStringForm.patchValue({
      ConnectionStringId: connectionString.connectionStringId,
      ConnectionTypeNumber: connectionString.connectionTypeNumber,
      ConnectionName: connectionString.connectionName,
      ServerName: connectionString.serverName,
      DatabaseName: connectionString.databaseName,
      Username: connectionString.username,
      Password: connectionString.password,
      AddedBy: connectionString.addedBy,
      AddedDate: connectionString.addedDate,
      UpdatedBy: connectionString.updatedBy,
      UpdatedDate: connectionString.updatedDate
    });
  }

  ResetForm() {
    this.sqlConnectionStringForm.reset();
  }

}
