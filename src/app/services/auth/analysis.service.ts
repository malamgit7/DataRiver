import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { protectedResources } from 'src/app/configs/msal.config';
import { CreateQueriesBindingModel, ExecuteQueryBindingModel, ExternalTableInfo, ExternalTableinfoBindingModel, EXternalTableProfile, ExternalTableProfileBindingModel, Queries, QueryOutput, QueryScheduleBindingModel, ReviewProfileOutputBindingModel, SynapseDatabases, SynapseExternalTable, TableRowUpdateBindingModel } from 'src/app/models/auth/data-analysis.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }

  GetAllTables(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.AnalysisApi.GetAllTables.endpoint
    return this.http.get<any[]>(url + `/${ConnectionStringId}`);
  }

  GetSynapseDatabaseTables(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.AnalysisApi.GetSynapseDatabaseTables.endpoint
    return this.http.get<any[]>(url + `/${ConnectionStringId}`);
  }

  GetSynapseDatabases(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.AnalysisApi.GetSynapseDatabases.endpoint
    return this.http.get<any[]>(url + `/${ConnectionStringId}`);
  }

  GetTables(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.AnalysisApi.GetTables.endpoint;
    return this.http.get<any[]>(url + `/${ConnectionStringId}`);
  }

  GetExternalTables(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.AnalysisApi.GetExternalTables.endpoint;
    return this.http.get<any[]>(url + `/${ConnectionStringId}`);
  }

  GetViews(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.AnalysisApi.GetViews.endpoint;
    return this.http.get<any[]>(url + `/${ConnectionStringId}`);
  }


  GetExternalTableMetadata(externalTableinfoBindingModel: ExternalTableinfoBindingModel): Observable<ExternalTableInfo[]> {
    const url = protectedResources.AnalysisApi.GetExternalTableMetadata.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post<ExternalTableInfo[]>(url, externalTableinfoBindingModel, options)
  }

  CreateExternalTableProfile(externalTableProfileBindingModel: ExternalTableProfileBindingModel): Observable<any[]> {
    const url = protectedResources.AnalysisApi.CreateExternalTableProfile.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post<any[]>(url, externalTableProfileBindingModel, options)
  }

  GetExternalTableProfiledDate(DatabaseName: string, ExternalTableName: string): Observable<any[]> {
    const url = protectedResources.AnalysisApi.GetExternalTableProfiledDate.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('DatabaseName', DatabaseName)
        .append('ExternalTableName', ExternalTableName)
    }
    return this.http.get<any[]>(url, options)
  }

  ReviewProfileOutput(reviewProfileOutputBindingModel: ReviewProfileOutputBindingModel): Observable<any[]> {
    const url = protectedResources.AnalysisApi.ReviewProfileOutput.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post<any[]>(url, reviewProfileOutputBindingModel, options)
  }

  CreateQueries(createQueriesBindingModel: CreateQueriesBindingModel): Observable<any[]> {
    const url = protectedResources.AnalysisApi.CreateQueries.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post<any[]>(url, createQueriesBindingModel, options)
  }

  ExecuteQuery(executeQueryBindingModel: ExecuteQueryBindingModel): Observable<any[]> {
    const url = protectedResources.AnalysisApi.ExecuteQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post<any[]>(url, executeQueryBindingModel, options)
  }

  OnRowTableUpdate(tableRowUpdateBindingModel: TableRowUpdateBindingModel): Observable<any[]> {
    const url = protectedResources.AnalysisApi.OnRowTableUpdate.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post<any[]>(url, tableRowUpdateBindingModel, options)
  }

  GetQueries(): Observable<Queries[]> {
    const url = protectedResources.AnalysisApi.GetQueries.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.get<Queries[]>(url, options)
  }

  GetQueryById(QueryId: string): Observable<Queries[]> {
    const url = protectedResources.AnalysisApi.GetQueryById.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.get<Queries[]>(url + `/${QueryId}`, options)
  }

  DeleteQuery(QueryId: string): Observable<Queries[]> {
    const url = protectedResources.AnalysisApi.DeleteQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.delete<Queries[]>(url + `/${QueryId}`, options)
  }

  ScheduleQuery(queryScheduleBindingModel: QueryScheduleBindingModel) {
    const url = protectedResources.AnalysisApi.ScheduleQuery.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post(url, queryScheduleBindingModel, options)
  }

  GetScheduleDataToUpdate(QueryId: string) {
    const url = protectedResources.AnalysisApi.GetScheduleDataToUpdate.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams().append('QueryId', QueryId)
    }
    return this.http.get(url, options)
  }

  DeleteSchedule(QueryId: string) {
    const url = protectedResources.AnalysisApi.DeleteSchedule.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.delete(url + `/${QueryId}`, options)
  }

  GetScheduleFrequency(): Observable<any[]> {
    const url = protectedResources.AnalysisApi.GetScheduleFrequency.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.get<any[]>(url, options)
  }

  QueryOutputs(): Observable<QueryOutput[]> {
    const url = protectedResources.AnalysisApi.QueryOutputs.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.get<QueryOutput[]>(url, options)
  }

  // QueryOutputs(): Observable<any> {
  //   const url = protectedResources.AnalysisApi.QueryOutputs.endpoint;
  //   const options = {
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   }
  //   return this.http.get<any[]>(url, options)
  // }

  QueryOutputDetails(QueryId: string): Observable<any> {
    const url = protectedResources.AnalysisApi.QueryOutputDetails.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams().append('QueryId', QueryId)
    }
    return this.http.get<any[]>(url, options)
  }
}
