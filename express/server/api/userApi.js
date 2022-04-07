/* eslint-disable no-unused-vars */
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $jwt = require('jsonwebtoken')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json('err')
    } else {
        console.log(ret)
        res.json(ret)
    }
}



// 验证管理员
router.post('/getmanage', (req, res) => {
    const sql = 'select * from manage WHERE username = ? AND password = ?'
    const params = req.body
    console.log(params)
    conn.query(sql, [params.username, params.password], function(err, result) {
        if (err) {
            console.log('验证失败' + err)
        }
        if (result) {
            const token = $jwt.sign({
                name: params.username
            }, 'starpavilion', {
                expiresIn: 1800 // 秒到期时间
            })
            jsonWrite(res, { result, token })
        }
    })
})

// 验证token
router.post('/checktoken', (req, res) => {
    const reg = new RegExp("(^| )" + 'token' + "=([^;]*)(;|$)");
    const token = req.headers.cookie ? req.headers.cookie.match(reg)[2] : ''
    $jwt.verify(token, 'starpavilion', function(err, data) {
        // 正确就是err:null
        jsonWrite(res, { status: err })
    })
})


// 获取精彩问答数据
router.get('/getquestion', (req, res) => {
    var params = req.query
    var sql = req.query.articleId ? 'select * from goodQuestion Where articleId = ?' : 'select * from goodQuestion ORDER by articleId desc LIMIT ?, ?'
    var paramsArray = req.query.articleId ? [params.articleId] : [(parseInt(params.curPage) - 1) * parseInt(params.pageSize), parseInt(params.pageSize)]
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err)
        }
        // console.log(result);
        if (result) {
            jsonWrite(res, result)
        }
    })
})

// 获取精彩好文数据
router.get('/getGoodText', (req, res) => {
    var params = req.query
    var sql = req.query.articleId ? 'select * from goodText Where articleId = ?' : 'select * from goodText ORDER by articleId desc LIMIT ?, ?'
    var paramsArray = req.query.articleId ? [params.articleId] : [(parseInt(params.curPage) - 1) * parseInt(params.pageSize), parseInt(params.pageSize)]
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err)
        }
        // console.log(result);
        if (result) {
            jsonWrite(res, result)
        }
    })
})


module.exports = router