const got = require('got');
const stream = require('stream');
const {promisify} = require('util');
const pipeline = promisify(stream.pipeline);
const fs = require('fs');

(async () => {
	try {
		const response = await got('https://www.bilibili.com/bangumi/play/ep337019',{
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
        'cookie': '_uuid=D87F5597-9F58-9410-7C9A-EC6EE452205A44601infoc; buvid3=69498676-73DD-451C-A606-02CA33B5AEE553917infoc; CURRENT_FNVAL=16; LIVE_BUVID=AUTO2115924816109117; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1596722341; CURRENT_QUALITY=116; blackside_state=1; finger=481832271; sid=ax362991; DedeUserID=14899614; DedeUserID__ckMd5=6fb380360cc351f0; SESSDATA=122d1191%2C1614940578%2C4f586*91'
      }
    });
    console.log('success')
    // ep系列
    let str = response.body.match(/\<script\>window\.\_\_playinfo\_\_\=([\s\S]*?)\<\/script\>\<script\>window\.\_\_BILI\_CONFIG/)[1];
    console.log(str)
	} catch (error) {
    console.log('error')
		console.log(error);
	}
})()


const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:56.0) Gecko/20100101 Firefox/56.0',
    // 这里必须是当前视频到bv地址
    'referer': 'https://www.bilibili.com/video/BV1wh411R7M5'
  }
};

const url = 'https://upos-sz-mirrorkodo.bilivideo.com/upgcxcode/43/27/229752743/229752743-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1600025170&gen=playurl&os=kodobv&oi=975672835&trid=a9b798c7f52640c68c3850b379ab524bp&platform=pc&upsig=65c15861b8e6dc6f46012dc21bf034c5&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=14899614&orderid=0,3&agrr=0&logo=80000000';

(async () => {
  await pipeline(
    got.stream(url, options)
      .on('downloadProgress', progress => {
        console.log(progress)
      })
      .on('error', error => {
        console.log(error)
      }),
    fs.createWriteStream('./video/audio2.m4s')
  );
})();