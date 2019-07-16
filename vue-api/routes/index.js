var express = require('express');
var router = express.Router();
var axios = require('axios');
var md5 = require('md5');
var base64 = require('base-64');
var utf8 = require('utf8');
var qs = require('qs');
var util = require('../config/index.js');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Expressaaa',
        obj: {
            a: '123456',
            b: 'abcbdej',
            c: '55555'
        }
    });
});


router.post('/add', function(req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
     var param = req.body.param; //变量内容

    if (mobile == '') {

        res.render('fail', {
            message: '手机号不能为空',
            code: ''
        });

        return
    }

    if (param == '') {
        param = '';
    }

    util.getResult(param, mobile).then(function(response) {
        console.log(response.data);
        console.log(response.data.code);
        if (response.data.code == '000000') {
            res.render('success', {
                message: '发送成功',
                code: response.data
            });
        } else {
            res.render('fail', {
                message: '请求失败',
                code: response.data
            });
        }

    }, function(err) {
        console.log(err);
        res.status(500).send('database error').end();
    })

});



module.exports = router;