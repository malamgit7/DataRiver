import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { protectedResources } from 'src/app/configs/msal.config';
import { CustomQueryBindingModel, SaveCustomQueryBindingModel } from 'src/app/models/auth/reports.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getJsonData() {
    return this.http.get('data/reports_dropdown.json');
  }

  GetQueryOutputStatus(startDate: string, endDate: string): Observable<any[]> {
    const url = protectedResources.ReportsApi.GetQueryOutputStatus.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('startDate', startDate)
        .append('endDate', endDate)
    }
    return this.http.get<any[]>(url, options)
  }

  ExecuteCustomeQuery(query: CustomQueryBindingModel): Observable<any[]> {
    const url = protectedResources.ReportsApi.ExecuteCustomeQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.post<any[]>(url, query, options)
  }

  SaveCustomQuery(model: SaveCustomQueryBindingModel): Observable<any[]> {
    const url = protectedResources.ReportsApi.SaveCustomQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.post<any[]>(url, model, options)
  }

  SaveAsCustomQuery(model: SaveCustomQueryBindingModel): Observable<any[]> {
    const url = protectedResources.ReportsApi.SaveAsCustomQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.post<any[]>(url, model, options)
  }

  GetAllCustomQuery(): Observable<any[]> {
    const url = protectedResources.ReportsApi.GetAllCustomQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.get<any[]>(url, options)
  }

  GetCustomQuery(customQueryId: string): Observable<any[]> {
    const url = protectedResources.ReportsApi.GetCustomQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('customQueryId', customQueryId)
    }
    return this.http.get<any[]>(url, options)
  }

  DeleteCustomQuery(customQueryId: string): Observable<any[]> {
    const url = protectedResources.ReportsApi.DeleteCustomQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('customQueryId', customQueryId)
    }
    return this.http.delete<any[]>(url, options)
  }
}
