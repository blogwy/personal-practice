const express = require('express')
const Router = express.Router()
const login = require('../control/con_login.js')
const reg = require('../control/con_reg.js')
// const home = require('../control/con_home.js')
const logout = require('../control/con_logout.js')


const datas = {username:''}
Router.get('/',login.getLogin)
Router.post('/',login.postLogin)
Router.get('/reg',reg.getReg)
Router.post('/reg',reg.postReg)
// 中间件，后面每个路由都会执行
Router.use('/home',(req, res, next) => {
  if(req.session && req.session.username){
		datas.username = req.session.username
	}else{
		datas.username = '用户'
  }
  next();
})
Router.get('/home',(req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.set('Access-Control-Allow-Credentials', 'true')
  res.render('home',{
      title: '主页',
      data: datas
  })
  // res.json(datas)
})
Router.get('/logout',logout)

module.exports = Router