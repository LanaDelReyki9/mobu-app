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
        if (screenId === 'screen-line') {
            // (LINE画面の処理は変更なし)
            const chatArea = document.querySelector('#screen-line .line-chat');
            chatArea.innerHTML = '';
            const reportedTask = localStorage.getItem('currentReportTask');
            appendLineMessage('user', `「${reportedTask}」を完了！`, 500);
            appendLineMessage('mobu', `お疲れ様です！「${reportedTask}」を達成したんですね、すごいです！`, 1500);
            setTimeout(() => {
                if (Math.random() < 0.5) {
                    startMoodSharing();
                } else {
                    checkAndSetupEvent();
                }
            }, 2000);
        } else if (screenId === 'screen-cafe') {
            // (カフェ画面の処理は変更なし)
            playBGM('bgm_cafe_ambience.mp3', true);
            const totalTasks = getTotalTasksCompleted();
            const appPhase = localStorage.getItem('appPhase');
            const isFirstReport = localStorage.getItem('isFirstReport');

            if (isFirstReport === 'true') {
                handleFirstReportDialogue();
            } else if (appPhase === 'introduction_motivation') {
                handleIntroductionDialogue('motivation');
            } else if (totalTasks >= 10 && totalTasks < 20) {
                handleCafeEvent(10);
            } else if (totalTasks >= 20 && totalTasks < 30) {
                handleCafeEvent(20);
            } else {
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
    const nickname = localStorage.getItem('nickname') || 'あなた';

    let dialogues = [];

    // セリフの種類に応じて、表示するテキストを準備する
    if (type === 'start') {
        // 資料4: 初登場セリフ
        dialogues = [
            `${nickname}、いらっしゃいませ。今日も来てくれて嬉しいです。いつもの席でよろしいですか？`,
            `ありがとうございます。あ、そういえば${nickname}。前に『習慣作り』の話をされてましたよね？俺も最近ずっと考えているんです。また後で、何か面白い情報があったら教えてくださいね！`
        ];
    } else if (type === 'motivation') {
        // 資料4: 動機付けセリフ
        dialogues = [
            `あ、その音って今話題の『自分磨きアプリ』の音ですか？実は俺も、最近何かを習慣にしたくて気になってたんです。`,
            `でも、俺にはアプリのデザインがかわいらしすぎて、結局ダウンロードはしなかったんだけど...やっぱり本気で自分磨きは始めたくて。`,
            `だから…俺も一緒に自分磨き、始めていいですか？誰かと一緒なら頑張れる気がするんです。返信しなくてもいいので、習慣が俺に定着するまでは、${nickname}にメッセージ送ってもいいですか？送らせてもらえたら嬉しいです。`
        ];
    }

    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];

    // 画面がクリックされるたびに次のセリフに進める処理
    cafeScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
        } else {
            // すべてのセリフが表示された後の処理
            cafeScreen.onclick = null; // もうクリックしても反応しないようにする
            if (type === 'start') {
                // 初対面セリフ終了後、タスク選択画面へ
                localStorage.setItem('appPhase', 'introduction_motivation');
                playBlinkVideo(() => showScreen('screen-task-select'));
            } else if (type === 'motivation') {
                // 動機付けセリフ終了後、ホーム画面へ（導入フェーズ完了）
                localStorage.setItem('appPhase', 'main');
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
    const nickname = localStorage.getItem('nickname') || 'あなた';

    // 仕様書に基づいたセリフを3つのブロックに分割
    const dialogues = [
        `${nickname}、お疲れ様。そのスマホかわいいですね。あ、もしかして今、この前話してたアプリやってます...？俺、自分磨きの習慣スタートして思い始めたんだけど...自分磨きって、達成してもなかなか誰かに褒めてもらえないじゃないですか？それで、結果もなかなか目に見えなかったらモチベ落ちていきません？`,
        `だから...タスクが終わって達成感を誰かに伝えたい時は、俺を頼ってほしい。いつでも俺に報告してください。一番に応援するから。自分磨きっていう共通の事で、俺も${nickname}の役に立てたらなって！`,
        `あ、俺用事あるの忘れてた！じゃあ、また！`
    ];

    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];

    // 画面がクリックされるたびに次のセリフに進める処理
    cafeScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
        } else {
            // すべてのセリフが表示された後の処理
            cafeScreen.onclick = null; // クリックイベントを無効化
            localStorage.removeItem('isFirstReport'); // 初回報告フラグを削除

            // 通常の報告フローに戻る
            // ホーム画面でチェックを入れたタスクを取得
            const homeCheckboxes = document.querySelectorAll('#screen-home .task-chip-home input[type="checkbox"]');
            const completedTasks = [];
            homeCheckboxes.forEach(checkbox => {
                 // この時点ではチェックは外れているが、完了ボタンを押した時のタスクを取得したい
                 // しかし、この方法では取得できないので、修正が必要。
                 // 一旦、仮でlocalStorageから読み込むようにする
            });
            
             // localStorageに保存した完了タスクを読み込む
            const tasksFromStorage = JSON.parse(localStorage.getItem('tempCompletedTasks') || '[]');

            // 報告画面へ遷移
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