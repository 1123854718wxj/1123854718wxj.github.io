var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');

var app = express(); //express总对象 封装 返回给app

// view engine setup
app.set('views', path.join(__dirname, 'views'));//重置views置换__dirname 根路径
app.set('view engine', 'ejs');//使用模板引擎ejs文件

app.use(logger('dev'));//日志文件
app.use(express.json());//req.body获取post请求提交的POSTData
app.use(express.urlencoded({ extended: false }));//POST请求使用模块
app.use(cookieParser());//cookie中间件
app.use(express.static(path.join(__dirname, 'public')));//静态文件服务器,重置public为根路径

const session = require('express-session')
// 设置 session 中间件  在路由中间件之前 
app.use(session({
  secret: "test",
  name: "appTest",
  cookie: { maxAge: 20 * 60 * 1000 }, //会话时间20min
  resave: false,
  saveUninitialized: true
}));


app.use('/', indexRouter);//路由中间件 路由别名 解决路由名冲突问题
app.use('/users', usersRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));//404响应
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');//渲染error模板
});

module.exports = app;
