// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  lang: 'ru',
  baseApiUrl: 'http://localhost:7777/api',
  defaultGeoPosition: {
    latitude: 55.75184939,
    longitude: 37.62817383
  },
  nearGeoCoordinateMaxDelta: 0.000002 ,

  maxUploadPictureSize: 7340032,
  maxUploadPictureSizeLabel: '7M',
  uploadPictureAllowedMimeTypes: ['image/jpeg', 'image/png'],

  clientCommonInfoInterval: 10000,
  adminCommonInfoInterval: 10000,
  companyCommonInfoInterval: 10000,

  serviceTypeColors: {
    electrosnab: '#390BDA',
    gasosnab: '#95F600',
    vodootvedenie: '#9100f6',
    gorvodsnab: '#C201D6',
    holvodsnab: '#d6009f',
    otoplenie: '#23c2e2',
    lift: '#4d8a3f',
    tvcomothody: '#827512',
    ventilazia: '#064d64',
    domofon: '#d27dbe',
    dorogi: '#548775',
    molnezashita: '#f3d16b',
    pozharobezopasnost: '#fe0011',
    sostojaniezdaniy: '#00fed0',
    uborkamest: '#fec000',
    uborkauliz: '#005187',
    others: '#cccccc'
  },

  monthNames: {
    en: [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
  },

  statisticColorValueSchema: ['#0075ff', '#0f0', 'yellow', 'red'],
  statisticsColorFederalDistrictMaxIssueNumber: 100,
  statisticsColorRegionMaxIssueNumber: 10,

  statisticsColorIssueMaxPopularityValue: 100,

  statisticsStartYear: 2018
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
