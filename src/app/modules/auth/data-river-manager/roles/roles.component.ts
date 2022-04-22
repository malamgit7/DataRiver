import { Component, OnInit } from '@angular/core';
import { DataRiverManagerService } from 'src/app/services/auth/data-river-manager.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: any

  constructor(
    private dataRiverManagerService: DataRiverManagerService
  ) { }

  ngOnInit(): void {
    this.dataRiverManagerService.GetApplicationRoles().subscribe(data => { this.roles = data; console.log(this.roles) })
  }

}
