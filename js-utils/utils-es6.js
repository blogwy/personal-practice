
/*
xxx(ES6) 由blogwy维护

作者GitHub：https://github.com/blogwy

作者个人博客：https://www.wangyu.link

本项目GitHub开源，欢迎热心网友修改源码，无需注明出处。
*/

// --------字符串模块--------
/**
 * 去掉参数str中的空格
 * @method trim
 * @param {string} str 参数名
 * @param {number} type 参数名  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {string} 去掉空格是str
 */
const trim = (str, type) => {
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
};
// --------数组模块--------

// --------验证模块--------

// --------其他模块--------

/**
 * 获取url里面的具体参数
 * @method getUrlParam
 * @param {string} paramName 参数名
 * @return {string} 返回要获取的参数值
 */
const getUrlParam = paramName => {
  let url = document.location.toString();
  let arrObj = url.split("?");
  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split("&"),arr;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");
      if (arr != null && arr[0] == paramName) {
        return arr[1];
      }
    }
    return "";
  }else {
    return "";
  }
};
/**
 * 获取当前时间
 * @method getUrlParam
 * @param {string} rules 时间格式 例如: YYYY-MM-DD hh:mm:ss W --> 2019-02-15 15:43:24 星期五
 * @return {string} 格式化后的当前时间
 */
const getNowTime = rules => {
  let now = new Date(),
      str = rules,
      Week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  str = str.replace(/yyyy|YYYY/, now.getFullYear());
  str = str.replace(/yy|YY/, (now.getYear() % 100) > 9 ? (now.getYear() % 100).toString() : '0' + (now.getYear() % 100));

  str = str.replace(/MM/, now.getMonth() > 8 ? (now.getMonth() + 1).toString() : '0' + (now.getMonth() + 1));
  str = str.replace(/M/g, now.getMonth() + 1);

  str = str.replace(/w|W/g, Week[now.getDay()]);

  str = str.replace(/dd|DD/, now.getDate() > 9 ? now.getDate().toString() : '0' + now.getDate());
  str = str.replace(/d|D/g, now.getDate());

  str = str.replace(/hh|HH/, now.getHours() > 9 ? now.getHours().toString() : '0' + now.getHours());
  str = str.replace(/h|H/g, now.getHours());
  str = str.replace(/mm/, now.getMinutes() > 9 ? now.getMinutes().toString() : '0' + now.getMinutes());
  str = str.replace(/m/g, now.getMinutes());

  str = str.replace(/ss|SS/, now.getSeconds() > 9 ? now.getSeconds().toString() : '0' + now.getSeconds());
  str = str.replace(/s|S/g, now.getSeconds());

  return str;
};

/**
 * 格式化时间戳
 * @method getUrlParam
 * @param {string} rules 时间格式 例如: YYYY-MM-DD hh:mm:ss W --> 2019-02-15 15:43:24 星期五
 * @param {number} timestamp 时间戳
 * @return {string} 格式化后的当前时间
 */

const formatTimestamp = (timestamp,rules) => {
  let date = new Date(),
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
};
export { trim,getUrlParam,getNowTime,formatTimestamp }

