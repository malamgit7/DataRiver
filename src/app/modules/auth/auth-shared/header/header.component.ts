import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Subject } from 'rxjs';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private readonly _destroying$ = new Subject<void>();
  userName!: string;
  userRole!: string
  userEmail!: string;

  dataSource: any = [];
  name: any;

  constructor(
    private msalAuthenticationService: MsalAuthenticationService,
    public sidebarService: SideBarService
  ) { }

  ngOnInit(): void {
    this.userName = this.msalAuthenticationService.userName()
    this.userEmail = this.msalAuthenticationService.userEmail()
    this.userRole = this.msalAuthenticationService.userRole();
  }

  logout() {
    this.msalAuthenticationService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
