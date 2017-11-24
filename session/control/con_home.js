const home = (req, res) => {
    res.render('home',{
        title: '主页'
    })
    req.json(datas)
}
module.exports = home