import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataRiverManagerService } from 'src/app/services/auth/data-river-manager.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: any

  constructor(
    private dataRiverManagerService: DataRiverManagerService
  ) { }

  ngOnInit(): void {
    this.GetAllGroups()
  }

  GetAllGroups() {
    this.dataRiverManagerService.GetAllGroups().subscribe(data => {
      this.groups = data;
      
    });
  }

}
