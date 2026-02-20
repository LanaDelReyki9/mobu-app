// ===============================================
// Audio Control (音響演出)
// ===============================================

/**
 * SE（効果音）を再生する（仮実装）
 * @param {string} fileName 再生したい音声ファイル名
 */
function playSE(fileName) {
    console.log(`[Audio] SE再生: ${fileName}`);
    // 将来ここに音声再生ライブラリのコードを追加
}

/**
 * BGM（背景音楽）を再生する（仮実装）
 * @param {string} fileName 再生したい音声ファイル名
 * @param {boolean} loop ループ再生するかどうか
 */
function playBGM(fileName, loop = false) {
    console.log(`[Audio] BGM再生: ${fileName} (ループ: ${loop})`);
    // 将来ここに音声再生ライブラリのコードを追加
}

/**
 * 全ての音を停止する（仮実装）
 */
function stopAllSounds() {
    console.log('[Audio] 全ての音を停止');
    // 将来ここに音声停止ライブラリのコードを追加
}


// ===============================================
// Router & Screen Control (画面遷移と演出)
// ===============================================

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
            playSE('se_line_receive.mp3'); // LINE受信音を再生
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
 * 指定されたIDの画面を表示する
 * @param {string} screenId 表示したい画面のID
 */
function showScreen(screenId) {
    stopAllSounds(); // 画面遷移時に全ての音を停止

    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);

        // --- 画面ごとの初期化処理 ---
        if (screenId === 'screen-line') {
            const chatArea = document.querySelector('#screen-line .line-chat');
            chatArea.innerHTML = '';
            
            const reportedTask = localStorage.getItem('currentReportTask');

            appendLineMessage('user', `「${reportedTask}」を完了！`, 500);
            appendLineMessage('mobu', `お疲れ様です！「${reportedTask}」を達成したんですね、すごいです！`, 1500);

            setTimeout(() => {
                if (Math.random() < 0.5) { 
                    startMoodSharing();
                } else {
                    console.log("気分共有イベントは発生しませんでした。");
                    checkAndSetupEvent();
                }
            }, 2000);
        } else if (screenId === 'screen-cafe') {
            
            
            
            playBGM('bgm_cafe_ambience.mp3', true);
            const totalTasks = getTotalTasksCompleted();
            if (totalTasks >= 10 && totalTasks < 20) {
                handleCafeEvent(10); // 10回達成イベントを開始
            } else if (totalTasks >= 20 && totalTasks < 30) {
                handleCafeEvent(20); // 20回達成イベントを開始
            }
        } else if (screenId === 'screen-ending') {
            handleEndingDialogue();
        }
    }
}

/**
 * 未再生のプロフィール演出があれば再生する (デバッグ版)
 */
function playProfileRewardAnimationIfNeeded() {
    console.log("--- playProfileRewardAnimationIfNeeded が呼び出されました ---");

    const totalTasks = getTotalTasksCompleted();
    const modal = document.getElementById('reward-modal');
    const teddyImage = document.getElementById('reward-teddy-image');

    if (!modal || !teddyImage) {
        console.error("デバッグ: モーダル用のHTML要素が見つかりません。処理を中断します。");
        return;
    }

    const hasSeen10 = hasProfileRewardBeenSeen(10);
    console.log(`デバッグ: 現在の達成回数: ${totalTasks}, 10回再生済みか: ${hasSeen10}`);

    let milestoneToPlay = 0;

    if (totalTasks >= 10 && !hasSeen10) {
        milestoneToPlay = 10;
    } else if (totalTasks >= 20 && !hasProfileRewardBeenSeen(20)) {
        milestoneToPlay = 20;
    }

    if (milestoneToPlay > 0) {
        // 1. アニメーションの準備
        const theme = `t${milestoneToPlay / 10}`;
        const imageName = `ui_teddy_${theme}_give.png`;
        const imagePath = `assets/images/${imageName}`;

        teddyImage.src = imagePath;

        // 2. 演出を開始する
        modal.classList.add('active');

        // 3. 少し待ってからアニメーションを開始するクラスを付与
        setTimeout(() => {
            teddyImage.classList.add('animate');
            console.log("アニメーション開始！");
        }, 100); // 100ミリ秒後に開始

        // ★重要：演出を見たと記録する
        markProfileRewardAsSeen(milestoneToPlay);

        // 仮：5秒後に演出を終了する
        setTimeout(() => {
            modal.classList.remove('active');
            teddyImage.classList.remove('animate'); // クラスをリセット
            console.log("演出終了");
        }, 5000);

    } else {
        console.log("デバッグ: 再生する演出はありませんでした。");
    }
}

/**
 * プロフィール画面の表示とデータ更新を行う
 */
function showProfileScreen() {
    // 他のすべての画面を非表示にする
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // プロフィール画面だけを表示する
    const profileScreen = document.getElementById('screen-profile');
    if (profileScreen) {
        profileScreen.classList.add('active');
    } else {
        console.error("エラー: プロフィール画面が見つかりません。");
        return;
    }

    // --- データの表示更新 ---
    const nicknameEl = document.getElementById('profile-nickname');
    const totalTasksEl = document.getElementById('profile-total-tasks');
    const totalDaysEl = document.getElementById('profile-total-days');
    const progressTextEl = document.getElementById('profile-progress');

    const nickname = localStorage.getItem('nickname') || 'ななしさん';
    const totalTasks = getTotalTasksCompleted();

    nicknameEl.textContent = nickname;
    totalTasksEl.textContent = totalTasks;
    totalDaysEl.textContent = 0; // 仮置き

    const nextMilestone = (Math.floor(totalTasks / 10) + 1) * 10;
    if (totalTasks >= 40) {
         progressTextEl.textContent = '全てのブーケを受け取りました！';
    } else if (totalTasks < 10){
         const remaining = 10 - totalTasks;
         progressTextEl.textContent = `次のブーケまで あと ${remaining} 回`;
    }
    else {
        const remaining = nextMilestone - totalTasks;
        progressTextEl.textContent = `次のブーケまで あと ${remaining} 回`;
    }
    
 

    // --- テディベアUIの達成状況を更新 ---
    const teddyBears = document.querySelectorAll('.teddy-bear-placeholder');
    teddyBears.forEach(bear => {
        const milestone = parseInt(bear.dataset.milestone, 10);
        if (totalTasks >= milestone) {
            bear.classList.add('achieved');
            console.log(`${milestone}回達成済みのため、テディベアをachieved状態にしました。`);
        } else {
            bear.classList.remove('achieved');
        }
    });

    console.log("プロフィール画面の表示とデータ更新が完了しました。");
}

/**
 * 瞬き動画を再生し、指定のタイミングでコールバックを実行する
 * @param {function} onDarkMoment 動画が暗転したタイミングで実行する関数
 */
function playBlinkVideo(onDarkMoment) {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('blink-video');

    if (!overlay || !video) {
        console.warn("動画が見つかりません。通常遷移します。");
        if (onDarkMoment) onDarkMoment();
        return;
    }

    playSE('se_blink_start.mp3'); // 瞬き開始音
    overlay.classList.add('active');
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("動画再生エラー:", error);
            if (onDarkMoment) onDarkMoment();
        });
    }

    setTimeout(() => {
        if (onDarkMoment) onDarkMoment();
    }, 500);

    video.onended = () => {
        playSE('se_blink_end.mp3'); // 瞬き終了音
        overlay.classList.remove('active');
    };
}

/**
 * 暗転（フェード）による画面遷移演出
 * @param {function} onDarkMoment 暗転が完了したタイミングで実行する関数
 */
function playFadeTransition(onDarkMoment) {
    const overlay = document.getElementById('fade-overlay');
    if (!overlay) {
        console.warn("暗転オーバーレイが見つかりません。通常遷移します。");
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

    stamps.forEach(stamp => {
        const newStamp = stamp.cloneNode(true);
        stamp.parentNode.replaceChild(newStamp, stamp);
        
        newStamp.addEventListener('click', () => {
            handleMoodStampClick(newStamp.textContent);
        }, { once: true });
    });
}

/**
 * 気分スタンプがクリックされたときの処理
 * @param {string} mood 選択された気分のテキスト
 */
function handleMoodStampClick(mood) {
    const inputBar = document.getElementById('line-input-bar');
    const stampSelector = document.getElementById('mood-stamp-selector');

    playSE('se_stamp_send.mp3');
    appendLineMessage('user', mood, 300);

    let reply = "";
    switch (mood) {
        case '元気': reply = "元気なんですね！よかったです！"; break;
        case '嬉しい': reply = "何か嬉しいことがあったんですね！"; break;
        default: reply = `${mood}、なんですね。教えてくれてありがとうございます。`; break;
    }
    appendLineMessage('mobu', reply, 1300);

    setTimeout(() => {
        stampSelector.style.display = 'none';
        inputBar.style.display = 'block';

        checkAndSetupEvent();
    }, 1800);
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

    const milestones = [10, 20, 30, 40]; // 判定する節目
    let eventTriggeredMilestone = 0; // どのイベントが発生したかを記録する変数

    // どの節目を超えたかをチェック
    for (const milestone of milestones) {
        if (previousTotal < milestone && currentTotal >= milestone) {
            eventTriggeredMilestone = milestone;
            break; // 最初に見つかったイベントだけを発生させる
        }
    }

    // イベントが発生した場合のみUIを作成
    if (eventTriggeredMilestone > 0) {
        console.log(`イベント発生！ ${eventTriggeredMilestone}回目の節目を超えました。`);
        
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

    // イベントの種類に応じてセリフをセット
    if (milestone === 10) {
        dialogues = [
            "あ、（ユーザー名）！来てくれてありがとうございます。えーっと...その...髪、少し切ったんですけど...似合ってます？",
            "10個タスク達成、本当におめでとうございます！俺も無事に習慣が定着しました。",
            "これは、そのお祝いといいますか...試作品のスイーツをサービスさせてもらいますね。",
        ];
        // B-3誘導セリフの追加判定
        if (!hasProfileRewardBeenSeen(10)) {
            dialogues.push("そういえば、10タスク完了するごとに可愛いイベント演出があるらしいですよ。もうアプリのプロフィール画面見てみました?");
        }
    } else if (milestone === 20) {
        // 【ステップ3】 誘導ロジックを追加
        const nickname = localStorage.getItem('nickname') || 'あなた';
        dialogues = [
            `${nickname}、来てくれたんですね、ありがとうございます。その……メガネやめてコンタクトにしてみたんですけど……どうですか？ ずっと変えたいなって思ってたんですよ。`,
            `それはそうと20回達成、本当にお疲れさまです。${nickname}が頑張ってるのを見てると、俺までなんだか力が湧いてくるんですよ。……その…これ、ささやかですが、感謝の気持ちです。`,
            `${nickname}がいつも頼んでる紅茶の傾向、俺、覚えてますから。これは絶対気に入ってくれると思って。ぜひ試してみてほしいな。`,
            `……また、頑張った話、聞かせてくださいね。俺も、${nickname}に負けないように、次の一歩を進めるから。`
        ];
    
        // B-3誘導セリフの追加判定 (10回目の演出を見ていない場合のみ)
        if (!hasProfileRewardBeenSeen(10)) {
            dialogues.push("あ、そうだ。10タスクごとにプロフィール画面でかわいい演出があるらしいって話、覚えてます？俺、この前友達にその画面見せてもらったんだけど、すごくかわいかったですよ");
        }
    }

    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];
    
    // 画面クリックで会話を進行させる
    cafeScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
        } else {
            // 全ての会話が終了したら
            cafeScreen.onclick = null; // クリックイベントを解除
            console.log(`${milestone}回達成イベント終了。ホーム画面に戻ります。`);
            // ここでプレゼント獲得画面(C-3)へ遷移する処理が入るが、今回はスキップ
            playBlinkVideo(() => showScreen('screen-home'));
        }
    };
}