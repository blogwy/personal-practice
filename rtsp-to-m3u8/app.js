const ffmpegPath = require('@ffmpeg-installer/ffmpeg')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const http = require('http')

ffmpeg.setFfmpegPath(ffmpegPath.path)

main()

function main () {
  const rtsp = 'rtmp://192.168.31.249:1935/live/test'
  const m3u8 = './m3u8/live.m3u8'
  transcoding(rtsp, m3u8)
  createServer(7777)
}

function transcoding (rtsp, m3u8) {
  ffmpeg(rtsp)
  .outputOptions([
    '-fflags flush_packets',
    '-max_delay 1',
    '-an',
    '-flags',
    '-global_header',
    '-hls_time 1',
    '-hls_list_size 3',
    '-hls_wrap 3',
    '-vcodec copy'
  ])
  .on('start', function(e) {
    console.log('---开始转码---')
    console.log(e);
  })
  .on('end', function() {
    console.log('file has been converted succesfully');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
    fun('error')
  })
  .save(m3u8)
}

function createServer (port) {
  const mimes = {
    'ts': 'video/MP2T',
    'm3u8': 'application/x-mpegURL'
  }
  const liveServer = http.createServer((request, response) => {
    const urlArrs = request.url.split('.')
    const extension = urlArrs[urlArrs.length - 1]
    if (extension === 'ts') {
      try {
        response.setHeader('Content-Type', mimes['ts'])
        fs.createReadStream(path.join('./m3u8', request.url)).pipe(response)
      } catch (error) {
        response.end('hello world')
      }
    } else if (extension === 'm3u8') {
      try {
        response.setHeader('Content-Type', mimes['m3u8'])
        fs.createReadStream(path.join('./m3u8', request.url)).setEncoding('utf8').pipe(response)
      } catch (error) {
        response.end('hello world')
      }
    } else if (extension === 'html') {
      try {
        fs.createReadStream(path.join('./', request.url)).setEncoding('utf8').pipe(response)
      } catch (error) {
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
}

