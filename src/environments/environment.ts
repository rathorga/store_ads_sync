// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'API KEY HERE',
    authDomain: 'store-ads-staging.firebaseapp.com',
    databaseURL: 'https://store-ads-staging.firebaseio.com',
    projectId: 'store-ads-staging',
    storageBucket: 'store-ads-staging.appspot.com',
    messagingSenderId: '51679284458',
    appId: '1:51679284458:web:2ffe7a67f1bb270fb11b93',
    measurementId: 'G-B5NM233VX0',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`,
 * `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a
 * negative impact on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
