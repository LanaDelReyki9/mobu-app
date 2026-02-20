// ===============================================
// Main Logic (イベントリスナーの登録)
// ===============================================

// DOMが読み込まれたらアプリを初期化
document.addEventListener('DOMContentLoaded', function() {
    
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
                showScreen('screen-task-select');
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

                playBlinkVideo(() => {
                    showScreen('screen-cafe');
                });
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

                playBlinkVideo(() => {
                    setupReportScreen(completedTasks);
                });
                
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
                console.log("設定アイコンがクリックされました。（機能は未実装）");
                // ここに将来、設定画面への遷移処理が入ります
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
});