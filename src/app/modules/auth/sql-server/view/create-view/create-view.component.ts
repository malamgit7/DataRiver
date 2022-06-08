import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { DataAnalysisService } from 'src/app/services/auth/sql-server.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.scss']
})
export class CreateViewComponent implements OnInit {
  default_select = null
  public emitData: any;
  containers: any[] = [];
  dataTypes!: any[];

  connectionStrings: any[] = [];
  connectionString_Next: any;
  connectionString_loading = false;

  syn_connectionStrings: any[] = [];
  syn_connectionString_Next: any;
  syn_connectionString_loading = false;

  userName!: string;
  todayDate = new Date().toISOString();


  GetFileSystems_loading = false;
  GetBlobs_loading = false;
  GetBlobSchema_loading = false;
  CreateView_loading = false;

  fileSystems: any[] = [];
  fileSystem_Next!: string;
  blobs: any[] = [];
  blob_next!: string;

  blobSchema!: any[];
  blobSchemaHasValue: any

  public createVWForm!: FormGroup;
  public FiledArray!: FormArray;

  public getBlobSchemaForm!: FormGroup;

  synapseDatabases!: any[]
  database_Next!: string;
  GetDatabase_loading = false
  databaseName = 'Database Name...';

  constructor(
    private msalAuthenticationService: MsalAuthenticationService,
    private formBuilder: FormBuilder,
    private dataShareService: DataShareService,
    private dataAnalysisService: DataAnalysisService,
    public sidebarService: SideBarService,
    private toastr: ToastrService,
    private bridgeManagerService: BridgeManagerService,
    private analysisService: AnalysisService
  ) {
    this.userName = this.msalAuthenticationService.userName()
    this.buildGetBlobSchemaForm();
    this.buildCreateVWForm();
  }

  ngOnInit(): void {
    this.emitData = this.dataShareService.getOption();
    this.GetSynapseConnectionStrings();
    this.GetStorageConnectionStrings()
    this.GetDataTypeLists();
  }

  GetStorageConnectionStrings() {
    this.connectionString_loading = true;
    this.bridgeManagerService.GetStorageConnectionStrings().subscribe(
      data => {
        
        this.connectionStrings = data;
        this.connectionString_loading = false;
      },
      error => {
        
        this.connectionString_loading = false;
      }
    )
  }

  GetSynapseConnectionStrings() {
    this.connectionString_loading = true;
    this.bridgeManagerService.GetSqlConnectionStrings().subscribe(
      (res) => {
        this.syn_connectionStrings = res;
        this.syn_connectionString_loading = false;
        
      },
      (err) => {
        
        this.syn_connectionString_loading = false;
      }
    );
  }

  buildGetBlobSchemaForm() {
    this.getBlobSchemaForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      FileSystem: ['', Validators.required],
      Path_Blob: ['', Validators.required],
    });
  }

  buildCreateVWForm() {
    this.createVWForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      FileSystem: this.fileSystem_Next,
      Path_Blob: this.blob_next,
      Name: ['', Validators.required],
      FieldArray: this.formBuilder.array([])
    });
  }

  createFieldArray(): FormGroup {
    return this.formBuilder.group({
      ColumnName: ['', Validators.required],
      AliasName: ['', Validators.required],
      ColumnType: ['', Validators.required],
      DataType: ['', Validators.required]
    });
  }

  addFieldArray(): void {
    this.FiledArray = this.createVWForm.get('FieldArray') as FormArray;
    this.FiledArray.push(this.createFieldArray())
  }

  patchValueInFieldArray(i: number) {
    this.FiledArray = this.createVWForm.get('FieldArray') as FormArray;
    this.FiledArray.at(i).patchValue({ ColumnName: "AAAAA", AliasName: "Aliass Name", ColumnType: "String", DataType: "bigint" });
  }

  get FieldArrayControls() {
    return this.createVWForm.get('FieldArray') as FormArray;
  }

  clearFieldArrayForm() {
    this.FiledArray = this.createVWForm.get('FieldArray') as FormArray;
    this.FiledArray.clear();
  }

  GetDataTypeLists() {
    this.dataAnalysisService.GetDataTypeLists().subscribe(data => { this.dataTypes = data; })
  }

  onSelectConnectionString(event: Event) {
    this.containers = [];
    this.blobs = []
    var connectionStringId = (<HTMLInputElement>event.target).value;
    this.connectionString_Next = connectionStringId;
    this.GetFileSystems_loading = true;
    this.dataAnalysisService.GetFileSystems(connectionStringId).subscribe(
      res => {
        this.containers = res;
        
        this.GetFileSystems_loading = false
      },
      err => {
        this.GetFileSystems_loading = false
        
      }
    )


  }

  onSelectSynapseFConnectionString(event: Event) {
    this.databaseName = 'Database Name...';
    var connectionStringId = (<HTMLInputElement>event.target).value;
    this.databaseName = this.syn_connectionStrings.find(x => x.connectionStringId == connectionStringId).databaseName;
  }

  onSelectFileSystem(event: Event) {
    this.blobs = []
    var fileSystem = (<HTMLInputElement>event.target).value;
    this.fileSystem_Next = fileSystem;
    this.GetBlobs_loading = true;
    this.dataAnalysisService.GetBlobs(this.connectionString_Next, fileSystem).subscribe(
      data => {
        for (var a of data) {
          if (a.name.includes(".csv")) {
            this.blobs.push(a);
            this.GetBlobs_loading = false;
          }
        }
      },
      err => {
        this.GetBlobs_loading = false;
        
      }
    )
  }

  onSelectBlob(event: Event) {
    var blob = (<HTMLInputElement>event.target).value;
    this.blob_next = blob;
  }

  onSubmitGetBlobSchemaForm() {
    if (this.blobSchema)
      this.blobSchema.splice(0, this.blobSchema.length!)

    this.clearFieldArrayForm();

    this.GetBlobSchema_loading = true
    if (this.getBlobSchemaForm.invalid) {
      this.GetBlobSchema_loading = false;
      return;
    }
    this.dataAnalysisService.GetBlobSchema(this.getBlobSchemaForm.value).subscribe(
      data => {
        if (data.length === 0) {
          window.alert("This file is empty")
          this.GetBlobSchema_loading = false;
          return;
        }
        else {
          this.blobSchema = data;
          this.GetBlobSchema_loading = false;
          this.createVWForm.get('Name')?.patchValue(this.blob_next.split('.')[0].toUpperCase());
          let i = 0;
          this.FiledArray = this.createVWForm.get('FieldArray') as FormArray;
          data.forEach((item) => {
            this.addFieldArray();
            this.FiledArray.at(i).patchValue({
              ColumnName: item.columnName,
              AliasName: item.columnName.trim(),
              ColumnType: item.columnType,
              DataType: item.dataType
            });
            i++;
          })
        }
      },
      error => {
        window.alert("There is something wrong in the file!");
        this.GetBlobSchema_loading = false;
        return;
      }
    );
  }

  onSubmitCreateViewForm() {
    this.CreateView_loading = true;
    this.createVWForm.patchValue({
      FileSystem: this.fileSystem_Next,
      Path_Blob: this.blob_next
    });
    

    if (this.createVWForm.invalid) {
      this.CreateView_loading = false
      this.toastr.success("Please fill all the required fields", "Success", { positionClass: 'toast-bottom-center' });
      return;
    }
    this.dataAnalysisService.CreateView(this.createVWForm.value).subscribe(data => {
      
      this.CreateView_loading = false
      this.toastr.success("Successfully created", "Success", { positionClass: 'toast-bottom-center' });
    },
      error => {
        this.CreateView_loading = false;
        this.toastr.error(error.error, "Error", { positionClass: 'toast-bottom-center' });
        return;
      });
  }

  ResetGetBlobDetailsForm() {
    this.getBlobSchemaForm.reset();
  }

}
