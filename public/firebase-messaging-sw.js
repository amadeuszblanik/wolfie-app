importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

try {
  firebase.initializeApp({
    apiKey: "AIzaSyCHU6r7QgJMTe-IExjcrGLU8_BUDEZg6j8",
    authDomain: "bme-doggo.firebaseapp.com",
    projectId: "bme-doggo",
    storageBucket: "bme-doggo.appspot.com",
    messagingSenderId: "402115080037",
    appId: "1:402115080037:web:1376dfaccbd801745e3b8c",
    measurementId: "G-VR555WWSV7",
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = payload.notification.title || "Wolfie.app";
    const notificationOptions = {
      body: payload.notification.body || "You have a new message!",
      icon: "/notification-icon.png"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.error(error);
}
