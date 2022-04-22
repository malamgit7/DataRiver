import { Component, OnInit } from '@angular/core';
import { DataLakeService } from 'src/app/services/auth/data-lake.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  containers: any[] = []
  GetFileSystems_loading = false;

  constructor(
    private dataLakeService: DataLakeService,
  ) { }

  ngOnInit(): void {
    // this.GetFileSystems();
  }

  // GetFileSystems() {
  //   this.GetFileSystems_loading = true
  //   this.dataLakeService.GetFileSystems().subscribe(data => {
  //     this.containers = data;
  //     this.GetFileSystems_loading = false;
  //   });
  // }

}
