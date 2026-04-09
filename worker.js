// worker.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/favicon.ico') {
      return new Response(null, { status: 204 });
    }
    await sendNotifications(env);
    return new Response("sent ok");
  }
};

const MESSAGES = [
  "お疲れ様🐻 タスクは順調？今日撒いた小さな種、花が咲く日は案外近いかも🌷",
  "頑張る君は素敵だよ✨ 1つの「できた」が、未来の理想の自分への片道切符だよ🐾",
  "順調かな？🐻 完璧じゃなくても大丈夫。少しずつ「なりたい自分」を育てていこうね。",
  "「タスク完了」をタップする時の小さな達成感、想像してみて🍀一緒にがんばろう💛",
  "小さな積み重ねが君をもっと輝かせるよ✨ 1分だけでも自分を労わる時間、作ってみない？",
  "理想の姿を思い浮かべてみて🌈 その道はもう始まってるよ。今の頑張りを教えてね🐾",
  "自分のペースで進もう🐻 1つクリアするだけで、明日の景色がちょっと明るくなるよ。",
];

async function generateJWT(env) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: env.SERVICE_ACCOUNT_EMAIL,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const encode = (obj) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  const unsignedToken = `${encode(header)}.${encode(claim)}`;
  const pemKey = env.PRIVATE_KEY.replace(/\\n/g, "\n");
  const keyData = pemKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );
  const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `${unsignedToken}.${sigBase64}`;
}

async function getAccessToken(env) {
  const jwt = await generateJWT(env);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  return data.access_token;
}

async function getTokensFromFirestore(env, accessToken) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.PROJECT_ID}/databases/(default)/documents/${env.FIRESTORE_COLLECTION}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!data.documents) return [];
  return data.documents
    .map((doc) => doc.fields?.fcmToken?.stringValue)
    .filter(Boolean);
}

async function getLastIndex(env, accessToken) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.PROJECT_ID}/databases/(default)/documents/config/messageState`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return -1;
  const data = await res.json();
  return data.fields?.lastIndex?.integerValue ?? -1;
}

async function saveLastIndex(env, accessToken, index) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.PROJECT_ID}/databases/(default)/documents/config/messageState`;
  await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        lastIndex: { integerValue: index },
      },
    }),
  });
}

async function sendFCM(env, accessToken, token, title, body) {
  const url = `https://fcm.googleapis.com/v1/projects/${env.PROJECT_ID}/messages:send`;
  const notificationId = Date.now().toString();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        token,
        android: { priority: "high" },
        webpush: {
          headers: { TTL: "3600" },
        },
        data: {
          title,
          body,
          tag: "beareal-daily",
          notificationId,
        },
      },
    }),
  });
  return res.ok;
}

async function sendNotifications(env) {
  const accessToken = await getAccessToken(env);

  const lastIndex = await getLastIndex(env, accessToken);

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * MESSAGES.length);
  } while (newIndex === Number(lastIndex));

  await saveLastIndex(env, accessToken, newIndex);

  const title = "BEAREAL";
  const body = MESSAGES[newIndex];

  const tokens = await getTokensFromFirestore(env, accessToken);
  for (const token of tokens) {
    await sendFCM(env, accessToken, token, title, body);
  }
}