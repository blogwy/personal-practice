// alter调用方法及所有参数
// Alert({
//   // 标题，不传值默认为提示
//   title: '提示',
//   // 内容，必传值
//   content: '内容内容内容',
//   // alter距浏览器顶部距离，默认20%，上下居中50%
//   boxTop: '50%',
//   // 是否显示取消按钮，不传值默认false不显示
//   showCancelButton: false,
//   // 是否显示model层，不传默认true显示
//   showModel: false,
//   // 确认取消按钮文字，默认确认取消
//   confirmButtonText: 'ok',
//   cancelButtonText: 'no',
//   // 确认取消按钮回调函数
//   cancelCallback(){
//     console.log('点击了no');
//   },
//   confirmCallback(){
//     console.log('点击了ok');
//   }
// });


var alert = Vue.component('alert',{
  data() {
    return {
      // 显示or隐藏
      visible: false,
      // 内容
      content: '',
      // box距离浏览器顶部距离
      boxTop : '20%',
      // alter标题
      title: '标题名称',
      // 是否显示取消按钮
      showCancelButton: null,
      // 是否显示model
      showModel: null,
      // 取消确定文字
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    };
  },
  methods: {
    cancel(){
      this.visible = false;
      this.showModel = false;
      this.callback('cancel');
    },
    confirm(){
      this.visible = false;
      this.showModel = false;
      this.callback('confirm');
    }
  },
  watch:{
    showModel(cur,old){
      console.log(cur);
    }
  },
  template: `<div>
    <transition name='alert-fade'>
      <div v-show='visible' class='alert' ref="alert" :style="{ top: boxTop }">
        <div class="alert-title">
          <div class="alert-title-content">{{title}}</div>
          <div class="alert-title-icon" @click="cancel">
            <img src="img/cancel.png" alt="">
          </div>
        </div>
        <div class="alert-content">
          {{content}}
        </div>
        <div class="alert-action">
          <div v-show="showCancelButton" @click="cancel" class="alert-action-cancel">{{ cancelButtonText }}</div>
          <div @click="confirm" class="alert-action-confirm">{{ confirmButtonText }}</div>
        </div>
      </div>
    </transition>
    <div class="modal" v-show='showModel'></div>
  </div>`
});


var AlertConstructor = Vue.extend(alert);

var Alert = (options) => {
  var instance = new AlertConstructor().$mount(document.createElement('div'));
  instance.content = options.content;
  instance.boxTop = options.boxTop || '20%';
  instance.title = options.title || '提示';
  instance.showCancelButton = typeof(options.showModel) == 'undefined' ? false : options.showCancelButton;
  instance.showModel = typeof(options.showModel) == 'undefined' ? true : options.showModel;
  instance.confirmButtonText = options.confirmButtonText || '确定';
  instance.cancelButtonText = options.cancelButtonText || '取消';
  instance.callback = function (action) {
    if (action === 'cancel'){
      options.cancelCallback ? options.cancelCallback() : '';
    }
    if (action === 'confirm'){
      options.confirmCallback ? options.confirmCallback() : '';
    }
  };
  document.body.appendChild(instance.$el);
  instance.visible = true;

};

