import { Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-all-tables',
  templateUrl: './all-tables.component.html',
  styleUrls: ['./all-tables.component.scss']
})
export class AllTablesComponent implements OnInit {

  default_select = null

  connectionString_loading = false
  connectionStrings: any[] = []
  connectionString_Next!: string;

  GetDatabase_loading = false;
  synapseDatabases: any[] = []
  database_Next!: string;

  Table_loading = false;
  Tables: any[] = []

  databaseName: string = 'Database Name...';

  constructor(
    public sidebarService: SideBarService,
    private bridgeManagerService: BridgeManagerService,
    private analysisService: AnalysisService
  ) { }

  ngOnInit(): void {
    this.GetSynapseConnectionStrings();
  }

  GetSynapseConnectionStrings() {
    this.connectionString_loading = true;
    this.bridgeManagerService.GetSqlConnectionStrings().subscribe(
      (res) => {
        this.connectionStrings = res;
        this.connectionString_loading = false;
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.connectionString_loading = false;
      }
    );
  }

  onSelectConnectionString(event: any) {
    this.Tables = [];
    this.databaseName = 'Database Name...';
    var connectionStringId = (<HTMLInputElement>event.target).value;
    this.databaseName = this.connectionStrings.find(x => x.connectionStringId == connectionStringId).databaseName;
    this.GetTables(connectionStringId);
  }

  GetTables(connectionStringId: string) {
    this.Table_loading = true;
    this.analysisService.GetTables(connectionStringId).subscribe(
      res => { this.Tables = res; this.Table_loading = false; console.log(res); },
      err => { this.Table_loading = false; }
    );
  }

}
