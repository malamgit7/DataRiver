import { Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-all-external-tables',
  templateUrl: './all-external-tables.component.html',
  styleUrls: ['./all-external-tables.component.scss']
})
export class AllExternalTablesComponent implements OnInit {

  default_select = null

  connectionString_loading = false
  connectionStrings: any[] = []
  connectionString_Next!: string;

  GetDatabase_loading = false;
  synapseDatabases: any[] = []
  database_Next!: string;

  externalTable_loading = false;
  ExternalTables: any[] = []

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
    this.ExternalTables = [];
    this.databaseName = 'Database Name...';
    var connectionStringId = (<HTMLInputElement>event.target).value;
    this.databaseName = this.connectionStrings.find(x => x.connectionStringId == connectionStringId).databaseName;
    this.getExternalTable(connectionStringId);
  }

  getExternalTable(connectionStringId: string) {
    this.externalTable_loading = true;
    this.analysisService.GetExternalTables(connectionStringId).subscribe(
      res => { this.ExternalTables = res; this.externalTable_loading = false; console.log(res); },
      err => { this.externalTable_loading = false; }
    );
  }

}
