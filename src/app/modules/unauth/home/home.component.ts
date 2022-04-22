import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private msalAuthenticationService: MsalAuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (this.msalAuthenticationService.isLoggedIn()) {
      this.router.navigate(['auth']);
    }
  }

}
