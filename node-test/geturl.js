
// let request = require('request');

// request({
//   url: 'https://api.bilibili.com/x/player/playurl?avid=29702317&cid=51686571&qn=64&otype=json',
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:56.0) Gecko/20100101 Firefox/56.0',
//     'Host': 'api.bilibili.com',
//     'Cookie': 'SESSDATA=bd125cdd%2C1554519358%2C6d4df231'
//   }
// },function (error, response, body) {
//   if (error) {
//     return console.error('upload failed:', error);
//   }
//   console.log('Upload successful!  Server responded with:', body);
// })

var readlineSync = require('readline-sync');

var animals = ['1080P', '720P', '480P', '360P'],
    index = readlineSync.keyInSelect(animals, '选择要下载到清晰度？');
console.log(index);
console.log('Ok, 你要下载' + animals[index]);