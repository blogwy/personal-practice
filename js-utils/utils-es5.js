
/*
xxx(ES5) 由blogwy维护

作者GitHub：https://github.com/blogwy

作者个人博客：http://www.wangyu.link

本项目GitHub开源，欢迎热心网友修改源码，无需注明出处。
*/

var utils = {
  // --------字符串模块--------
  /**
   * @description 去掉参数str中的空格
   * @method trim
   * @param {string} str 
   * @param {number} type  1-所有空格  2-前后空格  3-前空格 4-后空格
   * @return {string} 去掉空格后的str
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
	/**
	 * @description 根据规则过滤字符串
	 * @param type {number} 0 -- 小写字母, 1 -- 大写字母, 2 -- 字母, 3 -- 数字, 4 -- 中文, 5 -- html标签, 6 -- 特殊字符
	 * @param str {string} 需要过滤的字符串
	 * @param replaceStr {string} 替换的字符串，默认空
	 * @return {string}
	 */
	filterString: function(type,str,replaceStr) {
		var repStr = replaceStr ? replaceStr : '';
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
	},
	
  // --------数组模块--------
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
	 * @description 计算数组中一项出现的次数
	 * @param arr
	 * @param item
	 * @return {number} 出现的次数
	 */
	arrayItemCount: function (arr,item){
		var count = 0;
		arr.forEach(function (items,index) {
			if (items === item){
				count += 1;
			}
		});
		return count;
	},
	/**
	 * @description 数组去重
	 * @param arr
	 * @return {Array} 
	 */
	arrayUnique: function(arr) {
		if (!Array.isArray(arr)) {
			console.log('type error!');
			return;
		}
		var array = [];
		for (var i = 0; i < arr.length; i++) {
			if (array .indexOf(arr[i]) === -1) {
				array .push(arr[i])
			}
		}
		return array;
	},
	/**
	 * @description 数组中最小值
	 * @param array
	 * @return {Number} 
	 */
	arrayMin: function(array) {
		return Math.min.apply(Math, array);
	},
	/**
	 * @description 数组中最大值
	 * @param array
	 * @return {Number} 
	 */
	arrayMax: function(array) {
		return Math.max.apply(Math, array);
	},
  // --------验证模块--------
	
	/**
   * @description 检测数据类型
   * @param data 要检测的数据
   * @param {String} type 要进行比较的数据类型,如果写多个用逗号隔开,不填则返回具体的数据类型
   * @return {String/Boolean} 数据类型/比较结果
   */
	isType: function (data,type) {
    if (!type) return Object.prototype.toString.call(data).match(/\s(.*)]/)[1];
    var _type = type.toLowerCase().split(',');
    var typeObj = {
      'string': '[object String]',
      'number': '[object Number]',
      'boolean': '[object Boolean]',
      'null': '[object Null]',
      'function': '[object Function]',
      'array': '[object Array]',
      'object': '[object Object]',
      'symbol': '[object Symbol]'
    };
    var result = false;
    _type.forEach(function (item,index) {
      if (typeObj[item] && typeObj[item] === Object.prototype.toString.call(data)){
        result = true;
      }
    });
    return result;
  },
	/**
	 * @description 检测字符串类型,多用于表单验证
	 * @param type {string} email tel phone url number english numen chinese lower upper reg
	 * @param str {string} 需要过滤的字符串
	 * @param rex {string} 当type=reg时候,rex有效为具体的正则表达式
	 * @return {Boolean} 结果 true/false
	 */
	checkType: function(str,type,rex) {
		var utils = {
			isNumber: function (val) {
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				if(regPos.test(val) || regNeg.test(val)) {
					return true;
				} else {
					return false;
				}
			},
			// 固话
			isTel : function (val) {
				var reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
				if (reg.test(val)){
					return true;
				}else {
					return false;
				}
			},
			// 手机号
			isPhone : function (val) {
				var reg = /^1(3|4|5|7|8)\d{9}$/;
				if (reg.test(val)){
					return true;
				}else {
					return false;
				}
			},
			isUrl : function (val) {
				var reg = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
				if (reg.test(val)){
					return true;
				}else {
					return false;
				}
			},
			isEmail : function (val) {
				var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
				if (reg.test(val)){
					return true;
				}else {
					return false;
				}
			},
			isEnglish : function (val) {
				var reg = /[a-zA-Z]/g;
				if (reg.test(val)){
					return true;
				}else {
					return false;
				}
			},
			isNumen : function (val) {
				var reg = /[0-9A-Za-z\\s]/g;
				if (reg.test(val)){
					return true;
				}else {
					return false;
				}
			},
			isLower : function (val) {
				var reg = /[a-z]/g;
				if (reg.test(val)){
					return true;
				}else {
					return false;
				}
			},
			isUpper : function (val) {
				var reg = /[A-Z]/g;
				if (reg.test(val)){
					return true;
				}else {
					return false;
				}
			},
			// 都是中文
			isChinese: function (val) {
				var reg = /[^\u4e00-\u9fa5]/g;
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
	},

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
   * @description 格式化时间戳
   * @method formatTimestamp
   * @param {Boolean} options.isNow 是否是当前时间,默认false
   * @param {string} options.rules 时间格式,默认为YYYY-MM-DD hh:mm:ss W
   * @param {number} options.timestamp 时间戳,如果isNow为true此项不填
   * @return {string} 格式化后的当前时间
   * @example formatTimestamp({"rules": ""}) --> "2019-02-15 15:43:24 星期五"
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
	 * @description 在当前时间基础上获取时间戳
	 * @param {Boolean} options.isNow 默认false
	 * @param {String} options.type 可选值year/month/day/hour/minute/second
	 * @param {number} options.offset
	 * @param {Boolean} options.isAdd
	 * @return {number} 时间戳(13位)
	 */
	getDateTime: function (options) {
		var isNow = typeof(options.isNow) == "undefined" ? false : options.isNow,
				type = options.type,
				offset = options.offset,
				isAdd = options.isAdd,
				now = new Date().getTime(),
				oneSecond = 1000,
				oneMinute = 60 * oneSecond,
				oneHour = 60 * oneMinute,
				oneDay = 24 * oneHour,
				oneMonth = 30 * oneDay,
				oneYear = 12 * oneMonth;
		if (isNow){
			return now;
		}else {
			switch (type){
				case 'year':
					if (isAdd){
						return new Date(now + (oneYear * offset)).getTime();
					}else {
						return new Date(now - (oneYear * offset)).getTime();
					}
				case 'month':
					if (isAdd){
						return new Date(now + (oneMonth * offset)).getTime();
					}else {
						return new Date(now - (oneMonth * offset)).getTime();
					}
				case 'day':
					if (isAdd){
						return new Date(now + (oneDay * offset)).getTime();
					}else {
						return new Date(now - (oneDay * offset)).getTime();
					}
				case 'hour':
					if (isAdd){
						return new Date(now + (oneHour * offset)).getTime();
					}else {
						return new Date(now - (oneHour * offset)).getTime();
					}
				case 'minute':
					if (isAdd){
						return new Date(now + (oneMinute * offset)).getTime();
					}else {
						return new Date(now - (oneMinute * offset)).getTime();
					}
				case 'second':
					if (isAdd){
						return new Date(now + (oneSecond * offset)).getTime();
					}else {
						return new Date(now - (oneSecond * offset)).getTime();
					}
				default:
					return now;
			}
		}
	},

  /**
   * @description 获取当前月总天数
   * @param {number} timestamp 时间戳
   * @return {number} 天数
   */
  getMonthDays: function (timestamp) {
    var date = new Date(timestamp),year,mouth,days;
	  if (timestamp.toString().length === 10){
	    date = new Date(timestamp*1000);
    }else if (timestamp.toString().length === 13){
      date = new Date(timestamp);
    }else {
      return '时间戳格式错误';
    }
    year = date.getFullYear();
    mouth = date.getMonth() + 1;
    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth == 2) {
      days = (year%4==0 && year%100==0 && year%400==0) || (year%4==0 && year%100!=0) ? 28 : 29
    } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
      //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
      days = 31
    } else {
      //其他月份，天数为：30.
      days = 30
    }
    return days;
  },

  /**
   * @description 数组转对象
   * @method arrayToObject
   * @param {Array} array 需要转化的数组
   * @return {Object} 格式化后的对象
   */
  arrayToObject: function (array) {
    var keyItem = [],keys,result = {};
    keys = Object.keys(array[0]);
    keys.forEach(function (item,index) {
      var obj = {};
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
  },
	/**
	 * @description 随机返回一个范围的数字
	 * @param n1
	 * @param n2
	 * @return {number}
	 */
	randomNumber: function(n1, n2) {
		switch (arguments.length) {
			case 2:
				return Math.round(n1 + Math.random() * (n2 - n1));
			case 1:
				return Math.round(Math.random() * n1);
			default:
				return Math.round(Math.random() * 100000000);
		}
	},
	/**
	 * @description 随机产生颜色
	 * @param {number} 输入16时候，会输出16进制颜色代码 
	 * @return {string}
	 */
	randomColor: function(sum) {
		if (sum) {
			return '#' + Math.random().toString(16).substring(2).substr(0, 6);
		}
		else {
			return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';
		}
	},
	/**
	 * @description 随机字符串生成
	 * @param type {number} 0 -- 只有数字 1 -- 只有字母 2 -- 数字和字母 3 -- 数字字母特殊符号
	 * @param n {number} 长度
	 * @return {string} 随机字符串
	 */
	randomString: function(type,n) {
		var typeArray = [
				"0123456789",
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_-<>/?[]{}|.,"
		];
		var len = typeArray[type].length;
		var result = '';
		for (var i=0;i<n;i++){
			result += typeArray[type].charAt(Math.ceil(Math.random() * len))
		}
		return result;
	},
  /**
	 * @description mm转px,此函数只适用于屏幕为96DPI的设备(大部分都是)
	 * @method mmTopx
	 * @param {number} mm 毫米
	 * @return {number} px 像素
	 */
	mmToPx: function(mm) {
		var m = parseFloat(mm);
		var px = (m*0.0393*96).toFixed(2);
		return px;
	},
	/**
	 * @description 设置cookie
	 * @param key 键
	 * @param val 值
	 * @param day 时长(天)
	 */
	setCookie: function(key,val,day) {
		var eDay = new Date();
		eDay.setDate(eDay.getDate() + day);
		document.cookie = key + '=' + val + ';expires=' + eDay;
	},

	/**
	 * @description 获取cookie值
	 * @param key 键
	 * @return 值
	 */
	getCookie: function(key) {
		var arr = document.cookie.split('; '), arr2;
		for (var i = 0; i < arr.length; i++) {
			arr2 = arr[i].split('=');
			if (arr2[0] === key) {
				return arr2[1];
			}
		}
		return undefined;
	},

	/**
	 * @description 删除cookie
	 * @param key 键
	 * @return {boolean} true: 成功 false: 失败
	 */
	removeCookie: function(key) {
		document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		if (!getCookie(key)){
			return true;
		}else {
			return false;
		}
	},

	/**
	 * @description 清除所有cookie
	 */
	clearCookie: function() {
		var arr = document.cookie.split('; '), arr2;
		for (var i = 0; i < arr.length; i++) {
			arr2 = arr[i].split('=');
			document.cookie = arr2[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	},
  /**
   * @description 判断是否是ios平台
   */
  isIos: function() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
      // return "Android";
      return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
      // return "iPhone";
      return true
    } else if (u.indexOf('iPad') > -1) {//iPad
      // return "iPad";
      return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
      // return "Windows Phone";
      return false
    }else{
      return false
    }
  },
  /**
   * @description 是否为PC平台
   */
  isPC: function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  /**
   * @description 获取当前浏览器的类型
   */
  browserType: function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if(fIEVersion == 7) return "IE7"
      else if(fIEVersion == 8) return "IE8";
      else if(fIEVersion == 9) return "IE9";
      else if(fIEVersion == 10) return "IE10";
      else return "IE7以下"//IE版本过低
    }
    if (isIE11) return 'IE11';
    if (isEdge) return "Edge";
    if (isFF) return "FF";
    if (isOpera) return "Opera";
    if (isSafari) return "Safari";
    if (isChrome) return "Chrome";
  },

  /**
   * @description 将数字转换为大写金额
   * @param {number} Num
   * @example priceToChinese(123456.78) --> 壹拾贰万叁仟肆佰伍拾陆元柒角捌分
   */
  priceToChinese: function (Num) {
    //判断如果传递进来的不是字符的话转换为字符
    if(typeof Num == "number") {
      Num = new String(Num);
    };
    Num = Num.replace(/,/g, ""); //替换tomoney()中的“,”
    Num = Num.replace(/ /g, "") ;//替换tomoney()中的空格
    Num = Num.replace(/￥/g, ""); //替换掉可能出现的￥字符
    if(isNaN(Num)) { //验证输入的字符是否为数字
      //alert("请检查小写金额是否正确");
      return "";
    };
    //字符处理完毕后开始转换，采用前后两部分分别转换
    var part = String(Num).split(".");
    var newchar = "";
    //小数点前进行转化
    for(var i = part[0].length - 1; i >= 0; i--) {
      if(part[0].length > 10) {
        return "";
        //若数量超过拾亿单位，提示
      }
      var tmpnewchar = "";
      var perchar = part[0].charAt(i);
      switch(perchar) {
        case "0":
          tmpnewchar = "零" + tmpnewchar;
          break;
        case "1":
          tmpnewchar = "壹" + tmpnewchar;
          break;
        case "2":
          tmpnewchar = "贰" + tmpnewchar;
          break;
        case "3":
          tmpnewchar = "叁" + tmpnewchar;
          break;
        case "4":
          tmpnewchar = "肆" + tmpnewchar;
          break;
        case "5":
          tmpnewchar = "伍" + tmpnewchar;
          break;
        case "6":
          tmpnewchar = "陆" + tmpnewchar;
          break;
        case "7":
          tmpnewchar = "柒" + tmpnewchar;
          break;
        case "8":
          tmpnewchar = "捌" + tmpnewchar;
          break;
        case "9":
          tmpnewchar = "玖" + tmpnewchar;
          break;
      }
      switch(part[0].length - i - 1) {
        case 0:
          tmpnewchar = tmpnewchar + "元";
          break;
        case 1:
          if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
          break;
        case 2:
          if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
          break;
        case 3:
          if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
          break;
        case 4:
          tmpnewchar = tmpnewchar + "万";
          break;
        case 5:
          if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
          break;
        case 6:
          if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
          break;
        case 7:
          if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
          break;
        case 8:
          tmpnewchar = tmpnewchar + "亿";
          break;
        case 9:
          tmpnewchar = tmpnewchar + "拾";
          break;
      }
      var newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if(Num.indexOf(".") != -1) {
      if(part[1].length > 2) {
        // alert("小数点之后只能保留两位,系统将自动截断");
        part[1] = part[1].substr(0, 2)
      }
      for(i = 0; i < part[1].length; i++) {
        tmpnewchar = "";
        perchar = part[1].charAt(i);
        switch(perchar) {
          case "0":
            tmpnewchar = "零" + tmpnewchar;
            break;
          case "1":
            tmpnewchar = "壹" + tmpnewchar;
            break;
          case "2":
            tmpnewchar = "贰" + tmpnewchar;
            break;
          case "3":
            tmpnewchar = "叁" + tmpnewchar;
            break;
          case "4":
            tmpnewchar = "肆" + tmpnewchar;
            break;
          case "5":
            tmpnewchar = "伍" + tmpnewchar;
            break;
          case "6":
            tmpnewchar = "陆" + tmpnewchar;
            break;
          case "7":
            tmpnewchar = "柒" + tmpnewchar;
            break;
          case "8":
            tmpnewchar = "捌" + tmpnewchar;
            break;
          case "9":
            tmpnewchar = "玖" + tmpnewchar;
            break;
        }
        if(i == 0) tmpnewchar = tmpnewchar + "角";
        if(i == 1) tmpnewchar = tmpnewchar + "分";
        newchar = newchar + tmpnewchar;
      }
    }
    //替换所有无用汉字
    while(newchar.search("零零") != -1)
      newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if(newchar.charAt(newchar.length - 1) == "元") {
      newchar = newchar + "整"
    }
    return newchar;
  },

  /**
   * @description 类似于jq的选择器，使用方法相同
   */
  $: function(selector){
    var type = selector.substring(0, 1);
    if (type === '#') {
      if (document.querySelecotor) return document.querySelector(selector);
      return document.getElementById(selector.substring(1))

    }else if (type === '.') {
      if (document.querySelecotorAll) return document.querySelectorAll(selector);
      return document.getElementsByClassName(selector.substring(1))
    }else{
      return document['querySelectorAll' ? 'querySelectorAll':'getElementsByTagName'](selector)
    }
  },

  /**
   * @description 图片预加载
   * @param {array} arr 图片数组
   * @param {function} callback 回调函数
   */
  imgLoadAll: function(arr,callback){
    var arrImg = [];
    for (var i = 0; i < arr.length; i++) {
      var img = new Image();
      img.src = arr[i];
      img.onload = function(){
        arrImg.push(this);
        if (arrImg.length == arr.length) {
          callback && callback();
        }
      }
    }
  },
  /**
   * @description ajax封装
   * @param {object} setting 配置项
   */
  ajax: function (setting) {
    //设置参数的初始值
    var opts={
      method: (setting.method || "GET").toUpperCase(), //请求方式
      url: setting.url || "", // 请求地址
      async: setting.async || true, // 是否异步
      dataType: setting.dataType || "json", // 解析方式
      contentType: setting.contentType || "application/json;charset=UTF-8",
      data: setting.data || "", // 参数
      success: setting.success || function(){}, // 请求成功回调
      error: setting.error || function(){} // 请求失败回调
    };

    // 参数格式化
    function params_format (obj) {
      var str = '';
      for (var i in obj) {
        str += i + '=' + obj[i] + '&'
      }
      return str.split('').slice(0, -1).join('');
    }

    // 创建ajax对象
    var xhr = new XMLHttpRequest();

    // 连接服务器open(方法GET/POST，请求地址， 异步传输)
    if(opts.method == 'GET'){
      var handleUrl;
      if (opts.url.indexOf('?') === -1){
        // url里面没有参数
        if (opts.data){
          // data里面有参数
          handleUrl = opts.url + "?" + params_format(opts.data);
        }else {
          // data里面没有参数
          handleUrl = opts.url;
        }
      }else {
        // url里面有参数
        if (opts.data){
          // data里面有参数
          handleUrl = opts.url + "&" + params_format(opts.data);
        }else {
          // data里面没有参数
          handleUrl = opts.url;
        }
      }
      xhr.open(opts.method, handleUrl, opts.async);
      xhr.send();
    }else{
      xhr.open(opts.method, opts.url, opts.async);
      xhr.setRequestHeader("Content-Type",opts.contentType);
      xhr.send(opts.data);
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        switch(opts.dataType){
          case "json":
            var json = JSON.parse(xhr.responseText);
            opts.success(json);
            break;
          case "xml":
            opts.success(xhr.responseXML);
            break;
          default:
            opts.success(xhr.responseText);
            break;
        }
      }
    };

    xhr.onerror = function(err) {
      opts.error(err);
    }
  },

  /**
   * @description 图片懒加载
   * @param {string} className 图片类名
   * @param {number} num 图片出现到视口的距离开始加载图片
   * @param {string} errorImg 图片出错时的占位图片
   */
  imageLazyLoad: function (className,num,errorImg) {
    var imgArr = document.getElementsByClassName(className),_src = '';
    for (var i=0,len = imgArr.length;i < len; i++){
      if (document.documentElement.clientHeight + document.documentElement.scrollTop > imgArr[i].offsetTop - num && !imgArr[i].isLoad){
        //记录图片是否已经加载
        imgArr[i].isLoad = true;
        //图片加载时候有一个图片透明度变化
        imgArr[i].style.cssText = "transition: ''; opacity: 0;";
        imgArr[i].style.transition = "";
        imgArr[i].style.opacity = "0";
        _src = imgArr[i].getAttribute("data-src");

        // 图片加载
        var oImg = new Image();
        oImg.src = _src;
        (function (){
          var x = i;
          oImg.onload = function () {
            imgArr[x].src = _src;
          };
          // 图片错误处理
          if (errorImg) {
            oImg.onerror = function () {
              imgArr[x].src = errorImg;
            }
          }
          setTimeout(() => {
            imgArr[x].style.cssText = "transition:all 1s; opacity: 1;";
          }, 20);
        })();
      }
    }
  },
  /**
   * @description 获取元素上边框距离浏览器窗口上方的距离
   * @method getOffsetTop
   * @param {element} ele dom节点
   * @return {Number} 距离
   */
  getOffsetTop: function (ele) {
    let tmp = ele.offsetTop;
    let node= ele.offsetParent;
    while(node!= null){
      tmp += node.offsetTop;
      node= node.offsetParent;
    }
    return tmp;
  },
  /**
   * @description 获取元素左边框距离浏览器窗口左边的距离
   * @method getOffsetLeft
   * @param {element} ele dom节点
   * @return {Number} 距离
   */
  getOffsetLeft: function (ele) {
    let tmp = ele.offsetLeft;
    let node= ele.offsetParent;
    while(node!= null){
      tmp += node.offsetLeft;
      node= node.offsetParent;
    }
    return tmp;
  },
  /**
   * @description 检测设备横屏竖屏变化(回调函数)
   * @method getDirectionChange
   * @return {String} landscape是横屏 portrait是竖屏
   */
  getOrientationChange: function (callback) {
    let supportOrientation = (typeof window.orientation === 'number' &&
        typeof window.onorientationchange === 'object');
    let updateOrientation = () => {
      let orientation;
      if (supportOrientation){
        orientation = window.orientation;
        switch(orientation){
          case 90:
          case -90:
            orientation = 'landscape';
            break;
          default:
            orientation = 'portrait';
            break;
        }
        callback(orientation);
      }else {
        orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
        callback(orientation);
      }
    };
    if (supportOrientation){
      // 监听屏幕转动
      window.addEventListener('orientationchange',updateOrientation,false);
    }else {
      //监听resize事件
      window.addEventListener('resize',updateOrientation,false);
    }
    // updateOrientation();
  },
  /**
   * @description 获取当前屏幕朝向
   * @method getDirection
   * @return {String} landscape是横屏 portrait是竖屏
   */
  getOrientation: function () {
    let supportOrientation = (typeof window.orientation === 'number' &&
        typeof window.onorientationchange === 'object'),orientation;
    if (supportOrientation){
      orientation = window.orientation;
      switch(orientation){
        case 90:
        case -90:
          orientation = 'landscape';
          return orientation;
        default:
          orientation = 'portrait';
          return orientation;
      }
    }else {
      orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
      return orientation;
    }
  },
  /**
   * @description 函数节流
   * @method throttle
   * @param fn 业务代码函数
   * @param delay 时间
   */
  throttle(fn, delay) {
    let startTime = 0;
    return function () {
      // 如果有参数，把参数赋值给业务函数，+new Date()把时间转成Number类型
      let _this = this, args = arguments, curTime = +new Date();
      // 如果当前时间-触发时间大于等于的间隔时间（delay），触发一次函数运行函数
      if (curTime - startTime >= delay) {
        fn.apply(_this, args);
        // 把当前时间赋值给开始时间，以便下一次调用时比对
        startTime = curTime;
      }
    };
  }
};

