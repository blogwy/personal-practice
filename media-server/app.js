const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const port = 8000

const liveServer = http.createServer((request, response) => {
  const urlArrs = request.url.split('.')
  const extension = urlArrs[urlArrs.length - 1]
  if (extension === 'mp4' || extension === 'mp3') {
    try {
      const videoPath = path.join('./video', request.url)
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      let range = request.headers.range;
      let parts = range.replace(/bytes=/, "").split("-")
      let start = parseInt(parts[0], 10);
      let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      let chunksize = (end-start) + 1;
      response.writeHead(206, {
        'Content-Type': extension === 'mp3' ? mime.getType('mp3') : mime.getType('mp4'),
        'Content-Length': chunksize,
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${fileSize}`
      })
      fs.createReadStream(videoPath, {start, end}).pipe(response)
    } catch (error) {
      console.log(error)
      response.end('hello world')
    }
  } else if (extension === 'html') {
    try {
      response.setHeader('Content-Type', mime.getType('html'))
      fs.createReadStream(path.join('./', request.url)).setEncoding('utf8').pipe(response)
    } catch (error) {
      console.log(error)
      response.end('hello world')
    }
  } else {
    response.end('hello world')
  }
})

liveServer.listen(port, err => {
  console.log(err)
  console.log(`liveServer run ${port}`)
})