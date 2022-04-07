var express = require('express')
var router = express.Router()
var path = require('path')
var fs = require('fs')
var md5 = require('md5')

//暴露上传文件接口
router.post('/upload', function(req, res) {
    //接收前台POST过来的base64
    var imgData = req.body.imgData;
    console.log(req.body)
        //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, 'base64');
    var filename = md5(req.body.imgMessage.name) + req.body.imgMessage.name.slice(req.body.imgMessage.name.lastIndexOf('.'))
    fs.writeFile(path.join(__dirname, '../../../nodeImg/' + filename), dataBuffer, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ downloadUrl: 'http://' + 'xuanxiaocheng.top/img/' + filename });
        }
    });
});

module.exports = router