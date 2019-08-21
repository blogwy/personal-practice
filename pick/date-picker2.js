Vue.component('date-picker',{
  props: {
    // 模式 date month year datetime(日期时间模式)
    mode: String,
    placeholderText: String,
    // 初始化时间，时间戳，默认当前时间
    defaultTime: {
      type: Number,
      default: 0
    },
    // 开始时间，时间戳，默认无限制
    minTime: {
      type: Number,
      default: 0
    },
    // 结束时间，时间戳，默认无限制
    maxTime: {
      type: Number,
      default: 0
    },
    // 格式化 YYYY-MM-DD hh:mm:ss
    format: {
      type: String,
      default: 'default'
    },
    // picker宽度
    pickerWidth: {
      type: Number,
      default(){
        switch (this.mode){
          case 'datetime':
            return 250;
          case 'date':
            return 155;
          case 'month':
            return 155;
          case 'year':
            return 155;
        }
      }
    }
  },
  data() {
    return {
      pickerFlag: false,
      timePickerFlag: false,
      // 当前值
      current: '',
      type: this.mode,
      placeholder: this.placeholderText,
      // type=datetime
      hours: '',
      minutes:'',
      seconds: '',
      currentTime: '',
      currentDate: '',
      dateHours: [
        {
          text: '',
          current: false
        },
        {
          text: '',
          current: false
        },
        {
          text: '00',
          current: true
        },
        {
          text: '01',
          current: false
        },
        {
          text: '02',
          current: false
        }
      ],
      dateMinutes: [
        {
          text: '',
          current: false
        },
        {
          text: '',
          current: false
        },
        {
          text: '00',
          current: true
        },
        {
          text: '01',
          current: false
        },
        {
          text: '02',
          current: false
        }
      ],
      dateSeconds: [
        {
          text: '',
          current: false
        },
        {
          text: '',
          current: false
        },
        {
          text: '00',
          current: true
        },
        {
          text: '01',
          current: false
        },
        {
          text: '02',
          current: false
        }
      ],
      // type=date
      year: '',
      month: '',
      // 已选中的项
      day: '',
      //
      weeks: ['日','一','二','三','四','五','六'],
      date: [],
      // type=month
      year2: '',
      // 已选中的项
      month2: '',
      dateMonth: [],
      // type=year
      year3: '',
      year4: '',
      // 已选中的项
      year5: '',
      dateYear: []
    }
  },
  methods: {
    changeTime(type,time){
      let timeArray = [
        {
          text: '',
          current: false
        },
        {
          text: '',
          current: false
        },
        {
          text: '',
          current: true
        },
        {
          text: '',
          current: false
        },
        {
          text: '',
          current: false
        }
      ];
      let _time = parseInt(time);
      let forArray = [-2,-1,0,1,2];
      if (!_time) return;
      if (type === 'Hours'){
        forArray.forEach(function (item,index) {
          if ((_time + item) < 0){
            timeArray[index].text = '';
          }else if ((_time + item) >= 0 && (_time + item) < 10){
            timeArray[index].text = '0' + (_time + item);
          }else if ((_time + item) >= 10 && (_time + item) < 24){
            timeArray[index].text = '' + (_time + item);
          }
        });
        this.dateHours = timeArray;
      }
      if (type === 'Minutes'){
        forArray.forEach(function (item,index) {
          if ((_time + item) < 0){
            timeArray[index].text = '';
          }else if ((_time + item) >= 0 && (_time + item) < 10){
            timeArray[index].text = '0' + (_time + item);
          }else if ((_time + item) >= 10 && (_time + item) < 60){
            timeArray[index].text = '' + (_time + item);
          }
        });
        this.dateMinutes = timeArray;
      }
      if (type === 'Seconds'){
        forArray.forEach(function (item,index) {
          if ((_time + item) < 0){
            timeArray[index].text = '';
          }else if ((_time + item) >= 0 && (_time + item) < 10){
            timeArray[index].text = '0' + (_time + item);
          }else if ((_time + item) >= 10 && (_time + item) < 60){
            timeArray[index].text = '' + (_time + item);
          }
        });
        this.dateSeconds = timeArray;
      }
    },
    showPicker(){
      if (this.pickerFlag){
        this.pickerFlag = false;
        this.timePickerFlag = false;
      }else {
        this.pickerFlag = true;
      }
    },
    showTimePicker(){
      if (this.timePickerFlag){
        this.timePickerFlag = false;
      }else {
        this.timePickerFlag = true;
      }
    },
    yearPreYear(){
      this.year4 = this.year3 -1;
      this.year3 = this.year4 -11;
    },
    yearNextYear(){
      this.year3 = this.year4 +1;
      this.year4 = this.year3 +11;
    },
    selectYear(year,index){
      if (this.dateYear[index].isDisabled) return;

      // 当前值
      this.current = this.dateFormat(year);
      // css控制
      if (this.dateYear[index].active){
        this.dateYear.forEach((item, index) => {
          item.active = false;
        });
        this.dateYear[index].active = false;
      }else {
        this.dateYear.forEach((item, index) => {
          item.active = false;
        });
        this.dateYear[index].active = true;
        this.$emit('change',this.current);
        this.year5 = year;
      }
    },
    monthPreYear(){
      this.year2 = this.year2 -1;
    },
    monthNextYear(){
      this.year2 = this.year2 +1;
    },
    selectMonth(month,index){
      if (this.dateMonth[index].isDisabled) return;
      // 当前值
      this.current = this.dateFormat(this.year2,month);
      // css控制
      if (this.dateMonth[index].active){
        this.dateMonth.forEach((item, index) => {
          item.active = false;
        });
        this.dateMonth[index].active = false;
      }else {
        this.dateMonth.forEach((item, index) => {
          item.active = false;
        });
        this.dateMonth[index].active = true;
        this.$emit('change',this.current);
        this.month2 = this.year2 + '-' + month;
      }
    },
    selectDateTime(){
      this.currentTime = this.dateHours[2].text + ':' + this.dateMinutes[2].text + ':' + this.dateSeconds[2].text;
      let currentVal = this.currentDate.split('-');
      this.current = this.dateFormat(currentVal[0],currentVal[1],currentVal[2],this.dateHours[2].text,this.dateMinutes[2].text,this.dateSeconds[2].text);
      this.$emit('change',this.current);
      this.timePickerFlag = false;
    },
    selectDate(day,index){
      if (!day) return;
      if (this.type === 'date'){
        if (this.date[index].isDisabled) return;
        // 当前值
        this.current = this.dateFormat(this.year,this.month,day);
        // css控制
        if (this.date[index].active){
          this.date.forEach((item, index) => {
            item.active = false;
          });
          this.date[index].active = false;
        }else {
          this.date.forEach((item, index) => {
            item.active = false;
          });
          this.date[index].active = true;
          this.$emit('change',this.current);
          this.day = this.year + '-' +this.month + '-' + day;
        }
      }
      if (this.type === 'datetime'){
        if (this.date[index].isDisabled) return;
        // 当前值
        this.current = this.dateFormat(this.year,this.month,day,0,0,0);
        // css控制
        if (this.date[index].active){
          this.date.forEach((item, index) => {
            item.active = false;
          });
          this.date[index].active = false;
        }else {
          this.date.forEach((item, index) => {
            item.active = false;
          });
          this.date[index].active = true;
          this.$emit('change',this.current);
          this.currentDate = this.year + '-' +this.month + '-' +day;
          this.currentTime = '00:00:00';
        }
      }
    },
    datePreYear(){
      this.year = this.year -1;
    },
    datePreMonth(){
      if (this.month === 1){
        this.month = 12;
        this.year = this.year -1;
      }else {
        this.month = this.month -1;
      }

    },
    dateNextMonth(){
      if (this.month === 12){
        this.month = 1;
        this.year = this.year + 1;
      }else {
        this.month = this.month +1;
      }
    },
    dateNextYear(){
      this.year = this.year +1;
    },
    isLeap(year){
      if((year%4==0 && year%100!=0) || year%400==0){
        return true;
      }
      else{
        return false;
      }
    },
    getWeek(dateString){
      let date;
      if(!dateString){
        date = new Date;
      }else{
        let dateArray = dateString.split("-");
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
      }
      return "星期" + "日一二三四五六".charAt(date.getDay());
    },
    getCalendarData(year,month,day,minDate,maxDate){
      let dateStrStart = year + '-' + month + '-1',
          dateStrEnd = '';
      let comDay = day.split('-');
      let objNull = { val:'',active:false,isDisabled: false };
      let monthDate = [31,0,31,30,31,30,31,31,30,31,30,31];
      let currentMonthDate = [];
      let minDateYear = new Date(minDate).getFullYear(),
          minDateMouth = new Date(minDate).getMonth() + 1,
          minDateDate = new Date(minDate).getDate(),
          maxDateYear = new Date(maxDate).getFullYear(),
          maxDateMouth = new Date(maxDate).getMonth() + 1,
          maxDateDate = new Date(maxDate).getDate();
      if (parseInt(month) === 2){
        // 2月
        if (this.isLeap(parseInt(year))){
          // 是润年
          monthDate[1] = 29;
        }else {
          // 是平年
          monthDate[1] = 28;
        }
      }
      let x = monthDate[parseInt(month) - 1];
      for (let i=0;i<x;i++){
        let obj = {};
        obj.val = i+1;
        obj.text = i+1;
        obj.active = false;
        if (year === parseInt(comDay[0]) && month === parseInt(comDay[1]) && obj.val === parseInt(comDay[2])){
          obj.active = true;
        }else {
          obj.active = false;
        }

        // 添加minDate maxDate标记

        if (minDate){
          if (year < minDateYear){
            obj.isDisabled = true;
          }else if (year === minDateYear){
            if (month < minDateMouth){
              obj.isDisabled = true;
            }else if (month === minDateMouth){
              if (obj.val < minDateDate){
                obj.isDisabled = true;
              }
            }
          }
        }
        if (maxDate){
          if (year > maxDateYear){
            obj.isDisabled = true;
          }else if (year === maxDateYear){
            if (month > maxDateMouth){
              obj.isDisabled = true;
            }else if (month === maxDateMouth){
              if (obj.val > maxDateDate){
                obj.isDisabled = true;
              }
            }
          }
        }
        currentMonthDate.push(obj);
      }
      dateStrEnd = year + '-' + month + '-' +monthDate[parseInt(month) - 1];
      switch (this.getWeek(dateStrStart)){
        case '星期日':
          break;
        case '星期一':
          for (let i=0;i<1;i++){
            currentMonthDate.unshift(objNull);
          }
          break;
        case '星期二':
          for (let i=0;i<2;i++){
            currentMonthDate.unshift(objNull);
          }
          break;
        case '星期三':
          for (let i=0;i<3;i++){
            currentMonthDate.unshift(objNull);
          }
          break;
        case '星期四':
          for (let i=0;i<4;i++){
            currentMonthDate.unshift(objNull);
          }
          break;
        case '星期五':
          for (let i=0;i<5;i++){
            currentMonthDate.unshift(objNull);
          }
          break;
        case '星期六':
          for (let i=0;i<6;i++){
            currentMonthDate.unshift(objNull);
          }
          break;
      }
      switch (this.getWeek(dateStrEnd)){
        case '星期日':
          for (let i=0;i<6;i++){
            currentMonthDate.push(objNull);
          }
          break;
        case '星期一':
          for (let i=0;i<5;i++){
            currentMonthDate.push(objNull);
          }
          break;
        case '星期二':
          for (let i=0;i<4;i++){
            currentMonthDate.push(objNull);
          }
          break;
        case '星期三':
          for (let i=0;i<3;i++){
            currentMonthDate.push(objNull);
          }
          break;
        case '星期四':
          for (let i=0;i<2;i++){
            currentMonthDate.push(objNull);
          }
          break;
        case '星期五':
          for (let i=0;i<1;i++){
            currentMonthDate.push(objNull);
          }
          break;
        case '星期六':
          break;
      }
      return currentMonthDate;
    },
    getCalendarYear(start,end,year,minDate,maxDate){
      let years = [];
      let minDateYear = new Date(minDate).getFullYear(),
          maxDateYear = new Date(maxDate).getFullYear();
      for (let i=start;i<=end;i++){
        let obj = {};
        obj.val = i;
        obj.text = i;
        if (obj.val === parseInt(year)){
          obj.active = true;
        }else {
          obj.active = false;
        }
        obj.isDisabled = false;
        // 添加minDate maxDate标记
        if (minDate){
          if (obj.val < minDateYear){
            obj.isDisabled = true;
          }
        }
        if (maxDate){
          if (obj.val > maxDateYear){
            obj.isDisabled = true;
          }
        }
        years.push(obj);
      }
      return years;
    },
    getCalendarMonth(curYear,curMonth,minDate,maxDate){
      let month = [
        {
          val: 1,
          text: '一月',
          active: false,
          isDisabled: false
        },
        {
          val: 2,
          text: '二月',
          active: false,
          isDisabled: false
        },
        {
          val: 3,
          text: '三月',
          active: false,
          isDisabled: false
        },
        {
          val: 4,
          text: '四月',
          active: false,
          isDisabled: false
        },
        {
          val: 5,
          text: '五月',
          active: false,
          isDisabled: false
        },
        {
          val: 6,
          text: '六月',
          active: false,
          isDisabled: false
        },
        {
          val: 7,
          text: '七月',
          active: false,
          isDisabled: false
        },
        {
          val: 8,
          text: '八月',
          active: false,
          isDisabled: false
        },
        {
          val: 9,
          text: '九月',
          active: false,
          isDisabled: false
        },
        {
          val: 10,
          text: '十月',
          active: false,
          isDisabled: false
        },
        {
          val: 11,
          text: '十一月',
          active: false,
          isDisabled: false
        },
        {
          val: 12,
          text: '十二月',
          active: false,
          isDisabled: false
        }
      ],
          comMonth = curMonth.split('-'),
          minDateYear = new Date(minDate).getFullYear(),
          minDateMouth = new Date(minDate).getMonth(),
          maxDateYear = new Date(maxDate).getFullYear(),
          maxDateMouth = new Date(maxDate).getMonth();

      // 检查时间范围
      month.forEach((item,index) => {
        if (curYear === parseInt(comMonth[0]) && item.val === parseInt(comMonth[1])){
          item.active = true;
        }
        if (this.minTime){
          if (curYear < minDateYear){
            item.isDisabled = true;
          }else if (curYear === minDateYear){
            if (item.val < minDateMouth){
              item.isDisabled = true;
            }
          }
        }
        if (this.maxTime){
          if (curYear > maxDateYear){
            item.isDisabled = true;
          }else if (curYear === maxDateYear){
            if (item.val > maxDateMouth){
              item.isDisabled = true;
            }
          }
        }
      });
      return month;
    },
    // month是加1的
    dateFormat(year = '1995',month = 1,day = 1,hours = 0,minutes = 0,seconds = 0,isTime = false){
      let rules = this.format,
          handleYear = year.toString(),
          handleMonth = parseInt(month),
          handleDay = parseInt(day),
          handleHours = parseInt(hours),
          handleMinutes = parseInt(minutes),
          handleSeconds = parseInt(seconds);
      if (this.format === 'default'){
        if (this.type === 'datetime'){
          rules = 'YYYY-MM-DD hh:mm:ss'
        }
        if (this.type === 'date'){
          rules = 'YYYY-MM-DD'
        }
        if (this.type === 'month'){
          rules = 'YYYY-MM'
        }
        if (this.type === 'year'){
          rules = 'YYYY'
        }
      }

      rules = rules.replace(/yyyy|YYYY/,handleYear);
      rules = rules.replace(/yy|YY/,handleYear.substr(-2));
      rules = rules.replace(/MM/,handleMonth > 9 ? handleMonth : '0' + handleMonth);
      rules = rules.replace(/M/g,handleMonth);
      rules = rules.replace(/dd|DD/,handleDay > 9 ? handleDay : '0' + handleDay);
      rules = rules.replace(/d|D/g,handleDay);

      rules = rules.replace(/hh|HH/,handleHours > 9 ? handleHours : '0' + handleHours);
      rules = rules.replace(/h|H/g,handleHours);
      rules = rules.replace(/mm/,handleMinutes > 9 ? handleMinutes : '0' + handleMinutes);
      rules = rules.replace(/m/g,handleMinutes);
      rules = rules.replace(/ss|SS/,handleSeconds > 9 ? handleSeconds : '0' + handleSeconds);
      rules = rules.replace(/s|S/g,handleSeconds);
      return rules;
    },
    initDateTime(){
      let initYear = new Date(this.defaultTime).getFullYear(),
          initMonth = new Date(this.defaultTime).getMonth() + 1,
          initDay = new Date(this.defaultTime).getDate(),
          initHours = new Date(this.defaultTime).getHours(),
          initMinutes = new Date(this.defaultTime).getMinutes(),
          initSeconds = new Date(this.defaultTime).getSeconds();
      switch (this.type){
        case 'datetime':
          this.current = this.dateFormat(initYear,initMonth,initDay,initHours,initMinutes,initSeconds);
          break;
        case 'date':
          this.year = initYear;
          this.month = initMonth;
          this.day = initYear + '-' + initMonth + '-' + initDay;
          this.current = this.dateFormat(initYear,initMonth,initDay);
          break;
        case 'month':
          this.year2 = initYear;
          this.month2 = initYear + '-' +initMonth;
          this.current = this.dateFormat(initYear,initMonth);
          break;
        case 'year':
          this.year3 = initYear - 11;
          this.year4 = initYear;
          this.year5 = initYear;
          this.current = this.dateFormat(initYear);
          break;
      }
    }
  },
  mounted(){
    // 点击外部取消弹窗
    document.body.addEventListener('click',()=>{
      this.pickerFlag = false;
      this.timePickerFlag = false;
    },false);

    // 先检查是否有默认值，再初始化数据
    // 初始化默认值
    if (this.defaultTime){
      this.initDateTime();
    }else {
      // 没有默认值，初始化当前时间的值
      switch (this.type){
        case 'datetime':
          this.year = new Date().getFullYear();
          this.month = (new Date().getMonth())+1;
          break;
        case 'date':
          this.year = new Date().getFullYear();
          this.month = (new Date().getMonth())+1;
          break;
        case 'month':
          this.year2 = new Date().getFullYear();
          break;
        case 'year':
          this.year3 = new Date().getFullYear()-11;
          this.year4 = new Date().getFullYear();
          break;
      }
    }

    // 数据初始化
    switch (this.type){
      case 'datetime':
        this.date = this.getCalendarData(this.year,this.month,this.currentDate,this.minTime,this.maxTime);
        break;
      case 'date':
        this.date = this.getCalendarData(this.year,this.month,this.day,this.minTime,this.maxTime);
        break;
      case 'month':
        this.dateMonth = this.getCalendarMonth(this.year2,this.month2,this.minTime,this.maxTime);
        break;
      case 'year':
        this.dateYear = this.getCalendarYear(this.year3,this.year4,this.year5,this.minTime,this.maxTime);
        break;
    }

    if (!this.placeholder){
      if (this.type === 'date' || this.type === 'datetime'){
        this.placeholder = '请选择日期';
      }else if (this.type === 'month'){
        this.placeholder = '请选择月份';
      }else if (this.type === 'year'){
        this.placeholder = '请选择年份';
      }else {
        this.placeholder = '';
      }
    }
  },
  filters: {},
  watch:{
    year(curVal,oldVal){
      if (this.type === 'datetime'){
        this.date = this.getCalendarData(curVal,this.month,this.currentDate,this.minTime,this.maxTime);
      }
      if (this.type === 'date'){
        this.date = this.getCalendarData(curVal,this.month,this.day,this.minTime,this.maxTime);
      }

    },
    month(curVal,oldVal){
      if (this.type === 'datetime'){
        this.date = this.getCalendarData(this.year,curVal,this.currentDate,this.minTime,this.maxTime);
      }
      if (this.type === 'date'){
        this.date = this.getCalendarData(this.year,curVal,this.day,this.minTime,this.maxTime);
      }
    },
    year2(curVal,oldVal){
      this.dateMonth = this.getCalendarMonth(curVal,this.month2,this.minTime,this.maxTime);
    },
    year3(curVal,oldVal){
      this.dateYear = this.getCalendarYear(this.year3,this.year4,this.year5,this.minTime,this.maxTime);
    }

  },
  template: `<div class="picker-ipt" @click.stop="showPicker" :style="{ width: pickerWidth + 'px' }">
    <div class="picker-ipt-ico">
      <i class="iconfont iconrili"></i>
    </div>
    <div class="picker-ipt-text">
      {{current}}
      <span v-if="!current" class="picker-ipt-placeholder">{{placeholder}}</span>
    </div>
    <div v-if="pickerFlag" class="picker" @click.stop>
      <div v-if="type === 'datetime'" class="picker-datetime">
        <div class="picker-datetime-item"><span>{{currentDate}}</span></div>
        <div class="picker-datetime-item timePick" @click.stop="showTimePicker">
          <span>{{currentTime}}</span>
          <div class="picker-datetime-time" v-if="timePickerFlag">
          <div class="datetime-content">
            <div class="datetime-content-grounp">
              <div :class="['datetime-content-item',item.current ? 'datetime-content-item-current' : '']"
                   v-for="(item,index) in dateHours" @click.stop="changeTime('Hours',item.text)">
                {{item.text}}
              </div>
            </div>
            <div class="datetime-content-grounp">
              <div :class="['datetime-content-item',item.current ? 'datetime-content-item-current' : '']"
                   v-for="(item,index) in dateMinutes" @click.stop="changeTime('Minutes',item.text)">
                {{item.text}}
              </div>
            </div>
            <div class="datetime-content-grounp">
              <div :class="['datetime-content-item',item.current ? 'datetime-content-item-current' : '']"
                   v-for="(item,index) in dateSeconds" @click.stop="changeTime('Seconds',item.text)">
                {{item.text}}
              </div>
            </div>
          </div>
          <div class="datetime-foot">
            <div class="datetime-foot-btn success" @click.stop="selectDateTime">确定</div>
            <div class="datetime-foot-btn">取消</div>
          </div>
        </div>
        </div>
      </div>
      <div class="picker-header">
        <div v-if="type === 'year'" class="picker-header-item" @click.stop="yearPreYear">
          <i class="iconfont iconLeft-"></i>
        </div>
        <div v-if="type === 'month'" class="picker-header-item" @click.stop="monthPreYear">
          <i class="iconfont iconLeft-"></i>
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-item" @click.stop="datePreYear">
          <i class="iconfont iconLeft-"></i>
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-item" @click.stop="datePreMonth">
          <i class="iconfont iconLeft-1"></i>
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-date">
          {{year}}年{{month}}月
        </div>
        <div v-if="type === 'month'" class="picker-header-date">
          {{year2}}年
        </div>
        <div v-if="type === 'year'" class="picker-header-date">
          {{year3}}年 - {{year4}}年
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-item" @click.stop="dateNextMonth">
          <i class="iconfont iconRight-1"></i>
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-item" @click.stop="dateNextYear">
          <i class="iconfont iconRight-"></i>
        </div>
        <div v-if="type === 'month'" class="picker-header-item" @click.stop="monthNextYear">
          <i class="iconfont iconRight-"></i>
        </div>
        <div v-if="type === 'year'" class="picker-header-item" @click.stop="yearNextYear">
          <i class="iconfont iconRight-"></i>
        </div>
      </div>
      <div v-if="type === 'date' || type === 'datetime'" class="picker-week">
        <div class="picker-week-item" v-for="item in weeks">{{item}}</div>
      </div>
      <div class="picker-date">
        <div class="picker-date-item" v-if="type === 'date' || type === 'datetime'" v-for="(item,index) in date">
          <span :class="['picker-date-item-text',{'current-date' : item.active},{'disabled-current-date' : item.isDisabled}]" @click.stop="selectDate(item.val,index)">{{item.text}}</span>
        </div>
        <div class="picker-month-item" v-if="type === 'month'" v-for="(item,index) in dateMonth">
          <span :class="['picker-month-item-text',{'current-month' : item.active},{'disabled-current-month' : item.isDisabled}]" @click="selectMonth(item.val,index)">{{item.text}}</span>
        </div>
        <div class="picker-year-item" v-if="type === 'year'" v-for="(item,index) in dateYear">
          <span :class="['picker-year-item-text',{'current-year' : item.active},{'disabled-current-year' : item.isDisabled}]" @click="selectYear(item.val,index)">{{item.text}}</span>
        </div>
      </div>
    </div>
  </div>`
});