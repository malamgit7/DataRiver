import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { protectedResources } from 'src/app/configs/msal.config';

@Injectable({
  providedIn: 'root'
})
export class DataRiverManagerService {

  constructor(private http: HttpClient) { }

  GetAllGroups() {
    const url = protectedResources.graphApi.GetAllGroups.endpoint
    return this.http.get(url);
  }

  GetAllUsers() {
    const url = protectedResources.graphApi.GetAllUsers.endpoint
    return this.http.get(url);
  }

  GetApplications() {
    const url = protectedResources.graphApi.GetApplications.endpoint
    return this.http.get(url);
  }

  GetApplicationRoles() {
    const url = protectedResources.graphApi.GetApplicationRoles.endpoint
    return this.http.get(url);
  }
}
