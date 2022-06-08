import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
  auth: {
    clientId: environment.clientId, // This is the ONLY mandatory field that you need to supply.
    authority: environment.authority, // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: environment.redirectUri, // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    postLogoutRedirectUri: environment.postLogoutRedirectUri,
    navigateToLoginRequestUrl: environment.navigateToLoginRequestUrl
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
}

export const protectedResources = {

  dataLakeApi: {
    GetFileSystems: { endpoint: environment.apiUrl + "/DataLake/GetFileSystems", scopes: [environment.scopes_1] },
    CreateFileSystems: { endpoint: environment.apiUrl + "/DataLake/CreateFileSystem", scopes: [environment.scopes_1] },
    DeleteFileSystem: { endpoint: environment.apiUrl + "/DataLake/DeleteFileSystem", scopes: [environment.scopes_1] },

    CreateDirectory: { endpoint: environment.apiUrl + "/DataLake/CreateDirectory", scopes: [environment.scopes_1] },
    DeleteDirectory: { endpoint: environment.apiUrl + "/DataLake/DeleteDirectory", scopes: [environment.scopes_1] },

    GetBlobs: { endpoint: environment.apiUrl + "/DataLake/GetBlobs", scopes: [environment.scopes_1] },

    ViewBlob: { endpoint: environment.apiUrl + "/DataLake/ViewBlob", scopes: [environment.scopes_1] },
    EditBlob: { endpoint: environment.apiUrl + "/DataLake/EditBlob", scopes: [environment.scopes_1] },
    CopyBlob: { endpoint: environment.apiUrl + "/DataLake/CopyBlob", scopes: [environment.scopes_1] },
    RenameBlob: { endpoint: environment.apiUrl + "/DataLake/RenameBlob", scopes: [environment.scopes_1] },
    UploadFiles: { endpoint: environment.apiUrl + "/DataLake/UploadFiles", scopes: [environment.scopes_1] },
    DownloadBlob: { endpoint: environment.apiUrl + "/DataLake/DownloadBlob", scopes: [environment.scopes_1] },
    GetBlobProperties: { endpoint: environment.apiUrl + "/DataLake/GetBlobProperties", scopes: [environment.scopes_1] },
    DeleteBlob: { endpoint: environment.apiUrl + "/DataLake/DeleteBlob", scopes: [environment.scopes_1] },
    LockFile: { endpoint: environment.apiUrl + "/DataLake/LockFile", scopes: [environment.scopes_1] },
    UnlockFile: { endpoint: environment.apiUrl + "/DataLake/UnlockFile", scopes: [environment.scopes_1] }

  },

  graphApi: {
    GetAllUsers: { endpoint: environment.apiUrl + "/Graph/GetAllUsers", scopes: [environment.scopes_1] },
    GetAllGroups: { endpoint: environment.apiUrl + "/Graph/GetAllGroups", scopes: [environment.scopes_1] },
    GetApplications: { endpoint: environment.apiUrl + "/Graph/GetApplications", scopes: [environment.scopes_1] },
    GetApplicationRoles: { endpoint: environment.apiUrl + "/Graph/GetApplicationRoles", scopes: [environment.scopes_1] }
  },

  SqlServerApi: {
    GetTables: { endpoint: environment.apiUrl + "/SqlServer/GetTables", scopes: [environment.scopes_1] },
    CreateTableSchema: { endpoint: environment.apiUrl + "/SqlServer/CreateTableSchema", scopes: [environment.scopes_1] },
    GenerateCSVFileSchema: { endpoint: environment.apiUrl + "/SqlServer/GenerateCSVFileSchema", scopes: [environment.scopes_1] },
    CreateFileAndTableSchema: { endpoint: environment.apiUrl + "/SqlServer/CreateFileAndTableSchema", scopes: [environment.scopes_1] },
    CheckTableAvailability: { endpoint: environment.apiUrl + "/SqlServer/CheckTableAvailability", scopes: [environment.scopes_1] },
    ImportFileToTable: { endpoint: environment.apiUrl + "/SqlServer/ImportFileToTable", scopes: [environment.scopes_1] },
    GetBlobSchema: { endpoint: environment.apiUrl + "/SqlServer/GetBlobSchema", scopes: [environment.scopes_1] },
    GetDataTypeLists: { endpoint: environment.apiUrl + "/SqlServer/GetDataTypeLists", scopes: [environment.scopes_1] },
    CreateViewDefault: { endpoint: environment.apiUrl + "/SqlServer/CreateViewDefault", scopes: [environment.scopes_1] },
    CreateViewCustom: { endpoint: environment.apiUrl + "/SqlServer/CreateViewCustom", scopes: [environment.scopes_1] },
    PreviewImportedData: { endpoint: environment.apiUrl + "/SqlServer/PreviewImportedData", scopes: [environment.scopes_1] },

    CreateExternalTableCustom: { endpoint: environment.apiUrl + "/SqlServer/CreateExternalTableCustom", scopes: [environment.scopes_1] },
  },

  AnalysisApi: {
    GetAllTables: { endpoint: environment.apiUrl + "/Analysis/GetAllTables", scopes: [environment.scopes_1] },

    GetSynapseDatabaseTables: { endpoint: environment.apiUrl + "/Analysis/GetSynapseDatabaseTables", scopes: [environment.scopes_1] },
    GetSynapseDatabases: { endpoint: environment.apiUrl + "/Analysis/GetSynapseDatabases", scopes: [environment.scopes_1] },
    GetTables: { endpoint: environment.apiUrl + "/Analysis/GetTables", scopes: [environment.scopes_1] },
    GetExternalTables: { endpoint: environment.apiUrl + "/Analysis/GetExternalTables", scopes: [environment.scopes_1] },
    GetViews: { endpoint: environment.apiUrl + "/Analysis/GetViews", scopes: [environment.scopes_1] },
    GetExternalTableMetadata: { endpoint: environment.apiUrl + "/Analysis/GetExternalTableMetadata", scopes: [environment.scopes_1] },
    CreateExternalTableProfile: { endpoint: environment.apiUrl + "/Analysis/CreateExternalTableProfile", scopes: [environment.scopes_1] },
    GetExternalTableProfiledDate: { endpoint: environment.apiUrl + "/Analysis/GetExternalTableProfiledDate", scopes: [environment.scopes_1] },
    ReviewProfileOutput: { endpoint: environment.apiUrl + "/Analysis/ReviewProfileOutput", scopes: [environment.scopes_1] },
    CreateQueries: { endpoint: environment.apiUrl + "/Analysis/CreateQueries", scopes: [environment.scopes_1] },
    ExecuteQuery: { endpoint: environment.apiUrl + "/Analysis/RunSqlQuery", scopes: [environment.scopes_1] },
    OnRowTableUpdate: { endpoint: environment.apiUrl + "/Analysis/OnRowTableUpdate", scopes: [environment.scopes_1] },
    GetQueries: { endpoint: environment.apiUrl + "/Analysis/GetQueries", scopes: [environment.scopes_1] },
    GetQueryById: { endpoint: environment.apiUrl + "/Analysis/GetQueryById", scopes: [environment.scopes_1] },
    GetQueriesByConnectionStringId: { endpoint: environment.apiUrl + "/Analysis/GetQueriesByConnectionStringId", scopes: [environment.scopes_1] },
    DeleteQuery: { endpoint: environment.apiUrl + "/Analysis/DeleteQuery", scopes: [environment.scopes_1] },
    ScheduleQuery: { endpoint: environment.apiUrl + "/Analysis/ScheduleQuery", scopes: [environment.scopes_1] },
    DeleteSchedule: { endpoint: environment.apiUrl + "/Analysis/DeleteSchedule", scopes: [environment.scopes_1] },
    GetScheduleDataToUpdate: { endpoint: environment.apiUrl + "/Analysis/GetScheduleDataToUpdate", scopes: [environment.scopes_1] },
    GetScheduleFrequency: { endpoint: environment.apiUrl + "/Analysis/GetScheduleFrequency", scopes: [environment.scopes_1] },
    QueryOutputs: { endpoint: environment.apiUrl + "/Analysis/QueryOutputs", scopes: [environment.scopes_1] },
    QueryOutputDetails: { endpoint: environment.apiUrl + "/Analysis/QueryOutputDetails", scopes: [environment.scopes_1] },
  },

  ConnectionMangerApi: {
    GetSqlConnectionStrings: { endpoint: environment.apiUrl + "/ConnectionManger/GetSqlConnectionStrings", scopes: [environment.scopes_1] },
    DeleteSqlConnectionString: { endpoint: environment.apiUrl + "/ConnectionManger/DeleteSqlConnectionString", scopes: [environment.scopes_1] },
    CreateSqlConnectionString: { endpoint: environment.apiUrl + "/ConnectionManger/CreateSqlConnectionString", scopes: [environment.scopes_1] },
    TestSqlConnectionString: { endpoint: environment.apiUrl + "/ConnectionManger/TestSqlConnectionString", scopes: [environment.scopes_1] },

    GetStorageConnectionStrings: { endpoint: environment.apiUrl + "/ConnectionManger/GetStorageConnectionStrings", scopes: [environment.scopes_1] },
    CreateStorageConnectionString: { endpoint: environment.apiUrl + "/ConnectionManger/CreateStorageConnectionString", scopes: [environment.scopes_1] },
    DeleteStorageConnectionString: { endpoint: environment.apiUrl + "/ConnectionManger/DeleteStorageConnectionString", scopes: [environment.scopes_1] },

    GetConnectionStringType: { endpoint: environment.apiUrl + "/ConnectionManger/GetConnectionStringType", scopes: [environment.scopes_1] },
  },

  ReportsApi: {
    GetQueryOutputStatus: { endpoint: environment.apiUrl + "/Reports/GetQueryOutputStatus", scopes: [environment.scopes_1] },
    ExecuteCustomeQuery: { endpoint: environment.apiUrl + "/Reports/ExecuteCustomeQuery", scopes: [environment.scopes_1] },
    SaveCustomQuery: { endpoint: environment.apiUrl + "/Reports/SaveCustomQuery", scopes: [environment.scopes_1] },
    SaveAsCustomQuery: { endpoint: environment.apiUrl + "/Reports/SaveAsCustomQuery", scopes: [environment.scopes_1] },
    GetAllCustomQuery: { endpoint: environment.apiUrl + "/Reports/GetAllCustomQuery", scopes: [environment.scopes_1] },
    GetCustomQuery: { endpoint: environment.apiUrl + "/Reports/GetCustomQuery", scopes: [environment.scopes_1] },
    DeleteCustomQuery: { endpoint: environment.apiUrl + "/Reports/DeleteCustomQuery", scopes: [environment.scopes_1] },
  }
}

export const loginRequest = {
  scopes: ["openid", "profile"],
  loginHint: "example@domain.net"
};
