// ===============================================
// UI Component: Video Blink Control (動画瞬き)
// ===============================================

function playBlinkVideo(onDarkMoment) {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('blink-video');
    
    if (!overlay || !video) {
        // 動画がない、またはHTML設定ミスの場合は即実行
        console.warn("動画が見つかりません。通常遷移します。");
        if (onDarkMoment) onDarkMoment();
        return;
    }

    // 1. オーバーレイを表示して動画再生開始
    overlay.classList.add('active');
    video.currentTime = 0;
    
    // 再生試行（ブラウザによっては自動再生ブロックの可能性あり）
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("動画再生エラー:", error);
            // 再生できない場合は即座に遷移
            if (onDarkMoment) onDarkMoment();
        });
    }

    // 2. 「真っ暗になるタイミング」で画面遷移を実行
    // ここでは0.5秒後としていますが、動画に合わせて調整可能です
    setTimeout(() => {
        if (onDarkMoment) onDarkMoment();
    }, 500); 

    // 3. 動画終了時にオーバーレイを隠す
    video.onended = () => {
        overlay.classList.remove('active');
    };
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
                homeInputs[index].checked = false;
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
        showScreen('screen-task-select');
    });
}

// タスク選択画面
const taskCheckboxes = document.querySelectorAll('#screen-task-select input[type="checkbox"]');
const taskSelectBtnAlt = document.querySelector('#screen-task-select .btn-primary');
// IDがあれば取得、なければAltを使用
const taskSelectButton = document.getElementById('task-select-button') || taskSelectBtnAlt;

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
        showScreen('screen-home');
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
        }
    });
});

// ホーム画面：完了ボタンクリック（動画演出実行）
if (homeCompleteButton) {
    homeCompleteButton.addEventListener('click', function() {
        // 動画演出を開始し、暗転したタイミングで画面遷移
        playBlinkVideo(() => {
            showScreen('screen-report');
        });
    });
}

// ウェルカム画面タップ
const welcomeScreen = document.getElementById('screen-welcome');
if (welcomeScreen) {
    welcomeScreen.addEventListener('click', function() {
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
});