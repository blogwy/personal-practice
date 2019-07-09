## 字符串模块

### utils.trim(str,type)

去掉字符串中的空格

* str [\<String>](Sting) 需要处理的字符串

* type [\<Number>](Number) 1-所有空格  2-前后空格  3-前空格 4-后空格

* 返回: [\<String>](Sting) 处理后的字符串

### utils.replaceStr(str,startStr,endStr,repStr)

替换字符串

* str [\<String>](Sting) 需要处理的字符串

* startStr [\<String>](Sting) 开始字符串 为空则从开头匹配

* endStr [\<String>](Sting) 结束字符串 为空则从结尾匹配

* repStr [\<String>](Sting) 替换的字符串

* 返回: [\<String>](Sting) 处理后的字符串

### utils.filterString(type,str,replaceStr)

根据规则过滤字符串

* type [\<Number>](Number) 0 -- 小写字母, 1 -- 大写字母, 2 -- 字母, 3 -- 数字, 4 -- 中文, 5 -- html标签, 6 -- 特殊字符

* str [\<String>](Sting) 需要过滤的字符串

* replaceStr [\<String>](Sting) 替换的字符串，默认空

* 返回: [\<String>](Sting) 处理后的字符串

## 数组模块

### utils.deepCopy(array)

数组深拷贝

* array [<Array/Object>](<Array/Object>) 需要拷贝的数组或者对象

* 返回: [<Array/Object>](<Array/Object>)

### utils.arrayItemCount(array,item)

计算数组中一项出现的次数

* array [\<Array>](<Array>) 这个数组

* item 要计算次数的那一项

* 返回: [\<Number>](Number) 次数

### utils.arrayUnique(array)

数组去重

* array [\<Array>](Array) 这个数组

* 返回: [\<Array>](Array) 去重后的数组

### utils.arrayMin(array)

找出数组中最小项

* array [\<Array>](Array) 这个数组

* 返回: [\<Number>](Number) 最小项

### utils.arrayMax(array)

找出数组中最大项

* array [\<Array>](Array) 这个数组

* 返回: [\<Number>](Number) 最大项

## 验证模块

### utils.isType(data,type)

检测数据类型

* data 要检测的数据

* type [\<String>](Sting) 要进行比较的数据类型,如果写多个用逗号隔开,不填则返回具体的数据类型

* 返回: 数据类型/比较结果

### utils.checkType(str,type,rex)

检测字符串类型,多用于表单验证

* str [\<String>](Sting) 要检测的字符串

* type [\<String>](Sting) 类型,可选值:email tel phone url number english numen chinese lower upper reg

* rex [\<String>](Sting) 当type=reg时候,rex有效为具体的正则表达式

* 返回: [\<Boolean>](Boolean) 通过为true

## 其他模块

### utils.getUrlParam(paramName)

获取url里面的具体参数

* paramName [\<String>](String) 参数名

* 返回: [\<String>](String) 返回要获取的参数值

### utils.formatTimestamp(options)

格式化时间戳

* options [\<Object>](Object) 一组选项
    * isNow [\<Boolean>](Boolean) 是否是当前时间,默认false
    * rules [\<String>](String)  时间格式,默认为YYYY-MM-DD hh:mm:ss W
    * timestamp [\<Number>](Number) 时间戳,如果isNow为true此项不填
* 返回: [\<String>](String) 格式化后的时间

### utils.getDateTime(options)

在当前时间基础上获取时间戳

* options [\<Object>](Object) 一组选项
    * isNow [\<Boolean>](Boolean) 是否是当前时间,默认false
    * type [\<String>](String) 时间的偏移类型,可选值year/month/day/hour/minute/second
    * offset [\<Number>](Number) 时间的偏移量
    * isAdd [\<Boolean>](Boolean) true为之后的时间,false为之前的时间
    * 返回: [\<Number>](Number) 时间戳(13位)

### utils.arrayToObject(array)

数组转对象

* array [\<Array>](Array)

* 返回: [\<Object>](Object)

### utils.randomNumber(n1, n2)

获取一个范围内的随机数字

* n1 [\<Number>](Number)

* n2 [\<Number>](Number)

* 返回: [\<Number>](Number)

### utils.randomColor(x)

随机产生颜色

* x [\<Number>](Number) 输入16时候，会输出16进制颜色代码

* 返回: [\<String>](String)

### utils.randomString(type,n)

随机字符串生成

* type [\<Number>](Number) 0 -- 只有数字 1 -- 只有字母 2 -- 数字和字母 3 -- 数字字母特殊符号

* n [\<Number>](Number) 长度

* 返回: [\(String)](String) 随机字符串

### utils.mmToPx(mm)

mm转px,此函数只适用于屏幕为96DPI的设备

* mm [\<Number>](Number) 毫米

* 返回: [\<Number>](Number) 像素

### utils.setCookie(key,val,day)

设置cookie

* key [\(String)](String) 键

* val [\(String)](String) 值

* day [\<Number>](Number) 时长(天)


### utils.getCookie(key)

获取cookie

* key [\(String)](String) 键

* 返回: [\(String)](String) 当前cookie值

### utils.removeCookie(key)

删除cookie

* key [\(String)](String) 键

* 返回: [\(Boolean)](Boolean) true: 成功 false: 失败

### utils.clearCookie()

清除所有cookie