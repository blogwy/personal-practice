Vue.component('pagination',{
  props: {
    // 当前页
    cPage: Number,
    // 数据总数
    count: Number,
    // 每页显示个数
    pageSize: Number,
    // 中间显示页数
    pPages: Number
  },
  data() {
    return {
      currentPage: this.cPage, //当前页
      pages: Math.ceil(this.count/this.pageSize), //总页数
      changePage: '',//跳转页
      perPages: this.pPages //中间显示的个数
    }
  },
  mounted(){
    this.$emit('change', this.currentPage)
  },
  methods: {
    jumpPage: function(id) {
      if (parseInt(id) <= this.pages && parseInt(id) >= 1){
        this.currentPage = parseInt(id);
        this.$emit('change', this.currentPage)
      }
    },
    prev(){
      if (this.currentPage > 1){
        this.jumpPage(this.currentPage - 1)
      }
    },
    next(){
      if (this.currentPage < this.pages){
        this.jumpPage(this.currentPage + 1)
      }
    }
  },
  computed:{
    show:function(){
      return this.pages && this.pages !== 1
    },
    efont: function() {
      if (this.pages <= this.perPages) return false;
      return this.currentPage > 5
    },
    indexs: function() {
      let left = 1,
          right = this.pages,
          ar = [];
      if (this.pages >= this.perPages) {
        if (this.currentPage > 5 && this.currentPage < this.pages - 4) {
          if (this.perPages % 2){
            left = Number(this.currentPage) - ((this.perPages-1)/2);
            right = Number(this.currentPage) + ((this.perPages-1)/2);
          }else {
            left = Number(this.currentPage) - ((this.perPages/2)-1);
            right = Number(this.currentPage) + ((this.perPages/2));
            console.log(left);
            console.log(right);
          }

        } else {
          if (this.currentPage <= 5) {
            left = 1;
            right = this.perPages;
          } else {
            right = this.pages;
            left = this.pages - (this.perPages-1);
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
  },
  template: `<div class="page">
              <div>
                总共<span class="all-data">{{count}}</span>数据，<span class="all-page">{{pages}}</span>页
              </div>
              <ul class="page-group">
                <li
                    :class="['page-item',{'page-disable':currentPage == 1}]"
                    @click="prev">上一页</li>
                <li
                    class="page-item"
                    v-show="currentPage>5"
                    @click="jumpPage(1)">1</li>
                <li class="page-item" v-show="efont">...</li>
                <li v-for="num in indexs"
                    :class="['page-item',{'page-active':currentPage==num}]"
                    @click="jumpPage(num)">{{ num }}</li>
                <li class="page-item" v-show="efont&&currentPage<pages-4">...</li>
                <li class="page-item"
                    v-show="currentPage<pages-4"
                    @click="jumpPage(pages)">{{pages}}</li>
                <li :class="['page-item',{'page-disable':currentPage == pages}]" @click="next">下一页</li>
              </ul>
              <div class="page-go">
                转到
                <input class="page-ipt" type="text" v-model.number="changePage" />
                <button class="page-btn" @click="jumpPage(changePage)">GO</button>
              </div>
            </div>`
});