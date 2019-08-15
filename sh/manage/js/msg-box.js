Vue.component('msg-box',{
  props: {
    // 显示or隐藏
    boxVisible: Boolean,
    // 标题
    boxTitle: {
      type: String,
      default: '提示'
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: false
    },
    // 确认按钮文字
    confirmText: {
      type: String,
      default: '确定'
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      default: '取消'
    },
    // box距浏览器顶部距离
    boxTop: {
      type: String,
      default: '20%'
    },
    // 是否显示modal
    showModel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: this.boxVisible,
      topBox: this.boxTop,
      title: this.boxTitle,
      showCancelButton: this.showCancel,
      boxShowModel: this.showModel,
      confirmButtonText: this.confirmText,
      cancelButtonText: this.cancelText
    };
  },
  methods: {
    cancel(){
      this.visible = false;
      // 取消事件
      this.$emit('cancel','点击了cancel');
    },
    confirm(){
      this.visible = false;
      // 确认事件
      this.$emit('confirm','点击了confirm');
    }
  },
  watch: {
    boxTop(curVal,oldVal){
      this.topBox = curVal;
    },
    boxVisible(curVal,oldVal){
      this.visible = curVal
    },
    boxTitle(curVal,oldVal){
      this.title = curVal
    },
    showCancel(curVal,oldVal){
      this.showCancelButton = curVal
    },
    confirmText(curVal,oldVal){
      this.confirmButtonText = curVal
    },
    cancelText(curVal,oldVal){
      this.cancelButtonText = curVal
    }
  },
  template: `<div>
    <transition name='msgbox-fade'>
      <div v-show='visible' class='msg-box' :style="{ top: topBox }">
        <div class="msg-box-title">
          <div class="msg-box-title-content">{{title}}</div>
          <div class="msg-box-title-icon" @click="cancel">
            <img src="img/cancel.png" alt="">
          </div>
        </div>
        <div class="msg-box-content">
          <slot></slot>
        </div>
        <div class="msg-box-action">
          <div v-show="showCancelButton" @click="cancel" class="msg-box-action-cancel">{{ cancelButtonText }}</div>
          <div @click="confirm" class="msg-box-action-confirm">{{ confirmButtonText }}</div>
        </div>
      </div>
    </transition>
    <div class="msg-box-modal" v-show='visible && boxShowModel'></div>
  </div>`
});