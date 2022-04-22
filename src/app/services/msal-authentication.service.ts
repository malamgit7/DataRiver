import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MsalAuthenticationService {

  private readonly _destroying$ = new Subject<void>();
  role: any;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  msalBroadcastSubject() {
    return this.msalBroadcastService.msalSubject$.pipe(filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS), takeUntil(this._destroying$))
  }

  msalBroadcastInProgress() {
    // return this.msalBroadcastService.inProgress$.pipe(filter((status: InteractionStatus) => status === InteractionStatus.None), takeUntil(this._destroying$))
    return this.msalBroadcastService.inProgress$.pipe(filter((status: InteractionStatus) => status === InteractionStatus.None))
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.msalService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.msalService.instance.setActiveAccount(response.account);
          });
      } else {
        this.msalService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.msalService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.msalService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
      } else {
        this.msalService.loginRedirect();
      }
    }
  }

  logout() {
    this.msalService.logout();
  }

  isLoggedIn() {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  userName() {
    let account: any = this.msalService.instance.getActiveAccount()?.idTokenClaims
    return account['name']
  }

  userEmail() {
    let account: any = this.msalService.instance.getActiveAccount()?.idTokenClaims
    return account['preferred_username']
  }

  userRole() {
    let account: any = this.msalService.instance.getActiveAccount()?.idTokenClaims
    return account['roles'][0]
  }
}
