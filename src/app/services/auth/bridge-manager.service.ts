import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { protectedResources } from 'src/app/configs/msal.config';
import { SqlServerConnectionStringBindingModel, StorageConnectionStringBindingModel, SynapseConnectionStringBindingModel } from 'src/app/models/auth/bridge-manager.model';

@Injectable({
  providedIn: 'root'
})
export class BridgeManagerService {

  constructor(private http: HttpClient) { }

  GetSqlConnectionStrings(): Observable<any[]> {
    const url = protectedResources.ConnectionMangerApi.GetSqlConnectionStrings.endpoint;
    return this.http.get<any[]>(url);
  }

  DeleteSqlConnectionString(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.ConnectionMangerApi.DeleteSqlConnectionString.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.delete<any[]>(url + `/${ConnectionStringId}`, options);
  }

  CreateSqlConnectionString(model: SqlServerConnectionStringBindingModel): Observable<any[]> {
    const url = protectedResources.ConnectionMangerApi.CreateSqlConnectionString.endpoint;
    return this.http.post<any[]>(url, model);
  }

  TestSqlConnectionString(model: SqlServerConnectionStringBindingModel) {
    const url = protectedResources.ConnectionMangerApi.TestSqlConnectionString.endpoint;
    return this.http.post(url, model);
  }


  GetStorageConnectionStrings(): Observable<any[]> {
    const url = protectedResources.ConnectionMangerApi.GetStorageConnectionStrings.endpoint;
    return this.http.get<any[]>(url);
  }

  CreateStorageConnectionString(model: StorageConnectionStringBindingModel): Observable<any[]> {
    const url = protectedResources.ConnectionMangerApi.CreateStorageConnectionString.endpoint;
    return this.http.post<any[]>(url, model);
  }

  DeleteStorageConnectionString(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.ConnectionMangerApi.DeleteStorageConnectionString.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.delete<any[]>(url + `/${ConnectionStringId}`, options);
  }

  GetConnectionStringType(): Observable<any[]> {
    const url = protectedResources.ConnectionMangerApi.GetConnectionStringType.endpoint;
    return this.http.get<any[]>(url);
  }

}
