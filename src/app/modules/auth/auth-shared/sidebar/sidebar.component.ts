import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public sidebarService: SideBarService
  ) { }

  ngOnInit(): void {

  }

  getSidebarState() {
    if (this.sidebarService.hideSideNav) {
      this.sidebarService.toggleSideNav();
    }
  }

}
