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

    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');

    const imageUrl = info.srcUrl;

    chrome.storage.local.get(['filename']).then((d) => {
      console.log(d)
      const fn = d.filename.replaceAll('{screen_id}', userId).replaceAll('{post_id}', postId).replaceAll('{current_time}', timestamp)

      chrome.downloads.download({
        url: imageUrl,
        filename: `${fn}.jpg`,
        saveAs: false,
      });
    })
  }
});
