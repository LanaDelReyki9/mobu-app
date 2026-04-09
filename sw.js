// ===============================================
// Firebase Cloud Messaging 対応 Service Worker
// ===============================================

importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCEUuLlNQ3Y9R4kF0wSb0KvsBbrs9MK5Ns",
  authDomain: "mobu-app-a08e5.firebaseapp.com",
  projectId: "mobu-app-a08e5",
  storageBucket: "mobu-app-a08e5.firebasestorage.app",
  messagingSenderId: "397938670089",
  appId: "1:397938670089:web:ea20ff1c6cb172260b56d8"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// バックグラウンド時のメッセージ受信
messaging.onBackgroundMessage((payload) => {
  console.log('バックグラウンドでメッセージを受信:', payload);

  const notificationId = payload.data?.notificationId;
  if (notificationId) {
    const key = `shown-${notificationId}`;
    if (self[key]) return;
    self[key] = true;
  }

  const title = payload.data?.title || "通知";
const body = payload.data?.body || "";
const tag = payload.data?.tag || "default";

  self.registration.showNotification(title, {
    body: body,
    tag: tag,
  });
});

// 通知クリック時の処理
// 通知クリック時の処理
self.addEventListener('notificationclick', (event) => {
  console.log('通知がクリックされました', event.notification);
  event.notification.close();

  const targetUrl = 'https://lanadelreyki9.github.io/mobu-app/?from=notification';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});