
/*
xxx(ES6) 由blogwy维护

作者GitHub：https://github.com/blogwy

作者个人博客：http://www.wangyu.link

本项目GitHub开源，欢迎热心网友修改源码，无需注明出处。
*/

// --------字符串模块--------
/**
 * @description 去掉参数str中的空格
 * @method trim
 * @param {string} str
 * @param {number} type  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {string} 去掉空格后的str
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
const replaceStr = (str,startStr,endStr,repStr) => {
  let str1 = '',str2 = '';
  str1 = str.match(new RegExp(startStr + '(\\S*)' + endStr))[1];
  str2 = str.replace(new RegExp(str1),repStr);
  return str2;
};
/**
 * @description 根据规则过滤字符串
 * @param type {number} 0 -- 小写字母, 1 -- 大写字母, 2 -- 字母, 3 -- 数字, 4 -- 中文, 5 -- html标签, 6 -- 特殊字符
 * @param str {string} 需要过滤的字符串
 * @param replaceStr {string} 替换的字符串，默认空
 * @return {string}
 */
const	filterString = (type,str,replaceStr = '') => {
	switch (type){
		case 0:
			return str.replace(/[a-z]/g, repStr);
		case 1:
			return str.replace(/[A-Z]/g, repStr);
		case 2:
			return str.replace(/[a-zA-Z]/g, repStr);
		case 3:
			return str.replace(/[0-9]/g, repStr);
		case 4:
			return str.replace(/[\u4E00-\u9FA5]/g, repStr);
	  case 5:
			return str.replace(/<\/?[^>]*>/g, repStr);
		case 6:
			return str.replace(/[^0-9A-Za-z\\s]/g, repStr);
		default:
			return 'error';
	}
}

// --------数组模块--------
/**
 * @description 深拷贝数组、对象
 * @method deepCopy
 * @param {string} obj 参数名
 * @return {string} 拷贝后的数组、对象
 */
const deepCopy = obj => {
  let _obj = JSON.stringify(obj),
      resObj = JSON.parse(_obj);
  return resObj;
}
/**
 * @description 计算数组中一项出现的次数
 * @param arr
 * @param item
 * @return {number} 出现的次数
 */
 const arrayItemCount = (arr,item) => {
	var count = 0;
  arr.forEach(function (items,index) {
    if (items === item){
      count += 1;
    }
  });
  return count;
 }
/**
 * @description 数组去重
 * @param array
 * @return {Array} 
 */
 const arrayUnique = array => [...new Set(array)];
 
 /**
  * @description 数组中最大值
  * @param array
  * @return {Number} 
  */
 const arrayMax = array => Math.max(...arr);
 
 /**
  * @description 数组中最小值
  * @param array
  * @return {Number} 
  */
 const arrayMin = array => Math.min(...arr);
// --------验证模块--------
/**
 * @description 检测数据类型
 * @param data 要检测的数据
 * @param {String} type 要进行比较的数据类型,如果写多个用逗号隔开,不填则返回具体的数据类型
 * @return {String/Boolean} 数据类型/比较结果
 */
const isType = (data,type) => {
  if (!type) return Object.prototype.toString.call(data).match(/\s(.*)]/)[1];
  let _type = type.toLowerCase().split(',');
  let typeObj = {
    'string': '[object String]',
    'number': '[object Number]',
    'boolean': '[object Boolean]',
    'null': '[object Null]',
    'function': '[object Function]',
    'array': '[object Array]',
    'object': '[object Object]',
    'symbol': '[object Symbol]'
  };
  let result = false;
  for (let item of _type){
    if (typeObj[item] && typeObj[item] === Object.prototype.toString.call(data)){
      result = true;
    }
  }
  return result;
};

/**
 * @description 检测字符串类型,多用于表单验证
 * @param type {string} email tel phone url number english numen chinese lower upper reg
 * @param str {string} 需要过滤的字符串
 * @param rex {string} 当type=reg时候,rex有效为具体的正则表达式
 * @return {Boolean} 结果 true/false
 */
const checkType = (str,type,rex) => {
	let utils = {
    isNumber: function (val) {
      let regPos = /^\d+(\.\d+)?$/; //非负浮点数
      let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if(regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    // 固话
    isTel : function (val) {
      let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
      if (reg.test(val)){
        return true;
      }else {
        return false;
      }
    },
    // 手机号
    isPhone : function (val) {
      let reg = /^1(3|4|5|7|8)\d{9}$/;
      if (reg.test(val)){
        return true;
      }else {
        return false;
      }
    },
    isUrl : function (val) {
      let reg = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
      if (reg.test(val)){
        return true;
      }else {
        return false;
      }
    },
    isEmail : function (val) {
      let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
      if (reg.test(val)){
        return true;
      }else {
        return false;
      }
    },
    isEnglish : function (val) {
      let reg = /[a-zA-Z]/g;
      if (reg.test(val)){
        return true;
      }else {
        return false;
      }
    },
    isNumen : function (val) {
      let reg = /[0-9A-Za-z\\s]/g;
      if (reg.test(val)){
        return true;
      }else {
        return false;
      }
    },
    isLower : function (val) {
      let reg = /[a-z]/g;
      if (reg.test(val)){
        return true;
      }else {
        return false;
      }
    },
    isUpper : function (val) {
      let reg = /[A-Z]/g;
      if (reg.test(val)){
        return true;
      }else {
        return false;
      }
    },
    // 都是中文
    isChinese: function (val) {
      let reg = /[^\u4e00-\u9fa5]/g;
      if (reg.test(val)){
        return false;
      }else {
        return true;
      }
    }
  };
  switch (type){
    case 'reg':
      if (rex){
        if (new RegExp(rex).test(str)){
          return true;
        }else {
          return false;
        }
      }else {
        return false;
      }
    case 'email':
      return utils.isEmail(str);
    case 'tel':
      return utils.isTel(str);
    case 'phone':
      return utils.isPhone(str);
    case 'url':
      return utils.isUrl(str);
    case 'number':
      return utils.isNumber(str);
    case 'english':
      return utils.isEnglish(str);
    case 'numen':
      return utils.isNumen(str);
    case 'chinese':
      return utils.isChinese(str);
    case 'lower':
      return utils.isLower(str);
    case 'upper':
      return utils.isUpper(str);
    default:
      return false;
  }
}

// --------其他模块--------

/**
 * @description 获取url里面的具体参数
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
 * @description 格式化时间戳
 * @method formatTimestamp
 * @param {Boolean} isNow 是否是当前时间,默认false
 * @param {string} rules 时间格式,默认为YYYY-MM-DD hh:mm:ss W
 * @param {number} timestamp 时间戳,如果isNow为true此项不填
 * @return {string} 格式化后的当前时间
 * @example getNowTime("YYYY-MM-DD hh:mm:ss W") --> "2019-02-15 15:43:24 星期五"
 */
const formatTimestamp = ({ isNow,rules,timestamp }) => {
  let date,
      str = rules ? rules : "YYYY-MM-DD hh:mm:ss W",
      _isNow = typeof(isNow) == "undefined" ? false : isNow,
      _timestamp = timestamp ? timestamp : 0,
      week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  if (_isNow){
    date = new Date();
  }else {
    if (_timestamp.toString().length === 10){
      date = new Date(_timestamp*1000);
    }
    if (_timestamp.toString().length === 13) {
      date = new Date(_timestamp);
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
};

/**
 * @description 数组转对象
 * @method arrayToObject
 * @param {Array} array 需要转化的数组
 * @return {Object} 格式化后的对象
 */
const arrayToObject = array => {
  let keyItem = [],keys,result = {};
  keys = Object.keys(array[0]);
  keys.forEach(function (item,index) {
    let obj = {};
    obj.key = item;
    obj.val = [];
    keyItem.push(obj);
  });

  array.forEach(function (item,index) {
    keys.forEach(function (item0,index0) {
      keyItem[index0].val.push(item[keyItem[index0].key])
    })
  });

  keyItem.forEach(function (item,index) {
    result[item.key] = item.val;
  });
  console.log(result);
  return result;
};

/**
 * @description 在当前时间基础上获取时间戳
 * @param {Boolean} options.isNow 默认false
 * @param {String} options.type 可选值year/month/day/hour/minute/second
 * @param {number} options.offset
 * @param {Boolean} options.isAdd
 * @return {number} 时间戳(13位)
 */
const getDateTime = ({isNow,type,offset,isAdd}) => {
	let _isNow = typeof(isNow) == "undefined" ? false : isNow,
			_type = type,
			_offset = offset,
			_isAdd = isAdd,
			now = new Date().getTime(),
			oneSecond = 1000,
			oneMinute = 60 * oneSecond,
			oneHour = 60 * oneMinute,
			oneDay = 24 * oneHour,
			oneMonth = 30 * oneDay,
			oneYear = 12 * oneMonth;
	if (_isNow){
		return now;
	}else {
		switch (_type){
			case 'year':
				if (_isAdd){
					return new Date(now + (oneYear * _offset)).getTime();
				}else {
					return new Date(now - (oneYear * _offset)).getTime();
				}
			case 'month':
				if (_isAdd){
					return new Date(now + (oneMonth * _offset)).getTime();
				}else {
					return new Date(now - (oneMonth * _offset)).getTime();
				}
			case 'day':
				if (_isAdd){
					return new Date(now + (oneDay * _offset)).getTime();
				}else {
					return new Date(now - (oneDay * _offset)).getTime();
				}
			case 'hour':
				if (_isAdd){
					return new Date(now + (oneHour * _offset)).getTime();
				}else {
					return new Date(now - (oneHour * _offset)).getTime();
				}
			case 'minute':
				if (_isAdd){
					return new Date(now + (oneMinute * _offset)).getTime();
				}else {
					return new Date(now - (oneMinute * _offset)).getTime();
				}
			case 'second':
				if (_isAdd){
					return new Date(now + (oneSecond * _offset)).getTime();
				}else {
					return new Date(now - (oneSecond * _offset)).getTime();
				}
			default:
				return now;
		}
	}
}
/**
 * @description 随机返回一个范围的数字
 * @param n1
 * @param n2
 * @return {number}
 */
const randomNumber = (n1, n2) => {
	switch (arguments.length) {
		case 2:
			return Math.round(n1 + Math.random() * (n2 - n1));
		case 1:
			return Math.round(Math.random() * n1);
		default:
			return Math.round(Math.random() * 100000000);
	}
}
/**
 * @description 随机产生颜色
 * @param {number} 输入16时候，会输出16进制颜色代码 
 * @return {string}
 */
const	randomColor = sum => {
	if (sum) {
		return '#' + Math.random().toString(16).substring(2).substr(0, 6);
	}
	else {
		return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';
	}
}
/**
 * @description 随机字符串生成
 * @param type {number} 0 -- 只有数字, 1 -- 只有字母, 2 -- 数字和字母, 3 -- 数字字母特殊符号
 * @param n {number} 长度
 * @return {string} 随机字符串
 */
const randomString = (type,n) => {
	let typeArray = [
		"0123456789",
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_-<>/?[]{}|.,"
	];
	let len = typeArray[type].length;
	let result = '';
	for (let i=0;i<n;i++){
		result += typeArray[type].charAt(Math.ceil(Math.random() * len))
	}
	return result;
}
/**
 * @description mm转px,此函数只适用于屏幕为96DPI的设备(大部分都是)
 * @method mmTopx
 * @param {number} mm 毫米
 * @return {number} px 像素
 */
const mmToPx = mm => (parseFloat(mm)*0.0393*96).toFixed(2);

/**
 * @description 设置cookie
 * @param key 键
 * @param val 值
 * @param day 时长(天)
 */
const setCookie = (key,val,day) => {
  let eDay = new Date();
  eDay.setDate(eDay.getDate() + day);
  document.cookie = key + '=' + val + ';expires=' + eDay;
};
/**
 * @description 获取cookie值
 * @param key 键
 * @return 值
 */
const getCookie = key => {
  let arr = document.cookie.split('; '), arr2;
  for (let i = 0; i < arr.length; i++) {
    arr2 = arr[i].split('=');
    if (arr2[0] === key) {
      return arr2[1];
    }
  }
  return undefined;
};
/**
 * @description 删除cookie
 * @param key 键
 * @return {boolean} true: 成功 false: 失败
 */
const removeCookie = key => {
  document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  if (!getCookie(key)){
    return true;
  }else {
    return false;
  }
};
/**
 * @description 清除所有cookie
 */
const clearCookie = () => {
  let arr = document.cookie.split('; '), arr2;
  for (let i = 0; i < arr.length; i++) {
    arr2 = arr[i].split('=');
    document.cookie = arr2[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export {
  trim,
  replaceStr,
	filterString,
  deepCopy,
	arrayItemCount,
  getUrlParam,
	isType,
	checkType,
  formatTimestamp,
  arrayToObject,
	getDateTime,
	randomNumber,
	randomColor,
	randomString,
	mmToPx,
	setCookie,
	getCookie,
	removeCookie,
	clearCookie
}

