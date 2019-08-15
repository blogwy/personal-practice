var vConsole = new VConsole();
Vue.component('vue-scanner',{
  data(){
    return {
      cameraWidth: 0,
      cameraHeight: 0
    }
  },
  methods: {
    initVideo(constrains){
      let _this = this;
      if(navigator.mediaDevices.getUserMedia){
        //最新标准API
        navigator.mediaDevices.getUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      } else if (navigator.webkitGetUserMedia){
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      } else if (navigator.mozGetUserMedia){
        //Firefox浏览器
        navagator.mozGetUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      } else if (navigator.getUserMedia){
        //旧版API
        navigator.getUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      }
    },
    videoSuccess(stream){
      let video = this.$refs.video,
          _this = this;
      //将视频流设置为video元素的源
      video.srcObject = stream;
      //播放视频
      video.play();

      video.oncanplay = function () {
        // 摄像头分辨率,手机480x640
        console.log('摄像头分辨率');
        console.log(video.videoWidth,video.videoHeight);
        _this.cameraWidth = video.videoWidth;
        _this.cameraHeight = video.videoHeight;
        // 发送图片进行识别
        _this.readImg();
      };
    },
    videoError(error){
      console.log("访问用户媒体设备失败：",error.name,error.message);
    },
    readImg(){
      let video = this.$refs.video,
          canvas = this.$refs.canvas,
          context = canvas.getContext("2d"),
          _this = this;
      let timer = setInterval(function () {
        context.drawImage(video,0,0,_this.cameraWidth,_this.cameraHeight,0,0,478,850);
        // 扫码条形码
        let imgUri = canvas.toDataURL();
        _this.readBarcode(imgUri,timer);

        // 扫码二维码
        let imageData = context.getImageData(0, 0, 478, 850);
        _this.readQrcode(imageData.data,timer);
      },1000)
    },
    readBarcode(imgBase64,timer){
      let _this = this;
      Quagga.decodeSingle({
        inputStream: {
          size: 1920
        },
        locator: {
          patchSize: "medium",
          halfSample: false
        },
        decoder: {
          readers: [{
            format: "code_128_reader",
            config: {}
          }]
        },
        locate: true,
        src: imgBase64
      }, function(result){
        if (result){
          if(result.codeResult){
            console.log(result.codeResult);
            // 扫描成功后清除定时器，停止扫描
            clearInterval(timer);
            _this.$emit('ondata',result.codeResult.code);
          }else {
            console.log("正在扫条形码...not detected");
          }
        }else {
          console.log("正在扫条形码...not detected");
        }
      });
    },
    readQrcode(data,timer){
      let _this = this;
      let code = jsQR(data, 478, 850, {
        // 只支持白底黑码，默认支持白底黑码和黑底白码。
        inversionAttempts: "dontInvert",
      });

      if (code){
        // clearInterval(timer);
        _this.$emit('ondata',code.data);
        //_this.$refs.audio.play();
//          alert('扫码成功，结果是...' + code.data);
      }else {
        console.log('正在扫二维码...');
      }
    }
  },
  mounted(){
    // 检测浏览器是否支持getUserMedia
    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
      //调用用户媒体设备，访问摄像头
      this.initVideo({
        video:{
          height: 800,
          facingMode: {
            // 强制后置摄像头,pc端做测试请注释掉，不然会报错
            exact: "environment"
          }
        }
      });
    } else {
      alert("你的浏览器不支持访问用户媒体设备");
    }
  },
  template: `<div id="scanner">
               <div class="model">
                 <div class="scanner-view">
                   <div class="scanner-view-arrow arrow1"></div>
                   <div class="scanner-view-arrow arrow2"></div>
                   <div class="scanner-view-arrow arrow3"></div>
                   <div class="scanner-view-arrow arrow4"></div>
                   <div class="scanner-line"></div>
                 </div>
               </div>
               <audio id="audio" ref="audio" src="./css/success.mp3" style="width: 0px;height: 0px"></audio>
               <video class="video-view" ref="video" autoplay playsinline="true" webkit-playsinline="true"></video>
               <canvas ref="canvas" width="478" height="850" style="display: none"></canvas>
             </div>`
});
