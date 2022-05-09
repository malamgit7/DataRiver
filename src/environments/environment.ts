// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44397/api',
  // apiUrl: 'https://datariverapi.azurewebsites.net/api',
  clientId: 'ee26429c-3bcd-4cea-b0fe-d3a1d4138150',
  authority: 'https://login.microsoftonline.com/01b8ec26-acec-4852-a6cd-d2f6b7a9b9da',
  redirectUri: 'http://localhost:4200/auth',
  postLogoutRedirectUri: 'http://localhost:4200',
  navigateToLoginRequestUrl: true,
  scopes_1: 'api://e5633ce3-f694-4013-85ad-434add81f032/access_as_user'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
