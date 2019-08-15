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
      el.addEventListener(item.trigger,function () {
        vnode.context.$set(vnode.context.vError,el.name,{
          message: '',
          validated: true,
          showMessage: false
        });
      });
    }else {
      // 初始化数据
      if (el.checked){
        vnode.context.$set(vnode.context.vError,el.name,{
          message: '',
          validated: true,
          showMessage: false
        });
      }else {
        vnode.context.$set(vnode.context.vError,el.name,{
          message: '不能为空',
          validated: false,
          showMessage: false
        });
      }
      el.addEventListener(item.trigger,function () {
        if (!el.checked){
          vnode.context.$set(vnode.context.vError,el.name,{
            message: item.message,
            validated: false,
            showMessage: true
          });
        }else {
          vnode.context.$set(vnode.context.vError,el.name,{
            message: '',
            validated: true,
            showMessage: false
          });
        }
      });
    }
  },
  checkLimit(el,item,vnode){
    if (!item.min && !item.max) return;
    el.addEventListener(item.trigger,function () {
      if (!el.checked){
        // 未选中
        return;
      }else {
        // 选中
        if (!isNaN(el.value)){
          // number
          if (item.min && item.max){
            if (parseFloat(el.value) >= item.min && parseFloat(el.value) <= item.max){
              vnode.context.$set(vnode.context.vError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.vError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          if (item.min && !item.max){
            if (parseFloat(el.value) >= item.min){
              vnode.context.$set(vnode.context.vError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.vError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          if (!item.min && item.max){
            if (parseFloat(el.value) <= item.max){
              vnode.context.$set(vnode.context.vError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.vError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
        }else {
          // string
          let len = (el.value).length;
          if (item.min && item.max){
            if (len >= item.min && len <= item.max){
              vnode.context.$set(vnode.context.vError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.vError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          if (item.min && !item.max){
            if (len >= item.min){
              vnode.context.$set(vnode.context.vError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.vError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          if (!item.min && item.max){
            if (len <= item.max){
              vnode.context.$set(vnode.context.vError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.vError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
        }
      }
    })
  },
  checkType(el,item,vnode){
    if (!item.type) return;
    el.addEventListener(item.trigger,function () {
      if (!el.checked){
        // 未选中
        return;
      }else {
        // 数字
        if (item.type === 'number'){
          if (utils.isNumber(el.value)){
            vnode.context.$set(vnode.context.vError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.vError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // 邮箱
        if (item.type === 'email'){
          if (utils.isEmail(el.value)){
            vnode.context.$set(vnode.context.vError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.vError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // Url
        if (item.type === 'url'){
          if (utils.isUrl(el.value)){
            vnode.context.$set(vnode.context.vError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.vError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // 中文
        if (item.type === 'chinese'){
          if (utils.isChinese(el.value)){
            vnode.context.$set(vnode.context.vError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.vError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // 手机号码
        if (item.type === 'cellphonenumber'){
          if (utils.isCellphoneNumber(el.value)){
            vnode.context.$set(vnode.context.vError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.vError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // 固定电话
        if (item.type === 'phonenumber'){
          if (utils.isPhoneNumber(el.value)){
            vnode.context.$set(vnode.context.vError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.vError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
      }
    })
  },
  checkRegex(el,item,vnode){
    if (!item.regex) return;
    el.addEventListener(item.trigger,function () {
      if (!el.checked){
        // 未选中
        return;
      }else {
        // 选中
        if (new RegExp(item.regex).test(el.value)){
          vnode.context.$set(vnode.context.vError,el.name,{
            message: '',
            validated: true,
            showMessage: false
          });
        }else {
          vnode.context.$set(vnode.context.vError,el.name,{
            message: item.message,
            validated: false,
            showMessage: true
          });
        }
      }
    });
  },
  isCheck: utils.checkType
};

export default handle;