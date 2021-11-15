importScripts('https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCjKqhE2cxEV7_6SX0DABZWnax-XkV8x5k",
  authDomain: "latifapp-4084e.firebaseapp.com",
  projectId: "latifapp-4084e",
  storageBucket: "latifapp-4084e.appspot.com",
  messagingSenderId: "49792100598",
  appId: "1:49792100598:web:6a82f4f911911bf0f524d7",
  measurementId: "G-WQFZLHCCBJ"
});

const messaging = firebase.messaging();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);