const getUrl = require('./utils/getUrl');
const downloadFile = require('./utils/download');
const readlineSync = require('readline-sync');

let url,quality,qualityAll;

url = readlineSync.question('请输入视频URL...');

getUrl.getQuality(url)
    .then(response => {
      qualityAll = response;
      quality = readlineSync.keyInSelect(qualityAll,'选择要下载到清晰度？');
      getUrl.getDownloadUrl(url,qualityAll[quality])
          .then(res => {
            // 下载地址
            res.forEach(function (item,index) {
              downloadFile.get(item.videoAid,item.videoSize,item.url,item.videoTitle+'.'+item.videoFormat,function () {
                console.log('\n' + item.videoTitle + '下载完成');
              })
            })

          })
          .catch(err => {
            console.log(err);
          })
    })
    .catch(error => {
      console.log(error);
    });

//
// qualityAll = getUrl.getQuality(url);
//
// quality = readlineSync.keyInSelect(qualityAll,'选择要下载到清晰度？');
//
// getUrl.getDownloadUrl(url,qualityAll[quality]);
