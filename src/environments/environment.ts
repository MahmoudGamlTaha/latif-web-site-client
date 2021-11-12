// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  instagram_token: 'INSTA_TOKEN',
  stripe_token: 'STRIPE_TOKEN',
  paypal_token: 'PAYPAL_TOKEN',
  firebase: {
    apiKey: "AIzaSyBTY2x8UknYF636QRah0Ls7XVALwfGWISk",
    authDomain: "latifapp-4084e.firebaseapp.com",
    projectId: "latifapp-4084e",
    storageBucket: "latifapp-4084e.appspot.com",
    messagingSenderId: "49792100598",
    appId: "1:49792100598:ios:0d33500c2ec557bff524d7",
    measurementId: "G-WWKBDE6D23"
  }
};

export const server = {
  url:'https://latifapp.herokuapp.com/',
 // url:'http://localhost:8070/',
  name:'latif-app website'
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
