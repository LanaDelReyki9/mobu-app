// ===============================================
// UI Component: Video Blink Control (動画瞬き)
// ===============================================

function playBlinkVideo(onDarkMoment, onBlinkStart = null, onBlinkEnd = null) {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('blink-video');

    if (!overlay || !video) {
        console.warn("動画が見つかりません。通常遷移します。");
        if (onDarkMoment) onDarkMoment();
        return;
    }

    // 1. オーバーレイを表示して動画再生開始
    overlay.classList.add('active');
    video.currentTime = 0;

    // 瞬き開始SE
    if (onBlinkStart) onBlinkStart();

    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("動画再生エラー:", error);
            if (onDarkMoment) onDarkMoment();
        });
    }

    // 2. 「真っ暗になるタイミング」で画面遷移を実行
    setTimeout(() => {
        if (onDarkMoment) onDarkMoment();
    }, 500);

    // 3. 動画終了時にオーバーレイを隠す
    video.onended = () => {
        overlay.classList.remove('active');
        // 瞬き完了SE
        if (onBlinkEnd) onBlinkEnd();
    };
}

// ===============================================
// 音響再生汎用関数
// ===============================================
function playSound(soundId) {
    console.log(`[DEBUG] Sound requested: ${soundId}`);
    // ここに実際のAudioオブジェクト生成・再生ロジックを追加します
    // 例:
    // if (soundId === 'se_tap_general') {
    //     const audio = new Audio('assets/se_tap_general.mp3');
    //     audio.play();
    // }
    // if (soundId === 'se_task_complete_on') {
    //     const audio = new Audio('assets/se_task_complete_on.mp3');
    //     audio.play();
    // }
    // ...
}

// ===============================================
// ユーティリティ関数
// ===============================================
function replaceNickname(text) {
    const nickname = localStorage.getItem('nickname') || 'あなた';
    return text.replace(/（ユーザー名）/g, nickname);
}

// ===============================================
// アプリ本体ロジック
// ===============================================

// 画面遷移関数
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// 一意のユーザーID生成
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ホーム画面更新
function updateHomeTasks() {
    const storedTasks = localStorage.getItem('selectedTasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const homeLabels = document.querySelectorAll('.task-chip-home label');
        const homeInputs = document.querySelectorAll('.task-chip-home input');

        tasks.forEach((taskName, index) => {
            if (homeLabels[index]) homeLabels[index].textContent = taskName;
            if (homeInputs[index]) {
                homeInputs[index].value = taskName;
                homeInputs[index].checked = false; // チェックをリセット
            }
        });
    }
}

// バリデーションと初期化
const nicknameInput = document.getElementById('nickname-input');
const errorMessage = document.getElementById('error-message');
const nameScreenButton = document.querySelector('#screen-name .btn-primary');

if (nicknameInput) {
    nicknameInput.addEventListener('input', function() {
        const value = this.value;
        const invalidChars = /[#@%＃＠％]/u;
        if (invalidChars.test(value)) {
            errorMessage.textContent = '絵文字や特殊記号は使えません';
            nameScreenButton.disabled = true;
            return;
        }
        if (value.length === 0 || value.length > 10) {
            errorMessage.textContent = value.length > 10 ? '10文字以内で' : '';
            nameScreenButton.disabled = true;
            return;
        }
        errorMessage.textContent = '';
        nameScreenButton.disabled = false;
    });

    nameScreenButton.addEventListener('click', function() {
        const nickname = nicknameInput.value.trim();
        if (nickname.length === 0 || nickname.length > 10) return;

        localStorage.setItem('nickname', nickname);
        if (!localStorage.getItem('userId')) {
            localStorage.setItem('userId', generateUserId());
        }
        // 初回のみA-3タスク選択へ遷移、その後カフェ画面へ
        playBlinkVideo(() => {
            showScreen('screen-cafe');
            startCafeSceneInitial(); // 初回カフェシーン開始
        }, () => playSound('se_blink_start'), () => playSound('se_blink_end'));
    });
}

// タスク選択画面
const taskCheckboxes = document.querySelectorAll('#screen-task-select input[type="checkbox"]');
const taskSelectButton = document.getElementById('task-select-button');

taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkedCount = document.querySelectorAll('#screen-task-select input[type="checkbox"]:checked').length;
        if (checkedCount > 3) {
            this.checked = false;
            return;
        }
        if (taskSelectButton) {
            taskSelectButton.disabled = (checkedCount !== 3);
        }
    });
});

if (taskSelectButton) {
    taskSelectButton.addEventListener('click', function() {
        const selectedTasks = [];
        taskCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedTasks.push(checkbox.parentElement.querySelector('label').textContent);
            }
        });
        if (selectedTasks.length !== 3) return;
        localStorage.setItem('selectedTasks', JSON.stringify(selectedTasks));
        updateHomeTasks();

        // 【資料4指摘💚①対応】サウンドON/OFFで分岐
        const isSoundOn = true; // 仮にサウンドONとする（設定画面で切り替えを実装予定）
        const onDarkMomentAction = () => {
            // タスク選択完了音
            if (isSoundOn) {
                playSound('se_task_complete_on');
            } else {
                // 擬音文字表示ロジック（後で実装）
                console.log("ピロン♪ (擬音文字表示)");
            }
            showScreen('screen-cafe');
            startCafeSceneMotivation(); // 動機付けカフェシーン開始
        };

        playBlinkVideo(onDarkMomentAction,
            () => playSound('se_blink_start'),
            () => playSound('se_blink_end')
        );
    });
}

// ホーム画面：完了ボタン制御
const homeTaskCheckboxes = document.querySelectorAll('.task-chip-home input[type="checkbox"]');
const homeCompleteButton = document.querySelector('#screen-home .btn-primary');

homeTaskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkedCount = document.querySelectorAll('.task-chip-home input[type="checkbox"]:checked').length;
        if (homeCompleteButton) {
            homeCompleteButton.disabled = (checkedCount === 0);
            if (checkedCount > 0) {
                playSound('se_checkbox_toggle'); // 余裕があれば
            }
        }
    });
});

// ★ Phase 3-2: 報告画面ロジック（分岐処理）
if (homeCompleteButton) {
    homeCompleteButton.addEventListener('click', function() {
        playSound('se_button_confirm_home'); // 次点
        // 1. チェックされたタスクを取得
        const completedTasks = [];
        document.querySelectorAll('.task-chip-home input[type="checkbox"]:checked').forEach(checkbox => {
            const taskName = checkbox.parentElement.querySelector('label').textContent;
            completedTasks.push(taskName);
        });

        // 累計タスク回数を更新
        let totalTasks = parseInt(localStorage.getItem('totalTasksCompleted') || '0');
        totalTasks += completedTasks.length;
        localStorage.setItem('totalTasksCompleted', totalTasks.toString());

        // 2. 瞬き演出開始
        playBlinkVideo(() => {
            // 3. 画面遷移と内容の書き換え
            setupReportScreen(completedTasks);
            showScreen('screen-report');
        }, () => playSound('se_blink_start'), () => playSound('se_blink_end'));
    });
}

// 報告画面のセットアップ関数
function setupReportScreen(completedTasks) {
    const thoughtText = document.getElementById('report-thought-text');
    const selectionArea = document.getElementById('report-selection-area');

    // エリアをリセット
    selectionArea.innerHTML = '';
    selectionArea.style.display = 'none';

    // クリックイベントの掃除（重複防止のため再生成）
    const screenReport = document.getElementById('screen-report');
    const newScreenReport = screenReport.cloneNode(true);
    screenReport.parentNode.replaceChild(newScreenReport, screenReport);

    // 再取得（DOMが書き換わったため）
    const currentScreen = document.getElementById('screen-report');
    const currentThoughtText = document.getElementById('report-thought-text');
    const currentSelectionArea = document.getElementById('report-selection-area');

    if (completedTasks.length === 1) {
        // パターンA: 1個だけ完了
        currentThoughtText.textContent = replaceNickname('よし、完了！モブ君に報告しよっと♪');

        // 画面全体タップでLINEへ
        currentScreen.onclick = function() {
            localStorage.setItem('currentReportTask', completedTasks[0]);
            navigateToNextScreenAfterReport(completedTasks[0]);
        };

    } else {
        // パターンB: 2個以上完了
        currentThoughtText.textContent = replaceNickname('今日は色々頑張ったけど、特に頑張った一つをモブ君に報告しよう。');
        currentSelectionArea.style.display = 'flex'; // 選択肢表示
        currentSelectionArea.style.flexDirection = 'column';
        currentSelectionArea.style.gap = '10px';
        currentSelectionArea.style.marginTop = '15px';

        // 選択肢ボタンを生成
        completedTasks.forEach(task => {
            const btn = document.createElement('button');
            btn.textContent = task;
            btn.className = 'cloud-btn'; // 後でCSSで装飾
            btn.style.padding = '10px 20px';
            btn.style.borderRadius = '20px';
            btn.style.border = '2px solid #B9DCC6';
            btn.style.backgroundColor = '#FFFFFF';
            btn.style.fontFamily = 'M PLUS Rounded 1c';
            btn.style.color = '#3F4342';
            btn.style.fontSize = '16px';

            btn.onclick = function(e) {
                e.stopPropagation(); // 親のクリックイベントを止める
                localStorage.setItem('currentReportTask', task);
                navigateToNextScreenAfterReport(task);
            };

            currentSelectionArea.appendChild(btn);
        });

        // 画面全体タップは無効化（ボタンを押させるため）
        currentScreen.onclick = null;
    }
}

// タスク報告後の遷移先を決定する関数
function navigateToNextScreenAfterReport(reportedTask) {
    const totalTasks = parseInt(localStorage.getItem('totalTasksCompleted') || '0');

    // ここで累計タスク回数に応じて分岐
    if (totalTasks === 10 || totalTasks === 20 || totalTasks === 30 || totalTasks === 40) {
        // イベント発生回数：カフェ画面へ遷移
        playBlinkVideo(() => {
            showScreen('screen-cafe');
            startCafeSceneEvent(totalTasks); // イベントカフェシーン開始
        }, () => playSound('se_blink_start'), () => playSound('se_blink_end'));
    } else {
        // 通常回：LINE画面へ遷移
        playBlinkVideo(() => {
            showScreen('screen-line');
            // LINE画面でのタスク報告処理を呼び出す（後で実装）
            // simulateLineReport(reportedTask);
        }, () => playSound('se_blink_start'), () => playSound('se_blink_end'));
    }
}

// ===============================================
// C-1: カフェ画面ロジック
// ===============================================

const cafeDialogText = document.getElementById('cafe-dialog-text');
const cafeDialogButton = document.getElementById('cafe-dialog-button');
const screenCafe = document.getElementById('screen-cafe');
let currentCafeDialogs = []; // 現在表示中のセリフブロック
let currentCafeDialogIndex = 0;

// カフェシーン開始（初回起動時 - 初対面）
function startCafeSceneInitial() {
    playSound('bgm_cafe_ambience'); // BGM開始

    const dialogs = [
        { text: "（ユーザー名）、いらっしゃいませ。今日も来てくれて嬉しいです。いつもの席でよろしいですか？", action: null },
        { text: "ありがとうございます。あ、そういえば（ユーザー名）。前に『習慣作り』の話をされてましたよね？俺も最近ずっと考えているんです。また後で、何か面白い情報があったら教えてくださいね！", action: () => {
            // モブ君が消える演出（現時点では単に画面タップで遷移）
            screenCafe.onclick = null; // タップイベントをリセット
            cafeDialogButton.style.display = 'none';
            // 瞬き演出後A-3へ
            playBlinkVideo(() => {
                showScreen('screen-task-select');
            }, () => playSound('se_blink_start'), () => playSound('se_blink_end'));
        }}
    ];
    showCafeDialog(dialogs);
}

// カフェシーン開始（タスク選択後の動機付け）
function startCafeSceneMotivation() {
    playSound('bgm_cafe_ambience'); // BGM開始

    const dialogs = [
        { text: "あ、その音って今話題の『自分磨きアプリ』の音ですか？実は俺も、最近何かを習慣にしたくて気になってたんです。", action: null },
        { text: "でも、俺にはアプリのデザインがかわいらしすぎて、結局ダウンロードはしなかったんだけど...やっぱり本気で自分磨きは始めたくて。", action: null },
        { text: "だから…俺も一緒に自分磨き、始めていいですか？誰かと一緒なら頑張れる気がするんです。返信しなくてもいいので、習慣が俺に定着するまでは、（ユーザー名）にメッセージ送ってもいいですか？送らせてもらえたら嬉しいです。", action: () => {
            // 連絡先交換成立後、通常タスク報告サイクルへ移行（LINE画面へ遷移）
            // 現時点では、そのままLINE画面へ遷移させる
            playSound('se_text_advance'); // タップ音
            playBlinkVideo(() => {
                showScreen('screen-line');
                // 初回LINEメッセージ表示ロジック（後で実装）
                playSound('se_line_receive'); // LINE通知音
            }, () => playSound('se_blink_start'), () => playSound('se_blink_end'));
        }}
    ];
    showCafeDialog(dialogs);
}

// カフェシーン開始（イベント発生時 - 10,20,30,40回達成）
function startCafeSceneEvent(totalTasks) {
    playSound('bgm_cafe_ambience'); // BGM開始
    let dialogs = [];

    // ここでtotalTasksに応じてセリフを分岐させる
    if (totalTasks === 10) {
        dialogs = [
            { text: "あ、（ユーザー名）！来てくれてありがとうございます。えーっと...その...髪、少し切ったんですけど...似合ってます？", action: null },
            { text: "なんかまだ自分でもこの髪、慣れないんですよね...ってそんな事はどうでもよくて！10個タスク達成、本当におめでとうございます！前にも伝えましたけど、俺も無事に習慣が定着しました。", action: null },
            { text: "これは、そのお祝いといいますか...他のお客様には内緒なんですが、今日のコーヒーに俺が作った試作品のスイーツをサービスさせてもらいますね。俺からのささやかな感謝の気持ちです。", action: null },
            { text: "...これからも、一緒に頑張りましょうね。", action: () => {
                // C-3（プレゼント獲得画面）へ遷移するロジック（後で実装）
                // 仮でLINE画面へ戻る
                playSound('se_text_advance'); // タップ音
                playBlinkVideo(() => {
                    showScreen('screen-line');
                }, () => playSound('se_blink_start'), () => playSound('se_blink_end'));
            }}
        ];
    } else {
        // 他の回数（20,30,40）のイベントセリフは後で追加
        dialogs = [
            { text: "（ユーザー名）！来てくれてありがとう。まだイベントセリフは用意できてないけど、また頑張ろうね！", action: () => {
                playSound('se_text_advance'); // タップ音
                playBlinkVideo(() => {
                    showScreen('screen-line');
                }, () => playSound('se_blink_start'), () => playSound('se_blink_end'));
            }}
        ];
    }
    showCafeDialog(dialogs);
}

// カフェのセリフ表示ロジック
function showCafeDialog(dialogs) {
    currentCafeDialogs = dialogs;
    currentCafeDialogIndex = 0;
    cafeDialogButton.style.display = 'block'; // ボタン表示

    const displayNextDialog = () => {
        if (currentCafeDialogIndex < currentCafeDialogs.length) {
            const dialog = currentCafeDialogs[currentCafeDialogIndex];
            cafeDialogText.textContent = replaceNickname(dialog.text);
            playSound('se_text_advance'); // タップ音 (セリフ更新時にも鳴らす)
            currentCafeDialogIndex++;
        } else {
            // 全てのセリフ表示後
            if (currentCafeDialogs[currentCafeDialogs.length - 1].action) {
                currentCafeDialogs[currentCafeDialogs.length - 1].action();
            }
        }
    };

    // ボタンが押されたら次のセリフを表示
    cafeDialogButton.onclick = function() {
        displayNextDialog();
    };

    // 最初のセリフを表示
    displayNextDialog();
}


// ウェルカム画面タップ
const welcomeScreen = document.getElementById('screen-welcome');
if (welcomeScreen) {
    welcomeScreen.addEventListener('click', function() {
        playSound('se_tap_general'); // 余裕があれば

        const nickname = localStorage.getItem('nickname');
        const selectedTasks = localStorage.getItem('selectedTasks');

        if (nickname && selectedTasks) {
            updateHomeTasks();
            showScreen('screen-home');
        } else {
            showScreen('screen-name');
        }
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    updateHomeTasks();

    // 初回起動時のフロー調整
    // nicknameもselectedTasksも無い場合のみwelcomeを表示
    const nickname = localStorage.getItem('nickname');
    const selectedTasks = localStorage.getItem('selectedTasks');
    if (!nickname && !selectedTasks) {
        showScreen('screen-welcome');
    } else if (nickname && selectedTasks) {
        // すでに設定済みなら直接ホーム画面へ
        showScreen('screen-home');
    } else if (nickname && !selectedTasks) {
        // ニックネームはあるがタスク未選択ならタスク選択画面へ
        showScreen('screen-task-select');
    } else {
        // その他のイレギュラーな場合はウェルカムから
        showScreen('screen-welcome');
    }
});