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