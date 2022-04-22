import { Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/auth/analysis.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-all-views',
  templateUrl: './all-views.component.html',
  styleUrls: ['./all-views.component.scss']
})
export class AllViewsComponent implements OnInit {

  databaseName = 'Database Name...'
  default_select = null

  connectionString_loading = false
  connectionStrings: any[] = []
  connectionStringId_Next!: string;

  GetDatabase_loading = false;
  synapseDatabases: any[] = []
  database_Next!: string;

  views_loading = false;
  Views: any[] = []

  constructor(
    public sidebarService: SideBarService,
    private bridgeManagerService: BridgeManagerService,
    private analysisService: AnalysisService
  ) { }

  ngOnInit(): void {
    this.GetSynapseConnectionStrings()
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

  onSelectConnectionString(event: Event) {
    this.Views = [];
    this.databaseName = 'Database Name...';
    this.connectionStringId_Next = (<HTMLInputElement>event.target).value;
    this.databaseName = this.connectionStrings.find(x => x.connectionStringId == this.connectionStringId_Next).databaseName;
    this.getViews()
  }


  getViews() {
    this.views_loading = true;
    this.analysisService.GetViews(this.connectionStringId_Next).subscribe(
      res => { this.Views = res; this.views_loading = false; console.log(res); },
      err => { this.views_loading = false; }
    );
  }

}
