// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:7777/api',
  defaultGeoPosition: {
    latitude: 55.75184939,
    longitude: 37.62817383
  },
  maxUploadPictureSize: 5242880,
  maxUploadPictureSizeLabel: '5M',
  uploadPictureAllowedMimeTypes: ['image/jpeg', 'image/png'],

  clientCommonInfoInterval: 10000,
  adminCommonInfoInterval: 10000,
  companyCommonInfoInterval: 10000,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
