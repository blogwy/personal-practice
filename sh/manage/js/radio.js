Vue.component('radio-group',{
  data() {
    return {}
  },
  mounted(){
    let _this = this;
    this.$on('checked',(e) => {
      _this.$children[0].radiocheacked = e;
      _this.$children[1].radiocheacked = e;
      _this.$emit('change', e);
      _this.$emit('input', e);
    });
  },
  template: `<div class="horizontal">
              <slot></slot>
            </div>`
});

Vue.component('radio',{
  data() {
    return {
      radiocheacked: '',
      value: ''
    }
  },
  watch: {
    radiocheacked(){
      this.$parent.$emit('checked',this.radiocheacked);
    }
  },
  mounted(){
    if ((this.$parent.$children).indexOf(this) == 0){
      this.value = '1'
    }
    if ((this.$parent.$children).indexOf(this) == 1){
      this.value = '0'
    }
  },
  template: `<div class="horizontal" ref="childcompon">
              <div class="c-radio item-horizontal">
                <label class="checkbox-lab">
                  <input type="radio"
                         v-model="radiocheacked"
                         :value="value"
                         class="checkbox-ipt">
                  <i class="iconfont icon-tijiao ico"
                     :class="{'item-checked':radiocheacked === value,'redcolor':value === '0'}" ref="icon"></i>
                  <slot></slot>
                </label>
              </div>
            </div>`
});