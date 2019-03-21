
let request = require('request');
let fs = require('fs');
let progress = require('progress-stream');
let ProgressBar  = require('../progress-bar');

let pb = new ProgressBar('下载进度', 50);

let str = progress({
  time: 200
});

var num = 0, total = 0;
str.on('progress', function(progress) {
  pb.render({
    completed: progress.transferred ? progress.transferred : num,
    total: total
  });
  // console.log(JSON.stringify(progress));
});

function downloadFile(aid,totalSize,uri,filename,callback){
  let stream = fs.createWriteStream(filename);
  total = totalSize;
  request({
    url: uri,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:56.0) Gecko/20100101 Firefox/56.0',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Range': 'bytes=0-',
      'Referer': 'http://www.bilibili.com/video/av'+ aid +'/',
      'Origin': 'https://www.bilibili.com',
      'Connection': 'keep-alive'
    }
  }).pipe(str).pipe(stream).on('close', callback);
}

module.exports = {
  get: downloadFile
}

// let fileUrl = 'http://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/66/08/80900866/80900866-1-32.flv?e=ig8euxZM2rNcNbNahbUVhoMg7zNBhwdEto8g5X10ugNcXBlqNxHxNEVE5XREto8KqJZHUa6m5J0SqE85tZvEuENvNC8xNEVE9EKE9IMvXBvE2ENvNCImNEVEK9GVqJIwqa80WXIekXRE9IMvXBvEuENvNCImNEVEua6m2jIxux0CkF6s2JZv5x0DQJZY2F8SkXKE9IB5QK==&deadline=1552497284&gen=playurl&nbs=1&oi=1961043209&os=ks3u&platform=pc&trid=f96fefcaccd04cec87e1a19be7b198e8&uipk=5&upsig=79dac67e800808e2f24d9f7368838efd';
// let filename = 'test-2.flv';
// downloadFile(fileUrl,filename,function(){
//   console.log('\n'+filename+'下载完毕');
// });