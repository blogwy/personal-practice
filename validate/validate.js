

// 使用方法请看
import handle from './validate_handle';

let WyValidate = {};

WyValidate.install = (Vue, options = { directiveName: 'wyValidate' }) => {

  Vue.directive(options.directiveName,{
    inserted(el, binding, vnode){
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
        console.log(binding.value.type);
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

  // 提交指令
  Vue.directive('submit', {
    inserted: function (el, binding, vNode) {
      el.addEventListener('click', function (event) {
        let elements = document.getElementsByClassName('v-validate');
        let evObj = document.createEvent('Event');
        evObj.initEvent('input', true, true);
        for (let element of elements) {
          element.dispatchEvent(evObj);
        }
        let errorInputs = document.getElementsByClassName('is-error-span');
        if(errorInputs.length === 0){
          console.log(111);
          // 需要定义一个submit事件
          vNode.context[binding.value]();
        }
      })
    }
  });
};

export default WyValidate;