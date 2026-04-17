// ===============================================
// State Management (データの保存・読み込み)
// ===============================================

/**

一意のユーザーIDを生成し、LocalStorageに保存する

@returns {string} 生成された、または既存のユーザーID
*/
function generateUserId() {
let userId = localStorage.getItem('userId');
if (!userId) {
userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('userId', userId);
}
return userId;
}

/**

LocalStorageに保存されたタスクを読み込み、ホーム画面の表示を更新する
*/
function updateHomeTasks() {
    const storedTasks = localStorage.getItem('selectedTasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const homeLabels = document.querySelectorAll('.task-chip-home .chip-label');
        const homeInputs = document.querySelectorAll('.task-chip-home .chip-checkbox');

        tasks.forEach((taskName, index) => {
            if (homeLabels[index]) homeLabels[index].textContent = taskName;
            if (homeInputs[index]) {
                homeInputs[index].value = taskName;
                homeInputs[index].checked = false;
            }
        });
    }
}

// ===============================================
// 累計タスク達成回数の管理
// ===============================================

function getTotalTasksCompleted() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('test_total')) {
        return parseInt(urlParams.get('test_total'), 10);
    }
    return parseInt(localStorage.getItem('totalTasksCompleted') || '0', 10);
}

function addTasksCompleted(countToAdd) {
const currentTotal = getTotalTasksCompleted();
const newTotal = currentTotal + countToAdd;
localStorage.setItem('totalTasksCompleted', newTotal.toString());
}

function setPreviousTotalTasks(totalTasks) {
localStorage.setItem('previousTotalTasks', totalTasks.toString());
}

function getPreviousTotalTasks() {
return parseInt(localStorage.getItem('previousTotalTasks') || '0', 10);
}

// ===============================================
// Phase 3-5: オネェ化・放置判定ロジック (ここから追加)
// ===============================================

// アプリのどこかを操作するたびに、この関数を呼んで日時を更新する
function updateLastLoginDate() {
const now = new Date();
// 日付を 'YYYY-MM-DD' の形式で保存（時間を含めると計算が複雑になるため）
const dateString = now.toISOString().split('T')[0];
localStorage.setItem('lastLoginDate', dateString);
}

// 保存された最後の日付を取得する
function getLastLoginDate() {
return localStorage.getItem('lastLoginDate');
}

// モブ君の現在の状態を保存する（例：'normal', 'onee_lv1'など）
function setMobuState(state) {
localStorage.setItem('mobuState', state);
}

// モブ君の現在の状態を取得する
function getMobuState() {
return localStorage.getItem('mobuState') || 'normal';
}

/**
 * 最終ログインからの経過日数を計算し、モブ君の状態を更新する
 */
function checkAbandonment() {
    const lastLoginDateStr = getLastLoginDate();
    if (!lastLoginDateStr) {
        // ログイン履歴がなければ何もしない（初回起動時など）
        updateLastLoginDate(); // 今日の日付を記録だけしておく
        return;
    }

    // --- タイムゾーンの影響を受けない、より安全な日付比較 ---
    const today = new Date();
    // 時間を切り捨てた「今日の日付」のオブジェクトを作成
    const today_date_only = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const lastLogin = new Date(lastLoginDateStr);
    // 時間を切り捨てた「最後のログイン日」のオブジェクトを作成
    const lastLogin_date_only = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());
    
    const diffTime = Math.abs(today_date_only - lastLogin_date_only);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // --- ここまでが修正箇所 ---

    // 資料7に基づき、放置日数に応じて状態を決定
    if (diffDays >= 1 && diffDays <= 3) {
        setMobuState('onee_lv1');
    } else if (diffDays >= 4 && diffDays <= 9) {
        setMobuState('onee_lv2');
    } else if (diffDays >= 10) {
        setMobuState('onee_lv3');
    } else {
        // 放置日数が0日（つまり今日ログイン済み）の場合は、通常状態に戻す
        setMobuState('normal');
    }

    // 最後に、今日のログイン日時を更新する
    updateLastLoginDate();
}


// ===============================================
// Phase 5-1.5: プロフィール画面の演出管理
// ===============================================

/**

プロフィール画面(B-3)の特定の演出が再生済みかどうかをチェックする

@param {number} milestoneToCheck - チェックしたい達成回数 (例: 10, 20)

@returns {boolean} - 再生済みならtrue, まだならfalse
*/
function hasProfileRewardBeenSeen(milestoneToCheck) {
const seenRewards = JSON.parse(localStorage.getItem('profileRewardsSeen') || '[]');
return seenRewards.includes(milestoneToCheck);
}

/**

プロフィール画面(B-3)の特定の演出を「再生済み」として記録する

@param {number} milestoneToMark - 「再生済み」として記録したい達成回数 (例: 10, 20)
*/
function markProfileRewardAsSeen(milestoneToMark) {
const seenRewards = JSON.parse(localStorage.getItem('profileRewardsSeen') || '[]');
if (!seenRewards.includes(milestoneToMark)) {
seenRewards.push(milestoneToMark);
localStorage.setItem('profileRewardsSeen', JSON.stringify(seenRewards));
console.log(`プロフィール演出 ${milestoneToMark}回目を「再生済み」として記録しました。`);
}
}

// ===============================================
// Phase 5-3: 2周目ループ処理
// ===============================================

/**
 * アプリの全ユーザーデータをリセットする
 */
function resetAllData() {
    console.log("全データをリセットします...");
    // userId 以外の全てのデータを localStorage から削除
    const userId = localStorage.getItem('userId'); // userIdだけは保持しておく
    localStorage.clear(); // いったん全て消去
    localStorage.setItem('userId', userId); // userIdを再設定
    console.log("データのリセットが完了しました。");
}

// ===============================================
// カレンダー用：達成日の記録管理
// ===============================================

function recordTodayAchievement(count) {
    const today = new Date().toISOString().split('T')[0];
    const data = JSON.parse(localStorage.getItem('achievementLog') || '{}');
    const existing = data[today] || 0;
    data[today] = Math.min(existing + count, 3); // 最大3で上限を設ける
    localStorage.setItem('achievementLog', JSON.stringify(data));
}

function getAchievementLog() {
    return JSON.parse(localStorage.getItem('achievementLog') || '{}');
}

// ===============================================
// STEP 1: 朝4時リセット基準の日付取得
// ===============================================

function getGameDate() {
    const now = new Date();
    if (now.getHours() < 4) {
        now.setDate(now.getDate() - 1);
    }
    return now.toISOString().split('T')[0];
}

// ===============================================
// STEP 1-B: 既存関数の日付取得を getGameDate() に置き換え
// ===============================================

// recordTodayAchievement を上書き
function recordTodayAchievement(count) {
    const today = getGameDate();
    const data = JSON.parse(localStorage.getItem('achievementLog') || '{}');
    const existing = data[today] || 0;
    data[today] = Math.min(existing + count, 3);
    localStorage.setItem('achievementLog', JSON.stringify(data));
}

// ===============================================
// STEP 1-C: completedToday の保存・取得・リセット
// ===============================================

function saveCompletedToday(taskIndices) {
    const data = {
        date: getGameDate(),
        taskIndices: taskIndices
    };
    localStorage.setItem('completedToday', JSON.stringify(data));
}

function getCompletedToday() {
    const raw = localStorage.getItem('completedToday');
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.date !== getGameDate()) {
        localStorage.removeItem('completedToday');
        return null;
    }
    return data;
}