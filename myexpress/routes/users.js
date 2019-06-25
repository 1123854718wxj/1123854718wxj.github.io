var express = require('express');
var router = express.Router();
var { conn } = require('../untils/db');
var { waterfall } = require('async');
var { User } = require('../untils/schema');
var { aesEncrypt, aesDecrypt, keys, setError } = require('../untils/index');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  var body = req.body;//POSTData数据
  console.log(body)
  conn((err, mongoose) => {
    if (err) throw err;
    waterfall([//瀑布流(串行有关联),前面执行的结果传递给后面的事件
      (callback) => {
        //在数据库中查找用户名,找到返回结果
        User.findOne({ username: body.username }, (err, result) => {
          console.log(result);
          callback(err, result);
        })
      },
      (args, callback) => {//args接收前面callback传来的result
        if (args) {//如果用户名存在
          callback(null, { type: 0, msg: '用户名已存在,请重新注册', code: 200 });
        } else {//如果用户名不存在
          body.time = new Date();//时间戳
          var user = new User(body);//将提交的用户名传给User这个集合,并赋值给user
          user.save((err, result) => {//将用户名添加到数据库中
            callback(err, { type: 1, msg: '注册成功', code: 200 })
          })
        }
      }
    ], (err, result) => {
      if (err) throw err;
      if (!!result.type) {//!!获取result.type的布尔值1
        //type为1 提示注册成功,跳转到登录页面
        res.send(`<script>alert('${result.msg}');location.href='/login?username=${aesEncrypt(body.username, keys)}'</script>`)
      } else {
        //type为0 提示用户名已存在,请重新注册 跳转至注册页面
        res.send(`<script>alert('${result.msg}');location.href='/register'</script>`)
      }
      mongoose.disconnect();//断开数据库连接
    })
  })
});

//登录
router.post('/login', (req, res) => {
  var body = req.body;
  console.log(body);
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    User.findOne(body, (err, result) => {
      setError(err, res, mongoose);
      if (result) {
        var token = aesEncrypt(result.username, keys);
        req.session.token = token;//将后端返回的token传给session.token
        console.log(req.session)
        res.json({
          msg: '登录成功',
          code: 200,
          type: 1,
          token
        })
      } else {
        res.json({
          msg: '登录失败,请重新登录',
          code: 200,
          type: 0
        })
      }
    })
  })
})
//post请求只能通过表单或ajax提交
// router.all('/aut', (req, res) => {
//   res.send('既可以是post也可以是get请求')
// })



module.exports = router;
