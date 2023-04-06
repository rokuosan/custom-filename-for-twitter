const PROJECT_ID = 'saveImageWithScreenIDandPostID'

chrome.contextMenus.create({
  id: PROJECT_ID,
  title: "スクリーンIDと投稿IDをつけて保存",
  contexts: ["image"],
  documentUrlPatterns: [
    'https://*.twitter.com/*',
    'https://twitter.com/*'
  ]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === PROJECT_ID) {
    let upt = /twitter.com\/\w{1,}/g;
    let userId = info.linkUrl.match(upt)[0].split('/')[1]

    let ppt = /\/\d{1,}\//g;
    let postId = info.linkUrl.match(ppt)[0].replaceAll('/', '')

    console.log(postId)

    let filename = `Twitter@${userId}_${postId}.jpg`

    const imageUrl = info.srcUrl;
    chrome.downloads.download({
      url: imageUrl,
      filename: filename,
      saveAs: false,
    });
    // getFilename(function (filename) {
    //   chrome.downloads.download({
    //     url: imageUrl,
    //     filename: filename,
    //     saveAs: false,
    //   });
    // });
  }
});

function getFilename(callback) {
  chrome.storage.sync.get('filename', function (data) {
    const filename = data.filename || 'image';
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fullFilename = `${filename}_${timestamp}.jpg`;
    callback(fullFilename);
  });
}
