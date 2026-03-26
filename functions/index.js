const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// 毎分実行されるスケジュール関数
exports.sendScheduledNotifications = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(async (context) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    const targetTimes = ["07:30", "12:30", "22:30"];
    if (!targetTimes.includes(currentTime)) return null;

    const timeLabels = {
      "07:30": "morning",
      "12:30": "afternoon",
      "22:30": "night"
    };
    const timeOfDay = timeLabels[currentTime];

    const titleMap = {
      "07:30": "🧸 朝のタスクの時間だよ",
      "12:30": "🧸 昼のタスクの時間だよ",
      "22:30": "🧸 夜のタスクの時間だよ"
    };

    const db = admin.firestore();
    const usersSnapshot = await db.collection("users").get();

    const promises = [];
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      const token = userData.fcmToken;
      const schedule = userData.notificationSchedule || {};

      if (!token || !schedule[timeOfDay]) return;

      const message = {
        token: token,
        notification: {
          title: titleMap[currentTime],
          body: userData.notificationMessage?.[timeOfDay] || "タスクの時間だよ！"
        },
        data: {
          type: "periodic"
        }
      };

      promises.push(admin.messaging().send(message));
    });

    await Promise.all(promises);
    console.log(`${currentTime} の通知を送信しました。`);
    return null;
  });
  