let utils = {
  compareNumbers(el,item){
    if (item.min && item.max){
      if (parseFloat(el.value) >= item.min && parseFloat(el.value) <= item.max){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
    if (item.min && !item.max){
      if (parseFloat(el.value) >= item.min){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
    if (!item.min && item.max){
      if (parseFloat(el.value) <= item.max){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
  },
  compareType(el,item){
    if (item.textType === 'number'){
      if (utils.isNumber(el.value)){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
    // 邮箱
    if (item.textType === 'email'){
      if (utils.isEmail(el.value)){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
    // Url
    if (item.textType === 'url'){
      if (utils.isUrl(el.value)){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
    // 中文
    if (item.textType === 'chinese'){
      if (utils.isChinese(el.value)){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
    // 手机号码
    if (item.textType === 'cellphonenumber'){
      if (utils.isCellphoneNumber(el.value)){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
    // 固定电话
    if (item.textType === 'phonenumber'){
      if (utils.isPhoneNumber(el.value)){
        el.dataset.error = 'yes';
        el.style.borderColor = '#ccc';
        utils.delHtmlNode(el);
      }else {
        utils.addHtmlNode(item.message2,'is-error-span',el,true);
        el.style.borderColor = '#f56c6c';
        el.dataset.error = 'no';
      }
    }
  },
  compareRegExp(el,item){
    if (new RegExp(item.regex).test(el.value)){
      el.dataset.error = 'yes';
      el.style.borderColor = '#ccc';
      utils.delHtmlNode(el);
    }else {
      utils.addHtmlNode(item.message2,'is-error-span',el,true);
      el.style.borderColor = '#f56c6c';
      el.dataset.error = 'no';
    }
  },
  isNumber(val){
    let regPos = /^\d+(\.\d+)?$/; //非负浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  isEmail(val){
    let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  isUrl(val){
    let reg = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
    if (reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  isChinese(val){
    let reg = /[u4e00-u9fa5]/;
    if (!reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  isCellphoneNumber(val){
    let reg = /^1(3|4|5|7|8)\d{9}$/;
    if (reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  isPhoneNumber(val){
    let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if (reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  checkType(type){
    let arr = ['checkbox','radio'];
    if (arr.indexOf(type) === -1){
      return true;
    }else {
      return false;
    }
  },
  addHtmlNode(text,className,el){
    // 先删除再创建
    utils.delHtmlNode(el);
    let node = document.createElement("span");
    let textNode = document.createTextNode(text);
    node.classList.add(className);
    node.appendChild(textNode);
    el.parentNode.appendChild(node);
  },
  delHtmlNode(el){
    let childs = el.parentNode.childNodes;
    childs.forEach((item,index) => {
      if (item.nodeName !== '#text' && item.classList.contains('is-error-span')){
        el.parentNode.removeChild(el.parentNode.childNodes[index]);
      }
    });
  },
  events: ['blur','input']
};

export default utils;