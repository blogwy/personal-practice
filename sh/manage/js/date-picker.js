Vue.component('date-picker',{
  props: {
    // 模式 date month year datetime(日期时间模式)
    mode: String,
    placeholderText: String,
    // 初始化时间，时间戳，默认当前时间
    defaultTime: {
      type: Number,
      default: new Date().getTime()
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
    // 格式化
    format: {
      type: String,
      default: 'default'
    },
    // picker宽度
    pickerWidth: {
      type: Number,
      default: 250
    }
  },
  data() {
    return {
      pickerFlag: false,
      timePickerFlag: false,
      current: '',
      type: this.mode,
      placeholder: this.placeholderText,
      defaultTimestamp: 0,
      minTimestamp: 0,
      maxTimestamp: 0,
      // type=datetime

      // type=date
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
      currentDate: 0,
      currentTime: '',
      year: new Date(this.defaultTime).getFullYear(),
      month: (new Date(this.defaultTime).getMonth())+1,
      weeks: ['日','一','二','三','四','五','六'],
      date: [],
      // type=month
      currentMonth: 0,
      year2: new Date(this.defaultTime).getFullYear(),
      dateMonth: [
        {
          val: '一月',
          active: false,
          isDisabled: false
        },
        {
          val: '二月',
          active: false,
          isDisabled: false
        },
        {
          val: '三月',
          active: false,
          isDisabled: false
        },
        {
          val: '四月',
          active: false,
          isDisabled: false
        },
        {
          val: '五月',
          active: false,
          isDisabled: false
        },
        {
          val: '六月',
          active: false,
          isDisabled: false
        },
        {
          val: '七月',
          active: false,
          isDisabled: false
        },
        {
          val: '八月',
          active: false,
          isDisabled: false
        },
        {
          val: '九月',
          active: false,
          isDisabled: false
        },
        {
          val: '十月',
          active: false,
          isDisabled: false
        },
        {
          val: '十一月',
          active: false,
          isDisabled: false
        },
        {
          val: '十二月',
          active: false,
          isDisabled: false
        }
      ],
      // type=year
      currentYear: 0,
      year3: new Date(this.defaultTime).getFullYear() - 11,
      year4: new Date(this.defaultTime).getFullYear(),
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
      this.currentYear = year;
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
      switch (month){
        case '一月':
          this.currentMonth = 1;
          break;
        case '二月':
          this.currentMonth = 2;
          break;
        case '三月':
          this.currentMonth = 3;
          break;
        case '四月':
          this.currentMonth = 4;
          break;
        case '五月':
          this.currentMonth = 5;
          break;
        case '六月':
          this.currentMonth = 6;
          break;
        case '七月':
          this.currentMonth = 7;
          break;
        case '八月':
          this.currentMonth = 8;
          break;
        case '九月':
          this.currentMonth = 9;
          break;
        case '十月':
          this.currentMonth = 10;
          break;
        case '十一月':
          this.currentMonth = 11;
          break;
        case '十二月':
          this.currentMonth = 12;
          break;
      }

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
      }
    },
    selectDateTime(){
      this.currentTime = this.dateHours[2].text + ':' + this.dateMinutes[2].text + ':' + this.dateSeconds[2].text;
      let currentVal = this.currentDate.split('-');
      this.current = this.dateFormat(currentVal[0],currentVal[1],currentVal[2],this.dateHours[2].text,this.dateMinutes[2].text,this.dateSeconds[2].text);
      this.timePickerFlag = false;
    },
    selectDate(day,index){
      if (day){
        if (this.date[index].isDisabled) return;
        this.currentDate = this.year + '-' + this.month + '-' + day;
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
    getCalendarData(year,month,minDate,maxDate){
      let dateStrStart = year + '-' + month + '-1',
          dateStrEnd = '';
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
        obj.active = false;
        obj.isDisabled = false;
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
    getCalendarYear(start,end,minDate,maxDate){
      let years = [];
      let minDateYear = new Date(minDate).getFullYear(),
          maxDateYear = new Date(maxDate).getFullYear();
      for (let i=start;i<=end;i++){
        let obj = {};
        obj.val = i;
        obj.active = false;
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
    }
  },
  mounted(){
    document.body.addEventListener('click',()=>{
      this.pickerFlag = false;
      this.timePickerFlag = false;
    },false);
    this.date = this.getCalendarData(this.year,this.month,this.minTime,this.maxTime);
    this.dateYear = this.getCalendarYear(this.year3,this.year4,this.minTime,this.maxTime);
    //默认日期/月份/年份
    if (this.type === 'datetime'){
      let defaultDay = new Date(this.defaultTime).getDate(),
          defaultHours = new Date(this.defaultTime).getHours(),
          defaultMinutes = new Date(this.defaultTime).getMinutes(),
          defaultSeconds = new Date(this.defaultTime).getSeconds();
      this.currentDate = this.year + '-' + this.month + '-' + defaultDay;
      this.currentTime = (defaultHours>9 ? defaultHours : '0'+defaultHours) + ':' + (defaultMinutes>9 ? defaultMinutes : '0'+defaultMinutes) + ':' + (defaultSeconds>9 ? defaultSeconds : '0'+defaultSeconds);
      this.current = this.year + '-' + (this.month > 9 ? this.month : '0'+this.month) + '-' + (defaultDay> 9 ? defaultDay : '0'+defaultDay) + ' ' + this.currentTime;
      this.date.forEach(function (item,index) {
        if (defaultDay === item.val){
          item.active = true;
        }
      });
      this.changeTime('Hours',defaultHours);
      this.changeTime('Minutes',defaultMinutes);
      this.changeTime('Seconds',defaultSeconds);
    }
    if (this.type === 'date'){
      let defaultDay = new Date(this.defaultTime).getDate();
      this.currentDate = this.year + '-' + this.month + '-' + defaultDay;
      this.current = this.year + '-' + (this.month > 9 ? this.month : '0'+this.month) + '-' + (defaultDay> 9 ? defaultDay : '0'+defaultDay);
      this.date.forEach(function (item,index) {
        if (defaultDay === item.val){
          item.active = true;
        }
      })
    }
    if (this.type === 'month'){
      let defaultMonth = new Date(this.defaultTime).getMonth();
      this.currentMonth = defaultMonth +1;
      this.current = this.year2 + '-' + (defaultMonth > 8 ? defaultMonth : '0' + (defaultMonth+1));
      // minDate maxDate标记
      let minDateYear = new Date(this.minTime).getFullYear(),
          minDateMouth = new Date(this.minTime).getMonth(),
          maxDateYear = new Date(this.maxTime).getFullYear(),
          maxDateMouth = new Date(this.maxTime).getMonth();
      let _this = this;
      this.dateMonth.forEach(function (item,index) {
        if (defaultMonth === index){
          item.active = true;
        }
        // minDate maxDate标记
        if (_this.year2 < minDateYear){
          item.isDisabled = true;
        }else if (_this.year2 === minDateYear){

          if (index < minDateMouth){
            item.isDisabled = true;
          }
        }
        if (_this.year2 > maxDateYear){
          item.isDisabled = true;
        }else if (_this.year2 === maxDateYear){
          if (index > maxDateMouth){
            item.isDisabled = true;
          }
        }
      });
    }
    if (this.type === 'year'){
      let defaultYear = new Date(this.defaultTime).getFullYear();
      this.currentYear = defaultYear;
      this.current = defaultYear;
      this.dateYear.forEach(function (item,index) {
        if (defaultYear === item.val){
          item.active = true;
        }
      })
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
      this.date = this.getCalendarData(curVal,this.month,this.minTime,this.maxTime);
    },
    month(curVal,oldVal){
      this.date = this.getCalendarData(this.year,curVal,this.minTime,this.maxTime);
    },
    currentTime(curVal,oldVal){
      let currentVal1 = curVal.split(':');
      let currentVal2 = this.currentDate.split('-');

      this.$emit('change',this.dateFormat(currentVal2[0],currentVal2[1],currentVal2[2],currentVal1[0],currentVal1[1],currentVal1[2]));
      // this.$emit('change', this.current + ' ' +curVal);
    },
    currentDate(curVal,oldVal){
      let currentVal = curVal.split('-'),
          currentYear = currentVal[0],
          currentMonth = parseInt(currentVal[1])>9 ? currentVal[1] : '0' + currentVal[1],
          currentDate = parseInt(currentVal[2])>9 ? currentVal[2] : '0' + currentVal[2];
      let currentVal2 = this.currentTime.split(':');
      if (this.type === 'date'){
        // this.$emit('change',this.current);
        this.current = this.dateFormat(currentVal[0],currentVal[1],currentVal[2]);
        this.$emit('change',this.dateFormat(currentVal[0],currentVal[1],currentVal[2]));
      }
      if (this.type === 'datetime'){
        this.current = this.dateFormat(currentVal[0],currentVal[1],currentVal[2],currentVal2[0],currentVal2[1],currentVal2[2]);
        this.$emit('change', this.dateFormat(currentVal[0],currentVal[1],currentVal[2],currentVal2[0],currentVal2[1],currentVal2[2]));
      }

    },
    currentMonth(curVal,oldVal){
      // this.current = this.year2 + '-' + (curVal>9 ? curVal : '0' + curVal);
      this.current = this.dateFormat(this.year2,curVal);
      this.$emit('change', this.current);
    },
    currentYear(curVal,oldVal){
      // this.current = curVal;
      this.current = this.dateFormat(curVal);
      this.$emit('change', this.current);
    },
    year2(curVal,oldVal){
      this.dateMonth = [
        {
          val: '一月',
          active: false,
          isDisabled: false
        },
        {
          val: '二月',
          active: false,
          isDisabled: false
        },
        {
          val: '三月',
          active: false,
          isDisabled: false
        },
        {
          val: '四月',
          active: false,
          isDisabled: false
        },
        {
          val: '五月',
          active: false,
          isDisabled: false
        },
        {
          val: '六月',
          active: false,
          isDisabled: false
        },
        {
          val: '七月',
          active: false,
          isDisabled: false
        },
        {
          val: '八月',
          active: false,
          isDisabled: false
        },
        {
          val: '九月',
          active: false,
          isDisabled: false
        },
        {
          val: '十月',
          active: false,
          isDisabled: false
        },
        {
          val: '十一月',
          active: false,
          isDisabled: false
        },
        {
          val: '十二月',
          active: false,
          isDisabled: false
        }
      ];
      // minDate maxDate标记
      let minDateYear = new Date(this.minTime).getFullYear(),
          minDateMouth = new Date(this.minTime).getMonth(),
          maxDateYear = new Date(this.maxTime).getFullYear(),
          maxDateMouth = new Date(this.maxTime).getMonth();
      let _this = this;
      this.dateMonth.forEach(function (item,index) {
        // minDate maxDate标记
        if (_this.year2 < minDateYear){
          item.isDisabled = true;
        }else if (_this.year2 === minDateYear){
          if (index < minDateMouth){
            item.isDisabled = true;
          }
        }
        if (_this.year2 > maxDateYear){
          item.isDisabled = true;
        }else if (_this.year2 === maxDateYear){
          if (index > maxDateMouth){
            item.isDisabled = true;
          }
        }
      });
    },
    year3(curVal,oldVal){
      this.dateYear = this.getCalendarYear(this.year3,this.year4,this.minTime,this.maxTime);
    },
    year4(curVal,oldVal){
      this.dateYear = this.getCalendarYear(this.year3,this.year4,this.minTime,this.maxTime);
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
          <span :class="['picker-date-item-text',{'current-date' : item.active},{'disabled-current-date' : item.isDisabled}]" @click.stop="selectDate(item.val,index)">{{item.val}}</span>
        </div>
        <div class="picker-month-item" v-if="type === 'month'" v-for="(item,index) in dateMonth">
          <span :class="['picker-month-item-text',{'current-month' : item.active},{'disabled-current-month' : item.isDisabled}]" @click="selectMonth(item.val,index)">{{item.val}}</span>
        </div>
        <div class="picker-year-item" v-if="type === 'year'" v-for="(item,index) in dateYear">
          <span :class="['picker-year-item-text',{'current-year' : item.active},{'disabled-current-year' : item.isDisabled}]" @click="selectYear(item.val,index)">{{item.val}}</span>
        </div>
      </div>
    </div>
  </div>`
});