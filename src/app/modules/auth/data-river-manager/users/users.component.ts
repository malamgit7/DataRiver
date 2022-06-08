import { Component, OnInit } from '@angular/core';
import { DataRiverManagerService } from 'src/app/services/auth/data-river-manager.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any

  constructor(
    private dataRiverManagerService: DataRiverManagerService
  ) { }

  ngOnInit(): void {
    this.GetAllUsers()
  }

  GetAllUsers() {
    this.dataRiverManagerService.GetAllUsers().subscribe(data => { this.users=data; });
  }

}
