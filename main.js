// ===============================================
// Main Logic (イベントリスナーの登録)
// ===============================================

// DOMが読み込まれたらアプリを初期化
document.addEventListener('DOMContentLoaded', function() {
  
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
    
    showScreen('screen-welcome');

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
                } else {
                    showScreen('screen-cafe');
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
                requestNotificationPermission();

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
        const homeTaskCheckboxes = homeScreen.querySelectorAll('.task-chip-home input[type="checkbox"]');
        const homeCompleteButton = homeScreen.querySelector('.btn-primary');
        const profileIcon = document.getElementById('nav-profile-icon');
        const settingsIcon = document.getElementById('nav-settings-icon');

        if (homeTaskCheckboxes.length > 0 && homeCompleteButton) {
            homeTaskCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    updateLastLoginDate();
                    const checkedCount = homeScreen.querySelectorAll('.task-chip-home input[type="checkbox"]:checked').length;
                    homeCompleteButton.disabled = (checkedCount === 0);
                });
            });

            homeCompleteButton.addEventListener('click', function() {
                if (this.disabled) return;
                updateLastLoginDate();
                
                const completedTasks = [];
                homeScreen.querySelectorAll('.task-chip-home input[type="checkbox"]:checked').forEach(checkbox => {
                    completedTasks.push(checkbox.parentElement.querySelector('label').textContent);
                });

                const currentTotal = getTotalTasksCompleted();
                setPreviousTotalTasks(currentTotal);
                addTasksCompleted(completedTasks.length);

                if (currentTotal === 0) {
                    localStorage.setItem('isFirstReport', 'true');
                    localStorage.setItem('tempCompletedTasks', JSON.stringify(completedTasks));
                    playBlinkVideo(() => {
                        showScreen('screen-cafe');
                    });
                } else {
                    playBlinkVideo(() => {
                        setupReportScreen(completedTasks);
                    });
                }
                
                homeTaskCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                homeCompleteButton.disabled = true;
            });
        }

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
    // この関数は、OS通知経由"以外"で起動した時だけ呼ばれる
    const mobuState = getMobuState();

    if (mobuState !== 'normal') {
        const dialogues = oneeNotificationDialogues[mobuState];
        if (!dialogues || dialogues.length === 0) return;
        const message = dialogues[Math.floor(Math.random() * dialogues.length)];
        showFakeNotification('モブ君', message, 'assets/images/mobu_icon_v1.png', 'onee');
    } else {
        const storedTaskIds = JSON.parse(localStorage.getItem('selectedTaskIds') || '[]');
        if (storedTaskIds.length === 0) return;

        const timeOfDay = getCurrentTimeOfDay();
        let targetTaskId = null;

        if (timeOfDay === 'morning') {
            targetTaskId = storedTaskIds.find(id => ['task-select-1', 'task-select-3', 'task-select-10'].includes(id));
        } else if (timeOfDay === 'afternoon') {
            targetTaskId = storedTaskIds.find(id => ['task-select-2', 'task-select-7', 'task-select-5', 'task-select-8', 'task-select-9', 'task-select-11'].includes(id));
        } else { // night
            targetTaskId = storedTaskIds.find(id => ['task-select-4', 'task-select-6', 'task-select-12'].includes(id));
        }

        if (targetTaskId) {
            const message = periodicNotificationDialogues[targetTaskId];
            if (message) {
                showFakeNotification('モブ君', message, 'assets/images/mobu_icon_v1.png', 'periodic');
            }
        }
    }
}

// Service Workerと通知の初期化
async function initializeNotificationFeatures() {
    if (!('serviceWorker' in navigator)) return;
  
    try {
        const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker登録成功:', registration);
      const { initializeFCM, setupForegroundMessageHandler } = await import('./firebase-config.js');
      await initializeFCM();
      setupForegroundMessageHandler();
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