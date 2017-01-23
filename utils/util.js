// 时间格式化
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 生成订单号
function orderNumber() {
  var d = Date.parse(new Date())
  return d + RondomPass(7)
}

function RondomPass(number) {
  var arr = new Array;
  var arr1 = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");

  for (var i = 0; i < number; i++) {
    var n = Math.floor(Math.random() * 10);
    arr[i] = arr1[n];
  }

  var val = arr.join("")

  return val;
}

module.exports = {
  formatTime: formatTime,
  orderNumber: orderNumber
}
