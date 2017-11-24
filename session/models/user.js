const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	register_time: {
		type: Date,
		default: Date.now
	}
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel