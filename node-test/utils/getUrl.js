let rp = require('request-promise');

const urlToAid = url => {
  let check = url.split("/");
  for( let i=0,len=check.length; i<len; i++ ){
    if(check[i].indexOf('av') >= 0 && !isNaN(parseInt(check[i].replace('av','')))){
      let aid = check[i].replace('av','');
      return aid;
    }
  }
};

const getQualityNumber = str => {
  switch (str) {
    case '高清1080P':
      return 80;
    case '高清720P':
      return 64;
    case '清晰480P':
      return 32;
    case '流畅360P':
      return 16;
    default:
      return '获取视频清晰度错误!!!';
  }
}

const getQuality = async url => {
  let aid = urlToAid(url),
      videoInfo = await rp(`https://api.bilibili.com/x/web-interface/view?aid=${aid}`),
      cid = JSON.parse(videoInfo).data.cid;
  let downloadInfo = await rp({
        uri: `https://api.bilibili.com/x/player/playurl?avid=${aid}&cid=${cid}&qn=80&otype=json`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:56.0) Gecko/20100101 Firefox/56.0',
          'Host': 'api.bilibili.com',
          'Cookie': 'SESSDATA=bd125cdd%2C1554519358%2C6d4df231'
        }
      }),
      quality = JSON.parse(downloadInfo).data.quality;
  switch (quality) {
    case 80:
      return ['高清1080P','高清720P','清晰480P','流畅360P'];
    case 64:
      return ['高清720P','清晰480P','流畅360P'];
    case 32:
      return ['清晰480P','流畅360P'];
    case 16:
      return ['流畅360P'];
    default:
      return '获取视频清晰度错误!!!';
  }

};

const getDownloadUrl = async (url,quality) => {
  let aid = urlToAid(url),
      qualityNum = getQualityNumber(quality),
      videoInfo = await rp(`https://api.bilibili.com/x/web-interface/view?aid=${aid}`),
      cid = JSON.parse(videoInfo).data.cid,
      title = JSON.parse(videoInfo).data.title;
  let downloadInfo = await rp({
        uri: `https://api.bilibili.com/x/player/playurl?avid=${aid}&cid=${cid}&qn=${qualityNum}&otype=json`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:56.0) Gecko/20100101 Firefox/56.0',
          'Host': 'api.bilibili.com',
          'Cookie': 'SESSDATA=bd125cdd%2C1554519358%2C6d4df231'
        }
      }),
      downloadInfoPares = JSON.parse(downloadInfo),
      videoFormat = downloadInfoPares.data.format,
      obj = {},
      dUrlArr = downloadInfoPares.data.durl,durl = [];

  dUrlArr.forEach(function (item,index) {
    obj.videoAid = aid;
    obj.videoTitle = title + '-' + index;
    obj.videoLength = (item.length/60000).toFixed(2) + 'min';
    obj.videoSize = item.size;
    // obj.videoSize = (item.size/1048576).toFixed(2) + 'mb';
    obj.videoFormat = videoFormat.toUpperCase();
    obj.url = item.url;
    durl.push(obj);
  });
  return durl;
};

module.exports = {
  getQuality: getQuality,
  getDownloadUrl: getDownloadUrl
}