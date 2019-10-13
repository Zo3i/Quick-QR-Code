console.log("已加载插件！")
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("接受到bg的通知")
  // 寻找到屏幕位置
  // 可见屏幕高度： $(document).scrollTop()
  // 屏幕高度: window.screen.availHeight
  var changeHight = window.screen.availHeight/2 + $(document).scrollTop()
  $("#qrcode").css("top", changeHight + "px")
  //二维码
  $("#qrcode").empty()
  $("#qrcode").show()
  new QRCode(document.getElementById("qrcode"), request)
})

// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js'
	var temp = document.createElement('script')
	temp.setAttribute('type', 'text/javascript')
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath)
  console.log(temp.src)
  var head = document.head || document.getElementsByTagName("head")[0]
  head.appendChild(temp)
}


$(document).ready(function(){
  injectCustomJs()
  var html = '<div id="qrcode" style="position:absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);width:200px;height:200px;z-index:10000;"></div>';
  $("body").append(html)
  console.log("我是被注入的JS")
  // 监听点击事件隐藏二维码
  $("body").click(function () {
    $("#qrcode").empty();
    $("#qrcode").hide()
  })
});
