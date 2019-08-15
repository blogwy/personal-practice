Vue.component('nav-bar',{
  props: {
    menuFirst: String,
    menuSecond: String,
    sidebarStatusProps: Boolean
  },
  data() {
    return {
      navFirst: this.menuFirst,
      navSecond: this.menuSecond,
      sidebarStatus: this.sidebarStatusProps
    }
  },
  mounted(){},
  watch: {
    menuFirst(curVal,oldVal){
      this.navFirst = curVal;
    },
    menuSecond(curVal,oldVal){
      this.navSecond = curVal;
    },
    sidebarStatusProps(curVal,oldVal){
      this.sidebarStatus = curVal;
    }
  },
  template: `<div :class="['nav-container',{'right-width' : !sidebarStatus}]">
        <div class="navbar">
            <div class="navbar-breadcrumb-container">
                <span class="navbar-breadcrumb_item">
                    <span class="navbar-breadcrumb_inner">
                        <a>{{navFirst}}</a>
                    </span>
                    <span class="navbar-breadcrumb_separator" v-if="navSecond">/</span>
                </span>
                <span class="navbar-breadcrumb_item" v-if="navSecond">
                    <span class="navbar-breadcrumb_inner">
                        <a>{{navSecond}}</a>
                    </span>
                    <!--<span class="navbar-breadcrumb_separator">/</span>-->
                </span>
                <!--<span class="navbar-breadcrumb_item">-->
                    <!--<span class="navbar-breadcrumb_inner">-->
                        <!--<span>操作二</span>-->
                    <!--</span>-->
                    <!--&lt;!&ndash;<span class="navbar-breadcrumb_separator">/</span>&ndash;&gt;-->
                <!--</span>-->
            </div>
            <div class="navbar-user">
                <img class="navbar-user-img" src="img/user.svg"/>
                <div class="navbar-user-list">
                    <ul>
                        <li><a>用户名：测试用例</a></li>
                        <li><a>职&nbsp;&nbsp;&nbsp;&nbsp;位：测试总监</a></li>
                        <li><a>工&nbsp;&nbsp;&nbsp;&nbsp;厂：上海厂</a></li>
                        <li class="line"></li>
                        <li><a>用户管理</a></li>
                        <li><a>修改密码</a></li>
                        <li class="line"></li>
                        <li><a style="text-align: center">退出系统</a></li>
                    </ul>
                    <div class="navbar-user-arrow">
                        <i></i>
                        <em></em>
                    </div>
                </div>
            </div>
        </div>
    </div>`
});