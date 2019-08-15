var vm = new Vue({
  el: '#app',
  data: {
    // 分页
    hcPage: 1,
    hcount: 709,
    hpageSize: 10,
    hpPages: 5,
    secondIndex: 0,
    thirdIndex: null,
    menuFirst: null,
    menuSecond: null,
    sidebarStatusProps: null,
    printInfo: [
      {
        barCodeData: '21312313213',
        qrCodeData: '测试二维码测试二维码测试二维码',
        time: '2019-09-09 12:12:00',
        sapNo: '123456',
        mName: '测试名字',
        sDate: '2019-09-09',
        bDate: '12月',
        spec: '袋装25公斤',
        gys: '测试测试',
        cctj: '冷藏',
        dkc: '1000',
        dq: '12',
        is: '否',
        gmy: ''
      },
      {
        barCodeData: '21312313213',
        qrCodeData: '测试二维码测试二维码测试二维码',
        time: '2019-09-09 12:12:00',
        sapNo: '123456',
        mName: '测试名字',
        sDate: '2019-09-09',
        bDate: '12月',
        spec: '袋装25公斤',
        gys: '武汉马丽安',
        cctj: '冷藏',
        dkc: '1000',
        dq: '12',
        is: '否',
        gmy: ''
      },
      {
        barCodeData: '21312313213',
        qrCodeData: '测试二维码测试二维码测试二维码',
        time: '2019-09-09 12:12:00',
        sapNo: '123456',
        mName: '复配酶制剂乳化剂3',
        sDate: '2019-09-09',
        bDate: '12月',
        spec: '袋装25公斤',
        gys: '武汉马丽安',
        cctj: '冷藏',
        dkc: '1000',
        dq: '12',
        is: '否',
        gmy: ''
      }
    ]
  },
  filters: {
    creatBarCode(barCodeData){
      let canvas = document.createElement("canvas");
      JsBarcode(canvas, barCodeData, {
        format: "CODE128",
        displayValue: true,
        margin: 0,
        height: 40,
        width: 1.5,
        fontSize: 12,
        textMargin: 0
      });
      return canvas.toDataURL("image/png");
    },
    creatQrCode(qrCodeData){
      let typeNumber = 10;
      let errorCorrectionLevel = 'L';
      qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
      let qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData(qrCodeData,'Byte');
      qr.make();
      return qr.createDataURL(2,0);
    }
  },
  methods:{
    // 获取当前页
    getPages(res){
      console.log(res);
    },
    printpage(id){
      console.log(id);
      var printIframe = this.$refs.printIframe;
      var newstr = this.$refs.odiv.innerHTML;
      printIframe.setAttribute('srcdoc',newstr);
      printIframe.onload = function () {
        console.log(printIframe.contentWindow);
        // 设置iframe里面的dom的body的padding margin
        printIframe.contentWindow.document.body.style.padding = '0px';
        printIframe.contentWindow.document.body.style.margin = '0px';
        printIframe.contentWindow.focus();
        printIframe.contentWindow.print();
      };
    },
    getCurrentMenu(res){
      console.log(res);
      this.menuFirst = res.menuFirst;
      this.menuSecond = res.menuSecond;
    },
    getDate(res){
      console.log(res);
    },
    getSidebarStatus(res){
      this.sidebarStatusProps = res;
    }
  },
  mounted(){}
});