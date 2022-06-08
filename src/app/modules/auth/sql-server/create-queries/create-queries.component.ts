import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';
import { SideBarService } from 'src/app/services/side-bar.service';
import { MenuItem } from 'primeng/api';
import { ResizedEvent } from 'angular-resize-event';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import * as FileSaver from 'file-saver';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-create-queries',
  templateUrl: './create-queries.component.html',
  styleUrls: ['./create-queries.component.scss'],
})
export class CreateQueriesComponent implements OnInit {

  public selectedTableName!: any;
  optionOnBlur: any;
  isEditmode: boolean = false;

  //#region 
  default_select = null

  initialHeight = 300
  @ViewChild('editor_card_body') editor_card_body!: ElementRef
  @ViewChild('cm') cm!: CodemirrorComponent
  @ViewChild('p_table') p_table!: ElementRef

  editor_card_width!: number
  editor_card_height!: number

  connectionStrings: any[] = [];
  connectionString_loading = false;

  userName!: string;

  databaseName_Next!: string;
  synapseDatabases_loading = false;

  // externalTables!: any[]
  externalTable_Next!: string;
  // externalTables_loading = false;

  synapseTblEtVws: any;
  getSynapseTblEtVws_loading = false;

  synapseDatabases!: any[]
  database_Next!: string;
  GetDatabase_loading = false

  // ExternalTables: any[] = [];
  externalTable_next!: string;
  externalTable_loading = false;

  querySQL!: string;

  createQueriesForm!: FormGroup;
  createQueriesForm_loading = false;

  executeQueryForm!: FormGroup;
  executeQueryForm_loading = false;

  rowUpdateForm!: FormGroup;
  rowUpdateForm_loading = false;

  createDate: Date = new Date();
  todayDate = new Date();

  time: number = 0;
  interval: any;

  queryId!: string;

  queryResults: any[] = [];
  clonedQueryResults: any[] = [];
  clonedRow: { [s: string]: any; } = {};;
  cols: any[] = [];
  queryResultsError = false;
  queryResultsErrorMessage!: string
  queryResultsSuccess = false;
  queryResultsSuccessMessage!: string;

  display: boolean = false;
  selectedConnectionName!: string;

  suggetionTables: string[] = []
  //#endregion

  editorContent!: string;
  codeMirrorOptions: any = {
    theme: 'material',
    mode: "text/x-mysql",
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: false,
    autofocus: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-matchingbracket",
      "CodeMirror-focused"
    ],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  }
  items!: MenuItem[];

  returnUrl!: string;


  allTables_loading = false;
  tables: any[] = [];
  cloned_tables: any[] = [];
  externalTables: any[] = [];
  cloned_externalTables: any[] = [];
  viewTables: any[] = [];
  cloned_viewTables: any[] = [];
  databaseName: string = 'Database Name...';
  dataKey: string = "";

  horizontalLeftHidden: boolean = false;
  horizontalSplitterSizes = {
    left: 30,
    right: 70,
  }
  verticalTopHidden: boolean = false;
  verticalSplitterSizes = {
    top: 70,
    bottom: 30
  }

  tableName!: string
  onEditQueryResult: any
  constructor(
    private msalAuthenticationService: MsalAuthenticationService,
    private formBuilder: FormBuilder,
    private analysisService: AnalysisService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public sidebarService: SideBarService,
    private bridgeManagerService: BridgeManagerService,
    private elementRef: ElementRef,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) {
    this.userName = this.msalAuthenticationService.userName()
    this.buildCreateQueriesForm();
    this.buildExecuteQueryForm();
    this.buildRowUpdateForm();
    this.searchTableLists();
  }

  ngOnInit(): void {
    this.getRouteQueryId();
    this.GetSqlConnectionStrings()
    this.returnUrl = this.actRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  buildCreateQueriesForm() {
    this.createQueriesForm = this.formBuilder.group({
      QueryId: [null],
      ConnectionStringId: ['', Validators.required],
      DatabaseName: [null],
      QueryName: ['', Validators.required],
      QueryDescription: ['', Validators.required],
      QuerySQL: ['', Validators.required],
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });
  }

  buildExecuteQueryForm() {
    this.executeQueryForm = this.formBuilder.group({
      QueryId: [null],
      DatabaseName: [null],
      ConnectionStringId: ['', Validators.required],
      QuerySQL: ['', Validators.required],
      AddedBy: null,
      AddedDate: null
    });
  }

  buildRowUpdateForm() {
    this.rowUpdateForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      TableName: ['', Validators.required],
      OldData: ['', Validators.required],
      NewData: ['', Validators.required],
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    })
  }

  onResized(event: ResizedEvent) {
    this.editor_card_width = event.newRect.width;
    this.editor_card_height = event.newRect.height;
    this.cm.codeMirror?.setSize(null, event.newRect.height - 1);
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
    this.allTables_loading = true;
    this.databaseName = 'Database Name...';
    this.tables = []; this.cloned_tables = [];
    this.externalTables = []; this.cloned_externalTables = [];
    this.viewTables = []; this.cloned_viewTables = [];
    var connectionStringId = (<HTMLInputElement>event.target).value;
    this.databaseName = this.connectionStrings.find(x => x.connectionStringId == connectionStringId).databaseName;
    this.analysisService.GetAllTables(connectionStringId).subscribe(
      (res: any) => {
        // JSON.parse(JSON.stringify(res));
        this.databaseName = res[0].databaseName;

        this.tables = res[0].tables
        this.cloned_tables = JSON.parse(JSON.stringify(res[0].tables));

        this.externalTables = res[0].externalTables
        this.cloned_externalTables = JSON.parse(JSON.stringify(res[0].externalTables));

        this.viewTables = res[0].viewTables
        this.cloned_viewTables = JSON.parse(JSON.stringify(res[0].viewTables));

        this.allTables_loading = false;
        var mergedObject = Object.assign({}, this.tables, this.externalTables, this.viewTables);
        this.suggetionTables = Object.values(mergedObject).map(x => x.tableName);
      },
      err => { this.allTables_loading = false; }
    );
  }

  getRouteQueryId() {
    this.route.queryParams.subscribe(params => { this.queryId = params.QueryId })
    if (this.queryId != null) {
      this.getQueryDetailsToUpdate();
    }
  }

  getQueryDetailsToUpdate() {
    this.analysisService.GetQueryById(this.queryId).subscribe(
      (res: any) => {
        this.databaseName = res.databaseName
        this.analysisService.GetAllTables(res.connectionStringId).subscribe(
          (res: any) => {
            this.tables = res[0].tables
            this.externalTables = res[0].externalTables
            this.viewTables = res[0].viewTables
            this.allTables_loading = false;
          },
          err => { this.allTables_loading = false; }
        );
        this.createQueriesForm.patchValue({
          QueryId: res.queryId,
          ConnectionStringId: res.connectionStringId,
          DatabaseName: this.databaseName,
          QueryName: res.queryName,
          QueryDescription: res.queryDescription,
          QuerySQL: res.querySQL,
        });


        this.executeQueryForm.patchValue({
          ConnectionStringId: res.connectionStringId,
          DatabaseName: this.databaseName,
          QueryId: res.queryId,
          QuerySQL: res.querySQL
        });
      },
      (err: any) => { }
    );
  }

  onSubmitCreteQueriesForm() {
    this.createQueriesForm_loading = true;
    if (this.queryId != null) {
      this.createQueriesForm.patchValue({
        QueryId: this.queryId
      });
    }
    this.createQueriesForm.patchValue({
      DatabaseName: this.databaseName,
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });

    if (!this.createQueriesForm.valid) {
      this.createQueriesForm_loading = false;
      this.toastr.warning('Please fill all the required fields', 'Warning', { positionClass: 'toast-bottom-center' });
      return;
    }
    this.analysisService.CreateQueries(this.createQueriesForm.value).subscribe(
      res => {
        this.createQueriesForm_loading = false;
        this.toastr.success('Query Saved Successfully', 'Success', { positionClass: 'toast-bottom-center' });
      },
      err => {
        this.createQueriesForm_loading = false;
        this.toastr.error('Query Saved Failed', 'Error', { positionClass: 'toast-bottom-center' });
      }
    );
  }

  onSubmitExecuteQueryForm() {
    this.queryResults = [];
    this.queryResultsError = false
    this.queryResultsSuccess = false
    this.queryResultsErrorMessage = '';
    this.queryResultsSuccessMessage = '';
    this.executeQueryForm.patchValue({
      ConnectionStringId: this.createQueriesForm.get('ConnectionStringId')?.value,
      QuerySQL: this.createQueriesForm.get('QuerySQL')?.value,
      AddedBy: this.userName,
      AddedDate: this.todayDate
    });

    this.cols = [];
    this.queryResults = [];
    this.clonedQueryResults = [];
    this.executeQueryForm_loading = true;
    if (!this.executeQueryForm.valid) {
      this.executeQueryForm_loading = false;
      this.toastr.warning('Please fill all the required fields', 'Warning', { positionClass: 'toast-bottom-right' });
      return;
    }
    this.time = 0;
    this.startTimer();
    this.analysisService.ExecuteQuery(this.executeQueryForm.value).subscribe(
      (data: any) => {
        this.pauseTimer();
        
        if (typeof (data) == 'object') {
          var res = data;
          this.dataKey = Object.keys(res[0])[0]
          this.queryResults = res;
          this.clonedQueryResults = JSON.parse(JSON.stringify(res));
          var firstRow = res[0];
          var keys = Object.keys(firstRow);
          keys.forEach((key, i) => {
            this.cols.push({ field: key, header: key.trim(), editable: i == 0 ? false : true });
          });
          this.executeQueryForm_loading = false;
        }
        else if (typeof (data) == 'number') {
          this.executeQueryForm_loading = false;
          this.queryResultsSuccessMessage = data + " item affected";
          this.queryResultsSuccess = true;
        }

      },
      err => {
        this.pauseTimer();
        this.executeQueryForm_loading = false;
        this.queryResultsErrorMessage = err.error
        this.queryResultsError = true
        this.toastr.error('Query Execution Failed', 'Error', { positionClass: 'toast-bottom-right' });
      }
    );
  }

  onChangeQuerySQL(event: Event) {
    this.querySQL = (<HTMLInputElement>event.target).value;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time++;
    }, 1000);
  }

  clearCreateQueriesForm() {
    this.createQueriesForm.get('QueryName')?.reset();
    this.createQueriesForm.get('QueryDescription')?.reset();
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  showDialog() {
    this.display = true;
  }

  back() {
    if (this.returnUrl != '/') {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      return
    }
  }

  typeOf(value: any) {
    return typeof value;
  }

  onRowEditInit(queryResult: any, index: number) {
    this.clonedRow[index] = { ...queryResult };
  }
  onRowEditSave(queryResult: any, index: number) {
    this.rowUpdateForm.patchValue({
      ConnectionStringId: this.createQueriesForm.get('ConnectionStringId')?.value,
      TableName: this.tableName,
      OldData: JSON.stringify(this.clonedQueryResults[index]),
      NewData: JSON.stringify(queryResult),
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });
    this.analysisService.OnRowTableUpdate(this.rowUpdateForm.value).subscribe(
      res => {
        this.toastr.success("Successfully updated", "Success", { positionClass: 'toast-bottom-right' });
      },
      err => {
        this.queryResults[index] = this.clonedRow[index]
        delete this.clonedRow[index];
        this.toastr.error("Failed to update", "Error", { positionClass: 'toast-bottom-right' });
      }
    );
  }
  onRowEditCancel(queryResult: any, index: number) {
    this.queryResults[index] = this.clonedRow[index]
    delete this.clonedRow[index];
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.queryResults);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer);
    });
  }

  saveAsExcelFile(buffer: any): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, 'export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportCSV() {
    const replacer = (key: any, value: any) => (typeof (value) === 'object' ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(this.queryResults[0]);
    const csv = this.queryResults.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'export_' + new Date().getTime() + '.csv';
    // a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  toggleEditMode() {
    this.isEditmode = !this.isEditmode;
  }

  toggleHorizontalSplitter() {
    this.horizontalSplitterSizes.left = this.horizontalSplitterSizes.left != 0 ? 0 : 30;
    this.horizontalSplitterSizes.right = this.horizontalSplitterSizes.right != 100 ? 100 : 70;
    if (this.horizontalSplitterSizes.left == 0 && this.horizontalSplitterSizes.right == 100) {
      this.horizontalLeftHidden = true;
    }
    else {
      this.horizontalLeftHidden = false;
    }
  }

  toggleVerticalSplitter() {
    this.verticalSplitterSizes.top = this.verticalSplitterSizes.top != 17 ? 17 : 70;
    this.verticalSplitterSizes.bottom = this.verticalSplitterSizes.bottom != 83 ? 83 : 30;
    if (this.verticalSplitterSizes.top == 17 && this.verticalSplitterSizes.bottom == 83) {
      this.verticalTopHidden = true;
    }
    else {
      this.verticalTopHidden = false;
    }
  }

  searchTableLists() {
    this.tables = this.cloned_tables.filter(x => { return x.tableName.toLowerCase().includes(this.selectedTableName.toLowerCase()) })
    this.externalTables = this.cloned_externalTables.filter(x => { return x.tableName.toLowerCase().includes(this.selectedTableName.toLowerCase()) })
    this.viewTables = this.cloned_viewTables.filter(x => { return x.tableName.toLowerCase().includes(this.selectedTableName.toLowerCase()) })
  }

}
