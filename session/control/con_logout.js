const logout = (req, res) => {
	res.set('Access-Control-Allow-Origin', 'http://localhost:3000/')
	res.set('Access-Control-Allow-Credentials', 'true')
	console.log(req.session)
	req.session.destroy(err => {
		if(err){
			res.json({
                code: 1, 
                msg: '退出登录失败'
            })
		}else{
			console.log(req.session)
			// datas.username = ''
			res.json({
                code: 0, 
                msg: '退出登录成功'
            })
		}
	})
}

module.exports = logout