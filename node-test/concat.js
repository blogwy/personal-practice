var fluent_ffmpeg = require("fluent-ffmpeg");

var mergedVideo = fluent_ffmpeg();
var videoNames = ['./test-1.flv', './test-2.flv'];

videoNames.forEach(function(videoName){
    mergedVideo = mergedVideo.addInput(videoName);
});

mergedVideo.mergeToFile('./test-all.mp4', './tmp/')
.on('error', function(err) {
    console.log('Error ' + err.message);
})
.on('progress', function(progress) {
	console.log(JSON.stringify(progress));
})
.on('end', function() {
    console.log('Finished!');
});