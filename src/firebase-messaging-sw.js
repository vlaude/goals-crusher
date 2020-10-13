importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '807076644137',
});

const messaging = firebase.messaging();
