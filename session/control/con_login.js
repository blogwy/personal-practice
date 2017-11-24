

// 导入user modle
const user = require('../models/user.js')
// 加密模块
const crypto = require('crypto');

exports.getLogin = (req, res) => {
    res.render('login',{
        title: '登录'
    })
}


// 处理登录业务
const secret = 'wangyu';
exports.postLogin = (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.set('Access-Control-Allow-Credentials', 'true')
	const username = req.body.username
	// 加密
	const password = crypto.createHmac('sha256', secret)
		.update(req.body.password)
		.digest('hex');
	user.findOne({username, password}).then(doc => {
		if(doc){
			// 设置/获取 session  都用的是 req.session
			req.session.username = username
			// 过期时间  单位是ms
			req.session.cookie.maxAge = 1000*60*10
			res.json({
                code: 0, 
                msg: '登录成功'
            })
		}else{
			res.json({
                code: 1, 
                msg: '用户名或密码错误'
            })
		}
	})
}