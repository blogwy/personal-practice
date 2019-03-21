
let request = require('request');
let fs = require('fs');
let progress = require('progress-stream');
let ProgressBar  = require('./progress-bar');

let pb = new ProgressBar('下载进度', 50);

let str = progress({
  time: 200
});

var num = 0, total = 14220921;
str.on('progress', function(progress) {
  pb.render({
    completed: progress.transferred ? progress.transferred : num,
    total: total
  });
   // console.log(JSON.stringify(progress));
});

function downloadFile(uri,filename,callback){
  let stream = fs.createWriteStream(filename);
  request({
    url: uri,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:56.0) Gecko/20100101 Firefox/56.0',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Range': 'bytes=0-',
      'Referer': 'http://www.bilibili.com/video/av4743619/',
      'Origin': 'https://www.bilibili.com',
      'Connection': 'keep-alive'
    }
  }).pipe(str).pipe(stream).on('close', callback);
}

let fileUrl = 'http://upos-hz-mirrorkodou.acgvideo.com/upgcxcode/65/89/78328965/78328965-1-80.flv?e=ig8euxZM2rNcNbUBhwdVhoMB7WdVhwdEto8g5X10ugNcXBlqNxHxNEVE5XREto8KqJZHUa6m5J0SqE85tZvEuENvNC8xNEVE9EKE9IMvXBvE2ENvNCImNEVEK9GVqJIwqa80WXIekXRE9IMvXBvEuENvNCImNEVEua6m2jIxux0CkF6s2JZv5x0DQJZY2F8SkXKE9IB5QK==&deadline=1552564361&gen=playurl&nbs=1&oi=3030202856&os=kodou&platform=pc&trid=0252a2bf02ac40feaf48eca72aff5abe&uipk=5&upsig=d8decc0d7bbdfd7c85ca06c3c67e5a39';
let filename = 'test-2.flv';
downloadFile(fileUrl,filename,function(){
  console.log('\n'+filename+'下载完毕');
});