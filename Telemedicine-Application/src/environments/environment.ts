// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  serverUrl : "http://localhost:3000/api/",

  // firebaseConfig: {
  //   apiKey: "AIzaSyAKUSgooAzB7E5DFV2kYTuHfssjFZDy-x0",
  //   authDomain: "telemedicine-application.firebaseapp.com",
  //   databaseURL: "https://telemedicine-application.firebaseio.com",
  //   projectId: "telemedicine-application",
  //   storageBucket: "telemedicine-application.appspot.com",
  //   messagingSenderId: "882346150232",
  //   appId: "1:882346150232:web:3bde3e28c2d93e9f2ffd2d",
  //   measurementId: "G-14XEFS4CSD",
  // agora: {
  //   appId: '803773dfd3bc49f6919b065aaf4cc89c'
  // }
  // }
  //  firebaseConfig = {
  //   apiKey: "AIzaSyC0nime83IhZJWdDPqsgEkFiVP-X1i8xGM",
  //   authDomain: "telemedicine-application-8d484.firebaseapp.com",
  //   projectId: "telemedicine-application-8d484",
  //   storageBucket: "telemedicine-application-8d484.appspot.com",
  //   messagingSenderId: "361881642270",
  //   appId: "1:361881642270:web:565743411fabc9c7f4550f"
  // };
  firebaseConfig : {
    databaseURL: "https://telemedicine-application-8d484.firebaseio.com",
    apiKey: "AIzaSyC0nime83IhZJWdDPqsgEkFiVP-X1i8xGM",
    authDomain: "telemedicine-application-8d484.firebaseapp.com",
    projectId: "telemedicine-application-8d484",
    storageBucket: "telemedicine-application-8d484.appspot.com",
    messagingSenderId: "361881642270",
    appId: "1:361881642270:web:565743411fabc9c7f4550f",
    agora: {
      appId:  '80f8dc1eb8e84c93a62a4b62792121e7'
    }
  }
  
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
