import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-query-output-details',
  templateUrl: './query-output-details.component.html',
  styleUrls: ['./query-output-details.component.scss']
})
export class QueryOutputDetailsComponent implements OnInit {

  queryId!: string;
  queryResults: any[] = []
  queryResults_loading = false;
  selectedResults: any[] = []

  cols: any[] = []
  exportColumns: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private analysisService: AnalysisService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRouteQueryId();
    this.cols = [
      { field: 'queryName', header: 'Query Name' },
      { field: 'querySQL', header: 'Query SQL' },
      { field: 'queryDescription', header: 'Query Description' },
      { field: 'databaseName', header: 'database Name' },
      { field: 'queryOutput', header: 'Query Output' },
      { field: 'executedBy', header: 'Executed By' },
      { field: 'queryExecutionEndDateTime', header: 'ExecutionEndDateTime' },
      { field: 'addedBy', header: 'Added By' },
      { field: 'addedDate', header: 'Added By' }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  getRouteQueryId() {
    this.route.queryParams.subscribe(params => { this.queryId = params.QueryId })
    if (this.queryId != null) {
      this.getQueryResults()
    }
  }

  getQueryResults() {
    this.queryResults_loading = true
    this.analysisService.QueryOutputDetails(this.queryId).subscribe(
      res => {
        this.queryResults = res
        
        this.queryResults_loading = false
      },
      err => {
        this.toastr.error('Failed to get Query results', '', { positionClass: 'toast-bottom-right' });
        this.queryResults_loading = false
      },
    );
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.queryResults);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "queryOutputs");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  back() {
    this.router.navigate(['/auth/analysis/query-output']);
  }

}
