import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './sql-server.component.html',
  styleUrls: ['./sql-server.component.scss']
})
export class SqlServerComponent implements OnInit {

  constructor(public sidebarService: SideBarService) { }

  ngOnInit(): void {
  }

}
