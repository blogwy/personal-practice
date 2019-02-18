
/*
xxx(ES5) 由blogwy维护

作者GitHub：https://github.com/blogwy

作者个人博客：https://www.wangyu.link

本项目GitHub开源，欢迎热心网友修改源码，无需注明出处。
*/

var utils = {
  // --------字符串模块--------
  /**
   * @description 去掉参数str中的空格
   * @method trim
   * @param {string} str 参数名
   * @param {number} type 参数名  1-所有空格  2-前后空格  3-前空格 4-后空格
   * @return {string} 去掉空格是str
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
   * @description 替换字符串
   * @method replaceStr
   * @param {string} str 被替换的字符串
   * @param {string} startStr 开始字符串 为空则从开头匹配
   * @param {string} endStr 结束字符串 为空则从结尾匹配
   * @param {string} repStr 替换的字符串
   * @return {string} 替换后的字符串
   * @example replaceStr("wangbilibiliyu","wang","yu","acfun") --> "wangacfunyu"
   * */
  replaceStr: function (str,startStr,endStr,repStr) {
    var str1 = '',str2 = '';
    str1 = str.match(new RegExp(startStr + '(\\S*)' + endStr))[1];
    str2 = str.replace(new RegExp(str1),repStr);
    return str2;
  },
  // --------数组模块--------

  // --------验证模块--------

  // --------其他模块--------
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
   * @description 获取当前时间
   * @method getNowTime
   * @param {string} rules 时间格式
   * @return {string} 格式化后的当前时间
   * @example getNowTime("YYYY-MM-DD hh:mm:ss W") --> "2019-02-15 15:43:24 星期五"
   */
  getNowTime: function (rules) {
    var now = new Date(),
        str = rules,
        week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    str = str.replace(/yyyy|YYYY/, now.getFullYear());
    str = str.replace(/yy|YY/, (now.getYear() % 100) > 9 ? (now.getYear() % 100).toString() : '0' + (now.getYear() % 100));

    str = str.replace(/MM/, now.getMonth() > 8 ? (now.getMonth() + 1).toString() : '0' + (now.getMonth() + 1));
    str = str.replace(/M/g, now.getMonth() + 1);

    str = str.replace(/w|W/g, week[now.getDay()]);

    str = str.replace(/dd|DD/, now.getDate() > 9 ? now.getDate().toString() : '0' + now.getDate());
    str = str.replace(/d|D/g, now.getDate());

    str = str.replace(/hh|HH/, now.getHours() > 9 ? now.getHours().toString() : '0' + now.getHours());
    str = str.replace(/h|H/g, now.getHours());
    str = str.replace(/mm/, now.getMinutes() > 9 ? now.getMinutes().toString() : '0' + now.getMinutes());
    str = str.replace(/m/g, now.getMinutes());

    str = str.replace(/ss|SS/, now.getSeconds() > 9 ? now.getSeconds().toString() : '0' + now.getSeconds());
    str = str.replace(/s|S/g, now.getSeconds());

    return str;
  },
  /**
   * @description 格式化时间戳
   * @method formatTimestamp
   * @param {string} rules 时间格式
   * @param {number} timestamp 时间戳
   * @return {string} 格式化后的当前时间
   * @example 时间格式与getNowTime相同
   */
  formatTimestamp: function (timestamp,rules) {
    var date = new Date(),
        str = rules,
        week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (timestamp.toString().length === 10){
      date = new Date(timestamp*1000);
    }
    if (timestamp.toString().length === 13) {
      date = new Date(timestamp);
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
  }
};

