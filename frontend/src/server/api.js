var models = require('./db');//数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('./index'); //sql语句

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
}


// 登录用户接口
router.post('/login', (req, res) => {
    var sql = $sql.user.login;
    var params = req.body;
    console.log("sql",sql);
    console.log("params",params);
    conn.query(sql, [params.username],  function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
            for(var i = 0; i < result.length; i++){
                console.log("请求回来！",result[i])
                console.log("请求结果！",typeof result[i],result[i].password);
                console.log(params.password)
                if (result[i].password == params.password) {

                    return res.end();
                }
                else
                  return res.end();
            }

        }

    })
})

module.exports = userApi;
