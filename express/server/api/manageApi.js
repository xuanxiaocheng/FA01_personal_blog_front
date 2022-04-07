/* eslint-disable no-unused-vars */
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')

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

// 新增精彩好文
router.post('/addGoodText', (req, res) => {
    const sql = 'insert into goodText(articleTitle, markdown, coverImgSrc, createTime, articleId) values( ? , ? , ? , ? , ? )'
    const params = req.body
    console.log(params)
    conn.query(sql, [params.articleTitle, params.markdown, params.coverImgSrc, params.createTime, params.articleId], function(err, result) {
        if (err) {
            console.log('添加失败' + err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})

// 新增精彩问答
router.post('/addGoodQuestion', (req, res) => {
    const sql = 'insert into goodQuestion(articleTitle, markdown, createTime, articleId) values( ? , ? , ? , ? )'
    const params = req.body
    console.log(params)
    conn.query(sql, [params.articleTitle, params.markdown, params.createTime, params.articleId], function(err, result) {
        if (err) {
            console.log('添加失败' + err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})


// 更新精彩问答
router.post('/updateGoodQuestion', (req, res) => {
    const articleId = req.body.articleId
    delete req.body.articleId
    const params = req.body
    const sql = "Update goodquestion SET " + Object.keys(params).map(key => `${key} = ?`).join(", ") + " WHERE articleId = ?";
    // 数据库操作 sql为需要执行的插入、查询、更新、删除等的数据库sql语句，而params是通配符?所对应的值，其中err为操作过程中遇到的错误，而results则是sql实行的结果。
    conn.query(sql, [...Object.values(params), articleId], function(err, result) {
        if (err) {
            console.log('添加失败' + err)
        }
        if (result) {
            res.json("success")
        }
    })
})

// 更新精彩问答
router.post('/updateGoodText', (req, res) => {
    const articleId = req.body.articleId
    delete req.body.articleId
    const params = req.body
    const sql = "Update GoodText SET " + Object.keys(params).map(key => `${key} = ?`).join(", ") + " WHERE articleId = ?";
    // 数据库操作 sql为需要执行的插入、查询、更新、删除等的数据库sql语句，而params是通配符?所对应的值，其中err为操作过程中遇到的错误，而results则是sql实行的结果。
    conn.query(sql, [...Object.values(params), articleId], function(err, result) {
        if (err) {
            console.log('添加失败' + err)
        }
        if (result) {
            res.json("success")
        }
    })
})

module.exports = router