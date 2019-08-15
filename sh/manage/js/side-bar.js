Vue.component('side-bar',{
  props: {
    secondIndex: Number,
    thirdIndex: Number
  },
  data() {
    return {
      menuFirst: [
        {
          icon: 'iconyemian-copy-active',
          title: '主页',
          active: false,
          link: "homepage.html"
        },
        {
          icon: 'icongouwuche',
          title: '原料基础信息',
          active: true,
          menuSecond: [
            {
              icon: '',
              title: '基础信息管理',
              active: false,
              link: "materialInfo.html"
            },
            {
              icon: '',
              title: '台账',
              active: false
            },
            {
              icon: '',
              title: '供应商关系',
              active: false,
               menuThird: [
                 {
                   icon: '',
                   title: '表单录入',
                   active: false
                 },
                 {
                   icon: '',
                   title: '条码打印/生成',
                   active: false
                 },
                 {
                   icon: '',
                   title: '提醒',
                   active: false
                 },
                 {
                   icon: '',
                   title: '详情',
                   active: false
                 },
                 {
                   icon: '',
                   title: '撤销',
                   active: false
                 },
                 {
                   icon: '',
                   title: '退料入库',
                   active: false
                 }
               ]
            }
          ]
        },
        {
          icon: 'icongouwuchefill',
          title: '原料入库',
          active: true,
          menuSecond: [
            {
              icon: '',
              title: '表单录入',
              active: false
            },
            {
              icon: '',
              title: '倒批次提醒',
              active: false
            },
            {
              icon: '',
              title: '保质期提醒',
              active: false,
               menuThird: [
                 {
                   icon: '',
                   title: '表单录入',
                   active: false
                 },
                 {
                   icon: '',
                   title: '条码打印/生成',
                   active: false
                 },
                 {
                   icon: '',
                   title: '提醒',
                   active: false
                 },
                 {
                   icon: '',
                   title: '详情',
                   active: false
                 },
                 {
                   icon: '',
                   title: '撤销',
                   active: false
                 },
                 {
                   icon: '',
                   title: '退料入库',
                   active: false
                 }
               ]
            },
            {
              icon: '',
              title: '条码生成',
              active: false
            },
            {
              icon: '',
              title: '条码打印',
              active: false
            },
            {
              icon: '',
              title: '入库记录',
              active: false
            },
            {
              icon: '',
              title: '入库详情',
              active: false
            },
            {
              icon: '',
              title: '入库撤销',
              active: false
            },
            {
              icon: '',
              title: '退料入库',
              active: false
            }
          ]
        },
        {
          icon: 'iconwode',
          title: '库存管理',
          active: true,
          menuSecond: [
            {
              icon: '',
              title: '库存记录',
              active: false
            },
            {
              icon: '',
              title: '低库存预警',
              active: false
            },
            {
              icon: '',
              title: '发送预警邮件',
              active: false
            },
            {
              icon: '',
              title: '预警邮件列表',
              active: false
            },
            {
              icon: '',
              title: '原料到期提醒',
              active: false
            }
          ]
        },
        {
          icon: 'icongouwuchefill',
          title: '原料领料',
          active: true,
          menuSecond: [
            {
              icon: '',
              title: 'PAD扫码',
              active: false
            },
            {
              icon: '',
              title: '表单录入',
              active: false
            },
            {
              icon: '',
              title: '更换批次提醒',
              active: false
            },
            {
              icon: '',
              title: '领料单',
              active: false
            },
            {
              icon: '',
              title: '领料记录',
              active: false
            },
            {
              icon: '',
              title: '领料算法FIFO',
              active: false
            }
          ]
        },
      ],
      currentSecondIndex: this.secondIndex,
      currentThirdIndex: this.thirdIndex,
      sidebarFlag: true
    }
  },
  methods:{
    openMenuSecond(index,active,link){
      if (this.currentSecondIndex !== index){
        this.currentSecondIndex = index;
        this.currentThirdIndex = null;
      }else {
        this.currentSecondIndex = null;
        this.currentThirdIndex = null;
      }
      if (!active){
        window.location.href = link;
      }
    },
    openMenuThird(index,secondIndex,active,link){
      if (this.currentThirdIndex !== secondIndex){
        this.currentSecondIndex = index;
        this.currentThirdIndex = secondIndex;
      }else {
        this.currentThirdIndex = null;
      }
      if (!active){
        window.location.href = link;
      }
    },
    openMenuFourth(active,link){
      if (!active){
        window.location.href = link;
      }
    },
    toggleSidebar(){
      if (this.sidebarFlag){
        this.sidebarFlag = false;
      }else {
        this.sidebarFlag = true;
      }
    }
  },
  watch:{
    sidebarFlag(curVal,oldVal){
      this.$emit('sidebar-status', curVal);
    },
    // currentSecondIndex(curVal,oldVal){
    //   if (curVal){
    //     let obj = {
    //       menuFirst: this.menuFirst[curVal].title,
    //       menuSecond: this.menuFirst[curVal].active ? (this.menuFirst[curVal].menuSecond[this.currentThirdIndex]) : null
    //     };
    //     this.$emit('current-menu',obj);
    //   }
    // },
    // currentThirdIndex(curVal,oldVal){
    //   if (curVal){
    //     let obj = {
    //       menuFirst: this.menuFirst[this.currentSecondIndex].title,
    //       menuSecond: this.menuFirst[this.currentSecondIndex].active ? (this.menuFirst[this.currentSecondIndex].menuSecond[curVal].title) : null
    //     };
    //     this.$emit('current-menu',obj);
    //   }
    // }
  },
  mounted(){
    document.body.addEventListener('touchstart',function () {});
    this.$emit('sidebar-status', this.sidebarFlag);
    let obj = {
      menuFirst: this.menuFirst[this.currentSecondIndex].title,
      menuSecond: this.menuFirst[this.currentSecondIndex].active ? (this.menuFirst[this.currentSecondIndex].menuSecond[this.currentThirdIndex].title) : null
    };
    this.$emit('current-menu',obj);
  },
  template: `<div :class="['sidebar-scrollbar',,sidebarFlag ? '':'sidebar-scrollbar-hide']">
          <div :class="['sidebar',sidebarFlag ? '':'sidebar-hide']">
            <div :class="['sidebar-bar',sidebarFlag ? '':'sidebar-bar-hide']">
              <span v-if="sidebarFlag" style="flex: 5;color: #ffffff;">追溯系统</span>
              <i class="iconfont iconleimupinleifenleileibie icon-menu" @click="toggleSidebar"></i>
            </div>
            <div v-for="(item,index) in menuFirst">
              <div :class="['sidebar-item', currentSecondIndex === index ? 'is-open': '', sidebarFlag ? '':'sidebar-item-hide']"
                   @click.stop="openMenuSecond(index,item.active,item.link)">
                <i :class="['iconfont',item.icon,'icon']"></i>
                <span v-if="sidebarFlag" class="title">{{ item.title }}</span>
                <!--<i v-if="sidebarFlag" :class="['iconfont','icon54','icon-arrow',item.active ? '': 'hide-color']"-->
                </i>
              </div>
              <!--二级菜单-->
              <div v-if="sidebarFlag" class="second-item-ul">
                <div v-for="(secondItem,secondIndex) in item.menuSecond" class="second-item">
                  <div :class="['second-item-li',(currentThirdIndex === secondIndex && currentSecondIndex === index) ? 'is-open': '', sidebarFlag ? '':'sidebar-item-hide']"
                       @click.stop="openMenuThird(index,secondIndex,secondItem.active,secondItem.link)">
                    <div class="icon"></div>
                    <div class="title">
                      {{secondItem.title}}
                    </div>
                    <!--<i :class="['iconfont','icon54','icon-arrow',secondItem.active ? '': 'hide-color']"></i>-->
                  </div>
                  <!--三级菜单-->
                  <div class="third-item-ul" style="display: none">
                    <div v-for="(thirdItem,thirdIndex) in secondItem.menuThird" class="third-item">
                      <div class="third-item-li" @click.stop="openMenuFourth(thirdItem.active,thirdItem.link)">
                        <div class="icon"></div>
                        <div class="title">
                          {{thirdItem.title}}
                        </div>
                        <!--<div :class="['iconfont','icon-arrow',thirdItem.active ? '': 'hide-color']"></div>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
});