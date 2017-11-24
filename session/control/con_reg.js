// 导入user modle
const user = require('../models/user.js')
// 加密模块
const crypto = require('crypto');

exports.getReg = (req, res) => {
    res.render('reg',{
        title: '注册'
    })
}

// 处理注册业务
const secret = 'wangyu'
exports.postReg = (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.set('Access-Control-Allow-Credentials', 'true')
    const username = req.body.username;
    const password = crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('hex');
    user.findOne({username}).then(doc => {
        if(doc){
            res.json({
                code: 1,
                msg: '用户名已存在'
            })
        }else{
            user.create({username,password}).then(result => {
                if(result){
					// 设置/获取 session  都用的是 req.session
					req.session.username = username
					// 过期时间  单位是ms
					req.session.cookie.maxAge = 1000*60*10
                    res.json({
                        code: 0, 
                        msg: '恭喜您, 注册成功'
                    })
				}else{
					res.json({
                        code: 2, 
                        msg: '很遗憾, 注册失败'
                    })
				}
            })
        }
    })
}