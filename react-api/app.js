var express = require("express");
var app = express();
const hostname = "0.0.0.0";
const port = 8880;
var server = require("http").Server(app);
app.use(express.json());   // req.body 获取 post  请求提交的 POSTData    $.post
app.use(express.urlencoded({ extended: false }));  //  form method="POST"  
app.use(express.static('public'))
// 处理跨域方法   CORS 处理方式 
app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});
const session = require('express-session')
// 设置 session 中间件  在路由中间件之前 
app.use(session({
    secret: "test",
    name: "appTest",
    cookie: { maxAge: 60 * 60 * 1000 }, //会话时间20min
    resave: false,
    saveUninitialized: true
}));
var { checkToken } = require("./untils")
// app.use(checkToken);

app.get("/", (req, res) => {
    res.send("hello")
})
app.get("/index/:uid", (req, res) => {
    res.json({
        msg: "获取首页数据成功",
        code: 200,
        uid: req.params.uid
    })
})
var vue = require("./vue");
app.use("/vue", vue);//设置路由中间件,添加路由别名

var react = require("./react");
app.use("/react", react);

server.listen(port, hostname, () => {
    console.log(`服务器运行中`)
})

