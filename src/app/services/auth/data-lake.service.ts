import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { protectedResources } from 'src/app/configs/msal.config';
import { CreateDefaultViewBindingModel } from 'src/app/models/auth/data-analysis.model';
import { CreateDirectoryModel, CreateFileSystemModel, RenameBlobModel } from 'src/app/models/auth/data-lake.model';

@Injectable({
  providedIn: 'root'
})
export class DataLakeService {

  constructor(private http: HttpClient) { }

  CreateFileSystem(createFileSystemModel: CreateFileSystemModel) {
    const url = protectedResources.dataLakeApi.CreateFileSystems.endpoint
    return this.http.post(url, createFileSystemModel)
  }

  GetFileSystems(ConnectionStringId: string): Observable<any> {
    const url = protectedResources.dataLakeApi.GetFileSystems.endpoint
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
    }
    return this.http.get(url, options);
  }

  DeleteFileSystems(ConnectionStringId: string, FileSystem: string) {
    const url = protectedResources.dataLakeApi.DeleteFileSystem.endpoint
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
    }
    return this.http.delete(url, options);
  }

  CreateDirectory(createDirectoryModel: CreateDirectoryModel) {
    const url = protectedResources.dataLakeApi.CreateDirectory.endpoint
    return this.http.post(url, createDirectoryModel)
  }

  RenameBlob(renameBlobModel: RenameBlobModel) {
    const url = protectedResources.dataLakeApi.RenameBlob.endpoint
    return this.http.post(url, renameBlobModel)
  }

  DeleteDirectory(ConnectionStringId: string, FileSystem: string, Path_Directory: string) {
    const url = protectedResources.dataLakeApi.DeleteDirectory.endpoint
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
        .append('Path_Directory', Path_Directory)
    }
    return this.http.delete(url, options);
  }

  GetBlobs(ConnectionStringId: string, FileSystem: string, Path: any = null) {
    const url = protectedResources.dataLakeApi.GetBlobs.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
      // .append('Path', Path)
    }
    return this.http.get(url, options);
  }

  UploadFiles(formData: any, ConnectionStringId: string, FileSystem: string) {
    const url = protectedResources.dataLakeApi.UploadFiles.endpoint;
    console.log(ConnectionStringId, FileSystem)
    const options: Object = {
      // headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
      ,
      reportProgress: true,
      observe: 'events'
    }

    return this.http.post(url, formData, options);
  }

  DownloadBlob(ConnectionStringId: string, FileSystem: string, Path_Blob: string): Observable<any> {
    const url = protectedResources.dataLakeApi.DownloadBlob.endpoint;
    const options: Object = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
        .append('Path_Blob', Path_Blob),
      responseType: 'blob',
      observe: 'response'
    }
    return this.http.get<any>(url, options);
  }

  DeleteBlob(ConnectionStringId: string, FileSystem: string, Path_Blob: string) {
    const url = protectedResources.dataLakeApi.DeleteBlob.endpoint;
    const options = {
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
        .append('Path_Blob', Path_Blob)
    }
    return this.http.delete(url, options);
  }

  GetBlobProperties(ConnectionStringId: string, FileSystem: string, Path_Blob: string) {
    const url = protectedResources.dataLakeApi.GetBlobProperties.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
        .append('Path_Blob', Path_Blob)
    }
    return this.http.get(url, options);
  }

  LockFile(ConnectionStringId: string, FileSystem: string, Path_Blob: string) {
    const url = protectedResources.dataLakeApi.LockFile.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
        .append('Path_Blob', Path_Blob)
    }
    return this.http.get(url, options);
  }

  UnlockFile(ConnectionStringId: string, FileSystem: string, Path_Blob: string) {
    const url = protectedResources.dataLakeApi.UnlockFile.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
        .append('Path_Blob', Path_Blob)
    }
    return this.http.get(url, options);
  }

  ViewBlob(ConnectionStringId: string, FileSystem: string, Path_Blob: string) {
    const url = protectedResources.dataLakeApi.ViewBlob.endpoint;
    const options: Object = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('ConnectionStringId', ConnectionStringId)
        .append('FileSystem', FileSystem)
        .append('Path_Blob', Path_Blob),
      responseType: 'blob',
      observe: 'response'
    }
    return this.http.get(url, options);
  }

  CreateViewDefault(model: CreateDefaultViewBindingModel) {
    const url = protectedResources.SqlServerApi.CreateViewDefault.endpoint;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post(url, model, { responseType: 'text' })
  }
}
