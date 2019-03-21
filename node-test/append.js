let fs = require('fs');

fs.readdir('./test/',function (err,files) {
  console.log(files);
  files.forEach(function (item,index) {
    fs.readFile('./test/'+item,function (err1,file) {
      fs.appendFile('./test/test-all.flv', file, (err) => {
        if (err) throw err;
        console.log('数据已追加到文件');
      });
    })
  })
})