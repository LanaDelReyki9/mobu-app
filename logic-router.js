// =============================
// カフェ画像設計図
// =============================
const cafeImageMap = {
    'start_0':      'assets/images/mobu_v1_welcome.png',
    'start_1':      'assets/images/mobu_v1_thinking.png',
    'motivation_0': 'assets/images/mobu_v1_motivation_a.png',
    'motivation_1': 'assets/images/mobu_v1_motivation_b.png',
    'motivation_2': 'assets/images/mobu_v1_motivation_c.png',
    'report_0':     'assets/images/mobu_v1_report_a.png',
    'report_1':     'assets/images/mobu_v1_report_b.png',
};
// ===============================================
// Dialogue Data (セリフデータ)
// ===============================================

// 資料7より: サボり日数に応じた通知メッセージ
const oneeNotificationDialogues = {
    // オネェLv1（1-3日放置）の時にランダムで表示されるセリフ
    onee_lv1: [
        "ちょっと自分磨きはお休み？いいのよ、無理しなくて。でも…また“自分を大事にする時間”取り戻しましょ？",
        "今日のあなた、寝ぐせついてるわよ。ふふ、早く身だしなみ整えてね。",
        "頑張ってるあなた、素敵だったから、正直ちょっとサミシイわ。"
    ],
    // オネェLv2（4-9日放置）の時にランダムで表示されるセリフ
    onee_lv2: [
        "ねぇ、最近ちょっと元気ないんじゃない？そんな時こそ、自分を丁寧に扱うのよ。",
        "ねぇ、あなた。最近ちょっと下向きすぎじゃない？",
        "ホラ、鏡見て？…ほら、まだまだイケるじゃないの。アタシの“推し”がそんな顔で下向いてたらイヤよ〜？"
    ],
    // オネェLv3（10日以上放置）の時にランダムで表示されるセリフ
    onee_lv3: [
        "ちょっとちょっとォ〜！サボりぐせ戻ってきてない⁉アタシ、もう心配で美容パック3枚重ねよ！",
        "はぁ…アタシ、頑張るあなたが好きだったのに…。でも、今はアタシが輝く番ね✨置いてっちゃうんだから！",
        "ねぇ聞いて。あなたがサボるたびにアタシ、美しくなっていくの。そろそろ追いかけてきて？"
    ]
};

// 資料13より: タスクに応じた定時通知メッセージ
// キーは index.html のタスク選択チェックボックスのIDに対応
const periodicNotificationDialogues = [
    // 🌞 朝7:30 - タスク①白湯
    { taskId: "task-select-1", time: "7:30", text: "白湯、ちゃんと飲んでます？身体のためにも水分補給していきましょうね。" },
    { taskId: "task-select-1", time: "7:30", text: "白湯ってSNS映えするような華やかさは無いですけど、地味だから続けやすいですよね。" },
    { taskId: "task-select-1", time: "7:30", text: "俺も今、白湯飲みながらメッセージ打ってます。……ちょっと一緒に頑張ってる気がしますね。" },
    { taskId: "task-select-1", time: "7:30", text: "飲み忘れたら今でも遅くないですよ。体がぽかぽかしてくるの、気持ちいいですよね。" },
    { taskId: "task-select-1", time: "7:30", text: "白湯、飲みました？　体の中から少しずつ目を覚ましましょうね。" },

    // 🌞 朝7:30 - タスク②フルーツ
    { taskId: "task-select-3", time: "7:30", text: "朝のフルーツ、何入れるんですか？朝ごはんにフルーツがあるだけでちょっと嬉しいですよね。" },
    { taskId: "task-select-3", time: "7:30", text: "朝に好きなフルーツがあるだけで、起きるのがちょっと楽しみになりません？" },
    { taskId: "task-select-3", time: "7:30", text: "切ったり、洗ったりさえ面倒な時ありません？俺は今日カットフルーツにしました。" },
    { taskId: "task-select-3", time: "7:30", text: "最近はフルーツがあるから、という理由で朝が好きになってきました。${nickname}はどうですか？" },

    // 🌞 朝7:30 - タスク③スキンケア（朝）
    { taskId: "task-select-10", time: "7:30", text: "よく眠れました？${nickname}の肌も労わってあげてくださいね。" },
    { taskId: "task-select-10", time: "7:30", text: "朝のスキンケア、急いでるとつい雑になっちゃうんですよね。今日はゆっくり、ちょっとだけ丁寧にしてみます？" },
    { taskId: "task-select-10", time: "7:30", text: "良い香りの化粧水ってありますよね。好きな香りと一緒なら、楽しくケアできそうだと思いません？" },

    // 🌤 昼12:30 - タスク④間食
    { taskId: "task-select-2", time: "12:30", text: "間食、我慢できてます？俺は我慢してるけど、昨日夢の中でケーキ食べちゃった…。" },
    { taskId: "task-select-2", time: "12:30", text: "今朝、無意識にスイーツ特集見てました…。キツいのはきっと最初だけですよね！" },
    { taskId: "task-select-2", time: "12:30", text: "「今日はいいかな」って思う日もありますよね。お互い励ましあいながら頑張りましょう！" },
    { taskId: "task-select-2", time: "12:30", text: "間食を我慢すると、ごはんがすごくおいしく感じる事に気づきました😊" },
    { taskId: "task-select-2", time: "12:30", text: "甘い誘惑、来ました？俺もさっき危なかったです。お互いセーフでしたね…！" },

    // 🌤 昼12:30 - タスク⑤ストレッチ
    { taskId: "task-select-7", time: "12:30", text: "やっとお昼ですね。肩凝ってません？軽くストレッチして少し休憩しますか？" },
    { taskId: "task-select-7", time: "12:30", text: "忙しい中で1分とるって、意外と難しい。でも${nickname}なら、ちゃんとやってそうだなって思います。" },
    { taskId: "task-select-7", time: "12:30", text: "仕事の合間にぐーっと伸びるだけで、少し目が覚めるんですよね。もうひと頑張りしましょうか！" },

    // 🌤 昼12:30 - タスク⑥階段
    { taskId: "task-select-8", time: "12:30", text: "今日も階段、選びました？その小さな選択、大きな一歩だと思います。" },
    { taskId: "task-select-8", time: "12:30", text: "階段を上るっていうだけでもちょっとした眠気ざましになりますね！" },
    { taskId: "task-select-8", time: "12:30", text: "俺はジム通いって続かなくて…階段使う位なら、続いてます。${nickname}はどうですか？" },

    // 🌤 昼12:30 - タスク⑦背筋
    { taskId: "task-select-9", time: "12:30", text: "背すじ、気づいたら丸まってません？ちょっと伸ばして、ついでに深呼吸しましょうか？" },
    { taskId: "task-select-9", time: "12:30", text: "ハッ！俺また猫背になってました。${nickname}はどうですか？" },
    { taskId: "task-select-9", time: "12:30", text: "俺、集中しすぎると、猫背になるみたい…。${nickname}は大丈夫？" },

    // 🌤 昼12:30 - タスク⑧ハンドケア
    { taskId: "task-select-11", time: "12:30", text: "手って、一番働き者なのにケアを後回しにしちゃいますよね。ハンドクリーム、塗ってあげてくださいね。" },
    { taskId: "task-select-11", time: "12:30", text: "好きな香りのハンドクリームだと、塗るだけでちょっとリフレッシュしますよね！" },
    { taskId: "task-select-11", time: "12:30", text: "忙しいとリップケアって後回しにしちゃいますよね。${nickname}は忘れてませんか？" },

    // 🌤 昼12:30 - タスク⑨片づけ
    { taskId: "task-select-5", time: "12:30", text: "部屋の片づけ、目の前のもの5つ片づけるだけでも、スッキリするんですよね。" },
    { taskId: "task-select-5", time: "12:30", text: "「1カ所だけ」って、いいルールですよね。完璧じゃなくていいのが続けやすいです。" },
    { taskId: "task-select-5", time: "12:30", text: "頭使う作業してると、片付けっていう単純作業が気分転換になりますね！" },
    { taskId: "task-select-5", time: "12:30", text: "片づけてるうちに、頭空っぽになる瞬間ありません？俺、あの時間好きなんです。" },
    { taskId: "task-select-5", time: "12:30", text: "俺、最近、休憩と片づけがセットになってます。${nickname}は順調ですか？" },

    // 🌙 夜22:30 - タスク⑩スマホ休憩
    { taskId: "task-select-4", time: "22:30", text: "もう夜ですね。スマホ、楽しいですけど、そろそろ目を休めましょうか。" },
    { taskId: "task-select-4", time: "22:30", text: "スマホを置いて、静かな時間を作るのって贅沢ですよね。ホットアイマスクもあれば最高です。" },
    { taskId: "task-select-4", time: "22:30", text: "${nickname}に送るこのメッセージを最後に、俺はスマホ置きます。${nickname}と同じ時間に休むって思うと、なんか嬉しいです。" },

    // 🌙 夜22:30 - タスク⑫ありがとう
    { taskId: "task-select-6", time: "22:30", text: "今日の気持ち、ひとことでもいいから聞かせてほしいです。" },
    { taskId: "task-select-6", time: "22:30", text: "俺は今、一緒に頑張ってくれる${nickname}に「ありがとう」って言いたい気分です。" },
    { taskId: "task-select-6", time: "22:30", text: "誰かに感謝できる日って、それだけで幸せですよね。" },
    { taskId: "task-select-6", time: "22:30", text: "${nickname}が今日「ありがとう」って思った相手、きっと笑顔になってますよ。" },
    { taskId: "task-select-6", time: "22:30", text: "ありがとうを思い出せたら、きっと幸せな気持ちで眠れますね。" },

    // 🌙 夜22:30 - タスク⑬深呼吸
    { taskId: "task-select-12", time: "22:30", text: "疲れてても深呼吸だけしてみますか？ふぅ～。ちょっと力抜けますね！" },
    { taskId: "task-select-12", time: "22:30", text: "意識してゆっくり息を吐くだけで、今日の疲れが少し抜けますね。${nickname}も一緒にどうですか？" },
    { taskId: "task-select-12", time: "22:30", text: "ため息をつくと幸せが逃げるなんて、言いますけど、深呼吸ならセーフです！今、少し試してみません？" },

    // 🌙 夜22:30 - タスク⑭スキンケア（夜）
    { taskId: "task-select-10", time: "22:30", text: "お疲れ様です。夜のスキンケア、頑張れそうですか？無理のない範囲で続けましょうね。" },
    { taskId: "task-select-10", time: "22:30", text: "夜のスキンケアって、癒しの時間ですよね。${nickname}の肌が、ゆっくり休めますように。" },
    { taskId: "task-select-10", time: "22:30", text: "疲れた顔も、優しく触れるだけで少し元気になる気がしますね。${nickname}も、頑張った自分をちゃんと労ってください。" },
];

// 資料7を基にした、サボりからの復帰時のセリフ集
const recoveryDialogues = {
    // Ver.1 (タスク達成回数 0-9回)
    ver1: {
        onee_lv1: "……あら、あなた！戻ってきたのね💖……って、また口調がっ💦　も、もう“アタシ”じゃなくて“俺”だから！おかえり、ほんとに嬉しい。", // No.10
        onee_lv2: "……あら、あなた久しぶり💜…いや、『あら💜』じゃなかった💦再開してくれたんですね！あなたが戻って来てくれて、本当にうれしい！", // No.12
        onee_lv3: "あなた！戻ってきてくれたのね！アタシ危うく美容インフルエンサーになるところだったの💦ハッ！？癖が抜けないのよね。…じゃなくて抜けないんです💦でも、また一緒に頑張れるの嬉しい！" // No.14
    },
    // Ver.2 (タスク達成回数 10-19回) - 内心付き
    ver2: {
        onee_lv1: {
            main: "まぁ！あなた、戻ってきたのね？嬉しいわ……って、うっかり“アタシ”が出ちゃいました💦", // No.16 💬
            inner: "（また戻ってきてくれて嬉しい。けど、いきなりオネェ口調戻すのも、正直違和感あるんだよな。多分すぐ、いつもの俺に戻れるよな…？)" // No.16 💭
        },
        onee_lv2: {
            main: "また頑張り屋なあなたに戻ってくれて、アタシもいつものペースに…ってまた一人称おかしくなってた💦 あなたがいない間の俺、美容熱が行き過ぎて人格変わってた💦はは…", // No.17 💬
            inner: "（無理に笑ってるけど、ちょっと恥ずかしい。オネェ化した姿見せたあとでも普通に接してくれるって、あなたはホント優しいな…）" // No.17 💭
        },
        onee_lv3: {
            main: "おかえり！アタシ…じゃなくて俺、嬉しくてちょっと、涙出てるかも～😂", // No.18 💬
            inner: "（あなたが再開してくれたのが、嬉しくて正直泣きそうだ💦 何とか笑いでごまかしたけど、目が潤んでるのバレてない…よな？）" // No.18 💭
        }
    },
    // Ver.3, Ver.4 も同様に追加可能 (今回は省略)
};

// ユーザーの返信セリフデータ
const userReplyDialogues = {
    // 復帰時の汎用リアクションセリフ (ランダムで選ばれる)
    recoveryReactions: [
        "待っててくれてありがと～🥲",
        "私一人じゃ、このまま辞めてた。一緒に頑張ってくれてありがとう！",
        "ありがとう！気合入れ直して頑張るね！"
    ],
    // タスクごとの報告セリフ
    taskReports: {
        "朝食前に白湯を飲む": "朝食前に白湯を飲んだよ",
        "間食を1回だけ我慢": "間食を1回だけ我慢したよ",
        "朝ごはんにフルーツを足す": "朝ごはんにフルーツを足したよ",
        "寝る前スマホを15分おやすみ": "寝る前スマホを15分お休みしたよ",
        "1日1カ所だけ片づけ": "1か所だけ片付けしたよ",
        "今日の“ありがとう”をひとつ思い出す": "今日の“ありがとう”を一つ思い出したよ",
        "1分ストレッチ": "1分ストレッチをやったよ",
        "階段を選ぶ": "階段を選んだよ",
        "背筋を伸ばす時間を意識": "背筋を伸ばす時間を意識したよ",
        "スキンケアを丁寧にする": "スキンケアを丁寧にしたよ",
        "リップやハンドケアを忘れずに": "リップとハンドケアを忘れずにやったよ",
        "深呼吸を3回する": "深呼吸を3回したよ"
    }
};

/**
 * 現在のタスク達成回数に応じて、モブ君のバージョンを返す
 * @returns {'ver1' | 'ver2'}
 */
function getMobuVersion() {
    const totalTasks = getTotalTasksCompleted();
    if (totalTasks >= 10 && totalTasks < 20) {
        return 'ver2';
    }
    // (今後、ver3, ver4 もここに追加していく)
    
    // 上記以外はすべて ver1 とする
    return 'ver1';
}
// ===============================================
// Audio Control (音響演出)
// ===============================================

/**
 * SE（効果音）を再生する（仮実装）
 * @param {string} fileName 再生したい音声ファイル名
 */
function playSE(fileName) {
    console.log(`[Audio] SE再生: ${fileName}`);
}

/**
 * BGM（背景音楽）を再生する（仮実装）
 * @param {string} fileName 再生したい音声ファイル名
 * @param {boolean} loop ループ再生するかどうか
 */
function playBGM(fileName, loop = false) {
    console.log(`[Audio] BGM再生: ${fileName} (ループ: ${loop})`);
}

/**
 * 全ての音を停止する（仮実装）
 */
function stopAllSounds() {
    console.log(`[Audio] 全ての音を停止`);
}

// ===============================================
// Router & Screen Control (画面遷移と演出)
// ===============================================

/**
 * 未再生のプロフィール演出があれば再生する【完成版】
 */
function playProfileRewardAnimationIfNeeded() {
    const totalTasks = getTotalTasksCompleted();
    const modal = document.getElementById('reward-modal');
    const teddyImage = document.getElementById('reward-teddy-image');
    if (!modal || !teddyImage) return;

    let milestoneToPlay = 0;

    if (totalTasks >= 10 && !hasProfileRewardBeenSeen(10)) {
        milestoneToPlay = 10;
    } else if (totalTasks >= 20 && !hasProfileRewardBeenSeen(20)) {
        milestoneToPlay = 20;
    } else if (totalTasks >= 30 && !hasProfileRewardBeenSeen(30)) {
        milestoneToPlay = 30;
    } else if (totalTasks >= 40 && !hasProfileRewardBeenSeen(40)) {
        milestoneToPlay = 40;
    }

    if (milestoneToPlay > 0) {
        const targetBearBox = document.querySelector(`.teddy-bear-placeholder[data-milestone="${milestoneToPlay}"]`);
        if (targetBearBox) {
            targetBearBox.classList.add('hide-for-animation');
        }

        const theme = `t${milestoneToPlay / 10}`;
        const imageName = `ui_teddy_${theme}_give.png`;
        const imagePath = `assets/images/${imageName}`;
        teddyImage.src = imagePath;

        modal.classList.add('active');
        setTimeout(() => {
            teddyImage.classList.add('animate');
        }, 100);

        markProfileRewardAsSeen(milestoneToPlay);

        setTimeout(() => {
            if (targetBearBox) {
                targetBearBox.classList.remove('hide-for-animation');
            }
            showProfileScreen();
            modal.classList.remove('active');
            teddyImage.classList.remove('animate');
        }, 2500);
    }
}

/**
 * プロフィール画面の表示とデータ更新を行う
 */
function showProfileScreen() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const profileScreen = document.getElementById('screen-profile');
    if (profileScreen) {
        profileScreen.classList.add('active');
    } else {
        console.error("エラー: プロフィール画面が見つかりません。");
        return;
    }

    const nicknameEl = document.getElementById('profile-nickname');
    const totalTasksEl = document.getElementById('profile-total-tasks');
    const totalDaysEl = document.getElementById('profile-total-days');
    const progressTextEl = document.getElementById('profile-progress');

    const nickname = localStorage.getItem('nickname') || 'ななしさん';
    const totalTasks = getTotalTasksCompleted();

    nicknameEl.textContent = nickname;
    totalTasksEl.textContent = totalTasks;
    totalDaysEl.textContent = 0;

    const nextMilestone = (Math.floor(totalTasks / 10) + 1) * 10;
    if (totalTasks >= 40) {
        progressTextEl.textContent = '全てのブーケを受け取りました！';
    } else if (totalTasks < 10) {
        const remaining = 10 - totalTasks;
        progressTextEl.textContent = `次のブーケまで あと ${remaining} 回`;
    } else {
        const remaining = nextMilestone - totalTasks;
        progressTextEl.textContent = `次のブーケまで あと ${remaining} 回`;
    }

    const teddyBears = document.querySelectorAll('.teddy-bear-placeholder');
    teddyBears.forEach(bear => {
        bear.innerHTML = '';
        const milestone = parseInt(bear.dataset.milestone, 10);
        const theme = `t${milestone / 10}`;
        let imageName = '';

        if (hasProfileRewardBeenSeen(milestone)) {
            imageName = `ui_teddy_${theme}_done.png`;
            bear.classList.add('achieved');
        } else {
            imageName = `ui_teddy_${theme}_wait.png`;
            bear.classList.remove('achieved');
        }

        const img = document.createElement('img');
        img.src = `assets/images/${imageName}`;
        img.alt = `${milestone}回達成テディベア`;
        bear.appendChild(img);
    });

    console.log("プロフィール画面の表示とデータ更新が完了しました。");
}

/**
 * 指定されたIDの画面を表示する
 * @param {string} screenId 表示したい画面のID
 */
function showScreen(screenId) {
    // ★★★ 修正: 音の停止と画面非表示をここで行う ★★★
    stopAllSounds();
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);

        // --- 各画面表示時のユニークな処理 ---
        // --- B-1: ホーム画面の完了ボタン制御 ---
        if (screenId === 'screen-home') {
            const today = new Date().toISOString().split('T')[0];
            const log = getAchievementLog();
            const todayCount = log[today] || 0;
            const btn = document.querySelector('#screen-home .btn-primary');
            const msg = document.getElementById('task-limit-message');

            if (todayCount >= 3) {
                btn.disabled = true;
                btn.style.pointerEvents = 'auto';
                btn.onclick = function() {
                    if (!msg) return;
                    msg.style.display = 'block';
                    msg.style.opacity = '1';
                    clearTimeout(msg._hideTimer);
                    msg._hideTimer = setTimeout(() => {
                        msg.style.opacity = '0';
                        setTimeout(() => { msg.style.display = 'none'; }, 400);
                    }, 3000);
                };
            } else {
                btn.style.pointerEvents = '';
                btn.onclick = null;
            }
        }
        if (screenId === 'screen-line') {
            // --- UI要素を取得 ---
            const chatArea = document.querySelector('#screen-line .line-chat');
            const inputBar = document.getElementById('line-input-bar');
            const moodSelector = document.getElementById('mood-stamp-selector');
            const replyArea = document.getElementById('notification-reply-area');
            const replyStamp = document.getElementById('reply-stamp-image');
            chatArea.innerHTML = ''; // まずはチャット欄を空にする

            // --- 通知からの遷移か、タスク報告からの遷移かを判定 ---
            const tappedNotificationData = localStorage.getItem('tappedNotification');

            if (tappedNotificationData) {
                // [A] 通知をタップして遷移してきた場合
                const notification = JSON.parse(tappedNotificationData);

                // 1. UIの表示を切り替える
                inputBar.style.display = 'none';
                moodSelector.style.display = 'none';
                replyArea.style.display = 'flex';

                // 2. モブ君の状態に応じて返信スタンプ画像を設定
                if (notification.type === 'onee') {
                    replyStamp.src = 'assets/images/stamp_onee.png'; // 汗をかいてるマスコット (仮パス)
                } else { // 'periodic'
                    replyStamp.src = 'assets/images/stamp_normal.png'; // 親指を立ててるマスコット (仮パス)
                }
                
                // 3. チャット欄に通知の全文を表示
                appendLineMessage('mobu', notification.message, 100);

               // 4. 処理が終わったら、保存しておいたデータを消去（重要）
               localStorage.removeItem('tappedNotification');

               // 5. スタンプがクリックされた時の処理を登録
               let stampClicked = false;
               replyStamp.onclick = function() {
                   if (stampClicked) return;
                   stampClicked = true;
                   appendUserStampMessage(replyStamp.src);
                   setTimeout(() => {
                       playBlinkVideo(() => {
                           showScreen('screen-home');
                       });
                   }, 500);
               };

           } else {
            
// 5. スタンプがクリックされた時の処理を登録
const newReplyStamp = replyStamp.cloneNode(true);
replyStamp.parentNode.replaceChild(newReplyStamp, replyStamp);

newReplyStamp.addEventListener('click', function() {
    // 自身の画像パスを取得して、送信演出を行う
    appendUserStampMessage(newReplyStamp.src);

    // 0.5秒後に瞬き演出を開始
    setTimeout(() => {
        playBlinkVideo(() => {
            showScreen('screen-home');
        });
    }, 500); // 0.5秒のディレイ
}, { once: true });

                // [B] 通常のタスク報告で遷移してきた場合（これまでの処理）
                inputBar.style.display = 'block';
                moodSelector.style.display = 'none';
                replyArea.style.display = 'none';

                // (ここに元のタスク報告のフローが入る)
                const mobuState = getMobuState();
                const reportedTask = localStorage.getItem('currentReportTask');
                let initialDelay = 500;
                const userTaskReportText = userReplyDialogues.taskReports[reportedTask] || `${reportedTask}を完了！`;
                
                if (mobuState !== 'normal') {
                    const mobuVersion = getMobuVersion();
                    const dialogueData = recoveryDialogues[mobuVersion];
                    if (dialogueData && dialogueData[mobuState]) {
                        const dialogue = dialogueData[mobuState];
                        appendLineMessage('mobu', dialogue, initialDelay);
                        initialDelay += 1500;
                        const reactions = userReplyDialogues.recoveryReactions;
                        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
                        appendLineMessage('user', randomReaction, initialDelay);
                        initialDelay += 1500;
                    }
                    setMobuState('normal');
                }
                
                appendLineMessage('user', userTaskReportText, initialDelay);
                initialDelay += 1000;
                appendLineMessage('mobu', `お疲れ様です！「${reportedTask}」を達成したんですね、すごいです！`, initialDelay);
                initialDelay += 1000;

                setTimeout(() => {
                    if (Math.random() < 0.5) {
                        startMoodSharing();
                    } else {
                        checkAndSetupEvent();
                    }
                }, initialDelay + 1000);
            }

        } else if (screenId === 'screen-cafe') {

            playBGM('bgm_cafe_ambience.mp3', true);
            const totalTasks = getTotalTasksCompleted();
            const appPhase = localStorage.getItem('appPhase');
            const isFirstReport = localStorage.getItem('isFirstReport');

            // --- 進行状況に応じて、カフェでのイベントを分岐 ---
            if (isFirstReport === 'true') {
                // [最優先] 初回タスク報告の特別イベント
                handleFirstReportDialogue();
            } else if (appPhase === 'introduction_task_select') {
                // ★★★ 抜け落ちていた分岐を追加 ★★★
                // [導入フロー2] タスク選択後の動機付けセリフ
                handleIntroductionDialogue('motivation');
            } else if (appPhase === 'introduction_motivation') {
                handleIntroductionDialogue('motivation');
            } else if (totalTasks >= 10 && totalTasks < 20) {
                // [通常フロー] 10回達成イベント
                handleCafeEvent(10);
            } else if (totalTasks >= 20 && totalTasks < 30) {
                // [通常フロー] 20回達成イベント
                handleCafeEvent(20);
            } else {
                // [導入フロー1] 上記のどれにも当てはまらない場合、最初の導入フェーズと判断
                handleIntroductionDialogue('start');
            }

        } else if (screenId === 'screen-ending') {
            // (エンディング画面の処理は変更なし)
            handleEndingDialogue();
        }
        // ★★★ if文の外に出すことで、どの画面でも表示されるようにする ★★★
    } else {
        console.error(`エラー: IDが '${screenId}' の画面が見つかりません。`);
    }
}

/**
 * LINE画面にアニメーション付きでメッセージを追加する
 * @param {string} sender 'mobu' または 'user'
 * @param {string} text 表示するメッセージのテキスト
 * @param {number} delay 表示するまでの遅延時間（ミリ秒）
 */
function appendLineMessage(sender, text, delay = 0) {
    const chatArea = document.querySelector('#screen-line .line-chat');
    if (!chatArea) return;

    setTimeout(() => {
        if (sender === 'mobu') {
            playSE('se_line_receive.mp3');
        }
        const messageDiv = document.createElement('div');
        messageDiv.className = `line-message ${sender} new`;
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        chatArea.appendChild(messageDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
        messageDiv.addEventListener('animationend', () => {
            messageDiv.classList.remove('new');
        });
    }, delay);
}

/**
 * 瞬き動画を再生し、指定のタイミングでコールバックを実行する
 * @param {function} onDarkMoment 動画が暗転したタイミングで実行する関数
 * @param {boolean} showPironEffect ピロン♪演出を同時に表示するかどうか
 */
function playBlinkVideo(onDarkMoment, showPironEffect = false) {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('blink-video');
    const pironContainer = document.getElementById('piron-effect-container'); // ★追加

    if (!overlay || !video) {
        if (onDarkMoment) onDarkMoment();
        return;
    }

    playSE('se_blink_start.mp3');

    // ★★★ ピロン♪演出の表示ロジックを追加 ★★★
    if (showPironEffect && pironContainer) {
        pironContainer.style.display = 'flex';
        // アニメーションをリセットするためにクラスを一度削除して再追加
        const pironText = pironContainer.querySelector('.sound-effect-text');
        pironText.style.animation = 'none';
        pironText.offsetHeight; // 再描画をトリガー
        pironText.style.animation = ''; 
        
        playSE('se_task_complete_on.mp3');
    }
    // ★★★ ここまで ★★★

    overlay.classList.add('active');
    video.currentTime = 0;
    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("動画再生エラー:", error);
            if (onDarkMoment) onDarkMoment();
            overlay.classList.remove('active');
            if (pironContainer) pironContainer.style.display = 'none';
        });
    }

    setTimeout(() => {
        if (onDarkMoment) onDarkMoment();
    }, 500); // 瞬きで暗くなるタイミングで画面を切り替える

    video.onended = () => {
        playSE('se_blink_end.mp3');
        overlay.classList.remove('active');
        // ★★★ 演出が終わったらピロン♪を非表示に戻す ★★★
        if (pironContainer) {
            pironContainer.style.display = 'none';
        }
    };
}

/**
 * 暗転（フェード）による画面遷移演出
 * @param {function} onDarkMoment 暗転が完了したタイミングで実行する関数
 */
function playFadeTransition(onDarkMoment) {
    const overlay = document.getElementById('fade-overlay');
    if (!overlay) {
        if (onDarkMoment) onDarkMoment();
        return;
    }
    overlay.classList.add('active');
    setTimeout(() => {
        if (onDarkMoment) onDarkMoment();
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 100);
    }, 500);
}

/**
 * 完了したタスクの数に応じて、タスク報告画面の内容を動的に設定する
 * @param {string[]} completedTasks 完了したタスク名の配列
 */
function setupReportScreen(completedTasks) {
    showScreen('screen-report');
    const thoughtText = document.getElementById('report-thought-text');
    const selectionArea = document.getElementById('report-selection-area');
    selectionArea.innerHTML = '';
    selectionArea.style.display = 'none';
    const screenReport = document.getElementById('screen-report');
    const newScreenReport = screenReport.cloneNode(true);
    screenReport.parentNode.replaceChild(newScreenReport, screenReport);
    const currentScreen = document.getElementById('screen-report');
    const currentThoughtText = document.getElementById('report-thought-text');
    const currentSelectionArea = document.getElementById('report-selection-area');
    if (completedTasks.length === 1) {
        currentThoughtText.textContent = 'よし、完了！モブ君に報告しよっと♪';
        currentScreen.onclick = function() {
            localStorage.setItem('currentReportTask', completedTasks[0]);
            showScreen('screen-line');
        };
    } else {
        currentThoughtText.textContent = '今日は色々頑張ったけど、特に頑張った一つをモブ君に報告しよう。';
        currentSelectionArea.style.display = 'flex';
        currentSelectionArea.style.flexDirection = 'column';
        currentSelectionArea.style.gap = '10px';
        currentSelectionArea.style.marginTop = '15px';
        completedTasks.forEach(task => {
            const btn = document.createElement('button');
            btn.textContent = task;
            btn.className = 'cloud-btn';
            btn.style.padding = '10px 20px';
            btn.style.borderRadius = '20px';
            btn.style.border = '2px solid var(--line-deco-1)';
            btn.style.backgroundColor = 'var(--color-white)';
            btn.style.fontFamily = "'M PLUS Rounded 1c', sans-serif";
            btn.style.color = 'var(--text-dark)';
            btn.style.fontSize = '16px';
            btn.style.cursor = 'pointer';
            btn.onclick = function(e) {
                e.stopPropagation();
                localStorage.setItem('currentReportTask', task);
                showScreen('screen-line');
            };
            currentSelectionArea.appendChild(btn);
        });
        currentScreen.onclick = null;
    }
}

// ===============================================
// Phase 4-2: 気分共有ロジック
// ===============================================

/**
 * 気分共有イベントを開始する
 */
function startMoodSharing() {
    const inputBar = document.getElementById('line-input-bar');
    const stampSelector = document.getElementById('mood-stamp-selector');
    const stamps = document.querySelectorAll('.mood-stamp');
    const question = "ところで、今日の気分はどうですか？";

    appendLineMessage('mobu', question, 1000);

    setTimeout(() => {
        inputBar.style.display = 'none';
        stampSelector.style.display = 'grid';
    }, 1500);

    // ★変更: imgタグのイベントリスナーを設定
    stamps.forEach(stamp => {
        // イベントリスナーの重複を防ぐために、一度クローンして置き換える
        const newStamp = stamp.cloneNode(true);
        stamp.parentNode.replaceChild(newStamp, stamp);
        
        newStamp.addEventListener('click', () => {
            // data-mood属性から気分テキストを、src属性から画像パスを取得
            const mood = newStamp.dataset.mood;
            const stampSrc = newStamp.src;
            handleMoodStampClick(mood, stampSrc);
        }, { once: true }); // 一度クリックされたらイベントを解除
    });
}

/**
 * 気分スタンプがクリックされたときの処理
 * @param {string} mood 選択された気分のテキスト (data-mood属性の値)
 * @param {string} stampSrc クリックされたスタンプ画像のパス (src属性の値)
 */
function handleMoodStampClick(mood, stampSrc) {
    const inputBar = document.getElementById('line-input-bar');
    const stampSelector = document.getElementById('mood-stamp-selector');
    
    // ★変更: テキストではなく、スタンプ画像を送信する関数を呼び出す
    appendUserStampMessage(stampSrc);

    let reply = "";
    switch (mood) {
        case '元気':
            reply = "元気なんですね！よかったです！";
            break;
        case '嬉しい':
            reply = "何か嬉しいことがあったんですね！";
            break;
        default:
            reply = `${mood}、なんですね。教えてくれてありがとうございます。`;
            break;
    }
    appendLineMessage('mobu', reply, 1000); // 少し応答を早くする

    setTimeout(() => {
        stampSelector.style.display = 'none';
        inputBar.style.display = 'block';
        checkAndSetupEvent();
    }, 1500); // 全体の流れを少し早める
}

// ===============================================
// イベント分岐ロジック
// ===============================================

/**
 * イベント発生条件をチェックし、必要ならLINE画面にボタンなどを追加する
 */
function checkAndSetupEvent() {
    const previousTotal = getPreviousTotalTasks();
    const currentTotal = getTotalTasksCompleted();
    const chatArea = document.querySelector('#screen-line .line-chat');
    const existingEventUI = chatArea.querySelector('.event-ui-container');
    if (existingEventUI) {
        existingEventUI.remove();
    }
    const milestones = [10, 20, 30, 40];
    let eventTriggeredMilestone = 0;
    for (const milestone of milestones) {
        if (previousTotal < milestone && currentTotal >= milestone) {
            eventTriggeredMilestone = milestone;
            break;
        }
    }
    if (eventTriggeredMilestone > 0) {
        const eventUIContainer = document.createElement('div');
        eventUIContainer.className = 'event-ui-container';
        const message = document.createElement('div');
        message.className = 'line-message mobu';
        if (eventTriggeredMilestone === 40) {
            message.innerHTML = `<p>とうとう40個目だね！直接伝えたいことがあるから、カフェで待ってるよ。</p>`;
        } else {
            message.innerHTML = `<p>ところで、累計タスクが${eventTriggeredMilestone}個を超えましたね！<br>お店でささやかなお祝いをさせてください😊</p>`;
        }
        const button = document.createElement('button');
        button.textContent = 'カフェへ向かう';
        button.className = 'btn-event';
        button.onclick = function() {
            if (eventTriggeredMilestone === 40) {
                startEndingSequence();
            } else {
                showScreen('screen-cafe');
            }
        };
        eventUIContainer.appendChild(message);
        eventUIContainer.appendChild(button);
        setTimeout(() => {
            chatArea.appendChild(eventUIContainer);
            chatArea.scrollTop = chatArea.scrollHeight;
        }, 500);
    } else {
        console.log(`通常タスク報告。累計: ${currentTotal} (前回: ${previousTotal})`);
    }
}

// ===============================================
// Phase 5-1: エンディング演出ロジック
// ===============================================

/**
 * 40回達成時のカフェでの会話からエンディング画面への遷移を管理する
 */
function startEndingSequence() {
    showScreen('screen-cafe');
    playBGM('bgm_cafe_ambience.mp3', true);
    const dialogueText = document.querySelector('#screen-cafe .dialogue-text');
    const cafeScreen = document.getElementById('screen-cafe');
    dialogueText.textContent = "（ユーザー名）！来てくれてありがとう。嬉しいよ。...早速なんだけど、一緒に行こう。";
    cafeScreen.onclick = function() {
        playSE('se_text_advance.mp3');
        cafeScreen.onclick = null;
        playFadeTransition(() => {
            showScreen('screen-ending');
            playBGM('bgm_confession.mp3', true);
        });
    };
}

/**
 * D-1 エンディング画面の告白セリフ進行を管理する
 */
function handleEndingDialogue() {
    const endingScreen = document.getElementById('screen-ending');
    const dialogueText = document.querySelector('#screen-ending .dialogue-text');
    const dialogues = [
        "ここが俺のお気に入りの場所だよ。いつか大切な人と一緒にここから夕陽を見たいなってずっと思ってたんだ。",
        "...（ユーザー名）...。好きだ。付き合ってほしい。",
        "返事はすぐじゃなくていいから、考えてくれる？"
    ];
    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];
    playSE('voice_mobu_d1_confession_1.mp3');
    endingScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
            playSE(`voice_mobu_d1_confession_${currentDialogueIndex + 1}.mp3`);
        } else {
            endingScreen.onclick = null;
            showScreen('screen-epilogue');
            playBGM('bgm_epilogue_ambience.mp3', true);
            playSE('voice_mobu_d2_monologue.mp3');
            setTimeout(() => {
                showScreen('screen-staff-roll');
                playBGM('bgm_epilogue_staffroll.mp3', true);
            }, 5000);
        }
    };
}

// ===============================================
// Phase 5-1.5: カフェイベントと誘導ロジック
// ===============================================

/**
 * カフェでのイベント会話（10回、20回達成時など）を管理する
 * @param {number} milestone - 発生させるイベントの達成回数 (10 or 20)
 */
function handleCafeEvent(milestone) {
    const cafeScreen = document.getElementById('screen-cafe');
    const dialogueText = document.querySelector('#screen-cafe .dialogue-text');
    let dialogues = [];
    if (milestone === 10) {
        dialogues = [
            "あ、（ユーザー名）！来てくれてありがとうございます。えーっと...その...髪、少し切ったんですけど...似合ってます？",
            "10個タスク達成、本当におめでとうございます！俺も無事に習慣が定着しました。",
            "これは、そのお祝いといいますか...試作品のスイーツをサービスさせてもらいますね。",
        ];
        if (!hasProfileRewardBeenSeen(10)) {
            dialogues.push("そういえば、10タスク完了するごとに可愛いイベント演出があるらしいですよ。もうアプリのプロフィール画面見てみました?");
        }
    } else if (milestone === 20) {
        const nickname = localStorage.getItem('nickname') || 'あなた';
        dialogues = [
            `${nickname}、来てくれたんですね、ありがとうございます。その……メガネやめてコンタクトにしてみたんですけど……どうですか？ずっと変えたいなって思ってたんですよ。`,
            `それはそうと20回達成、本当にお疲れさまです。${nickname}が頑張ってるのを見てると、俺までなんだか力が湧いてくるんですよ。……その…これ、ささやかですが、感謝の気持ちです。`,
            `${nickname}がいつも頼んでる紅茶の傾向、俺、覚えてますから。これは絶対気に入ってくれると思って。ぜひ試してみてほしいな。`,
            `……また、頑張った話、聞かせてくださいね。俺も、${nickname}に負けないように、次の一歩を進めるから。`,
        ];
        if (!hasProfileRewardBeenSeen(10)) {
            dialogues.push("あ、そうだ。10タスクごとにプロフィール画面でかわいい演出があるらしいって話、覚えてます？俺、この前友達にその画面見せてもらったんだけど、すごくかわいかったですよ");
        }
    }
    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];
    cafeScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
        } else {
            cafeScreen.onclick = null;
            playBlinkVideo(() => showScreen('screen-home'));
        }
    };
}

/**
 * 初回起動時の導入セリフ進行を管理する
 * @param {'start' | 'motivation'} type どちらの導入セリフか
 */
function handleIntroductionDialogue(type) {
    const cafeScreen = document.getElementById('screen-cafe');
    const dialogueText = document.querySelector('#screen-cafe .dialogue-text');
    const bgImage = document.getElementById('cafe-background-image'); // ★追加
    const nickname = localStorage.getItem('nickname') || 'あなた';

    let dialogues = [];

    if (type === 'start') {
        dialogues = [
            `${nickname}、いらっしゃいませ。今日も来てくれて嬉しいです。いつもの席でよろしいですか？`,
            `あ、そういえば${nickname}。前に『習慣作り』の話をされてましたよね？俺も最近ずっと考えているんです。また後で、何か面白い情報があったら教えてくださいね！`
        ];
    } else if (type === 'motivation') {
        dialogues = [
            `あ、その音って今話題の『自分磨きアプリ』の音ですか？実は俺も、最近何かを習慣にしたくて気になってたんです。`,
            `でも、俺にはアプリのデザインがかわいらしすぎて、結局ダウンロードはしなかったんだけど...やっぱり本気で自分磨きは始めたくて。`,
            `だから…俺も一緒に自分磨き、始めていいですか？誰かと一緒なら頑張れる気がするんです。返信しなくてもいいので、習慣が俺に定着するまでは、${nickname}にメッセージ送ってもいいですか？送らせてもらえたら嬉しいです。`
        ];
        localStorage.setItem('appPhase', 'introduction_motivation');
    }

    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];

    // ★追加：最初の画像を表示
    if (bgImage) bgImage.src = cafeImageMap[`${type}_0`] || '';

    cafeScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
            // ★追加：画像を切り替え
            if (bgImage) bgImage.src = cafeImageMap[`${type}_${currentDialogueIndex}`] || '';
        } else {
            cafeScreen.onclick = null;
            if (type === 'start') {
                localStorage.setItem('appPhase', 'introduction_task_select');
                playBlinkVideo(() => showScreen('screen-task-select'));
            } else if (type === 'motivation') {
                localStorage.setItem('appPhase', 'main_loop');
                playBlinkVideo(() => showScreen('screen-home'));
            }
        }
    };
}

/**
 * 初回タスク報告時の、特別な動機付けイベントを管理する
 */
function handleFirstReportDialogue() {
    const cafeScreen = document.getElementById('screen-cafe');
    const dialogueText = document.querySelector('#screen-cafe .dialogue-text');
    const bgImage = document.getElementById('cafe-background-image'); // ★追加
    const nickname = localStorage.getItem('nickname') || 'あなた';

    const dialogues = [
        `${nickname}、お疲れ様。そのスマホかわいいですね。あ、もしかして今、この前話してたアプリやってます...？俺、自分磨きの習慣スタートして思い始めたんだけど...自分磨きって、達成してもなかなか誰かに褒めてもらえないじゃないですか？それで、結果もなかなか目に見えなかったらモチベ落ちていきません？`,
        `だから...タスクが終わって達成感を誰かに伝えたい時は、俺を頼ってほしい。いつでも俺に報告してください。一番に応援するから。自分磨きっていう共通の事で、俺も${nickname}の役に立てたらなって！`,
        `あ、俺用事あるの忘れてた！じゃあ、また！`
    ];

    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];

    // ★追加：最初の画像を表示
    if (bgImage) bgImage.src = cafeImageMap[`report_0`] || '';

    cafeScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
            // ★追加：画像を切り替え
            if (bgImage) bgImage.src = cafeImageMap[`report_${currentDialogueIndex}`] || '';
        } else {
            cafeScreen.onclick = null;
            localStorage.removeItem('isFirstReport');
            const tasksFromStorage = JSON.parse(localStorage.getItem('tempCompletedTasks') || '[]');
            setupReportScreen(tasksFromStorage);
        }
    };
}

/**
 * 設定画面の表示とデータ更新を行う
 */
function showSettingsScreen() {
    // まず画面を切り替える
    showScreen('screen-settings');

    // 現在保存されているニックネームを取得して入力欄に表示する
    const nicknameInput = document.getElementById('setting-nickname-input');
    const currentNickname = localStorage.getItem('nickname') || '';
    if (nicknameInput) {
        nicknameInput.value = currentNickname;
    }
}

// ===============================================
// Phase3-X: フェイク通知UI ロジック
// ===============================================

/**
 * LINE風のフェイク通知バナーを表示する
 * @param {string} sender - 送信者名
 * @param {string} message - メッセージ本文
 * @param {string} iconSrc - プロフィールアイコンの画像パス
 */
/**
 * LINE風のフェイク通知バナーを表示し、クリックイベントを設定する
 * @param {string} sender - 送信者名
 * @param {string} message - メッセージ本文
 * @param {string} iconSrc - プロフィールアイコンの画像パス
 * @param {string} notificationType - 通知の種類 ('periodic' or 'onee')
 */
function showFakeNotification(sender, message, iconSrc, notificationType) {
    const banner = document.getElementById('fake-notification-banner');
    const senderEl = document.getElementById('notification-sender');
    const messageEl = document.getElementById('notification-message');
    const iconEl = document.getElementById('notification-icon');

    if (!banner || !senderEl || !messageEl || !iconEl) {
        console.error('フェイク通知の要素が見つかりません。');
        return;
    }
    
    // --- 既存の処理 ---
    senderEl.textContent = sender;
    messageEl.textContent = message;
    iconEl.src = iconSrc;
    playSE('se_line_receive.mp3');
    banner.classList.add('show');

    // 5秒後に自動で消えるタイマーを設定
    const hideTimer = setTimeout(() => {
        banner.classList.remove('show');
    }, 5000);

    // ★★★ ここからが追加・変更箇所 ★★★
    // 既存のクリックイベントを一旦リセット（重要）
    const newBanner = banner.cloneNode(true);
    banner.parentNode.replaceChild(newBanner, banner);

    // 新しいバナー要素にクリックイベントを設定
    newBanner.addEventListener('click', function() {
        // タイマーを解除して、クリック後にバナーが消えないようにする
        clearTimeout(hideTimer);
        // バナーを即座に隠す
        newBanner.classList.remove('show');

        // どの通知がタップされたかを localStorage に保存
        localStorage.setItem('tappedNotification', JSON.stringify({
            type: notificationType,
            sender: sender,
            message: message,
            icon: iconSrc
        }));

        // 瞬き演出を挟んでLINE画面へ遷移
        playBlinkVideo(() => {
            showScreen('screen-line');
        });
    }, { once: true }); // イベントが一度だけ実行されるように設定
}

/**
 * 現在の時刻に基づいて 'morning', 'afternoon', 'night' のいずれかの時間帯を返す
 * @returns {('morning'|'afternoon'|'night')}
 */
function getCurrentTimeOfDay() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return 'morning'; // 朝 (5:00 - 11:59)
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'afternoon'; // 昼 (12:00 - 17:59)
    } else {
        return 'night'; // 夜 (18:00 - 4:59)
    }
}

/**
 * ユーザーが返信スタンプを送信した演出を行う
 * @param {string} stampSrc - 送信するスタンプ画像のパス
 */
function appendUserStampMessage(stampSrc) {
    const chatArea = document.querySelector('#screen-line .line-chat');
    if (!chatArea) return;

    playSE('se_stamp_send.mp3'); // スタンプ送信音

    const messageDiv = document.createElement('div');
    // 既存の user スタイルを流用しつつ、スタンプ用に調整
    messageDiv.className = 'line-message user new'; 
    messageDiv.style.padding = '0';
    messageDiv.style.backgroundColor = 'transparent';
    messageDiv.style.width = 'fit-content'; // 内容に幅を合わせる

    const stampImg = document.createElement('img');
    stampImg.src = stampSrc;
    stampImg.style.width = '100px';
    stampImg.style.height = '100px';

    messageDiv.appendChild(stampImg);
    chatArea.appendChild(messageDiv);

    // チャットを最下部にスクロール
    chatArea.scrollTop = chatArea.scrollHeight;

    // アニメーションが終わったらクラスを削除
    messageDiv.addEventListener('animationend', () => {
        messageDiv.classList.remove('new');
    });
}

// ===============================================
// Cafe Scene Data (カフェシーンの設計図)
// ===============================================
const cafeEventData = {
    // ① 初回起動時のイベントデータ (ブロック0)
    'introduction_start': [
      {
        image: 'assets/images/mobu_v1_cafe_welcome.png', // 仮の画像名
        dialogue: '（ユーザー名）、いらっしゃいませ。今日も来てくれて嬉しいです。いつもの席でよろしいですか？'
      },
      {
        image: 'assets/images/mobu_v1_cafe_thinking.png', // 仮の画像名
        dialogue: 'あ、そういえば（ユーザー名）。前に『習慣作り』の話をされてましたよね？俺も最近ずっと考えているんです。また後で、何か面白い情報があったら教えてくださいね！'
      }
    ],
  
    // ② タスク選択後の動機付けイベントデータ (ブロックA〜C)
    'introduction_motivation': [
      {
        image: 'assets/images/mobu_v1_cafe_motivation_A.png', // 仮の画像名
        dialogue: 'あ、その音って今話題の『自分磨きアプリ』の音ですか？実は俺も、最近何かを習慣にしたくて気になってたんです。'
      },
      {
        image: 'assets/images/mobu_v1_cafe_motivation_B.png', // 仮の画像名
        dialogue: 'でも、俺にはアプリのデザインがかわいらしすぎて、結局ダウンロードはしなかったんだけど...やっぱり本気で自分磨きは始めたくて。'
      },
      {
        image: 'assets/images/mobu_v1_cafe_motivation_C.png', // 仮の画像名
        dialogue: 'だから…俺も一緒に自分磨き、始めていいですか？誰かと一緒なら頑張れる気がするんです。返信しなくてもいいので、習慣が俺に定着するまでは、（ユーザー名）にメッセージ送ってもいいですか？送らせてもらえたら嬉しいです。'
      }
    ],
  
    // ③ 初回タスク報告後のイベントデータ (ブロックD〜E)
    'first_report': [
      {
        image: 'assets/images/mobu_v1_cafe_report_A.png', // 仮の画像名
        dialogue: '（ユーザー名）、お疲れ様。そのスマホかわいいですね。あ、もしかして今、この前話してたアプリやってます...？俺、自分磨きの習慣スタートして思い始めたんだけど...自分磨きって、達成してもなかなか誰かに褒めてもらえないじゃないですか？それで、結果もなかなか目に見えなかったらモチベ落ちていきません？'
      },
      {
        image: 'assets/images/mobu_v1_cafe_report_B.png', // 仮の画像名
        dialogue: 'だから...タスクが終わって達成感を誰かに伝えたい時は、俺を頼ってほしい。いつでも俺に報告してください。一番に応援するから。自分磨きっていう共通の事で、俺も（ユーザー名）の役に立てたらなって！'
      },
      {
        image: 'assets/images/mobu_v1_cafe_report_C.png', // 仮の画像名
        dialogue: 'あ、俺用事あるの忘れてた！じゃあ、また！'
      }
    ]
};

/**
 * ユーザーが選択中のタスクに対応するセリフをランダムで1つ選んでIINEバナーを表示する
 */
function showPeriodicIineNotification() {
    const nickname = localStorage.getItem('nickname') || 'あなた';

    // ユーザーが選択中のタスクIDを取得
    const selectedTaskIds = Array.from(
        document.querySelectorAll('.task-select-checkbox:checked')
    ).map(el => el.id);

    if (selectedTaskIds.length === 0) return;

    // 選択中タスクに対応するセリフだけに絞る
    const candidates = periodicNotificationDialogues.filter(d =>
        selectedTaskIds.includes(d.taskId)
    );
    if (candidates.length === 0) return;

    // 表示済みリストを取得
    const seenKey = 'iine_seen_indices';
    let seen = JSON.parse(localStorage.getItem(seenKey) || '[]');

    // 未表示のものに絞る。全部見たらリセット
    let unseen = candidates.filter((_, i) => !seen.includes(candidates.indexOf(_)));
    // ※インデックスはperiodicNotificationDialogues全体の位置で管理
    const candidateIndices = candidates.map(d => periodicNotificationDialogues.indexOf(d));
    const unseenIndices = candidateIndices.filter(i => !seen.includes(i));

    let chosenIndex;
    if (unseenIndices.length === 0) {
        // 全種表示済み → リセット
        seen = [];
        localStorage.setItem(seenKey, JSON.stringify(seen));
        chosenIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];
    } else {
        chosenIndex = unseenIndices[Math.floor(Math.random() * unseenIndices.length)];
    }

    // 表示済みに追加
    seen.push(chosenIndex);
    localStorage.setItem(seenKey, JSON.stringify(seen));

    const chosen = periodicNotificationDialogues[chosenIndex];

    // ニックネーム置換
    const message = chosen.text.replace(/\$\{nickname\}/g, nickname);

    // タイムスタンプをセット
    const timestampEl = document.getElementById('notification-timestamp');
    if (timestampEl) timestampEl.textContent = chosen.time;

    // バナー表示
    showFakeNotification('モブ君', message, 'assets/images/mobu_icon_v1.png', 'periodic');
}