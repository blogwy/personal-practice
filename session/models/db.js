/**
 * 用来连接数据库
 * db.js
 */

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test',{
	useMongoClient: true
})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("数据库连接成功")
});

module.exports = db