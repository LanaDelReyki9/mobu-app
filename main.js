// ===============================================
// Main Logic (イベントリスナーの登録)
// ===============================================

// DOMが読み込まれたらアプリを初期化
document.addEventListener('DOMContentLoaded', function() {
showScreen('screen-welcome');

checkAbandonment();
generateUserId();
updateHomeTasks();

// --- 各画面のイベントリスナーを登録 ---

// A-1: ウェルカム画面
const welcomeScreen = document.getElementById('screen-welcome');
if (welcomeScreen) {
welcomeScreen.addEventListener('click', function() {
updateLastLoginDate();
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
        
        // ★★★ 修正: 導入フローに従い、カフェ画面(初対面)へ遷移させる ★★★
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
        taskSelectScreen.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            selectedTasks.push(checkbox.parentElement.querySelector('label').textContent);
        });
        localStorage.setItem('selectedTasks', JSON.stringify(selectedTasks));
        updateHomeTasks();

        // ★★★ 修正②: 初回起動時と設定からの変更時で処理を分岐 ★★★
        const appPhase = localStorage.getItem('appPhase');
        if (appPhase !== 'main') {
            // 初回起動時のフロー
            playBlinkVideo(() => {
                showScreen('screen-cafe');
            }, true); 
        } else {
            // 設定画面からタスクを変更した場合のフロー
            alert('タスクを変更しました。');
            showScreen('screen-home');
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
            // 初めてのタスク報告の場合
            localStorage.setItem('isFirstReport', 'true'); // 初回報告フラグを立てる
            // ★★★ 修正: 完了したタスクを一時的に保存する ★★★
            localStorage.setItem('tempCompletedTasks', JSON.stringify(completedTasks));

            playBlinkVideo(() => {
                // 特別イベントのためカフェ画面へ遷移
                showScreen('screen-cafe');
            });
            
        } else {
            // 2回目以降の通常報告の場合
            playBlinkVideo(() => {
                setupReportScreen(completedTasks);
            });
        }
        // ★★★ ここまでが修正箇所 ★★★
        
        homeTaskCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        homeCompleteButton.disabled = true;
    });
}

if (profileIcon) {
    profileIcon.addEventListener('click', function() {
        console.log("プロフィールアイコンがクリックされました。"); // デバッグ用
        updateLastLoginDate();
        showProfileScreen();
        playProfileRewardAnimationIfNeeded();
    });
}

if (settingsIcon) {
    settingsIcon.addEventListener('click', function() {
        updateLastLoginDate();
        // ★★★ 修正: 専用の関数で設定画面を表示する ★★★
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

const settingsBackButton = document.getElementById('settings-back-button');
if (settingsBackButton) {
    settingsBackButton.addEventListener('click', function() {
        showScreen('screen-home');
    });
}

});

// D-3: スタッフロール画面
const restartButton = document.getElementById('restart-button');
if (restartButton) {
    restartButton.addEventListener('click', function() {
        console.log("リスタートボタンがクリックされました！");
        resetAllData();

        // ★★★ ここからが追加箇所 ★★★
        // 瞬き演出を挟んでウェルカム画面へ遷移する
        playBlinkVideo(() => {
            showScreen('screen-welcome');
        });
        // ★★★ ここまでが追加箇所 ★★★
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

// A-4: 設定画面の機能
const saveNicknameButton = document.getElementById('save-nickname-button');
const resetTasksButton = document.getElementById('reset-tasks-button');
const settingNicknameInput = document.getElementById('setting-nickname-input');

// 1. 「保存」ボタンの処理 (変更なし)
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

// 2. 「タスクを変更する」ボタンの処理 (★修正箇所)
if (resetTasksButton) {
    resetTasksButton.addEventListener('click', function() {
        // ★修正①: 確認メッセージをより親切な表現に
        const isConfirmed = confirm('本当にタスクを選び直しますか？\nこれまでのタスク達成回数はリセットされませんので、ご安心ください。');
        
        if (isConfirmed) {
            // タスク選択画面へ遷移する
            showScreen('screen-task-select');
        }
    });
}

// 2. 「タスクを変更する」ボタンの処理
if (resetTasksButton) {
    resetTasksButton.addEventListener('click', function() {
        // 確認ダイアログを表示
        const isConfirmed = confirm('本当にタスクを選び直しますか？\nこれまでのタスク達成回数はリセットされませんが、よろしいですか？');
        
        if (isConfirmed) {
            // タスク選択画面へ遷移する
            showScreen('screen-task-select');
        }
    });
}