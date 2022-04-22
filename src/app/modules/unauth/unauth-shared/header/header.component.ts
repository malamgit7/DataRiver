import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private readonly _destroying$ = new Subject<void>();

  constructor(private msalAuthenticationService: MsalAuthenticationService) { }

  ngOnInit(): void {
  }

  login() {
    this.msalAuthenticationService.login()
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
