import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EXternalTableProfile } from 'src/app/models/auth/data-analysis.model';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import { ToastrService } from 'ngx-toastr';
import { SideBarService } from 'src/app/services/side-bar.service';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';

@Component({
  selector: 'app-profiling',
  templateUrl: './profiling.component.html',
  styleUrls: ['./profiling.component.scss']
})
export class ProfilingComponent implements OnInit {

  default_select = null;
  databaseName: string = 'Database Name...';

  connectionStrings: any[] = [];
  connectionString_Next: any;
  connectionString_loading = false;

  userName!: string;
  todaydate = new Date().toISOString();

  getTableMeatadataForm!: FormGroup;
  getTableMeatadata_loading = false;
  Tablemetadata: any[] = []

  createTableProfileForm!: FormGroup;
  ColumnsForm!: FormArray;
  createTableProfileForm_loading = false;
  TableProfile: EXternalTableProfile[] = [];

  synapseDatabases!: any[]
  database_Next!: string;
  GetDatabase_loading = false

  Tables: any[] = [];
  Table_loading = false;
  ExternalTables: any[] = [];
  externalTable_next!: string;
  externalTable_loading = false;

  allTables: any[] = []
  allTables_loading = false;

  constructor(
    private msalAuthenticationService: MsalAuthenticationService,
    private formBuilder: FormBuilder,
    private analysisService: AnalysisService,
    private toastr: ToastrService,
    public sidebarService: SideBarService,
    private bridgeManagerService: BridgeManagerService,
  ) {
    this.userName = this.msalAuthenticationService.userName()
    this.buildGetTableMeatadataForm()
    this.buildCreateTableProfileForm()
  }

  ngOnInit(): void {
    this.GetSynapseConnectionStrings()
  }

  GetSynapseConnectionStrings() {
    this.connectionString_loading = true;
    this.bridgeManagerService.GetSqlConnectionStrings().subscribe(
      (res) => {
        this.connectionStrings = res;
        this.connectionString_loading = false;
      },
      (err) => {
        this.connectionString_loading = false;
      }
    );
  }

  buildGetTableMeatadataForm() {
    this.getTableMeatadataForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      ExternalTableName: ['', Validators.required]
    });
  }

  onSubmitGetTableMeatadataForm() {
    this.Tablemetadata = [];
    this.clearColumnsArray();
    this.getTableMeatadata_loading = true;
    if (!this.getTableMeatadataForm.valid) {
      this.getTableMeatadata_loading = false
      return;
    }
    this.analysisService.GetExternalTableMetadata(this.getTableMeatadataForm.value).subscribe(
      data => {
        this.Tablemetadata = data;
        this.getTableMeatadata_loading = false
        this.buildCreateTableProfileForm();
      },
      error => {
        this.toastr.error('Failed to get metadat!', 'Error', { positionClass: 'toast-bottom-center' })
        this.getTableMeatadata_loading = false
        this.buildCreateTableProfileForm();
      }
    );
  }

  ResetgetTableMeatadataForm() {
    this.databaseName = 'Database Name...';
    this.getTableMeatadataForm.reset();
  }

  buildCreateTableProfileForm() {
    this.createTableProfileForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      Table: ['', Validators.required],
      Columns: this.formBuilder.array([], Validators.required),
      AddedBy: this.userName,
      AddedDate: this.todaydate
    });
  }

  clearColumnsArray() {
    const Columns: FormArray = this.createTableProfileForm.get('Columns') as FormArray;
    Columns.clear();
  }

  onCheckboxChange(event: any) {
    const Columns: FormArray = this.createTableProfileForm.get('Columns') as FormArray;
    if (event.target.checked) {
      Columns.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;
      Columns.controls.forEach((item) => {
        if (item.value == event.target.value) {
          Columns.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmitCreateTableProfileForm() {
    this.createTableProfileForm_loading = true;
    this.createTableProfileForm.patchValue({
      ConnectionStringId: this.connectionString_Next,
      Table: this.externalTable_next,
    });

    if (!this.createTableProfileForm.valid) {
      this.createTableProfileForm_loading = false;
      return;
    }
    this.analysisService.CreateExternalTableProfile(this.createTableProfileForm.value).subscribe(
      data => {
        this.createTableProfileForm_loading = false;
        this.toastr.success('Profile created successfully!', 'Success', { positionClass: 'toast-bottom-center' })
      },
      error => {
        this.createTableProfileForm_loading = false;
        this.toastr.error('Failed to create profile!', 'Error', { positionClass: 'toast-bottom-center' })
      }
    )
  }

  async onSelectConnectionString(event: Event) {
    this.Tablemetadata = [];
    this.ExternalTables = [];
    this.Tables = [];
    this.allTables = [];
    this.databaseName = 'Database Name...';
    this.connectionString_Next = (<HTMLInputElement>event.target).value;
    this.databaseName = this.connectionStrings.find(x => x.connectionStringId == this.connectionString_Next).databaseName;
    await this.getExternalTable(this.connectionString_Next);
    await this.getTable(this.connectionString_Next);
  }

  getExternalTable(connectionStringId: string) {
    this.externalTable_loading = true;
    this.analysisService.GetExternalTables(connectionStringId).subscribe(
      res => { this.ExternalTables = res; this.externalTable_loading = false; },
      err => { this.externalTable_loading = false; }
    );
  }

  getTable(connectionStringId: string) {
    this.Table_loading = true;
    this.analysisService.GetTables(connectionStringId).subscribe(
      res => { this.Tables = res; this.Table_loading = false; },
      err => { this.Table_loading = false; }
    );
  }

  onSelectTableType(event: Event) {
    var a = (<HTMLInputElement>event.target).value
    this.allTables = [];
    this.allTables_loading = true;
    if (a == '1') {
      setTimeout(() => {
        this.allTables = this.Tables;
        this.allTables_loading = false
      }, 1000);
    }
    if (a == '2') {
      setTimeout(() => {
        this.allTables = this.ExternalTables;
        this.allTables_loading = false
      }, 1000);
    }
  }

  onSelectTable(event: Event) {
    this.Tablemetadata = [];
    var table = (<HTMLInputElement>event.target).value;
    this.externalTable_next = table;
  }


}
