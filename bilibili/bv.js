const got = require('got');
const stream = require('stream');
const {promisify} = require('util');
const pipeline = promisify(stream.pipeline);
const fs = require('fs');

(async () => {
	try {
		const response = await got('https://www.bilibili.com/video/BV1k54y1C7R6',{
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
        'cookie': '_uuid=D87F5597-9F58-9410-7C9A-EC6EE452205A44601infoc; buvid3=69498676-73DD-451C-A606-02CA33B5AEE553917infoc; CURRENT_FNVAL=16; LIVE_BUVID=AUTO2115924816109117; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1596722341; CURRENT_QUALITY=116; blackside_state=1; finger=481832271; sid=ax362991; DedeUserID=14899614; DedeUserID__ckMd5=6fb380360cc351f0; SESSDATA=122d1191%2C1614940578%2C4f586*91'
      }
    });
    console.log('success')
    // 普通视频规则 bv系列
    let str = response.body.match(/\<script\>window\.\_\_playinfo\_\_\=([\s\S]*?)\<\/script\>\<script\>window\.\_\_INITIAL\_STATE\_\_\=/)[1];
    console.log(JSON.parse(str))
	} catch (error) {
    console.log('error')
		console.log(error);
	}
})()


const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:56.0) Gecko/20100101 Firefox/56.0',
    'referer': 'https://www.bilibili.com/video/BV1k54y1C7R6'
  }
};

const url = 'http://cn-jsnt-dx-v-09.bilivideo.com/upgcxcode/28/72/234267228/234267228_nb2-1-30280.m4s?expires=1600016054&platform=pc&ssig=sJ-Hnk1s_0vojBD04ph88Q&oi=975672835&trid=bd8f79347db44effa7ec6af0c0ad9fadu&nfc=1&nfb=maPYqpoel5MI3qOUX6YpRA==&cdnid=4277&mid=14899614&cip=61.147.236.10&orderid=0,3&agrr=0&logo=80000000';

(async () => {
  await pipeline(
    got.stream(url, options)
      .on('downloadProgress', progress => {
        console.log(progress)
      })
      .on('error', error => {
        console.log(error)
      }),
    fs.createWriteStream('./video/audio1.m4s')
  );
})();