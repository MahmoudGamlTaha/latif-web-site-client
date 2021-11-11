importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCjKqhE2cxEV7_6SX0DABZWnax-XkV8x5k",
    authDomain: "latifapp-4084e.firebaseapp.com",
    projectId: "latifapp-4084e",
    storageBucket: "latifapp-4084e.appspot.com",
    messagingSenderId: "49792100598",
    appId: "1:49792100598:web:8e50397e59ecdb43f524d7",
    measurementId: "G-WWKBDE6D23"
});

const messaging = firebase.messaging();