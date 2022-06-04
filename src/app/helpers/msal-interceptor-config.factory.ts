import { MsalInterceptorConfiguration } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";
import { protectedResources } from "../configs/msal.config";

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  //#region For DataLake API Urls
  protectedResourceMap.set(protectedResources.dataLakeApi.GetFileSystems.endpoint, protectedResources.dataLakeApi.GetFileSystems.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.CreateFileSystems.endpoint, protectedResources.dataLakeApi.CreateFileSystems.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.DeleteFileSystem.endpoint, protectedResources.dataLakeApi.DeleteFileSystem.scopes);

  protectedResourceMap.set(protectedResources.dataLakeApi.CreateDirectory.endpoint, protectedResources.dataLakeApi.CreateDirectory.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.DeleteDirectory.endpoint, protectedResources.dataLakeApi.DeleteDirectory.scopes);

  protectedResourceMap.set(protectedResources.dataLakeApi.GetBlobs.endpoint, protectedResources.dataLakeApi.GetBlobs.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.DeleteBlob.endpoint, protectedResources.dataLakeApi.DeleteBlob.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.RenameBlob.endpoint, protectedResources.dataLakeApi.RenameBlob.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.UploadFiles.endpoint, protectedResources.dataLakeApi.UploadFiles.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.DownloadBlob.endpoint, protectedResources.dataLakeApi.DownloadBlob.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.GetBlobProperties.endpoint, protectedResources.dataLakeApi.GetBlobProperties.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.LockFile.endpoint, protectedResources.dataLakeApi.LockFile.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.UnlockFile.endpoint, protectedResources.dataLakeApi.UnlockFile.scopes);
  protectedResourceMap.set(protectedResources.dataLakeApi.ViewBlob.endpoint, protectedResources.dataLakeApi.ViewBlob.scopes);
  //#endregion

  //#region For Graph API Urls
  protectedResourceMap.set(protectedResources.graphApi.GetAllUsers.endpoint, protectedResources.graphApi.GetAllUsers.scopes);
  protectedResourceMap.set(protectedResources.graphApi.GetAllGroups.endpoint, protectedResources.graphApi.GetAllGroups.scopes);
  protectedResourceMap.set(protectedResources.graphApi.GetApplications.endpoint, protectedResources.graphApi.GetApplications.scopes);
  protectedResourceMap.set(protectedResources.graphApi.GetApplicationRoles.endpoint, protectedResources.graphApi.GetApplicationRoles.scopes);
  //#endregion

  //#region  For Sql Server APi Urls
  protectedResourceMap.set(protectedResources.SqlServerApi.GetTables.endpoint, protectedResources.SqlServerApi.GetTables.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.CreateTableSchema.endpoint, protectedResources.SqlServerApi.CreateTableSchema.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.GenerateCSVFileSchema.endpoint, protectedResources.SqlServerApi.GenerateCSVFileSchema.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.CreateFileAndTableSchema.endpoint, protectedResources.SqlServerApi.CreateFileAndTableSchema.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.CheckTableAvailability.endpoint, protectedResources.SqlServerApi.CheckTableAvailability.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.ImportFileToTable.endpoint, protectedResources.SqlServerApi.ImportFileToTable.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.GetBlobSchema.endpoint, protectedResources.SqlServerApi.GetBlobSchema.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.GetDataTypeLists.endpoint, protectedResources.SqlServerApi.GetDataTypeLists.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.CreateViewDefault.endpoint, protectedResources.SqlServerApi.CreateViewDefault.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.CreateViewCustom.endpoint, protectedResources.SqlServerApi.CreateViewCustom.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.CreateExternalTableCustom.endpoint, protectedResources.SqlServerApi.CreateExternalTableCustom.scopes);
  protectedResourceMap.set(protectedResources.SqlServerApi.PreviewImportedData.endpoint, protectedResources.SqlServerApi.PreviewImportedData.scopes);
  //#endregion

  //#region For Analysis API
  protectedResourceMap.set(protectedResources.AnalysisApi.GetAllTables.endpoint, protectedResources.AnalysisApi.GetAllTables.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetSynapseDatabaseTables.endpoint, protectedResources.AnalysisApi.GetSynapseDatabaseTables.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetSynapseDatabases.endpoint, protectedResources.AnalysisApi.GetSynapseDatabases.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetTables.endpoint, protectedResources.AnalysisApi.GetTables.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetExternalTables.endpoint, protectedResources.AnalysisApi.GetExternalTables.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetViews.endpoint, protectedResources.AnalysisApi.GetViews.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetExternalTableMetadata.endpoint, protectedResources.AnalysisApi.GetExternalTableMetadata.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.CreateExternalTableProfile.endpoint, protectedResources.AnalysisApi.CreateExternalTableProfile.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetExternalTableProfiledDate.endpoint, protectedResources.AnalysisApi.GetExternalTableProfiledDate.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.ReviewProfileOutput.endpoint, protectedResources.AnalysisApi.ReviewProfileOutput.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.CreateQueries.endpoint, protectedResources.AnalysisApi.CreateQueries.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.ExecuteQuery.endpoint, protectedResources.AnalysisApi.ExecuteQuery.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.OnRowTableUpdate.endpoint, protectedResources.AnalysisApi.OnRowTableUpdate.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetQueries.endpoint, protectedResources.AnalysisApi.GetQueries.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetQueryById.endpoint, protectedResources.AnalysisApi.GetQueryById.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetQueriesByConnectionStringId.endpoint, protectedResources.AnalysisApi.GetQueriesByConnectionStringId.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.DeleteQuery.endpoint, protectedResources.AnalysisApi.DeleteQuery.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.ScheduleQuery.endpoint, protectedResources.AnalysisApi.ScheduleQuery.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.DeleteSchedule.endpoint, protectedResources.AnalysisApi.DeleteSchedule.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetScheduleDataToUpdate.endpoint, protectedResources.AnalysisApi.GetScheduleDataToUpdate.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.GetScheduleFrequency.endpoint, protectedResources.AnalysisApi.GetScheduleFrequency.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.QueryOutputs.endpoint, protectedResources.AnalysisApi.QueryOutputs.scopes);
  protectedResourceMap.set(protectedResources.AnalysisApi.QueryOutputDetails.endpoint, protectedResources.AnalysisApi.QueryOutputDetails.scopes);
  //#endregion

  //#region ConnectionMangerApi
  protectedResourceMap.set(protectedResources.ConnectionMangerApi.GetSqlConnectionStrings.endpoint, protectedResources.ConnectionMangerApi.GetSqlConnectionStrings.scopes);
  protectedResourceMap.set(protectedResources.ConnectionMangerApi.DeleteSqlConnectionString.endpoint, protectedResources.ConnectionMangerApi.DeleteSqlConnectionString.scopes);
  protectedResourceMap.set(protectedResources.ConnectionMangerApi.CreateSqlConnectionString.endpoint, protectedResources.ConnectionMangerApi.CreateSqlConnectionString.scopes);
  protectedResourceMap.set(protectedResources.ConnectionMangerApi.TestSqlConnectionString.endpoint, protectedResources.ConnectionMangerApi.TestSqlConnectionString.scopes);

  protectedResourceMap.set(protectedResources.ConnectionMangerApi.GetStorageConnectionStrings.endpoint, protectedResources.ConnectionMangerApi.GetStorageConnectionStrings.scopes);
  protectedResourceMap.set(protectedResources.ConnectionMangerApi.CreateStorageConnectionString.endpoint, protectedResources.ConnectionMangerApi.CreateStorageConnectionString.scopes);
  protectedResourceMap.set(protectedResources.ConnectionMangerApi.DeleteStorageConnectionString.endpoint, protectedResources.ConnectionMangerApi.DeleteStorageConnectionString.scopes);

  protectedResourceMap.set(protectedResources.ConnectionMangerApi.GetConnectionStringType.endpoint, protectedResources.ConnectionMangerApi.GetConnectionStringType.scopes);
  //#endregion

  //#region ReportsApi
  protectedResourceMap.set(protectedResources.ReportsApi.GetQueryOutputStatus.endpoint, protectedResources.ReportsApi.GetQueryOutputStatus.scopes);
  protectedResourceMap.set(protectedResources.ReportsApi.ExecuteCustomeQuery.endpoint, protectedResources.ReportsApi.ExecuteCustomeQuery.scopes);
  protectedResourceMap.set(protectedResources.ReportsApi.SaveCustomQuery.endpoint, protectedResources.ReportsApi.SaveCustomQuery.scopes);
  protectedResourceMap.set(protectedResources.ReportsApi.SaveAsCustomQuery.endpoint, protectedResources.ReportsApi.SaveAsCustomQuery.scopes);
  protectedResourceMap.set(protectedResources.ReportsApi.GetAllCustomQuery.endpoint, protectedResources.ReportsApi.GetAllCustomQuery.scopes);
  protectedResourceMap.set(protectedResources.ReportsApi.GetCustomQuery.endpoint, protectedResources.ReportsApi.GetCustomQuery.scopes);
  protectedResourceMap.set(protectedResources.ReportsApi.DeleteCustomQuery.endpoint, protectedResources.ReportsApi.DeleteCustomQuery.scopes);
  //#endregion

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}
