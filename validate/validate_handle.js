import utils from './validate_utils';

let handle = {
  valueRequired(el,item,vnode){
    if (typeof (item.required) == 'undefined') return;
    if (!item.required){
      el.dataset.error = 'yes';
    }else {
      // 初始化数据
      if (el.value === ''){
        el.dataset.error = 'no';
      }else {
        el.dataset.error = 'yes';
      }
    }
    utils.events.forEach((event, index) => {
      el.addEventListener(event,function () {
        if (!el.value){
          utils.addHtmlNode(item.message1,'is-error-span',el);
          el.style.borderColor = '#f56c6c';
          el.dataset.error = 'no';
        }else {
          el.dataset.error = 'yes';
          el.style.borderColor = '#ccc';
          utils.delHtmlNode(el);
        }
      });
    });

  },
  valueLimit(el,item,vnode){
    if (!item.min && !item.max) return;
    // 初始化
    if (!item.required){
      if (el.value){
        // valueLimit比较
        utils.compareNumbers(el,item);
      }else {
        el.dataset.error = 'yes';
      }
    }else {
      if (el.value){
        // valueLimit比较
        utils.compareNumbers(el,item);
      }else {
        el.dataset.error = 'no';
      }
    }
    utils.events.forEach((event, index) => {
      el.addEventListener(event,function () {
        if (!item.required){
          if (el.value){
            // valueLimit比较
            utils.compareNumbers(el,item);
          }else {
            el.dataset.error = 'yes';
            el.style.borderColor = '#ccc';
            utils.delHtmlNode(el);
          }
        }else {
          if (el.value){
            // valueLimit比较
            utils.compareNumbers(el,item);
          }else {
            utils.addHtmlNode(item.message1,'is-error-span',el);
            el.style.borderColor = '#f56c6c';
            el.dataset.error = 'no';
          }
        }
      })
    });
  },
  valueType(el,item,vnode){
    if (!item.textType) return;
    // 初始化
    if (!item.required){
      if (el.value){
        // valueType比较
        utils.compareType(el, item);
      }else {
        el.dataset.error = 'yes';
      }
    }else{
      if (el.value){
        // valueType比较
        utils.compareType(el, item);
      }else {
        el.dataset.error = 'no';
      }
    }

    utils.events.forEach(function (event,index) {
      el.addEventListener(event,function () {
        if (!item.required){
          if (el.value){
            // valueType比较
            utils.compareType(el, item);
          }else {
            el.dataset.error = 'yes';
            el.style.borderColor = '#ccc';
            utils.delHtmlNode(el);
          }
        }else{
          if (el.value){
            // valueType比较
            utils.compareType(el, item);
          }else {
            utils.addHtmlNode(item.message1,'is-error-span',el);
            el.style.borderColor = '#f56c6c';
            el.dataset.error = 'no';
          }
        }
      })
    });
  },
  valueRegex(el,item,vnode){
    if (!item.regex) return;
    // 初始化
    if (!item.required){
      if (el.value){
        // valueRegex比较
        utils.compareRegExp(el, item);
      }else {
        el.dataset.error = 'yes';
      }
    }else{
      if (el.value){
        // valueRegex比较
        utils.compareRegExp(el, item);
      }else {
        el.dataset.error = 'no';
      }
    }
    utils.events.forEach(function (event,index) {
      el.addEventListener(event,function () {
        if (!item.required){
          if (el.value){
            // valueRegex比较
            utils.compareRegExp(el, item);
          }else {
            el.dataset.error = 'yes';
            el.style.borderColor = '#ccc';
            utils.delHtmlNode(el);
          }
        }else{
          if (el.value){
            // valueRegex比较
            utils.compareRegExp(el, item);
          }else {
            utils.addHtmlNode(item.message1,'is-error-span',el);
            el.style.borderColor = '#f56c6c';
            el.dataset.error = 'no';
          }
        }
      });
    });
  },
  checkRequired(el,item,vnode){
    if (typeof (item.required) == 'undefined') return;
    if (!item.required){
      el.dataset.error = 'yes';
    }else {
      // 初始化数据
      if (el.checked === ''){
        el.dataset.error = 'no';
      }else {
        el.dataset.error = 'yes';
      }
    }
    utils.events.forEach((event, index) => {
      el.addEventListener(event,function () {
        if (!el.checked){
          utils.addHtmlNode(item.message1,'is-error-span',el);
          el.style.borderColor = '#f56c6c';
          el.dataset.error = 'no';
        }else {
          el.dataset.error = 'yes';
          el.style.borderColor = '#ccc';
          utils.delHtmlNode(el);
        }
      });
    });

  },
  checkLimit(el,item,vnode){
    if (!item.min && !item.max) return;
    // 初始化
    if (!item.required){
      if (el.checked){
        // checkedLimit比较
        utils.compareNumbers(el,item);
      }else {
        el.dataset.error = 'yes';
      }
    }else {
      if (el.checked){
        // checkedLimit比较
        utils.compareNumbers(el,item);
      }else {
        el.dataset.error = 'no';
      }
    }
    utils.events.forEach((event, index) => {
      el.addEventListener(event,function () {
        if (!item.required){
          if (el.checked){
            // checkedLimit比较
            utils.compareNumbers(el,item);
          }else {
            el.dataset.error = 'yes';
            el.style.borderColor = '#ccc';
            utils.delHtmlNode(el);
          }
        }else {
          if (el.checked){
            // checkedLimit比较
            utils.compareNumbers(el,item);
          }else {
            utils.addHtmlNode(item.message1,'is-error-span',el);
            el.style.borderColor = '#f56c6c';
            el.dataset.error = 'no';
          }
        }
      })
    });
  },
  checkType(el,item,vnode){
    if (!item.textType) return;
    // 初始化
    if (!item.required){
      if (el.checked){
        // checkedType比较
        utils.compareType(el, item);
      }else {
        el.dataset.error = 'yes';
      }
    }else{
      if (el.checked){
        // checkedType比较
        utils.compareType(el, item);
      }else {
        el.dataset.error = 'no';
      }
    }

    utils.events.forEach(function (event,index) {
      el.addEventListener(event,function () {
        if (!item.required){
          if (el.checked){
            // checkedType比较
            utils.compareType(el, item);
          }else {
            el.dataset.error = 'yes';
            el.style.borderColor = '#ccc';
            utils.delHtmlNode(el);
          }
        }else{
          if (el.checked){
            // checkedType比较
            utils.compareType(el, item);
          }else {
            utils.addHtmlNode(item.message1,'is-error-span',el);
            el.style.borderColor = '#f56c6c';
            el.dataset.error = 'no';
          }
        }
      })
    });
  },
  checkRegex(el,item,vnode){
    if (!item.regex) return;
    // 初始化
    if (!item.required){
      if (el.checked){
        // checkedRegex比较
        utils.compareRegExp(el, item);
      }else {
        el.dataset.error = 'yes';
      }
    }else{
      if (el.checked){
        // checkedRegex比较
        utils.compareRegExp(el, item);
      }else {
        el.dataset.error = 'no';
      }
    }
    utils.events.forEach(function (event,index) {
      el.addEventListener(event,function () {
        if (!item.required){
          if (el.checked){
            // checkedRegex比较
            utils.compareRegExp(el, item);
          }else {
            el.dataset.error = 'yes';
            el.style.borderColor = '#ccc';
            utils.delHtmlNode(el);
          }
        }else{
          if (el.checked){
            // checkedRegex比较
            utils.compareRegExp(el, item);
          }else {
            utils.addHtmlNode(item.message1,'is-error-span',el);
            el.style.borderColor = '#f56c6c';
            el.dataset.error = 'no';
          }
        }
      });
    });
  },
  isCheck: utils.checkType
};

export default handle;