/**
 * @desc 补零
 */
export const padding = (num, step = 2) => {
  num += "";
  while (num.length < step) {
    num = `0${num}`;
  }
  return num;
};

/**
 * @desc 将数字转换为字母
 */
export const charCode = (step, start = "A") =>
  String.fromCharCode(start.charCodeAt() + step);

/**
 * @desc 求和
 */
export const sum = (a, b) => a + b;

/**
 * @desc 无阻塞加载javascript
 * @param {String} url js文件地址
 * @param {Function} callback 加载完毕后的回调函数
 */
export function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    // IE
    script.onreadystatechange = function() {
      var readyState = this.readyState;

      if (readyState === "loaded" || readyState === "complete") {
        script.onreadystatechange = null; // 防止事件触发两遍
        callback && callback();
      }
    };
  } else {
    // 其他浏览器
    script.onload = function() {
      callback && callback();
    };
  }

  script.src = url;
  document.head.appendChild(script);
}

/**
 * @desc 重载页面
 */
export function reload() {
  let { origin, pathname } = location;

  location.href = `${origin}${pathname}#/answer`;
  location.reload();
}

// 时间
export function formatDateFilter(value, type) {
  let time = new Date(value);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let seconds = time.getSeconds();

  month = month < 10 ? "0" + month : month;
  date = date < 10 ? "0" + date : date;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if (type === 1) {
    return year + "年" + month + "月" + date + "日";
  } else if (type === 2) {
    return year + "-" + month + "-" + date;
  } else if (type === 3) {
    return hour + ":" + minute + ":" + seconds;
  } else if (type === 4) {
    return year + "." + month + "." + date;
  } else if (type === 5) {
    return year + "." + month;
  } else if (type === 6) {
    return year + "-" + month;
  } else if (type === 7) {
    return year + "/" + month + "/" + date + " " + hour + ":" + minute;
  }
}

// 元素失去焦点隐藏iphone的软键盘
export function objBlur(id, time) {
  var obj = document.getElementById(id),
    time = time || 300,
    docTouchend = function(event) {
      if (event.target != obj) {
        setTimeout(function() {
          console.log(11111);
          obj.blur();
          document.removeEventListener("touchend", docTouchend, false);
        }, time);
      }
    };
  if (obj) {
    obj.addEventListener(
      "focus",
      function() {
        document.addEventListener("touchend", docTouchend, false);
      },
      false
    );
  } else {
    throw new Error("objBlur()没有找到元素");
  }
}

/**
 * 深层克隆对象
 *
 * @param obj
 * @returns {*}
 * @example
 *
 * const a = { foo: 'bar', obj: { a: 1, b: 2 } };
 * const b = deepClone(a);
 * // => a !== b, a.obj !== b.obj
 */
export function deepClone(obj) {
  var clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    function (key) { return (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]); }
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
      ? Array.from(obj)
      : clone;
}

/**
 * 获取移动设备信息，如是否是iOS，android等
 *
 * @returns {{}}
 * @example
 *
 * getDevice();
 * // => {"androidChrome":false,"ipad":false,"iphone":true,"android":false,"ios":true,"os":"ios","osVersion":"9.1","webView":null}
 */
export function getDevice() {
  var device = {};
  var ua = navigator.userAgent;
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
  // Android
  if (android) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }
  // Webview
  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
  return device;
}

// 获取max与min之间的随机数
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 判断当前时间是否在一个时间段内
 * @param {String} beginTime
 * @param {String} endTime
 */
export function compareTime(beginTime, endTime) {
  var strBegin = beginTime.split(":");
  if (strBegin.length != 2) {
    return false;
  }

  var strEnd = endTime.split(":");
  if (strEnd.length != 2) {
    return false;
  }

  var b = new Date(); // 开始时间
  var e = new Date(); // 结束时间
  var n = new Date(); // 当前时间
  b.setHours(strBegin[0]);
  b.setMinutes(strBegin[1]);
  b.setSeconds(0);
  e.setHours(strEnd[0]);
  e.setMinutes(strEnd[1]);
  e.setSeconds(0);

  if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) { 
    // 返回剩余时间
    return e.getTime() - n.getTime();
  } else {
    // console.log("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，不在该时间范围内！")
    return false;
  }
}

// 补0函数 => 参数数字
var toDB = nub => {
  return nub < 10 ? "0" + nub : "" + nub
}
// 字符串日期 传入日期格式
export function formateDate(d, type) {
  let date = d ? d : new Date();
  let year = date.getFullYear();
  let month = toDB(date.getMonth() + 1);
  let day = toDB(date.getDate());
  let hours = toDB(date.getHours());
  let minutes = toDB(date.getMinutes());
  let seconds = toDB(date.getSeconds());
  let connector = type ? type : '/';
  return `${year}${connector}${month}${connector}${day}`
}

/**
* 指定位数补零
* @param num： 被操作数
* @param n： 固定的总位数
*/
export function prefixZero(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

//key(需要检索的键）
export function getSearchString(key) {
  var after = window.location.href;
  if (after.indexOf("?") === -1) return null; //如果url中没有传参直接返回空

  //key存在先通过search取值如果取不到就通过hash来取
  after = window.location.search.substr(1) || window.location.hash.split("?")[1];

  if (after) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = after.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }
}
