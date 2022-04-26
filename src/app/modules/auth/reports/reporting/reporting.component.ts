import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { ReportsService } from 'src/app/services/auth/reports.service';
import { ConfirmationService } from 'primeng/api';
import { ChartdataService } from 'src/app/services/auth/chartdata.service';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SideBarService } from 'src/app/services/side-bar.service';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  userName!: string;
  todayDate = new Date().toISOString();

  //#region 
  default_select = null
  selectedConnectionStringId!: string;
  selectedTable!: string;

  getTableMeatadataForm!: FormGroup;
  getTableMeatadata_loading = false;
  Tablemetadata: any[] = []

  connectionStrings: any[] = [];
  connectionString_loading: boolean = false;

  allTables_loading: boolean = false;
  databaseName: string = 'Database Name...';
  tables: any[] = [];
  externalTables: any[] = [];
  viewTables: any[] = [];

  runCustomQueryform!: FormGroup;
  runcustomQueryForm_loading: boolean = false;
  saveCustomQuery_loading: boolean = false;

  iFieldFunction: any[] = []
  iFieldSortBy: any[] = []
  iFieldFilterBy: any[] = []

  cols: any[] = [];
  resultData: any[] = [];
  keys: any[] = []
  filterFields!: string
  isError: boolean = false;
  error_message!: string;
  xAxisItems: any[] = []
  yAxisItems: any[] = []
  items: number[] = new Array(4).fill(0);

  //#endregion

  selectedWorkspace: string = '';
  selectedWorkspacedata: any;

  isSave: boolean = false;
  isSaveAs: boolean = false;

  //#region 
  chartData1: any = {
    labels: [],
    datasets: []
  }
  chartData2: any = {
    labels: [],
    datasets: []
  }
  chartData3: any = {
    labels: [],
    datasets: []
  }
  chartData4: any = {
    labels: [],
    datasets: []
  }

  isLineChart1: boolean = false;
  isBarChart1: boolean = false;
  ispieChart1: boolean = false;
  isDoughnutChart1: boolean = false;

  isLineChart2: boolean = false;
  isBarChart2: boolean = false;
  isPieChart2: boolean = false;
  isDoughnutChart2: boolean = false;

  isLineChart3: boolean = false;
  isBarChart3: boolean = false;
  ispieChart3: boolean = false;
  isDoughnutChart3: boolean = false;

  isLineChart4: boolean = false;
  isBarChart4: boolean = false;
  ispieChart4: boolean = false;
  isDoughnutChart4: boolean = false;

  display: boolean = false;
  chartNumber: number = 0

  displaySaveQuery: boolean = false;
  displayAllQueries: boolean = false;

  allWorkSpaces: any[] = [];
  //#endregion

  //#region For SQL on Dataset
  datasetKeys: any[] = []
  //#endregion

  constructor(
    private formBuilder: FormBuilder,
    private bridgeManagerService: BridgeManagerService,
    private analysisService: AnalysisService,
    private reportsService: ReportsService,
    private resolver: ComponentFactoryResolver,
    private confirmationService: ConfirmationService,
    private chartdataService: ChartdataService,
    private msalAuthenticationService: MsalAuthenticationService,
    private toastr: ToastrService,
    private sideBarService: SideBarService,
    private cdr: ChangeDetectorRef
  ) {
    this.buildCreateTableProfileForm();
    this.buildRunCustomQueryform();
    this.chartData1;
    this.chartData2;
    this.chartData3;
    this.chartData4;
  }

  ngOnInit(): void {
    this.userName = this.msalAuthenticationService.userName();
    this.GetSqlConnectionStrings()
    this.GetAllCustomQuery()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sideBarService.toggleSideNav()
    })

  }

  buildCreateTableProfileForm() {
    this.getTableMeatadataForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      ExternalTableName: ['', Validators.required]
    });
  }

  buildRunCustomQueryform() {
    this.runCustomQueryform = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      CustomQueryId: null,
      TableName: ['', Validators.required],
      CustomQueryName: [{ value: '', disabled: true }],
      Functions: this.formBuilder.array([], Validators.required),
      GroupBy: this.formBuilder.array([], Validators.required),
      SortBy: this.formBuilder.array([]),
      FilterBy: this.formBuilder.array([]),
      ChartInfo: this.formBuilder.array([]),

      ChartName1: [''],
      ChartName2: [''],
      ChartName3: [''],
      ChartName4: [''],
      xAxis1: [''],
      xAxis2: [''],
      xAxis3: [''],
      xAxis4: [''],
      yAxis1: [''],
      yAxis2: [''],
      yAxis3: [''],
      yAxis4: [''],
      ChartType1: [''],
      ChartType2: [''],
      ChartType3: [''],
      ChartType4: [''],

      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });
  }

  get f() { return this.runCustomQueryform.controls; }

  //#region  Functions Controller
  get Functions(): FormArray {
    return this.runCustomQueryform.get('Functions') as FormArray;
  }
  newFuntion(): FormGroup {
    return this.formBuilder.group({
      Id: null,
      ColumnName: ['', Validators.required],
      Function: ['', Validators.required]
    });
  }
  addFunctions() {
    this.Functions.push(this.newFuntion());
  }
  removeFunction(i: number) {
    this.Functions.removeAt(i);
    if (this.iFieldFunction.length > 0 && i != -1) {
      this.iFieldFunction.splice(i, 1);
    }
  }
  onConfirmFunction(i: number) {
    var functionName = this.runCustomQueryform.get('Functions')?.value[i].Function
    var ColumnName = this.runCustomQueryform.get('Functions')?.value[i].ColumnName
    var func = "f(" + functionName + "," + ColumnName + ")";

    if (this.iFieldFunction.hasOwnProperty(i)) {
      this.iFieldFunction[i] = func
    }
    else {
      this.iFieldFunction.push(func)
    }
  }
  //#endregion

  //#region  Group By Controller
  get GroupBy(): FormArray {
    return this.runCustomQueryform.get('GroupBy') as FormArray;
  }
  newGroupBy(): FormGroup {
    return this.formBuilder.group({
      Id: null,
      ColumnName: ['', Validators.required]
    });
  }
  addGroupBy() {
    this.GroupBy.push(this.newGroupBy());
  }
  removeGroupBy(i: number) {
    this.GroupBy.removeAt(i);
  }
  //#endregion

  //#region Sort By Controller
  get SortBy(): FormArray {
    return this.runCustomQueryform.get('SortBy') as FormArray;
  }
  newSortBy(): FormGroup {
    return this.formBuilder.group({
      Id: null,
      ColumnName: ['', Validators.required],
      SortType: ['', Validators.required]
    });
  }
  addSortBy() {
    this.SortBy.push(this.newSortBy());
  }
  removeSortBy(i: number) {
    this.SortBy.removeAt(i);
  }

  onConfirmSortBy(i: number) {
    var sortType = this.runCustomQueryform.get('SortBy')?.value[i].SortType
    var columnName = this.runCustomQueryform.get('SortBy')?.value[i].ColumnName
    var func = columnName + " " + sortType;

    if (this.iFieldSortBy.hasOwnProperty(i)) {
      this.iFieldSortBy[i] = func
    }
    else {
      this.iFieldSortBy.push(func)
    }
  }
  //#endregion

  //#region FilterBy Controller
  get FilterBy(): FormArray {
    return this.runCustomQueryform.get('FilterBy') as FormArray;
  }
  newFilterBy(): FormGroup {
    return this.formBuilder.group({
      Id: null,
      ColumnName: ['', Validators.required],
      FilterOperator: ['', Validators.required],
      FilterValue: ['', Validators.required]
    });
  }
  addFilterBy() {
    this.FilterBy.push(this.newFilterBy());
  }
  removeFilterBy(i: number) {
    this.FilterBy.removeAt(i);
  }
  onConfirmFilterBy(i: number) {
    var columnName = this.runCustomQueryform.get('FilterBy')?.value[i].ColumnName
    var filterOperator = this.runCustomQueryform.get('FilterBy')?.value[i].FilterOperator
    var filterValue = this.runCustomQueryform.get('FilterBy')?.value[i].FilterValue
    var func = columnName + " " + filterOperator + " " + filterValue;

    if (this.iFieldFilterBy.hasOwnProperty(i)) {
      this.iFieldFilterBy[i] = func
    }
    else {
      this.iFieldFilterBy.push(func)
    }
  }
  //#endregion

  //#region ChartInfo
  get ChartInfo(): FormArray {
    return this.runCustomQueryform.get('ChartInfo') as FormArray;
  }
  newChartInfo(): FormGroup {
    return this.formBuilder.group({
      Id: null,
      ChartName: ['', Validators.required],
      Title: ['', Validators.required],
      SubTitle: ['', Validators.required],
      ChartType: ['', Validators.required],

      ChartXAxis: ['', Validators.required],
      ChartYAxisInfo: this.formBuilder.array([]),

      LineBarPieOptionsPluginsLegendLabelsColor: [{ value: '#495057', disabled: true }, Validators.required],   // Done
      LineBarOptionsScalesXTicksColor: [{ value: '#495057', disabled: true }, Validators.required],   // Done
      LineBarOptionsScalesXTicksGrid: [{ value: '#EBEDEF', disabled: true }, Validators.required],    // Done
      LineBarOptionsScalesYTicksColor: [{ value: '#495057', disabled: true }, Validators.required],   // Done
      LineBarOptionsScalesYTicksGrid: [{ value: '#EBEDEF', disabled: true }, Validators.required],    // Done

      FinalChartData: ['', Validators.required],
      FinalChartOptions: ['', Validators.required]
    });
  }
  addChartInfo() {
    this.ChartInfo.push(this.newChartInfo());
  }
  removeChartInfo(i: number) {
    this.ChartInfo.removeAt(i);
  }
  //#endregion

  //#region ChartYAxisInfo Controller
  ChartYAxisInfo(chartInfoIndex: number): FormArray {
    return this.ChartInfo.at(chartInfoIndex).get('ChartYAxisInfo') as FormArray;
  }
  newChartYAxisInfo(): FormGroup {
    return this.formBuilder.group({
      Id: null,
      ChartYAxis: ['', Validators.required],
      ChartYAxisFunction: ['', Validators.required],
      LineBarDatasetsLabel: [{ value: '', disabled: true }, Validators.required],   // Done
      BarDatasetsBackgroundColor: [{ value: '#42A5F5', disabled: true }, Validators.required],    // Done
      LineDatasetsFill: [{ value: false, disabled: true }, Validators.required],   // Done
      LineDatasetsBorderColor: [{ value: '#42A5F5', disabled: true }, Validators.required],    // Done
      LineDatasetsTension: [{ value: 0.4, disabled: true }, Validators.required],  // Done
    });
  }
  addChartYAxisInfo(chartInfoIndex: number) {
    this.ChartYAxisInfo(chartInfoIndex).push(this.newChartYAxisInfo());
  }
  removeChartYAxisInfo(chartInfoIndex: number, chartYAxisInfoIndex: number) {
    this.ChartYAxisInfo(chartInfoIndex).removeAt(chartYAxisInfoIndex);
  }
  //#endregion

  //#region 
  onSubmitRunCustomQuery() {
    this.runcustomQueryForm_loading = true;
    this.xAxisItems = []
    this.yAxisItems = []
    this.resultData = []
    this.cols = [];
    this.keys = [];
    this.filterFields = '';
    this.isError = false;
    if (this.runCustomQueryform.invalid) {
      return;
    }
    this.reportsService.ExecuteCustomeQuery(this.runCustomQueryform.value).subscribe(
      (res: any) => {
        this.getDatasetKeys(res[0]);
        this.chartdataService.updateData(res);
        this.resultData = res;
        if (this.selectedWorkspacedata != null) {
          this.renderSavedCharts();
        }
        this.keys = Object.keys(res[0]);
        this.keys.forEach((key, i) => {
          this.cols.push({ field: key, header: key.trim() });
        });
        var tmp: string[] = [];
        this.keys.forEach((item) => {
          tmp.push("'" + item + "'");
        });
        this.filterFields = tmp.join(",");
        this.runCustomQueryform.get("GroupBy")?.value.forEach((item: any) => {
          this.xAxisItems.push(item.ColumnName);
        });
        this.runCustomQueryform.get("Functions")?.value.forEach((item: any) => {
          var _columnName = item.ColumnName
          var _functionName = item.Function.split(')')[0].split('(')[0]
          var _func = _functionName + "_" + _columnName
          this.yAxisItems.push(_func);
        });
        this.runcustomQueryForm_loading = false
      },
      (err: any) => {
        this.error_message = err.error;
        this.isError = true;
        this.runcustomQueryForm_loading = false
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

  GetAllCustomQuery() {
    this.reportsService.GetAllCustomQuery().subscribe(
      (res) => {
        this.allWorkSpaces = res;
      },
      (err) => { console.log(err); }
    )
  }

  onSelectConnectionString(event: Event) {
    this.allTables_loading = true;
    (this.runCustomQueryform.get('Functions') as FormArray).clear();
    (this.runCustomQueryform.get('GroupBy') as FormArray).clear();
    (this.runCustomQueryform.get('SortBy') as FormArray).clear();
    (this.runCustomQueryform.get('FilterBy') as FormArray).clear();
    this.databaseName = 'Database Name...';
    this.tables = [];
    this.externalTables = [];
    this.viewTables = [];
    this.xAxisItems = [];
    this.yAxisItems = [];
    this.iFieldFunction = [];
    this.iFieldSortBy = [];
    this.iFieldFilterBy = [];
    this.Tablemetadata = [];
    this.resultData = [];
    var connectionStringId = (<HTMLInputElement>event.target).value;
    this.selectedConnectionStringId = connectionStringId;
    this.databaseName = this.connectionStrings.find(x => x.connectionStringId == connectionStringId).databaseName;
    this.GetAllTables(connectionStringId);
  }

  GetAllTables(connectionStringId: string) {
    this.analysisService.GetAllTables(connectionStringId).subscribe(
      (res: any) => {
        console.log(res);
        this.tables = res[0];
        this.databaseName = res[0].databaseName;
        this.tables = res[0].tables
        this.externalTables = res[0].externalTables
        this.viewTables = res[0].viewTables
        this.allTables_loading = false;
      },
      err => { this.allTables_loading = false; }
    );
  }

  onSelectTable(event: Event) {
    this.Tablemetadata = [];
    var table = (<HTMLInputElement>event.target).value;
    this.selectedTable = table;
    this.getTableMeatadataForm.patchValue({
      ConnectionStringId: this.selectedConnectionStringId,
      ExternalTableName: table
    });

    if (!this.getTableMeatadataForm.valid) {
      this.getTableMeatadata_loading = false
      return;
    }

    this.analysisService.GetExternalTableMetadata(this.getTableMeatadataForm.value).subscribe(
      (data: any) => {
        this.Tablemetadata = data;
        this.getTableMeatadata_loading = false;
        this.buildCreateTableProfileForm();
      },
      error => {

        this.getTableMeatadata_loading = false
        this.buildCreateTableProfileForm();
      }
    );
  }

  resetRunCustomQueryForm(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'All charts and table will be erased. Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-danger',
      rejectIcon: 'pi pi-times',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'ui-button-success',
      defaultFocus: 'reject',
      accept: () => {
        this.buildRunCustomQueryform();
        (this.runCustomQueryform.get('Functions') as FormArray).clear();
        (this.runCustomQueryform.get('GroupBy') as FormArray).clear();
        (this.runCustomQueryform.get('SortBy') as FormArray).clear();
        (this.runCustomQueryform.get('FilterBy') as FormArray).clear();
        this.allTables_loading = true;
        this.databaseName = 'Database Name...';
        this.tables = [];
        this.externalTables = [];
        this.viewTables = [];
        this.xAxisItems = [];
        this.yAxisItems = [];
        this.iFieldFunction = [];
        this.iFieldSortBy = [];
        this.iFieldFilterBy = [];
        this.Tablemetadata = [];
        this.resultData = [];
        this.default_select = null
        this.chartData1 = [];
        this.chartData2 = [];
        this.chartData3 = [];
        this.chartData4 = [];
        this.selectedWorkspacedata = null;
        this.selectedWorkspace = '';
      }
    })

  }

  createChart(i: number, chart_name: string, chartType: string, xAxis: string, yAxis: string) {
    if (i == 1) {
      this.chartData1 = {
        labels: [],
        datasets: []
      }
      if (Number(chartType) == 1) {
        this.isLineChart1 = true;
        this.isBarChart1 = false;
      }
      else if (Number(chartType) == 2) {
        this.isLineChart1 = false;
        this.isBarChart1 = true;
      }
      this.resultData.forEach(element => {
        this.chartData1.labels.push(element[xAxis]);
      });
      var _data: any[] = [];
      this.resultData.forEach(element => {
        _data.push(element[yAxis])
      });
      this.chartData1.datasets.push(
        {
          label: yAxis,
          data: _data,
          fill: false,
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          tension: .4
        }
      )
      this.runCustomQueryform.patchValue({
        ChartName1: chart_name,
        xAxis1: xAxis,
        yAxis1: yAxis,
        ChartType1: chartType
      });
    }
    else if (i == 2) {
      this.chartData2 = {
        labels: [],
        datasets: []
      }
      if (Number(chartType) == 1) {
        this.isLineChart2 = true;
        this.isBarChart2 = false;
      }
      else if (Number(chartType) == 2) {
        this.isLineChart2 = false;
        this.isBarChart2 = true;
      }
      this.resultData.forEach(element => {
        this.chartData2.labels.push(element[xAxis]);
      });
      var _data: any[] = [];
      this.resultData.forEach(element => {
        _data.push(element[yAxis])
      });
      this.chartData2.datasets.push(
        {
          label: yAxis,
          data: _data,
          fill: false,
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          tension: .4
        }
      )
      this.runCustomQueryform.patchValue({
        ChartName2: chart_name,
        xAxis2: xAxis,
        yAxis2: yAxis,
        ChartType2: chartType
      });
    }
    else if (i == 3) {
      this.chartData3 = {
        labels: [],
        datasets: []
      }
      if (Number(chartType) == 1) {
        this.isLineChart3 = true;
        this.isBarChart3 = false;
      }
      else if (Number(chartType) == 2) {
        this.isLineChart3 = false;
        this.isBarChart3 = true;
      }
      this.resultData.forEach(element => {
        this.chartData3.labels.push(element[xAxis]);
      });
      var _data: any[] = [];
      this.resultData.forEach(element => {
        _data.push(element[yAxis])
      });
      this.chartData3.datasets.push(
        {
          label: yAxis,
          data: _data,
          fill: false,
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          tension: .4
        }
      );
      this.runCustomQueryform.patchValue({
        ChartName3: chart_name,
        xAxis3: xAxis,
        yAxis3: yAxis,
        ChartType3: chartType
      });
    }
    else if (i == 4) {
      this.chartData4 = {
        labels: [],
        datasets: []
      }
      if (Number(chartType) == 1) {
        this.isLineChart4 = true;
        this.isBarChart4 = false;
      }
      else if (Number(chartType) == 2) {
        this.isLineChart4 = false;
        this.isBarChart4 = true;
      }
      this.resultData.forEach(element => {
        this.chartData4.labels.push(element[xAxis]);
      });
      var _data: any[] = [];
      this.resultData.forEach(element => {
        _data.push(element[yAxis])
      });
      this.chartData4.datasets.push(
        {
          label: yAxis,
          data: _data,
          fill: false,
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          tension: .4
        }
      )
      this.runCustomQueryform.patchValue({
        ChartName4: chart_name,
        xAxis4: xAxis,
        yAxis4: yAxis,
        ChartType4: chartType
      });
    }
    this.onHideDialog();
  }

  buildLineChart() { }
  buildBarChart() { }
  buildPieChart() { }
  buildDoughnutChart() { }

  showDialog(i: number) {
    this.chartNumber = i;
    this.display = true;
  }

  showSaveQueryDialog() {
    this.displaySaveQuery = true;
  }

  onHideSaveQueryDialog() {
    this.displaySaveQuery = false;
  }

  onHideDialog() {
    this.chartNumber = 0;
    this.display = false;
  }

  showAllQueriesDialog() {
    this.displayAllQueries = true;
  }

  onHideAllQueriesDialog() {
    this.displayAllQueries = false;
  }

  saveChartData() {
    this.saveCustomQuery_loading = true;
    this.todayDate = new Date().toISOString()
    this.runCustomQueryform.patchValue({
      AddedBy: this.userName,
      UpdatedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedDate: this.todayDate
    })
    console.log(this.runCustomQueryform.value);
    this.reportsService.SaveCustomQuery(this.runCustomQueryform.value).subscribe((res: any) => {
      this.GetAllCustomQuery();
      this.toastr.success('Successfully saved', 'Success', { positionClass: 'toast-bottom-right' })
      this.todayDate = new Date().toISOString();
      this.saveCustomQuery_loading = false;
      this.onHideSaveQueryDialog();
      this.SetCustomQueryDataAfterSave(res);
    }, err => {
      this.toastr.error(err.error, 'Error', { positionClass: 'toast-bottom-right' })
      this.saveCustomQuery_loading = false;
    });
  }

  saveAsChartData() {
    this.saveCustomQuery_loading = true;
    this.todayDate = new Date().toISOString()
    this.runCustomQueryform.patchValue({
      AddedBy: this.userName,
      UpdatedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedDate: this.todayDate
    })
    this.reportsService.SaveAsCustomQuery(this.runCustomQueryform.value).subscribe(
      (res: any) => {
        console.log(res);
        this.SetCustomQueryDataAfterSave(res);
        this.GetAllCustomQuery();
        this.toastr.success('Successfully saved', 'Success', { positionClass: 'toast-bottom-right' })
        this.todayDate = new Date().toISOString();
        this.saveCustomQuery_loading = false;
        this.onHideSaveQueryDialog();
      },
      err => {
        this.toastr.error(err.error, 'Error', { positionClass: 'toast-bottom-right' })
        this.saveCustomQuery_loading = false;
      });
  }

  DeleteCustomQuery(queryId: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-danger',
      rejectIcon: 'pi pi-times',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'ui-button-success',
      defaultFocus: 'reject',
      accept: () => {
        this.reportsService.DeleteCustomQuery(queryId).subscribe(
          res => {
            this.toastr.success('Successfully deleted', 'Success', { positionClass: 'toast-bottom-right' })
            this.GetAllCustomQuery();
          },
          err => {
            this.toastr.error('Error while deleting', 'Error', { positionClass: 'toast-bottom-right' })
          });
      },
      reject: () => {
        return;
      }
    });
  }

  SetCustomQueryToEdit(queryId: string) {
    this.buildRunCustomQueryform();
    this.selectedWorkspacedata = null;
    this.selectedWorkspace = '';
    this.databaseName = '';
    this.tables = [];
    this.externalTables = [];
    this.viewTables = [];
    var data = this.allWorkSpaces.find(x => x.customQueryId == queryId);
    this.GetAllTables(data.connectionStringId);
    this.selectedWorkspacedata = data;
    this.selectedWorkspace = data.customQueryName;


    //#region Set Table metadata
    this.Tablemetadata = [];
    this.getTableMeatadataForm.patchValue({
      ConnectionStringId: data.connectionStringId,
      ExternalTableName: data.tableName
    });
    if (!this.getTableMeatadataForm.valid) {
      this.getTableMeatadata_loading = false
      return;
    }
    this.analysisService.GetExternalTableMetadata(this.getTableMeatadataForm.value).subscribe(
      (data: any) => {
        this.Tablemetadata = data;
        this.getTableMeatadata_loading = false;
        this.buildCreateTableProfileForm();
      },
      error => {

        this.getTableMeatadata_loading = false
        this.buildCreateTableProfileForm();
      }
    );
    //#endregion

    //#region patchValue
    this.runCustomQueryform.patchValue({
      CustomQueryId: data.customQueryId,
      ConnectionStringId: data.connectionStringId,
      TableName: data.tableName,
      CustomQueryName: data.customQueryName,
      ChartName1: data.chartName1,
      ChartName2: data.chartName2,
      ChartName3: data.chartName3,
      ChartName4: data.chartName4,
      xAxis1: data.xAxis1,
      xAxis2: data.xAxis2,
      xAxis3: data.xAxis3,
      xAxis4: data.xAxis4,
      yAxis1: data.yAxis1,
      yAxis2: data.yAxis2,
      yAxis3: data.yAxis3,
      yAxis4: data.yAxis4,
      ChartType1: data.chartType1,
      ChartType2: data.chartType2,
      ChartType3: data.chartType3,
      ChartType4: data.chartType4,
      AddedBy: data.addedBy,
      AddedDate: data.addedDate,
      UpdatedBy: data.updatedBy,
      UpdatedDate: data.updatedDate
    });

    data.functionss.forEach((element: any, index: number) => {
      this.addFunctions();
      var func = this.runCustomQueryform.get('Functions') as FormArray
      func.controls[index].patchValue({
        Id: element.id,
        ColumnName: element.columnName,
        Function: element.function,
      })
      this.onConfirmFunction(index);
    });
    data.groupby.forEach((element: any, index: number) => {
      this.addGroupBy();
      var gropuby = this.runCustomQueryform.get('GroupBy') as FormArray
      gropuby.controls[index].patchValue({
        Id: element.id,
        ColumnName: element.columnName
      })
    });
    data.sortby.forEach((element: any, index: number) => {
      this.addSortBy();
      var sortby = this.runCustomQueryform.get('SortBy') as FormArray
      sortby.controls[index].patchValue({
        Id: element.id,
        ColumnName: element.columnName,
        SortType: element.sortType
      })
      this.onConfirmSortBy(index);
    });
    data.filterby.forEach((element: any, index: number) => {
      this.addFilterBy();
      var filterby = this.runCustomQueryform.get('FilterBy') as FormArray
      filterby.controls[index].patchValue({
        Id: element.id,
        ColumnName: element.columnName,
        FilterOperator: element.filterOperator,
        FilterValue: element.filterValue
      })
      this.onConfirmFilterBy(index);
    });

    //#endregion
    this.onSubmitRunCustomQuery()
    this.onHideAllQueriesDialog();
  }

  SetCustomQueryDataAfterSave(data: any) {
    this.selectedWorkspacedata = data;
    this.selectedWorkspace = data.customQueryName;
    this.GetAllTables(data.connectionStringId);

    //#region Set Table metadata
    this.Tablemetadata = [];
    this.getTableMeatadataForm.patchValue({
      ConnectionStringId: data.connectionStringId,
      ExternalTableName: data.tableName
    });
    if (!this.getTableMeatadataForm.valid) {
      this.getTableMeatadata_loading = false
      return;
    }
    this.analysisService.GetExternalTableMetadata(this.getTableMeatadataForm.value).subscribe(
      (data: any) => {
        this.Tablemetadata = data;
        this.getTableMeatadata_loading = false;
        this.buildCreateTableProfileForm();
      },
      error => {
        this.getTableMeatadata_loading = false
        this.buildCreateTableProfileForm();
      }
    );
    //#endregion

    //#region patchValue
    this.runCustomQueryform.patchValue({
      CustomQueryId: data.customQueryId,
      ConnectionStringId: data.connectionStringId,
      TableName: data.tableName,
      CustomQueryName: data.customQueryName,
      ChartName1: data.chartName1,
      ChartName2: data.chartName2,
      ChartName3: data.chartName3,
      ChartName4: data.chartName4,
      xAxis1: data.xAxis1,
      xAxis2: data.xAxis2,
      xAxis3: data.xAxis3,
      xAxis4: data.xAxis4,
      yAxis1: data.yAxis1,
      yAxis2: data.yAxis2,
      yAxis3: data.yAxis3,
      yAxis4: data.yAxis4,
      ChartType1: data.chartType1,
      ChartType2: data.chartType2,
      ChartType3: data.chartType3,
      ChartType4: data.chartType4,
      AddedBy: data.addedBy,
      AddedDate: data.addedDate,
      UpdatedBy: data.updatedBy,
      UpdatedDate: data.updatedDate
    });
    data.functionss.forEach((element: any, index: number) => {
      this.addFunctions();
      var func = this.runCustomQueryform.get('Functions') as FormArray
      func.controls[index].patchValue({
        Id: element.id,
        ColumnName: element.columnName,
        Function: element.function,
      })
      this.onConfirmFunction(index);
    });
    data.groupby.forEach((element: any, index: number) => {
      this.addGroupBy();
      var gropuby = this.runCustomQueryform.get('GroupBy') as FormArray
      gropuby.controls[index].patchValue({
        Id: element.id,
        ColumnName: element.columnName
      })
    });
    data.sortby.forEach((element: any, index: number) => {
      this.addSortBy();
      var sortby = this.runCustomQueryform.get('SortBy') as FormArray
      sortby.controls[index].patchValue({
        Id: element.id,
        ColumnName: element.columnName,
        SortType: element.sortType
      })
      this.onConfirmSortBy(index);
    });
    data.filterby.forEach((element: any, index: number) => {
      this.addFilterBy();
      var filterby = this.runCustomQueryform.get('FilterBy') as FormArray
      filterby.controls[index].patchValue({
        Id: element.id,
        ColumnName: element.columnName,
        FilterOperator: element.filterOperator,
        FilterValue: element.filterValue
      })
      this.onConfirmFilterBy(index);
    });

    //#endregion
    this.onSubmitRunCustomQuery()
    this.onHideAllQueriesDialog();
  }

  renderSavedCharts() {
    if (this.resultData.length > 0) {
      if (this.selectedWorkspacedata.chartType1 != null) {
        this.createChart(1, this.selectedWorkspacedata.chartName1, this.selectedWorkspacedata.chartType1, this.selectedWorkspacedata.xAxis1, this.selectedWorkspacedata.yAxis1);
      }
      if (this.selectedWorkspacedata.chartName2 != null) {
        this.createChart(2, this.selectedWorkspacedata.chartName2, this.selectedWorkspacedata.chartType2, this.selectedWorkspacedata.xAxis2, this.selectedWorkspacedata.yAxis2);
      }
      if (this.selectedWorkspacedata.chartName3 != null) {
        this.createChart(3, this.selectedWorkspacedata.chartName3, this.selectedWorkspacedata.chartType3, this.selectedWorkspacedata.xAxis3, this.selectedWorkspacedata.yAxis3);
      }
      if (this.selectedWorkspacedata.chartName4 != null) {
        this.createChart(4, this.selectedWorkspacedata.chartName4, this.selectedWorkspacedata.chartType4, this.selectedWorkspacedata.xAxis4, this.selectedWorkspacedata.yAxis4);
      }
    }
  }

  setValidatorToWorkspaceName() {
    this.runCustomQueryform.controls.CustomQueryName.enable();
    this.runCustomQueryform.controls.CustomQueryName.setValidators([Validators.required]);
    this.runCustomQueryform.controls.CustomQueryName.updateValueAndValidity();
  }

  removeValidatorToWorkspaceName() {
    this.runCustomQueryform.controls.CustomQueryName.disable();
    this.runCustomQueryform.controls.CustomQueryName.clearValidators();
    this.runCustomQueryform.controls.CustomQueryName.updateValueAndValidity();
  }

  save() {
    this.setValidatorToWorkspaceName();
    this.showSaveQueryDialog()
  }

  clieckedOnSave() {
    this.isSave = true;
    this.isSaveAs = false;
  }

  clieckedOnSaveAs() {
    this.isSave = false;
    this.isSaveAs = true;
  }

  instantSave() {
    try {
      this.setValidatorToWorkspaceName()
      this.saveChartData();
    }
    finally {
      this.removeValidatorToWorkspaceName();
    }
  }
  //#endregion

  onSelectChartType(i: number, event: Event) {
    var chartType = (<HTMLInputElement>event.target).value;
    var chartInfo = this.runCustomQueryform.get('ChartInfo') as FormArray;

    if (chartType == 'bar') {
      chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.enable(); chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.enable(); chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.enable(); chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.enable(); chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.enable(); chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.updateValueAndValidity();
    }
    else if (chartType == 'pie') {
      chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.enable(); chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.updateValueAndValidity();

      chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.disable(); chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.clearValidators(); chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.disable(); chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.clearValidators(); chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.disable(); chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.clearValidators(); chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.disable(); chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.clearValidators(); chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.updateValueAndValidity();
    }
    else if (chartType == 'line') {
      chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.enable(); chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarPieOptionsPluginsLegendLabelsColor')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.enable(); chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarOptionsScalesXTicksColor')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.enable(); chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarOptionsScalesXTicksGrid')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.enable(); chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarOptionsScalesYTicksColor')!.updateValueAndValidity();
      chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.enable(); chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.setValidators([Validators.required]); chartInfo.at(i).get('LineBarOptionsScalesYTicksGrid')!.updateValueAndValidity();
    }
    else if (chartType == 'radar') {

    }
    else if (chartType == 'doughnut') {

    }
    else if (chartType == 'polarArea') {

    }
  }

  onSelectChartYAxisInfo(chartInfoIndex: number, chartYAxisInfoIndex: number, chartType: string) {
    var _x = this.ChartInfo.at(chartInfoIndex).get('ChartYAxisInfo') as FormArray;
    console.log(_x);

    if (chartType == 'bar') {
      _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.enable(); _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.setValidators([Validators.required]); _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.enable(); _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.setValidators([Validators.required]); _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.updateValueAndValidity();

      _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.disable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.disable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.disable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.updateValueAndValidity();
    }
    else if (chartType == 'pie') {
      _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.disable(); _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.disable(); _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.disable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.disable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.disable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.updateValueAndValidity();
    }
    else if (chartType == 'line') {
      _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.enable(); _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.setValidators([Validators.required]); _x.at(chartYAxisInfoIndex).get('LineBarDatasetsLabel')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.enable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.setValidators([Validators.required]); _x.at(chartYAxisInfoIndex).get('LineDatasetsFill')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.enable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.setValidators([Validators.required]); _x.at(chartYAxisInfoIndex).get('LineDatasetsBorderColor')?.updateValueAndValidity();
      _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.enable(); _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.setValidators([Validators.required]); _x.at(chartYAxisInfoIndex).get('LineDatasetsTension')?.updateValueAndValidity();

      _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.disable(); _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.clearValidators(); _x.at(chartYAxisInfoIndex).get('BarDatasetsBackgroundColor')?.updateValueAndValidity();
    }
  }

  getDatasetKeys(data: any) {
    this.datasetKeys = Object.keys(data);
  }

}
