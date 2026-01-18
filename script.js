// 画面遷移関数
function showScreen(screenId) {
    // すべての画面からactiveクラスを削除
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // 指定された画面にactiveクラスを追加
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// 一意のユーザーIDを生成
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ニックネーム入力のバリデーション
const nicknameInput = document.getElementById('nickname-input');
const errorMessage = document.getElementById('error-message');
const nameScreenButton = document.querySelector('#screen-name .btn-primary');

nicknameInput.addEventListener('input', function() {
    const value = this.value;
    
    // 全角・半角の特殊記号チェック（#、@、%）
    const invalidChars = /[#@%＃＠％]/u;
    if (invalidChars.test(value)) {
        errorMessage.textContent = '絵文字や特殊記号は使えません';
        nameScreenButton.disabled = true;
        return;
    }
    
    // 文字数チェック
    if (value.length === 0) {
        errorMessage.textContent = '';
        nameScreenButton.disabled = true;
        return;
    }
    
    if (value.length > 10) {
        errorMessage.textContent = '10文字以内で入力してください';
        nameScreenButton.disabled = true;
        return;
    }
    
    // OK
    errorMessage.textContent = '';
    nameScreenButton.disabled = false;
});

// 次へボタンのクリックイベント
nameScreenButton.addEventListener('click', function() {
    const nickname = nicknameInput.value.trim();
    
    // バリデーション再チェック
    if (nickname.length === 0 || nickname.length > 10) {
        return;
    }
    
    const invalidChars = /[#@%＃＠％]/u;
    if (invalidChars.test(nickname)) {
        return;
    }
    
    // ニックネームをLocalStorageに保存
    localStorage.setItem('nickname', nickname);
    
    // ユーザーIDが存在しない場合は生成して保存
    if (!localStorage.getItem('userId')) {
        const userId = generateUserId();
        localStorage.setItem('userId', userId);
    }
    
    // A-3（タスク選択画面）へ遷移
    showScreen('screen-task-select');
});

// タスク選択制御
const taskSelectButton = document.getElementById('task-select-button');
const taskCheckboxes = document.querySelectorAll('#screen-task-select input[type="checkbox"]');

// タスク選択数の制御（最大3つ）
taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkedCount = document.querySelectorAll('#screen-task-select input[type="checkbox"]:checked').length;
        
        // 3つを超えて選択しようとした場合、最後に選択したものを無効化
        if (checkedCount > 3) {
            this.checked = false;
            return;
        }
        
        // 選択数に応じてボタンの有効/無効を切り替え
        if (checkedCount === 3) {
            taskSelectButton.disabled = false;
        } else {
            taskSelectButton.disabled = true;
        }
    });
});

// 「これで決定」ボタンのクリックイベント
taskSelectButton.addEventListener('click', function() {
    // 選択されたタスクを取得
    const selectedTasks = [];
    taskCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTasks.push(checkbox.value);
        }
    });
    
    // 3つ選択されていることを確認
    if (selectedTasks.length !== 3) {
        return;
    }
    
    // 選択されたタスクをLocalStorageに保存
    localStorage.setItem('selectedTasks', JSON.stringify(selectedTasks));
    
    // B-1（ホーム画面）へ遷移（C-1はまだ未実装のため）
    showScreen('screen-home');
});