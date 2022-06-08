import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { DataAnalysisService } from 'src/app/services/auth/sql-server.service';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(1000)),
    ])
  ]
})
export class ImportDataComponent implements OnInit {

  userName!: string;
  todayDate = new Date().toISOString();

  alert_type!: string;
  alert_message!: string
  showAlert: boolean = false;
  showViewButton: boolean = false;

  default_select = null;
  default_select_for_append_type!: boolean;

  selectedDatabaseName: string = '';
  selectedFile!: File;
  selectedConnectionStringId!: string;

  checkTableAvailability_loading: boolean = false;
  generateSchema_loading: boolean = false;
  createTable_loading: boolean = false;

  connectionStrings: any[] = [];
  connectionString_loading: boolean = false;
  schemaNames: any[] = [];
  tableNames: any[] = [];
  fileSchema: any[] = [];
  fileAndTableSchema: any[] = [];
  tableTypeSelected: boolean = false;
  public createTableForm!: FormGroup;
  public FiledArray!: FormArray;
  public createFileAndTableSchemaForm!: FormGroup

  tableSchema: any[] = [];
  tableSchema_loading: boolean = false;
  tableSchema_show: boolean = false;

  table_name!: string
  previewedData: any[] = [];
  row_count: number = 0;
  previewLoadedData_loading: boolean = false;
  cols: any[] = [];
  displayBlobDataModal: boolean = false;

  constructor(
    private msalAuthenticationService: MsalAuthenticationService,
    private formBuilder: FormBuilder,
    private bridgeManagerService: BridgeManagerService,
    private dataAnalysisService: DataAnalysisService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {
    this.userName = this.msalAuthenticationService.userName()
    this.buildCreateTableForm();
    this.buildCreateFileAndTableSchemaForm();
  }

  ngOnInit(): void {
    this.GetSqlConnectionStrings();
  }

  buildCreateTableForm() {
    this.createTableForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      Schema: [{ value: '', disabled: true }],
      NewTableName: [{ value: '', disabled: true }],
      OldTableName: [{ value: '', disabled: true }],
      AppendData: [{ value: null, disabled: true }],
      FieldArray: this.formBuilder.array([]),
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    })
  }

  buildCreateFileAndTableSchemaForm() {
    this.createFileAndTableSchemaForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      Schema: [{ value: '', disabled: true }],
      NewTableName: [{ value: '', disabled: true }],
      OldTableName: [{ value: '', disabled: true }],
      FileData: null
    })
  }

  createFieldArray(): FormGroup {
    return this.formBuilder.group({
      FileColumnName: ['', Validators.required],
      FileColumnDataType: ['', Validators.required],
      TableColumnName: ['', Validators.required],
      TableColumnDataType: ['', Validators.required],
      Is_Primary_Key: [false, Validators.required],
      Is_Not_Null: [false, Validators.required]
    });
  }

  addFieldArray(): void {
    this.FiledArray = this.createTableForm.get('FieldArray') as FormArray;
    this.FiledArray.push(this.createFieldArray());
  }

  get FieldArrayControls() {
    return this.createTableForm.get('FieldArray') as FormArray;
  }

  onSelectPrimaryKeyCheckBox(event: Event, index: number) {
    var arrayControl = this.createTableForm.get('FieldArray') as FormArray;
    var _a = arrayControl.at(index).get('Is_Primary_Key')?.value;
    if (_a == true) {
      arrayControl.at(index).get('Is_Not_Null')?.setValue(true);
      arrayControl.at(index).get('Is_Not_Null')?.disable();
    }
    else {
      arrayControl.at(index).get('Is_Not_Null')?.setValue(false);
      arrayControl.at(index).get('Is_Not_Null')?.enable();

    }
  }

  CheckTableAvailability() {
    this.checkTableAvailability_loading = true;
    const _Schema = !!this.createTableForm.get('Schema')!.value;
    const _NewTableName = !!this.createTableForm.get('NewTableName')!.value;
    if (_Schema == false || _NewTableName == false) {
      this.checkTableAvailability_loading = false;
      this.toastr.error('Insufficient input!', 'Error', { positionClass: 'toast-bottom-right' });
      return;
    }
    else {
      this.dataAnalysisService.CheckTableAvailability(this.createTableForm.get('ConnectionStringId')!.value, this.createTableForm.get('Schema')!.value, this.createTableForm.get('NewTableName')!.value).subscribe(
        (res) => {
          this.checkTableAvailability_loading = false;
          this.toastr.error('Table already exists!', 'Error', { positionClass: 'toast-bottom-right' });
        },
        (err) => {
          this.checkTableAvailability_loading = false;
          this.toastr.success('Table doesn\'t exists!', 'Success', { positionClass: 'toast-bottom-right' });
        }
      );
    }

  }

  onSubmitCreateTableForm() {
    this.createTable_loading = true;
    const dateNow = new Date().toISOString();
    let formData: FormData = new FormData();
    //#region FormData
    formData.append(this.selectedFile.name, this.selectedFile);
    formData.append('ConnectionStringId', this.createTableForm.get('ConnectionStringId')!.value);
    formData.append('Schema', this.createTableForm.get('Schema')!.value);
    formData.append('NewTableName', this.createTableForm.get('NewTableName')!.value);
    formData.append('OldTableName', this.createTableForm.get('OldTableName')!.value);
    formData.append('AppendData', this.createTableForm.get('AppendData')!.value);
    formData.append('FieldArray', JSON.stringify(this.createTableForm.getRawValue().FieldArray));
    formData.append('AddedBy', this.createTableForm.get('AddedBy')!.value);
    formData.append('AddedDate', dateNow);
    formData.append('UpdatedBy', this.createTableForm.get('UpdatedBy')!.value);
    formData.append('UpdatedDate', dateNow);
    //#endregion

    if (this.createTableForm.invalid) {
      this.createTable_loading = false;
      return;
    }
    this.dataAnalysisService.ImportFileToTable(formData).subscribe(
      (res: any) => {
        this.createTable_loading = false;
        this.row_count = res.row_count;
        this.alert_type = 'success';
        this.alert_message = "Data loaded successfuly!";
        this.showViewButton = true;
        this.showAlert = true;
        this.getTables();
      },
      (err) => {
        this.createTable_loading = false;
        this.alert_type = 'danger';
        this.alert_message = err.error;
        this.showViewButton = false;
        this.showAlert = true;
      }
    );
  }

  onSubmitCreateFileAndTableSchemaForm(files: any) {
    //#region
    this.generateSchema_loading = true;
    this.FiledArray = this.createTableForm.get('FieldArray') as FormArray;
    this.FiledArray.clear();
    if (files.length === 0) {
      this.generateSchema_loading = false;
      return;
    }
    let formData: FormData = new FormData();
    this.selectedFile = files[0];
    formData.append(this.selectedFile.name, this.selectedFile);
    formData.append('ConnectionStringId', this.createTableForm.controls.ConnectionStringId.value);
    formData.append('Schema', this.createTableForm.controls.Schema.value);
    formData.append('NewTableName', this.createTableForm.controls.NewTableName.value);
    formData.append('OldTableName', this.createTableForm.controls.OldTableName.value);
    //#endregion
    this.dataAnalysisService.CreateFileAndTableSchema(formData).subscribe(
      (res) => {
        this.fileAndTableSchema = res;
        
        if (res.length === 0) {
          window.alert("This file is empty")
          this.generateSchema_loading = false;
          return;
        }
        else {
          let i = 0;
          this.FiledArray = this.createTableForm.get('FieldArray') as FormArray;
          res.forEach((item) => {
            this.addFieldArray();
            this.FiledArray.at(i).patchValue({
              FileColumnName: item.fileColumnName,
              FileColumnDataType: item.fileColumnDataType,
              TableColumnName: item.tableColumnName,
              TableColumnDataType: item.tableColumnDataType,
              Is_Primary_Key: item.is_Primary_Key,
              Is_Not_Null: item.is_Not_Null
            });
            i++;
          })
          this.generateSchema_loading = false;
        }
      },
      (err) => {
        this.generateSchema_loading = false;
        window.alert(err.error);
      }
    );
  }

  GetSqlConnectionStrings() {
    this.connectionString_loading = true;
    this.bridgeManagerService.GetSqlConnectionStrings().subscribe(
      (res) => {
        this.connectionStrings = res;
        this.connectionString_loading = false;
        
      },
      (err) => {
        this.connectionString_loading = false;
      }
    )
  }

  onSelectConnectionString(event: Event) {
    var connectionStringId = (<HTMLInputElement>event.target).value;
    this.selectedConnectionStringId = connectionStringId;
    this.selectedDatabaseName = this.connectionStrings.find(x => x.connectionStringId == connectionStringId).databaseName;
    this.getTables();
  }

  getTables() {
    this.dataAnalysisService.GetTables(this.selectedConnectionStringId).subscribe(
      (res: any) => {
        this.schemaNames = res.schemaNames;
        this.tableNames = res.tableNames;
      },
      (err) => {
        
      }
    );
  }

  onSelectTableType(event: any) {
    var _value = (<HTMLInputElement>event.target).value;
    if (_value === 'new') {
      this.tableTypeSelected = true;
      this.fileAndTableSchema = [];
      this.DismissTableSchema();

      this.createTableForm.controls.Schema.enable();
      this.createTableForm.controls.Schema.setValidators([Validators.required]);
      this.createTableForm.controls.Schema.updateValueAndValidity();

      this.createFileAndTableSchemaForm.controls.Schema.enable();
      this.createFileAndTableSchemaForm.controls.Schema.setValidators([Validators.required]);
      this.createFileAndTableSchemaForm.controls.Schema.updateValueAndValidity();

      this.createTableForm.controls.NewTableName.enable();
      this.createTableForm.controls.NewTableName.setValidators([Validators.required]);
      this.createTableForm.controls.NewTableName.updateValueAndValidity();

      this.createFileAndTableSchemaForm.controls.NewTableName.enable();
      this.createFileAndTableSchemaForm.controls.NewTableName.setValidators([Validators.required]);
      this.createFileAndTableSchemaForm.controls.NewTableName.updateValueAndValidity();

      this.createTableForm.controls.OldTableName.disable();
      this.createTableForm.controls.OldTableName.setValue('');
      this.createTableForm.controls.OldTableName.setValidators(null);
      this.createTableForm.controls.OldTableName.updateValueAndValidity();

      this.createFileAndTableSchemaForm.controls.OldTableName.disable();
      this.createFileAndTableSchemaForm.controls.OldTableName.setValue('');
      this.createFileAndTableSchemaForm.controls.OldTableName.setValidators(null);
      this.createFileAndTableSchemaForm.controls.OldTableName.updateValueAndValidity();

      this.createTableForm.controls.AppendData.disable();
      this.createTableForm.controls.AppendData.setValue(false);
      this.createTableForm.controls.AppendData.setValidators(null);
      this.createTableForm.controls.AppendData.updateValueAndValidity();
    }
    else if (_value === 'existing') {
      this.tableTypeSelected = true;
      this.fileAndTableSchema = [];
      this.DismissTableSchema();

      this.createTableForm.controls.Schema.disable();
      this.createTableForm.controls.Schema.setValue('');
      this.createTableForm.controls.Schema.setValidators(null);
      this.createTableForm.controls.Schema.updateValueAndValidity();

      this.createFileAndTableSchemaForm.controls.Schema.disable();
      this.createFileAndTableSchemaForm.controls.Schema.setValue('');
      this.createFileAndTableSchemaForm.controls.Schema.setValidators(null);
      this.createFileAndTableSchemaForm.controls.Schema.updateValueAndValidity();

      this.createTableForm.controls.NewTableName.disable();
      this.createTableForm.controls.NewTableName.setValue('');
      this.createTableForm.controls.NewTableName.setValidators(null);
      this.createTableForm.controls.NewTableName.updateValueAndValidity();

      this.createFileAndTableSchemaForm.controls.NewTableName.disable();
      this.createFileAndTableSchemaForm.controls.NewTableName.setValue('');
      this.createFileAndTableSchemaForm.controls.NewTableName.setValidators(null);
      this.createFileAndTableSchemaForm.controls.NewTableName.updateValueAndValidity();

      this.createTableForm.controls.OldTableName.enable();
      this.createTableForm.controls.OldTableName.setValidators([Validators.required]);
      this.createTableForm.controls.OldTableName.updateValueAndValidity();

      this.createFileAndTableSchemaForm.controls.OldTableName.enable();
      this.createFileAndTableSchemaForm.controls.OldTableName.setValidators([Validators.required]);
      this.createFileAndTableSchemaForm.controls.OldTableName.updateValueAndValidity();

      this.createTableForm.controls.AppendData.enable();
      this.createTableForm.controls.AppendData.setValidators([Validators.required]);
      this.createTableForm.controls.AppendData.updateValueAndValidity();
    }
  }

  CreateTableSchema() {
    this.tableSchema = [];
    this.tableSchema_show = false;
    this.tableSchema_loading = true;
    if (
      (this.createTableForm.controls.ConnectionStringId.value == null || this.createTableForm.controls.ConnectionStringId.value == '') ||
      (this.createTableForm.controls.OldTableName.value == null || this.createTableForm.controls.OldTableName.value == '')
    ) {
      this.tableSchema_loading = false;
      this.toastr.error('Please select connection string and table name.', '', { positionClass: 'toast-bottom-right' });
      return
    }
    else {
      this.dataAnalysisService.CreateTableSchema(this.createTableForm.controls.ConnectionStringId.value, this.createTableForm.controls.OldTableName.value).subscribe(
        (res) => {
          this.tableSchema = res;
          this.tableSchema_loading = false;
          this.tableSchema_show = true;
        },
        (err) => {
          this.tableSchema_loading = false;
          this.alert_type = 'danger';
          this.alert_message = err.error;
          this.showViewButton = false;
          this.showAlert = true;
        }
      )

    }
  }

  DismissTableSchema() {
    this.tableSchema_show = false;
    this.tableSchema = [];
  }

  GenerateCSVFileSchema(files: any) {
    //#region
    this.generateSchema_loading = true;
    this.FiledArray = this.createTableForm.get('FieldArray') as FormArray;
    this.FiledArray.clear();
    if (files.length === 0) {
      this.generateSchema_loading = false;
      return;
    }
    const formData = new FormData();
    this.selectedFile = files[0];
    let file = files[0];
    formData.append(file.name, file);
    //#endregion
    this.dataAnalysisService.GenerateCSVFileSchema(formData).subscribe(
      (res) => {
        this.fileSchema = res;
        if (res.length === 0) {
          window.alert("This file is empty")
          this.generateSchema_loading = false;
          return;
        }
        else {
          let i = 0;
          this.FiledArray = this.createTableForm.get('FieldArray') as FormArray;
          res.forEach((item) => {
            this.addFieldArray();
            this.FiledArray.at(i).patchValue({
              ColumnName: item.columnName,
              DataType: item.dataType,
              IsPrimaryKey: false,
              IsNullAble: false
            });
            i++;
          })
          this.generateSchema_loading = false;
        }
      },
      (err) => {
        
        this.generateSchema_loading = false;
      }
    )
  }

  resetForm() {
    this.schemaNames = [];
    this.tableNames = [];
    this.selectedDatabaseName = '';
    this.FiledArray = this.createTableForm.get('FieldArray') as FormArray;
    this.FiledArray.clear();
    this.createTableForm.reset();
    this.createFileAndTableSchemaForm.reset();
    // this.fileSchema = [];
  }

  SurpriseQuotes() {
    window.alert('"Yesterday is gone. Tomorrow has not yet come. We have only today."\n-Mother Teresa');
  }

  previewLoadedData() {
    this.previewedData = [];
    this.cols = [];
    this.previewLoadedData_loading = true;
    //#region
    if (
      (this.createTableForm.get('Schema')!.value != null || this.createTableForm.get('Schema')!.value != '') &&
      (this.createTableForm.get('NewTableName')!.value != null || this.createTableForm.get('NewTableName')!.value != '') &&
      (this.createTableForm.get('OldTableName')!.value == null || this.createTableForm.get('OldTableName')!.value == '')
    ) {
      this.table_name = this.createTableForm.get('Schema')!.value + "." + this.createTableForm.get('NewTableName')!.value;
    }
    if (
      (this.createTableForm.get('Schema')!.value == null || this.createTableForm.get('Schema')!.value == '') &&
      (this.createTableForm.get('NewTableName')!.value == null || this.createTableForm.get('NewTableName')!.value == '') &&
      (this.createTableForm.get('OldTableName')!.value != null || this.createTableForm.get('OldTableName')!.value != '')
    ) {
      this.table_name = this.createTableForm.get('OldTableName')!.value;
    }
    //#endregion

    this.dataAnalysisService.PreviewImportedData(this.createTableForm.controls.ConnectionStringId.value, this.table_name, this.row_count).subscribe(
      (res) => {
        this.previewedData = res;
        var keys = Object.keys(res[0]);
        keys.forEach((key) => {
          this.cols.push({ field: key, header: key.trim() })
        })
        this.previewLoadedData_loading = false;
      },
      (err) => {
        this.previewLoadedData_loading = false;
      }
    );
    this.showBlobDataDialog()
  }

  showBlobDataDialog() {
    this.displayBlobDataModal = true;
  }

}
