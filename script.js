// ===============================================
// UI Component: Video Blink Control (動画瞬き)
// ===============================================

function playBlinkVideo(onDarkMoment) {
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

// ★ Phase 3-2: 報告画面ロジック（分岐処理）
if (homeCompleteButton) {
    homeCompleteButton.addEventListener('click', function() {
        // 1. チェックされたタスクを取得
        const completedTasks = [];
        document.querySelectorAll('.task-chip-home input[type="checkbox"]:checked').forEach(checkbox => {
            const taskName = checkbox.parentElement.querySelector('label').textContent;
            completedTasks.push(taskName);
        });

        // 2. 瞬き演出開始
        playBlinkVideo(() => {
            // 3. 画面遷移と内容の書き換え
            setupReportScreen(completedTasks);
            showScreen('screen-report');
        });
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
        currentThoughtText.textContent = 'よし、完了！モブ君に報告しよっと♪';
        
        // 画面全体タップでLINEへ
        currentScreen.onclick = function() {
            // 選択したタスクを保存して遷移
            localStorage.setItem('currentReportTask', completedTasks[0]);
            showScreen('screen-line');
        };

    } else {
        // パターンB: 2個以上完了
        currentThoughtText.textContent = '今日は色々頑張ったけど、特に頑張った一つをモブ君に報告しよう。';
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
                showScreen('screen-line');
            };
            
            currentSelectionArea.appendChild(btn);
        });
        
        // 画面全体タップは無効化（ボタンを押させるため）
        currentScreen.onclick = null;
    }
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