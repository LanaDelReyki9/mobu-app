// ===============================================
// Firebase 設定・FCM初期化
// ===============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEUuLlNQ3Y9R4kF0wSb0KvsBbrs9MK5Ns",
  authDomain: "mobu-app-a08e5.firebaseapp.com",
  projectId: "mobu-app-a08e5",
  storageBucket: "mobu-app-a08e5.firebasestorage.app",
  messagingSenderId: "397938670089",
  appId: "1:397938670089:web:ea20ff1c6cb172260b56d8"
};

const VAPID_KEY = "BCC_jZTNliUNSse0L3Hl_x-NhTpkhiggBpQq0SjtBBKv6t9ji8vp3MuTHK_WFa1RuyhZjGap8b5O6XffH-wpcAQ";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

/**
 * FCMトークンを取得してlocalStorageに保存する
 */
export async function initializeFCM() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (token) {
      console.log('FCMトークン取得成功:', token);
      localStorage.setItem('fcmToken', token);
      return token;
    }
  } catch (error) {
    console.error('FCMトークンの取得に失敗:', error);
    return null;
  }
}

/**
 * フォアグラウンド時（アプリを開いている時）にメッセージを受信する
 */
export function setupForegroundMessageHandler() {
  onMessage(messaging, (payload) => {
    console.log('フォアグラウンドでメッセージを受信:', payload);
    const { title, body, data } = payload.notification || {};
    const notificationType = payload.data?.type || 'periodic';
    const message = body || '';
    handleOSNotificationClick(notificationType, message);
  });
}