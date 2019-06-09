export const environment = {
  production: true,
  baseApiUrl: '/api',
  lang: 'ru',
  defaultGeoPosition: {
    latitude: 55.75184939,
    longitude: 37.62817383
  },
  nearGeoCoordinateMaxDelta: 0.000002 ,

  maxUploadPictureSize: 5242880,
  maxUploadPictureSizeLabel: '5M',
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