import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { protectedResources } from 'src/app/configs/msal.config';
import { Blobs, BlobSchema, CheckBlobSchema, Containers, CreateDefaultViewBindingModel, CreateExternalTableBinding, CreateFileAndTableSchemaBindingModel, CreateViewBinding, DataTypes } from 'src/app/models/auth/data-analysis.model';
import { ImportFileToTableBindingModel } from 'src/app/models/auth/sql-server.model';

@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {

  constructor(private http: HttpClient) { }

  GetTables(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.SqlServerApi.GetTables.endpoint
    return this.http.get<any[]>(url + `/${ConnectionStringId}`);
  }

  CreateTableSchema(ConnectionStringId: string, TableName: string): Observable<any> {
    const url = protectedResources.SqlServerApi.CreateTableSchema.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('TableName', TableName)
    }
    return this.http.get<any>(url, options);
  }

  GenerateCSVFileSchema(formData: any): Observable<any[]> {
    const url = protectedResources.SqlServerApi.GenerateCSVFileSchema.endpoint;
    return this.http.post<any[]>(url, formData);
  }

  CreateFileAndTableSchema(formData: any): Observable<any[]> {
    const url = protectedResources.SqlServerApi.CreateFileAndTableSchema.endpoint;
    return this.http.post<any[]>(url, formData);
  }

  CheckTableAvailability(ConnectionStringId: string, SchemaName: string, TableName: string): Observable<any> {
    const url = protectedResources.SqlServerApi.CheckTableAvailability.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('SchemaName', SchemaName)
        .append('TableName', TableName)
    }
    return this.http.get<any>(url, options);
  }

  ImportFileToTable(formData: any) {
    const url = protectedResources.SqlServerApi.ImportFileToTable.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post(url, formData);
  }

  GetDataTypeLists(): Observable<DataTypes[]> {
    const url = protectedResources.SqlServerApi.GetDataTypeLists.endpoint
    return this.http.get<DataTypes[]>(url);
  }

  GetFileSystems(ConnectionStringId: string): Observable<any[]> {
    const url = protectedResources.dataLakeApi.GetFileSystems.endpoint
    return this.http.get<any[]>(url + `/${ConnectionStringId}`);
  }

  GetBlobs(ConnectionStringId: string, FileSystem: string, Path: any = null): Observable<any[]> {
    const url = protectedResources.dataLakeApi.GetBlobs.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
      // .append('Path', Path)
    }
    return this.http.get<any[]>(url, options);
  }

  GetBlobSchema(checkBlobSchema: CheckBlobSchema): Observable<BlobSchema[]> {
    const url = protectedResources.SqlServerApi.GetBlobSchema.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post<BlobSchema[]>(url, checkBlobSchema, options)
  }

  CreateView(createViewBinding: CreateViewBinding) {
    const url = protectedResources.SqlServerApi.CreateViewCustom.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post(url, createViewBinding, { responseType: 'text' })
  }

  CreateExternalTableCustom(createExternalTableBinding: CreateExternalTableBinding) {
    const url = protectedResources.SqlServerApi.CreateExternalTableCustom.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post(url, createExternalTableBinding, { responseType: 'text' })
  }

  PreviewImportedData(ConnectionStringId: string, TableName: string, row_count: number): Observable<any> {
    const url = protectedResources.SqlServerApi.PreviewImportedData.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('TableName', TableName)
        .append('row_count', row_count)
    }
    return this.http.get<any>(url, options);
  }
}
