document.addEventListener('DOMContentLoaded', function () {
  const filenameInput = document.querySelector('#filename-input');
  const saveButton = document.querySelector('#save-button');

  // 保存されたファイル名がある場合、入力欄にその値を設定する
  chrome.storage.sync.get('filename', function (data) {
    filenameInput.value = data.filename || 'image';
  });

  // 保存ボタンが押されたら、ファイル名を保存する
  saveButton.addEventListener('click', function () {
    const filename = filenameInput.value || 'image';
    chrome.storage.sync.set({ filename: filename });
  });
});
