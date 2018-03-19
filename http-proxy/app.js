var express = require('express');
var proxy = require('http-proxy-middleware');
 
var app = express();
 
app.use('/app', proxy({
  target: 'http://www.cilimao.me', 
  changeOrigin: true,
  pathRewrite: {'^/app' : '/'}
}));

app.get('/test', function(req,res){
  res.sendFile(__dirname+'/src/index.html');
});

app.listen(3000);