import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-review-profile-output',
  templateUrl: './review-profile-output.component.html',
  styleUrls: ['./review-profile-output.component.scss']
})
export class ReviewProfileOutputComponent implements OnInit {
  default_select = null
  connectionStrings: any[] = [];
  connectionString_Next: any;
  connectionString_loading = false;

  reviewProfileForm!: FormGroup;
  reviewProfileForm_loading = false;

  synapseDatabases: any[] = [];
  database_Next!: string;
  databases_loading = false;

  externalTables: any[] = [];
  externalTable_Next!: string;
  externalTables_loading = false;

  profiledDates: any[] = [];
  profiledDate_Next!: string;
  profiledDates_loading = false;

  profiles: any[] = [];
  profile_database_name!: string;
  profile_schema_name!: string;
  profile_table_name!: string;
  profile_total_count: number = 0;
  profile_date!: Date
  profile_added_by: string = "";

  allTables: any[] = [];
  allTables_loading = false;

  Tables: any[] = [];
  Table_loading = false;

  databaseName: string = 'Database Name...';

  constructor(
    public sidebarService: SideBarService,
    private analysisService: AnalysisService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private bridgeManagerService: BridgeManagerService
  ) {
    this.buildReviewProfileForm();
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

  buildReviewProfileForm() {
    this.reviewProfileForm = this.formBuilder.group({
      DatabaseName: [null],
      ExternalTableName: ['', Validators.required],
      ProfiledDate: ['', Validators.required]
    });
  }

  async onSelectConnectionString(event: Event) {
    this.externalTables = [];
    this.Tables = [];
    this.profiledDates = [];
    this.databaseName = 'Database Name...';
    this.connectionString_Next = (<HTMLInputElement>event.target).value;
    this.databaseName = this.connectionStrings.find(x => x.connectionStringId == this.connectionString_Next).databaseName;
    await this.getExternalTable(this.connectionString_Next);
    await this.getTable(this.connectionString_Next);
  }

  getExternalTable(connectionStringId: string) {
    this.externalTables_loading = true;
    this.analysisService.GetExternalTables(connectionStringId).subscribe(
      res => { this.externalTables = res; this.externalTables_loading = false; },
      err => { this.externalTables_loading = false; }
    );
  }

  getTable(connectionStringId: string) {
    this.Table_loading = true;
    this.analysisService.GetTables(connectionStringId).subscribe(
      res => { this.Tables = res; this.Table_loading = false; },
      err => { this.Table_loading = false; }
    );
  }

  onSelectExternalTable(event: Event) {
    this.profiledDates = [];
    var externalTable = (<HTMLInputElement>event.target).value;
    this.profiledDates_loading = true;
    this.reviewProfileForm.patchValue({ DatabaseName: this.databaseName });
    this.analysisService.GetExternalTableProfiledDate(this.databaseName, externalTable).subscribe(
      data => {
        this.profiledDates = data;
        this.profiledDates_loading = false;
        
      },
      error => {
        
        this.profiledDates_loading = false;
      }
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
        this.allTables = this.externalTables;
        this.allTables_loading = false
      }, 1000);
    }
  }

  onSubmitReviewProfileForm() {
    this.reviewProfileForm_loading = true;
    
    this.analysisService.ReviewProfileOutput(this.reviewProfileForm.value).subscribe(
      data => {
        if (data != null) {
          this.profiles = data;
          this.profile_database_name = data[0].dB_NAME;
          this.profile_schema_name = data[0].schemA_NAME;
          this.profile_table_name = data[0].tablE_NAME;
          this.profile_total_count = data[0].counT_ALL;
          this.profile_date = data[0].addedDate;
          this.profile_added_by = data[0].addedBy;
          this.reviewProfileForm_loading = false;
        }
        else {
          this.reviewProfileForm_loading = false;
          this.toastr.error('Profile not found');
        }
      },
      error => {
        this.reviewProfileForm_loading = false;
        this.toastr.error('Failed to Get Profile');
      }
    );
  }

  ResetreviewProfileForm() {
    this.databaseName = 'Database Name...';
    this.reviewProfileForm.reset();
  }
}
