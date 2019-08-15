

var Common = {
  /**
   * @description ajax请求封装
   * @method Common.request
   * @param {object} options 参数名
   * @param {string} options.method 请求方式 post/get
   * @param {string} options.url 请求地址
   * @param {Boolean} options.prefix 是否加前缀 true加 false不加
   * @param {Boolean} options.suffix 是否加后缀(token)
   * @param {object} options.data post请求传值，json格式
   * @param {function} options.success 成功返回
   * @param {function} options.error 失败返回
   * @return {function} 成功返回/失败返回
   */
  request: function (options) {
    axios({
      method: options.method ? options.method : 'get',
      url: (options.prefix ? Common.handlePrefix() : '') + options.url,
      params: options.suffix ? { token: localStorage.getItem('token') } : null,
      data: typeof(options.data) == "undefined" ? null : options.data
    }).then(function (res) {
      if (res.data.rstCode === '0'){
        options.success(res.data);
      }
    }).catch(function (err) {
      options.error(err);
    })
  },
  handlePrefix: function () {
    var factorys = Common.interceptString(window.location.href,location.hostname,'manage');
    var arr = ['/shscaling','/hzscaling','/bjscaling','/syscaling','/wyscaling','/tjscaling'];
    switch (factorys){
      case '/sh/':
        return arr[0];
      case '/hz/':
        return arr[1];
      case '/wh/':
        return arr[2];
      case '/tj/':
        return arr[3];
      case '/sy/':
        return arr[4];
      case '/bj/':
        return arr[5];
      default:
        return '101';
    }
  },
  /**
   * @description 截取字符串
   * @method interceptString
   * @param {string} str 需要截取的字符串
   * @param {string} startStr 截取字符串的左边
   * @param {string} endStr 截取字符串的右边
   * @return {string} str1 截取的字符串
   */
  interceptString: function (str,startStr,endStr){
    var str1 = '';
    str1 = str.match(new RegExp(startStr + '(\\S*)' + endStr))[1];
    return str1;
  },
  /**
   * @description 获取url里面的具体参数
   * @method getUrlParam
   * @param {string} paramName 参数名
   * @return {string} 返回要获取的参数值
   */
  getUrlParam: function (paramName) {
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] == paramName) {
          return arr[1];
        }
      }
      return "";
    }else {
      return "";
    }
  },
  /**
   * @description 去掉字符串中的空格
   * @method trim
   * @param {string} str 字符串
   * @param {number} type 类型  1-所有空格  2-前后空格  3-前空格 4-后空格
   * @return {string} 去掉空格是字符串
   */
  trim: function (str, type) {
    str = str.toString();
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },
  /**
   * @description 深拷贝数组、对象
   * @method deepCopy
   * @param {string} obj 参数名
   * @return {string} 拷贝后的数组、对象
   */
  deepCopy: function (obj) {
    var _obj = JSON.stringify(obj),
        resObj = JSON.parse(_obj);
    return resObj;
  },
  /**
   * @description 格式化时间戳
   * @method formatTimestamp
   * @param {Boolean} options.isNow 是否是当前时间,默认false
   * @param {string} options.rules 时间格式,默认为YYYY-MM-DD hh:mm:ss W
   * @param {number} options.timestamp 时间戳,如果isNow为true此项不填
   * @return {string} 格式化后的当前时间
   * @example formatTimestamp("YYYY-MM-DD hh:mm:ss W") --> "2019-02-15 15:43:24 星期五"
   */
  formatTimestamp: function (options) {
    var date,
        str = options.rules ? options.rules : "YYYY-MM-DD hh:mm:ss W",
        isNow = typeof(options.isNow) == "undefined" ? false : options.isNow,
        timestamp = options.timestamp ? options.timestamp : 0,
        week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (isNow){
      date = new Date();
    }else {
      if (timestamp.toString().length === 10){
        date = new Date(timestamp*1000);
      }
      if (timestamp.toString().length === 13) {
        date = new Date(timestamp);
      }
    }

    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

    str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth() + 1);

    str = str.replace(/w|W/g, week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
  },
  /**
   * @description 计算到期时间
   * @method getExpireDate
   * @param {string} date 起始时间 '2019-02-01'
   * @param {string} mode 模式 year/month/day
   * @param {number} num 过期时间 年份/月份/天数
   * @return {string} 到期时间
   */
  getExpireDate: function (date,mode,num) {
    var dates = date;
    dates = dates.substring(0,19);
    dates = dates.replace(/-/g,'/');
    var timestamp = new Date(dates).getTime();
    var expireDate = 0;
    if (mode === 'year'){
      expireDate = timestamp + (1000*60*60*24*num*365);
    }else if (mode === 'month'){
      expireDate = timestamp + (1000*60*60*24*num*30);
    }else if (mode === 'day'){
      expireDate = timestamp + (1000*60*60*24*num);
    }else {
      return;
    }
    var d = new Date(expireDate);
    return d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + '-' +(d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
  },
  /**
   * @description 时间戳加减时间
   * @param {object} options
   * @param {timestamp/number} options.timestamp
   * @param {string} options.mode
   * @param {number} options.num
   * @return {timestamp/number} 改变后的时间戳
   */
  getChangeTimestamp: function (options) {
    var oldTmp = options.timestamp,
        mode = options.mode || 'day',
        changeNum = options.num,
        newTmp;

  }
};
