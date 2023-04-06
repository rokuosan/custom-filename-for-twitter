document.addEventListener('DOMContentLoaded', function () {
  const filenameInput = document.querySelector('#filename-input');
  const saveButton = document.querySelector('#filename-save');

  // 保存されたファイル名がある場合、入力欄にその値を設定する
  chrome.storage.local.get('filename', function (data) {
    filenameInput.value = data.filename || 'Twitter_@{screen_id}_{post_id}';
  });

  // 保存ボタンが押されたら、ファイル名を保存する
  saveButton.addEventListener('click', function () {
    const filename = filenameInput.value || 'Twitter_@{screen_id}_{post_id}';
    chrome.storage.local.set({ filename: filename });
  });
});
