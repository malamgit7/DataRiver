import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    public sidebarService: SideBarService
  ) { }

  ngOnInit(): void {
  }

}
