// Service Worker のインストール時に実行される
self.addEventListener('install', (event) => {
  console.log('Service Worker: インストールされました');
  event.waitUntil(self.skipWaiting());
});

// Service Worker のアクティブ化時に実行される
self.addEventListener('activate', (event) => {
  console.log('Service Worker: アクティブになりました');
  event.waitUntil(self.clients.claim());
});

// main.jsからのメッセージを受け取るためのリスナー
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data) return;

  if (data.type === 'show-test-notification') {
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.message,
        icon: '/assets/images/icon_profile_48.png',
        data: { url: '/', type: 'test' } // ★クリック時用のデータを追加
      })
    );
  }

  if (data.type === 'schedule-periodic') {
    const [hour, minute] = data.time.split(':').map(Number);
    const now = new Date();
    let scheduleTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);
    if (scheduleTime < now) {
      scheduleTime.setDate(scheduleTime.getDate() + 1);
    }
    // ★クリック時用のデータを追加
    const notificationData = {
        url: '/', 
        type: 'periodic', 
        message: data.message 
    };
    scheduleNotification(scheduleTime.getTime(), data.title, data.message, `periodic-${data.time}`, notificationData);
  }

  if (data.type === 'cancel-all-periodic') {
    cancelAllNotificationsByTagPrefix('periodic-');
  }

  if (data.type === 'schedule-abandonment') {
    // ★クリック時用のデータを追加
    const notificationData = { 
        url: '/', 
        type: 'onee', // サボり通知はオネェ化と連動
        message: data.message 
    };
    scheduleNotification(data.timestamp, data.title, data.message, 'abandonment-notification', notificationData);
  }
  
  if (data.type === 'cancel-abandonment') {
    cancelAllNotificationsByTagPrefix('abandonment-');
  }
});

// ★★★ ここからが今回のメイン ★★★
// ユーザーが通知をクリックしたときの処理
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: 通知がクリックされました', event.notification);
  const notificationData = event.notification.data;
  event.notification.close();

  // クライアント(ウィンドウ)を探して、フォーカスを当てるか、新しく開く
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // 既にアプリのタブが開いているか確認
      for (const client of clientList) {
        // 同じURLのタブがあれば、それにフォーカスを当てて情報を送る
        if (client.url === self.registration.scope && 'focus' in client) {
          client.focus();
          // タップされた通知の情報をアプリ本体(main.js)に伝える
          client.postMessage({
              type: 'notification-clicked',
              notificationType: notificationData.type,
              message: event.notification.body
          });
          return;
        }
      }
      // 開いているタブがなければ、新しいタブでアプリを開く
      if (clients.openWindow) {
        // 開くと同時に、どの通知がタップされたかをURLのハッシュとして渡す
        const urlToOpen = new URL(self.registration.scope);
        urlToOpen.hash = `#notificationType=${notificationData.type}&message=${encodeURIComponent(event.notification.body)}`;
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
// ★★★ ここまでがメイン ★★★

/**
 * 通知を予約する共通関数
 * @param {number} timestamp 
 * @param {string} title 
 * @param {string} message 
 * @param {string} tag 
 * @param {object} data - 通知に埋め込むデータ
 */
async function scheduleNotification(timestamp, title, message, tag, data) {
  const permission = await self.registration.permissionState;
  if (permission !== 'granted') return;

  try {
    await self.registration.showNotification(title, {
      body: message,
      tag: tag,
      icon: '/assets/images/icon_profile_48.png',
      showTrigger: new TimestampTrigger(timestamp),
      silent: false,
      data: data // ★追加：通知自体にデータを埋め込む
    });
    console.log(`通知を予約しました: [${tag}] ${new Date(timestamp).toLocaleString()}`);
  } catch (e) {
    console.error(`通知の予約に失敗しました [${tag}]:`, e);
  }
}

async function cancelAllNotificationsByTagPrefix(prefix) {
  const notifications = await self.registration.getNotifications();
  for (const notification of notifications) {
    if (notification.tag && notification.tag.startsWith(prefix)) {
      notification.close();
    }
  }
}