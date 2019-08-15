

// 使用方法请看
import handle from './validate_handle';

let WyValidate = {};

WyValidate.install = (Vue, options = { directiveName: 'wyValidate' }) => {

  Vue.directive(options.directiveName,{
    bind(el, binding, vnode){
      if (handle.isCheck(el.type)){
        switch (binding.value.type){
          case 0:
            handle.valueRequired(el, binding.value, vnode);
            break;
          case 1:
            handle.valueLimit(el, binding.value, vnode);
            break;
          case 2:
            handle.valueType(el, binding.value, vnode);
            break;
          case 3:
            handle.valueRegex(el, binding.value, vnode);
            break;
        }
      }else {
        switch (binding.value.type){
          case 0:
            handle.checkRequired(el, binding.value, vnode);
            break;
          case 1:
            handle.checkLimit(el, binding.value, vnode);
            break;
          case 2:
            handle.checkType(el, binding.value, vnode);
            break;
          case 3:
            handle.checkRegex(el, binding.value, vnode);
            break;
        }
      }
    }
  });

};

export default WyValidate;