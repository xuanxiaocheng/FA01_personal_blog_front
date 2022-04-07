const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const userApi = require('./server/api/userApi')
const manageApi = require('./server/api/manageApi')
const fileApi = require('./server/api/fileApi')

//资源定位
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

//端口设置
var port = '3000'
app.set('port', port);

//服务启动
var server = http.createServer(app);
server.listen(port);

//文件上传大小限制
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//暴露图片访问路径
app.use('/img', function(req, res) {
    var fileName = req.originalUrl.replace(/^\/img\//, '')
    res.header('Cache-Control', 'max-age=1800')
    res.sendFile(path.join(__dirname, `../nodeImg/` + fileName));
})

app.use('/api/user', userApi)
app.use('/api/manage', manageApi)
app.use('/api/file', fileApi)