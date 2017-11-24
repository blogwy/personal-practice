const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const db = require('./models/db')
const app = express()

// 中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret: 'wally',
	resave: false,
	saveUninitialized: false
}))

// 静态资源
app.use(express.static(path.join(__dirname, 'public')))

// 模板引擎
app.set('view engine', 'ejs')

// 路由
app.use('/admin', require('./routes/admin'))


app.listen(3000, () => {
	console.log('server is running on localhost:3000')
})