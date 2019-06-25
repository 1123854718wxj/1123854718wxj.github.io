var express = require('express');
var router = express.Router();
var { conn } = require('../untils/db');
var { Movie } = require('../untils/schema')
var { aesEncrypt, aesDecrypt, keys, checkIsLogin, setError } = require('../untils/index')
/* GET home page. */
router.get('/', function (req, res, next) {
  var token = req.session.token;
  console.log(token)
  var username = '';
  username = token ? aesDecrypt(token, keys) : username;
  res.render('index', {
    title: 'Express',
    username
  });
});

//views和public两个文件夹被设置为根路径了
//登录
router.get('/login', (req, res) => {//路由名称
  var username = req.query.username;
  username = username ? aesDecrypt(username, keys) : username;
  res.render('login', {
    username: username
  });//要渲染的ejs文件,后缀可以省略
})
//注册
router.get('/register', (req, res) => {
  res.render('register');
})

//检查token模块
router.get('/checkToken', (req, res) => {
  var client_token = req.headers.token;
  var server_token = req.session.token;
  if (client_token === server_token) {
    res.json({
      code: 200,
      msg: 'token有效,身份合法',
      type: 1
    })
  } else {
    res.json({
      code: 401,
      msg: 'token无效,身份不合法',
      type: 0
    })
  }
});

//注销登录模块
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');//重置路由为根目录
  })
});


//电影列表模块
router.get('/movie', (req, res) => {
  var query = req.query;
  console.log(query);//得到的值为字符串类型
  var sort={};
  var obj={};
  for (var i in query) {
      if(i!=="keyword"){
        sort[i] = query[i] * 1;//将字符串转为数值
      }else{
        obj={
          $or:[
            {
              title:new RegExp(req.query.keyword)
            },
            {
              year:new RegExp(req.query.keyword)
            }
          ]
        }
      }
  }
  var findData = function (mongoose, callback) {
    Movie.find(obj, {}).sort(sort).exec((err, result) => {
      setError(err, res, mongoose);
      callback(result);
      mongoose.disconnect();
    })
  }
  checkIsLogin(req, res, () => {
    conn((err, mongoose) => {
      setError(err, res, mongoose);
      findData(mongoose, (result) => {
        var arr = result.map((item) => {
          return item;
        });
        res.render('movie', {
          result: arr,
        })
      })
    })
  })
})




//读取图片资源
// router.get('/images', (req, res) => {
//   res.render('images/1.jpg');
// });

module.exports = router;
