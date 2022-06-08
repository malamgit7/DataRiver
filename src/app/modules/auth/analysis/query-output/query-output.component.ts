import { Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import * as FileSaver from 'file-saver';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { QueryOutput } from 'src/app/models/auth/data-analysis.model';

@Component({
  selector: 'app-query-output',
  templateUrl: './query-output.component.html',
  styleUrls: ['./query-output.component.scss']
})
export class QueryOutputComponent implements OnInit {
  queryOutputs!: QueryOutput[]
  queryOutputs_loading = false;
  selectedQueries: any[] = []

  cols: any[] = []
  exportColumns: any[] = [];

  items!: MenuItem[];
  selectedQuery: any;

  constructor(
    private analysisService: AnalysisService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.QueryOutputs()
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
    this.primengConfig.ripple = true;
    this.items = [
      { label: 'View details', icon: 'pi pi-fw pi-pencil', command: () => this.viewDetails(this.selectedQuery) },
    ];
  }

  QueryOutputs() {
    this.queryOutputs_loading = true;
    this.analysisService.QueryOutputs().subscribe(
      (res) => { this.queryOutputs = res; this.queryOutputs_loading = false; },
      err => {
        this.queryOutputs_loading = false;
        
      }
    );
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.queryOutputs);
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

  viewDetails(query: any) {
    this.router.navigate(['/auth/analysis/query-output-details'], { queryParams: { QueryId: query.queryId } });
  }

}
