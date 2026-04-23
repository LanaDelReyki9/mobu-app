// ===============================================
// Main Logic (イベントリスナーの登録)
// ===============================================
// ★追加: 二重押し防止フラグ
let isCompleting = false;
// ===============================================
// STEP 4-A: タスクID → カテゴリー背景色マップ
// ===============================================
const TASK_ICON_MAP = {
    'task-select-1':  'assets/images/icon_hotwater_24.svg',
    'task-select-2':  'assets/images/icon_snack_24.svg',
    'task-select-3':  'assets/images/icon_fruits_24.svg',
    'task-select-4':  'assets/images/icon_phone_24.svg',
    'task-select-5':  'assets/images/icon_clean_24.svg',
    'task-select-6':  'assets/images/icon_thanks_24.svg',
    'task-select-7':  'assets/images/icon_stretch_24.svg',
    'task-select-8':  'assets/images/icon_stairs_24.svg',
    'task-select-9':  'assets/images/icon_posture_24.svg',
    'task-select-10': 'assets/images/icon_skincare_24.svg',
    'task-select-11': 'assets/images/icon_lips_24.svg',
    'task-select-12': 'assets/images/icon_breath_24.svg',
};
const TASK_CATEGORY_MAP = {
    'task-select-1':  'var(--chip-color-diet)',
    'task-select-2':  'var(--chip-color-diet)',
    'task-select-3':  'var(--chip-color-diet)',
    'task-select-4':  'var(--chip-color-lifestyle)',
    'task-select-5':  'var(--chip-color-lifestyle)',
    'task-select-6':  'var(--chip-color-mental)',
    'task-select-7':  'var(--chip-color-shapeup)',
    'task-select-8':  'var(--chip-color-shapeup)',
    'task-select-9':  'var(--chip-color-shapeup)',
    'task-select-10': 'var(--chip-color-beauty)',
    'task-select-11': 'var(--chip-color-beauty)',
    'task-select-12': 'var(--chip-color-mental)',
};
function updateHomeTasks() {
    isCompleting = false;
    const storedTasks = localStorage.getItem('selectedTasks');
    const storedIds   = JSON.parse(localStorage.getItem('selectedTaskIds') || '[]');
    if (!storedTasks) return;

    const tasks = JSON.parse(storedTasks);
    const chips = document.querySelectorAll('.task-chip-home');
    const completed = getCompletedToday();

    chips.forEach((chip, index) => {
        const label = chip.querySelector('.chip-label');
        const iconWrap = chip.querySelector('.chip-icon-wrap');

        if (label && tasks[index]) label.textContent = tasks[index];

        const taskId = storedIds[index];
        if (taskId && TASK_CATEGORY_MAP[taskId]) {
            chip.style.backgroundColor = TASK_CATEGORY_MAP[taskId];
        }

        if (completed && completed.taskIndices.includes(index)) {
            chip.classList.add('completed');
            iconWrap.innerHTML = '';
chip.classList.add('checked');
        } else {
            chip.classList.remove('completed', 'checked');
            iconWrap.innerHTML = '';
            const iconPath = TASK_ICON_MAP[taskId];
            if (iconPath) {
                const img = document.createElement('img');
                img.src = iconPath;
                img.className = 'chip-icon-home';
                img.alt = '';
                iconWrap.appendChild(img);
            }
        }
    });
}

// ===============================================
// STEP 4-B: お花SVGを生成する関数
// ===============================================
function createFlowerSVG() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 40 40');
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');

    // 茎（チェックマーク形）
    const check = document.createElementNS(ns, 'polyline');
    check.setAttribute('points', '8,22 16,30 32,12');
    check.setAttribute('stroke', '#7caf7c');
    check.setAttribute('stroke-width', '3');
    check.setAttribute('fill', 'none');
    check.setAttribute('stroke-linecap', 'round');
    check.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(check);

    // 花びら×5
    const petalAngles = [0, 72, 144, 216, 288];
    petalAngles.forEach(angle => {
        const ellipse = document.createElementNS(ns, 'ellipse');
        ellipse.setAttribute('cx', '20');
        ellipse.setAttribute('cy', '14');
        ellipse.setAttribute('rx', '4');
        ellipse.setAttribute('ry', '7');
        ellipse.setAttribute('fill', '#ffb7c5');
        ellipse.setAttribute('opacity', '0.85');
        ellipse.setAttribute('transform', `rotate(${angle} 20 20)`);
        svg.appendChild(ellipse);
    });

    // 花の中心
    const center = document.createElementNS(ns, 'circle');
    center.setAttribute('cx', '20');
    center.setAttribute('cy', '20');
    center.setAttribute('r', '5');
    center.setAttribute('fill', '#ffe066');
    svg.appendChild(center);

    return svg;
}

// ===============================================
// STEP 4-B: チップを完了状態にする関数
// ===============================================
function completeChip(chipEl) {
    if (chipEl.classList.contains('completed')) return;

    chipEl.classList.add('completed');

    // アイコンをお花に差し替え
    const iconWrap = chipEl.querySelector('.chip-icon-wrap');
iconWrap.innerHTML = '';
chipEl.classList.add('checked');

    // Clear! を表示してフェードアウト
   const clearText = chipEl.querySelector('.chip-clear-text');
clearText.classList.add('show');
setTimeout(() => {
    clearText.classList.remove('show');
}, 2000);
}
// DOMが読み込まれたらアプリを初期化
document.addEventListener('DOMContentLoaded', function() {
    generateUserId(); //
    initializeNotificationFeatures();
    
    checkAbandonment(); 
 

    // ★★★ ここからが最後の仕上げ ★★★
    // Service Workerからメッセージを受け取るリスナー
    navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'notification-clicked') {
            console.log('アプリが開いている状態で通知クリックを検知！');
            handleOSNotificationClick(event.data.notificationType, event.data.message);
        }
    });

    // アプリ起動時にURLのハッシュをチェック
    if (window.location.hash) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const type = params.get('notificationType');
        const message = params.get('message');
        if (type && message) {
            console.log('URLハッシュから通知クリックを検知！');
            handleOSNotificationClick(type, decodeURIComponent(message));
            // 処理後にハッシュをクリアしてリロードによる再実行を防ぐ
            history.replaceState(null, null, ' ');
        }
    } else {
        // 通常起動時（通知クリック以外）の場合のみ、フェイク通知を表示
        handleAppLaunchNotification();
    }
    // ★★★ ここまでが最後の仕上げ ★★★
    
    generateUserId();
    updateHomeTasks();
    const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('from') === 'notification') {
    history.replaceState(null, null, window.location.pathname);
    const appPhase = localStorage.getItem('appPhase');
    if (appPhase === 'main_loop') {
        updateHomeTasks();
        showScreen('screen-home');
        return;
    }
}
showSplashScreen();

    // --- 各画面のイベントリスナーを登録 ---

    // A-1: ウェルカム画面
    const welcomeScreen = document.getElementById('screen-welcome');
    if (welcomeScreen) {
        welcomeScreen.addEventListener('click', function() {
            updateLastLoginDate();
            const appPhase = localStorage.getItem('appPhase');
            const nickname = localStorage.getItem('nickname');

            if (appPhase === 'main_loop') {
                updateHomeTasks();
                showScreen('screen-home');
            } else if (nickname) {
                if (appPhase === 'introduction_task_select') {
                    showScreen('screen-task-select');
                } else if (appPhase === 'introduction_motivation') {
                    localStorage.setItem('appPhase', 'main_loop');
                    updateHomeTasks();
                    showScreen('screen-home');
               } else {
    const selectedTasks = localStorage.getItem('selectedTasks');
    if (!selectedTasks) {
        showScreen('screen-task-select');
    } else {
        updateHomeTasks();
        showScreen('screen-home');
    }
}
            } else {
                showScreen('screen-name');
            }
            });
    }

    // A-2: 名前入力画面
    const nameScreen = document.getElementById('screen-name');
    if (nameScreen) {
        const nicknameInput = nameScreen.querySelector('#nickname-input');
        const errorMessage = nameScreen.querySelector('#error-message');
        const nameScreenButton = nameScreen.querySelector('.btn-primary');

        if (nicknameInput && nameScreenButton) {
            nicknameInput.addEventListener('input', function() {
                const value = this.value;
                const invalidChars = /[#@%＃＠％]/u;
                if (invalidChars.test(value)) {
                    errorMessage.textContent = '絵文字や特殊記号は使えません';
                    nameScreenButton.disabled = true;
                    return;
                }
                if (value.length === 0 || value.length > 10) {
                    errorMessage.textContent = value.length > 10 ? '10文字以内で入力してください' : '';
                    nameScreenButton.disabled = true;
                    return;
                }
                errorMessage.textContent = '';
                nameScreenButton.disabled = false;
            });

            nameScreenButton.addEventListener('click', function() {
                if (this.disabled) return;
                updateLastLoginDate();
                const nickname = nicknameInput.value.trim();
                localStorage.setItem('nickname', nickname);
                playBlinkVideo(() => {
                    showScreen('screen-cafe');
                });
            });
        }
    }

    // A-3: タスク選択画面
    const taskSelectScreen = document.getElementById('screen-task-select');
    if (taskSelectScreen) {
        const taskCheckboxes = taskSelectScreen.querySelectorAll('input[type="checkbox"]');
        const taskSelectButton = taskSelectScreen.querySelector('.btn-primary');

        if (taskCheckboxes.length > 0 && taskSelectButton) {
            taskCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    updateLastLoginDate();
                    const checkedCount = taskSelectScreen.querySelectorAll('input[type="checkbox"]:checked').length;
                    if (checkedCount > 3) {
                        this.checked = false;
                    }
                    taskSelectButton.disabled = (taskSelectScreen.querySelectorAll('input[type="checkbox"]:checked').length !== 3);
                });
            });

            taskSelectButton.addEventListener('click', function() {
                if (this.disabled) return;
                updateLastLoginDate();

                const selectedTasks = [];
                const selectedTaskIds = [];
                taskSelectScreen.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                    selectedTasks.push(checkbox.parentElement.querySelector('label').textContent.trim());
                    selectedTaskIds.push(checkbox.id);
                });
                localStorage.setItem('selectedTasks', JSON.stringify(selectedTasks));
                localStorage.setItem('selectedTaskIds', JSON.stringify(selectedTaskIds));
                updateHomeTasks();
                
                schedulePeriodicNotifications(selectedTaskIds);
             

                const appPhase = localStorage.getItem('appPhase');
                if (appPhase === 'main_loop') {
                    alert('タスクを変更しました。');
                    showScreen('screen-home');
                } else {
                    playBlinkVideo(() => {
                        showScreen('screen-cafe');
                    }, true);
                }
            });
        }
    }

   // B-1: ホーム画面
   const homeScreen = document.getElementById('screen-home');
   if (homeScreen) {
       const homeChips = homeScreen.querySelectorAll('.task-chip-home');
       const homeCompleteButton = homeScreen.querySelector('.btn-primary');
       const profileIcon = document.getElementById('nav-profile-icon');
       const settingsIcon = document.getElementById('nav-settings-icon');
   
   
       // チップをタップしたらチェック状態をトグル（完了済みは無視）
       homeChips.forEach((chip) => {
           chip.addEventListener('click', function() {
            
               if (this.classList.contains('completed')) return;
               const checkbox = this.querySelector('.chip-checkbox');
               checkbox.checked = !checkbox.checked;
  const iconWrap = this.querySelector('.chip-icon-wrap');
if (checkbox.checked) {
    this.classList.add('checked');
    const clearText = this.querySelector('.chip-clear-text');
    clearText.classList.add('show');
    setTimeout(() => clearText.classList.remove('show'), 2000);
} else {
    this.classList.remove('checked');
}
               // 完了ボタンの活性制御（二重押し中も無効化するように強化）
               const checkedCount = homeScreen.querySelectorAll('.chip-checkbox:checked').length;
               homeCompleteButton.disabled = (checkedCount === 0 || isCompleting);
           });
        });
       // 完了ボタン
       homeCompleteButton.addEventListener('click', function() {
           // ★修正: 二重実行のガード
           if (this.disabled || isCompleting) return;
           isCompleting = true;
           this.disabled = true;
   
           try {
               updateLastLoginDate();
   
               // 今日の上限チェック（getGameDate基準）
               const today = getGameDate();
               const log = getAchievementLog();
               if ((log[today] || 0) >= 3) {
                   console.log("今日の上限に達しています");
                   return;
               }
   
               const completedTasks = [];
               const completedIndices = [];
   
               homeChips.forEach((chip, index) => {
                   const checkbox = chip.querySelector('.chip-checkbox');
                   if (checkbox.checked) {
                       completedTasks.push(chip.querySelector('.chip-label').textContent);
                       completedIndices.push(index);
                   }
               });
   
               // お花演出
               completedIndices.forEach(i => completeChip(homeChips[i]));
   
               // データ保存
               const currentTotal = getTotalTasksCompleted();
               setPreviousTotalTasks(currentTotal);
               addTasksCompleted(completedTasks.length);
               recordTodayAchievement(completedTasks.length);
   
               // 既存の完了済みインデックスとマージして保存
               const existing = getCompletedToday();
               const existingIndices = existing ? existing.taskIndices : [];
               const mergedIndices = [...new Set([...existingIndices, ...completedIndices])];
               saveCompletedToday(mergedIndices);
   
               renderCalendar(currentCalendarDate);
               
               // 画面遷移
               if (currentTotal === 0) {
                   localStorage.setItem('isFirstReport', 'true');
                   localStorage.setItem('tempCompletedTasks', JSON.stringify(completedTasks));
                   playBlinkVideo(() => { showScreen('screen-cafe'); });
               } else {
                   playBlinkVideo(() => { setupReportScreen(completedTasks); });
               }
   
           } catch (error) {
               console.error("完了処理中にエラーが発生しました:", error);
               // エラー時はボタンを再度押せるように戻す
               isCompleting = false;
               const checkedCount = homeScreen.querySelectorAll('.chip-checkbox:checked').length;
               homeCompleteButton.disabled = (checkedCount === 0);
           }
       });
   
       if (profileIcon) {
           profileIcon.addEventListener('click', function() {
               updateLastLoginDate();
               showProfileScreen();
               playProfileRewardAnimationIfNeeded();
           });
       }
   
       if (settingsIcon) {
           settingsIcon.addEventListener('click', function() {
               updateLastLoginDate();
               showSettingsScreen();
           });
       }
   }

    // C-2: LINE画面
    const lineBackIcon = document.querySelector('#screen-line .line-header img');
    if (lineBackIcon) {
        lineBackIcon.addEventListener('click', function() {
            updateLastLoginDate();
            showScreen('screen-home');
        });
    }

    // B-3: プロフィール画面
    const profileBackButton = document.getElementById('profile-back-button');
    if (profileBackButton) {
        profileBackButton.addEventListener('click', function() {
            updateLastLoginDate();
            showScreen('screen-home');
        });
    }
    
    // D-3: スタッフロール画面
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            resetAllData();
            playBlinkVideo(() => {
                showScreen('screen-welcome');
            });
        });
    }

    // A-4: 設定画面
    const settingsBackButton = document.getElementById('settings-back-button');
    if (settingsBackButton) {
        settingsBackButton.addEventListener('click', function() {
            updateLastLoginDate();
            showScreen('screen-home');
        });
    }

    const saveNicknameButton = document.getElementById('save-nickname-button');
    const resetTasksButton = document.getElementById('reset-tasks-button');
    const settingNicknameInput = document.getElementById('setting-nickname-input');

    if (saveNicknameButton && settingNicknameInput) {
        saveNicknameButton.addEventListener('click', function() {
            const newNickname = settingNicknameInput.value.trim();
            if (newNickname && newNickname.length <= 10) {
                localStorage.setItem('nickname', newNickname);
                alert('ニックネームを保存しました！');
            } else {
                alert('ニックネームは1文字以上10文字以内で入力してください。');
            }
        });
    }

    if (resetTasksButton) {
        resetTasksButton.addEventListener('click', function() {
            const isConfirmed = confirm('本当にタスクを選び直しますか？\nこれまでのタスク達成回数はリセットされませんので、ご安心ください。');
            if (isConfirmed) {
                showScreen('screen-task-select');
            }
        });
    }

// --- カレンダーのイベント設定（ここから） ---
const calTitleEl = document.getElementById('cal-title');
if (calTitleEl) {
    calTitleEl.addEventListener('click', (e) => {
        if (e.detail === 3) {
            const newVal = window.prompt('累積タスク数を入力してね', '8');
            if (newVal !== null) {
                localStorage.setItem('totalTasksCompleted', newVal);
                const today = getGameDate();
                const log = getAchievementLog();
                delete log[today];
                localStorage.setItem('achievementLog', JSON.stringify(log));
                location.reload();
            }
        }
    });
}

const calPrevEl = document.getElementById('cal-prev');
if (calPrevEl) {
    calPrevEl.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar(currentCalendarDate);
    });
}

const calNextEl = document.getElementById('cal-next');
if (calNextEl) {
    calNextEl.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar(currentCalendarDate);
    });
}

// カレンダーを現在の表示月で初期化
renderCalendar(currentCalendarDate || new Date());
// --- カレンダーのイベント設定（ここまで） ---

});


/**
 * OSネイティブ通知がクリックされたときにフェイク通知をトリガーする
 * @param {string} notificationType - 'periodic' または 'onee'
 * @param {string} message - 通知の本文
 */
function handleOSNotificationClick(notificationType, message) {
    const notificationMap = {
        'periodic': { type: 'periodic', sender: 'モブ君', icon: 'assets/images/mobu_icon_v1.png' },
        'onee': { type: 'onee', sender: 'モブ君', icon: 'assets/images/mobu_icon_v1.png' }, // アイコンは後で変更可能
        'test': { type: 'test', sender: 'テスト君', icon: 'assets/images/mobu_icon_v1.png' }
    };
    
    const info = notificationMap[notificationType];
    if (info) {
        showFakeNotification(info.sender, message, info.icon, info.type);
    }
}


/**
 * アプリ起動時の通知表示を管理する（通常起動時のみ）
 */
function handleAppLaunchNotification() {
    // 1日3回・30分インターバルの制限チェック
const iineKey = 'iine_display_log';
const now = Date.now();
const today = new Date().toISOString().split('T')[0];
let iineLog = JSON.parse(localStorage.getItem(iineKey) || '{"date":"","count":0,"lastTime":0}');

// 日付が変わっていたらリセット
if (iineLog.date !== today) {
    iineLog = { date: today, count: 0, lastTime: 0 };
}

// 3回以上表示済みなら終了
if (iineLog.count >= 3) return;

// 30分以内の再起動なら終了
if (now - iineLog.lastTime < 30 * 60 * 1000) return;
const iineKey = 'iine_display_log';
const now = Date.now();
const today = new Date().toISOString().split('T')[0];
let iineLog = JSON.parse(localStorage.getItem(iineKey) || '{"date":"","count":0,"lastTime":0}');

if (iineLog.date !== today) {
    iineLog = { date: today, count: 0, lastTime: 0 };
}

if (iineLog.count >= 3) return;

if (now - iineLog.lastTime < 30 * 60 * 1000) return;
    const mobuState = getMobuState();

    if (mobuState !== 'normal') {
        const dialogues = oneeNotificationDialogues[mobuState];
        if (!dialogues || dialogues.length === 0) return;
        const message = dialogues[Math.floor(Math.random() * dialogues.length)];
        iineLog.count += 1;
iineLog.lastTime = now;
localStorage.setItem(iineKey, JSON.stringify(iineLog));
        showFakeNotification('モブ君', message, 'assets/images/mobu_icon_v1.png', 'onee');
    } else {
        const storedTaskIds = JSON.parse(localStorage.getItem('selectedTaskIds') || '[]');
        if (storedTaskIds.length === 0) return;

        const nickname = localStorage.getItem('nickname') || 'あなた';

        // 選択中タスクに対応するセリフだけに絞る
        const candidates = periodicNotificationDialogues.filter(d =>
            storedTaskIds.includes(d.taskId)
        );
        if (candidates.length === 0) return;

        // 表示済み管理
        const seenKey = 'iine_seen_indices';
        let seen = JSON.parse(localStorage.getItem(seenKey) || '[]');
        const candidateIndices = candidates.map(d => periodicNotificationDialogues.indexOf(d));
        const unseenIndices = candidateIndices.filter(i => !seen.includes(i));

        let chosenIndex;
        if (unseenIndices.length === 0) {
            seen = [];
            localStorage.setItem(seenKey, JSON.stringify(seen));
            chosenIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];
        } else {
            chosenIndex = unseenIndices[Math.floor(Math.random() * unseenIndices.length)];
        }

        seen.push(chosenIndex);
        localStorage.setItem(seenKey, JSON.stringify(seen));

        const chosen = periodicNotificationDialogues[chosenIndex];
        const message = chosen.text.replace(/\$\{nickname\}/g, nickname);

        // タイムスタンプをセット
        const timestampEl = document.getElementById('notification-timestamp');
        if (timestampEl) timestampEl.textContent = chosen.time;
iineLog.count += 1;
iineLog.lastTime = now;
localStorage.setItem(iineKey, JSON.stringify(iineLog));
        showFakeNotification('モブ君', message, 'assets/images/mobu_icon_v1.png', 'periodic');
    }
}


// Service Workerと通知の初期化
async function initializeNotificationFeatures() {
    if (!('serviceWorker' in navigator)) return;
  
    try {
        const registration = await navigator.serviceWorker.register('/mobu-app/sw.js');
        console.log('Service Worker登録成功:', registration);
        document.addEventListener('DOMContentLoaded', async function() {
        setupForegroundMessageHandler();
        await requestNotificationPermission();
        });
    } catch (error) {
        console.error('初期化エラー:', error);
    }
}

// 定時通知の予約（FCMトークンをlocalStorageに保存するだけ）
function schedulePeriodicNotifications(taskIds) {
    const taskTimeMap = {
      'morning': ['task-select-1', 'task-select-3', 'task-select-10'],
      'afternoon': ['task-select-2', 'task-select-5', 'task-select-7', 'task-select-8', 'task-select-9', 'task-select-11'],
      'night': ['task-select-4', 'task-select-6', 'task-select-12']
    };
  
    const schedule = {};
    taskIds.forEach(id => {
      if (taskTimeMap.morning.includes(id)) schedule.morning = '07:30';
      if (taskTimeMap.afternoon.includes(id)) schedule.afternoon = '12:30';
      if (taskTimeMap.night.includes(id)) schedule.night = '22:30';
    });
  
    localStorage.setItem('notificationSchedule', JSON.stringify(schedule));
    console.log('通知スケジュールを保存しました:', schedule);
  }

  // 通知許可をユーザー操作後に求める
async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('通知許可が得られました。FCMトークンを取得します。');
      const { initializeFCM } = await import('./firebase-config.js');
      await initializeFCM();
    } else {
      console.log('通知が許可されませんでした。');
    }
  }

  /**
 * フラッシュ画面（世界B）を表示し、暗転＋瞬き音で世界Aへ遷移する
 */
  function showSplashScreen() {
    const fadeOverlay = document.getElementById('fade-overlay');

    const playBlink = () => {
        const blink = new Audio();
        blink.src = 'assets/sounds/blink.mp3';
        blink.onerror = () => { blink.src = 'assets/sounds/blink.webm'; };
        blink.play().catch(() => {});
    };

    showScreen('screen-splash');

    setTimeout(() => {
        // 1回目のパチッ＋暗転開始
        playBlink();
        fadeOverlay.classList.add('active');

        setTimeout(() => {
            // 暗転中にウェルカム画面へ切り替え
            showScreen('screen-welcome');

            setTimeout(() => {
                // 2回目のパチッ
                playBlink();

                setTimeout(() => {
                    // パチッの後に暗転解除
                    fadeOverlay.classList.remove('active');
                }, 200);

            }, 300);

        }, 500);

    }, 1000);
}
let currentCalendarDate = new Date();

function renderCalendar(date) {
    const totalTasks = getTotalTasksCompleted();

    // テーマ設定
    const themes = [
        { color: '#F2C9DB', dark: '#c97fa0' }, // ピンク (0-9)
        { color: '#D0E0FB', dark: '#6a8fd8' }, // ブルー (10-19)
        { color: '#FFF4D7', dark: '#c9a84c' }, // イエロー (20-29)
        { color: '#E6E6FA', dark: '#8a7fc9' }, // ラベンダー (30+)
    ];
    const themeIndex = Math.min(Math.floor(totalTasks / 10), 3);
    const theme = themes[themeIndex];

    // 月タイトル
    const year = date.getFullYear();
    const month = date.getMonth();
    document.getElementById('cal-title').textContent =
        `${year}年${month + 1}月`;

    // 達成ログ取得
    const log = getAchievementLog();

    // 日付セルを生成
    const container = document.getElementById('calendar-days');
    container.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = getGameDate();

    // 空白セル
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day empty';
        container.appendChild(empty);
    }

    // 日付セル
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const cell = document.createElement('div');
        cell.className = 'cal-day';
        if (dateStr === today) cell.classList.add('today');

        const dateNum = document.createElement('span');
        dateNum.className = 'cal-date';
        dateNum.textContent = d;
        cell.appendChild(dateNum);

        // 達成日はチューリップSVGを表示
        if (log[dateStr]) {
            const count = log[dateStr]; // 1〜3
            const size = count === 1 ? 12 : count === 2 ? 16 : 20;
const svg = createTulipSVG(theme.color, theme.dark, size);
cell.appendChild(svg);
        }

        container.appendChild(cell);
    }
}

function createTulipSVG(petalColor, stemColor, size) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 16 20');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size * 1.25);
    svg.setAttribute('class', 'cal-flower');

    // 茎
    const stem = document.createElementNS(ns, 'line');
    stem.setAttribute('x1', '8'); stem.setAttribute('y1', '20');
    stem.setAttribute('x2', '8'); stem.setAttribute('y2', '11');
    stem.setAttribute('stroke', stemColor);
    stem.setAttribute('stroke-width', '1.2');
    stem.setAttribute('stroke-linecap', 'round');
    svg.appendChild(stem);

    // 葉
    const leaf = document.createElementNS(ns, 'path');
    leaf.setAttribute('d', 'M8 15 Q5 13 4 10');
    leaf.setAttribute('stroke', stemColor);
    leaf.setAttribute('stroke-width', '1');
    leaf.setAttribute('fill', 'none');
    leaf.setAttribute('stroke-linecap', 'round');
    svg.appendChild(leaf);

    // 花びら（左）
    const petalL = document.createElementNS(ns, 'ellipse');
    petalL.setAttribute('cx', '6'); petalL.setAttribute('cy', '8');
    petalL.setAttribute('rx', '2.5'); petalL.setAttribute('ry', '4');
    petalL.setAttribute('fill', petalColor);
    petalL.setAttribute('transform', 'rotate(-15 6 8)');
    svg.appendChild(petalL);

    // 花びら（右）
    const petalR = document.createElementNS(ns, 'ellipse');
    petalR.setAttribute('cx', '10'); petalR.setAttribute('cy', '8');
    petalR.setAttribute('rx', '2.5'); petalR.setAttribute('ry', '4');
    petalR.setAttribute('fill', petalColor);
    petalR.setAttribute('transform', 'rotate(15 10 8)');
    svg.appendChild(petalR);

    // 花びら（中央）
    const petalC = document.createElementNS(ns, 'ellipse');
    petalC.setAttribute('cx', '8'); petalC.setAttribute('cy', '7');
    petalC.setAttribute('rx', '2.2'); petalC.setAttribute('ry', '4');
    petalC.setAttribute('fill', petalColor);
    svg.appendChild(petalC);

    return svg;
}