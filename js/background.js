chrome.contextMenus.create({
	title: "二维码",
  contexts: ["all"],
	onclick: showQr
});


function showQr(info, tab) {
  console.log(info);
  var QRContant = ""

  if (info.linkUrl != undefined) {
    // 第一优先级选取url
    QRContant = info.linkUrl
  } else if (info.selectionText != undefined) {
    // 第二优先级选取文字
    QRContant = info.selectionText
  } else if (info.srcUrl != undefined) {
    // 第三优先级选取图片
    QRContant = info.srcUrl
  } else {
    // 最低优当前网页URL
    QRContant = info.pageUrl
  }
  console.log("这是点击事件")
  console.log(tab.id)
  // 呼叫前台调用方法。
  chrome.tabs.sendMessage(tab.id, QRContant, function(response) {

  });
}
