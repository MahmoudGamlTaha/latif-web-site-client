importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBTY2x8UknYF636QRah0Ls7XVALwfGWISk",
    authDomain: "latifapp-4084e.firebaseapp.com",
    projectId: "latifapp-4084e",
    storageBucket: "latifapp-4084e.appspot.com",
    messagingSenderId: "49792100598",
    appId: "1:49792100598:ios:0d33500c2ec557bff524d7",
    measurementId: "G-WWKBDE6D23"
});

const messaging = firebase.messaging();