var express = require("express");
var router = express.Router();
var { conn } = require("./untils/db");
var { User, Book, New, Newcontent, Photo, Music } = require("./untils/schema");
var { ObjectID } = require("mongodb");
var { waterfall } = require("async");
var { setError, aesEncrypt, keys, aesDecrypt } = require("./untils/index")
var util = require('./config/index.js');

router.get("/index", (req, res) => {
    // console.log(req.body);
    res.send("hello")
})

//产生4位随机验证码
function getCode() {
    return 1000 + Math.floor(Math.random() * 9000)
}
//发送短信验证码
router.post('/sendCode', function (req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
    var code = getCode(); //需要发送的随机验证码

    if (mobile == '') {

        res.json({
            msg: "手机号不能为空",
            code: 200
        })

        return
    }

    util.getResult(code, mobile).then(function (response) {
        console.log(response.data);
        console.log(response.data.code);
        if (response.data.code == '000000') {
            conn((err, db) => {
                setError(err, res, db)
                waterfall([
                    (cb) => {
                        User.findOne({ mobile, code }, (err, result) => {
                            cb(err, result)
                        })
                    },
                    (args, cb) => {
                        if (args) {
                            User.updateOne({
                                mobile,
                                code
                            }, {
                                    $set: {
                                        time: new Date().getTime()
                                    }
                                }, (err, result) => {
                                    cb(err, result)
                                })
                        } else {
                            User.create({ mobile, code, time: new Date().getTime() }, (err, result) => {
                                cb(err, result)
                            })
                        }
                    }
                ], (err, result) => {
                    setError(err, res, db)
                    res.json({
                        msg: "发送成功",
                        result: code,
                        code: 200
                    })
                    db.disconnect()
                })
            })

        } else {
            res.json({
                msg: "发送失败!",
                code: 200
            })
        }

    }, function (err) {
        console.log(err);
        res.json({
            msg: "验证码发送异常!",
            err,
            code: 200
        })
    })

});

//验证验证码是否有效
router.post("/checkCode", (req, res) => {
    var body = req.body;
    var mobile = body.mobile;
    var code = body.code;
    conn((err, db) => {
        setError(err, res, db);
        User.findOne({ mobile, code }, (err, result) => {
            if (result) {
                var time = new Date().getTime();
                if (time - result.time < 60 * 1000 * 60 * 24 * 365) {
                    var token = aesEncrypt(mobile, keys);
                    req.session.token = token;
                    res.json({
                        msg: "登录成功",
                        code: 200,
                        type: 1,
                        token

                    })
                } else {
                    res.json({
                        msg: "验证码失效,请重新获取",
                        code: 200,
                        type: 0
                    })
                }
            } else {
                res.json({
                    msg: "验证码不正确",
                    code: 200,
                    type: 0

                })
            }
            db.disconnect();
        })
    })
})

//获取用户名
router.post("/getUserInfo", (req, res) => {
    var userName = aesDecrypt(req.body.userName, keys);
    console.log(userName)
    conn((err, db) => {
        setError(err, res, db);
        User.findOne({ userName }, (err, result) => {
            res.json({
                msg: "获取用户信息成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })

})

//修改个人资料

router.post("/editUserInfo", (req, res) => {
    var body = req.body;
    console.log("~~~~~~~", body)
    var nickName = body.nickName;
    var sex = body.sex;
    var userName = aesDecrypt(req.body.userName, keys);
    console.log(userName)
    conn((err, db) => {
        setError(err, res, db);
        waterfall([
            (cb) => {
                User.findOne({ userName, nickName, sex }, (err, result) => {
                    cb(err, result)
                })
            },
            (args, cb) => {
                if (args) {
                    User.updateOne({}, {
                        $set: {
                            userName,
                            nickName,
                            sex
                        }
                    }, (err, result) => {
                        cb(err, result)
                    })
                } else {
                    User.create({ userName, nickName, sex }, (err, result) => {
                        cb(err, result)
                    })
                }
            }
        ], (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "资料修改成功",
                code: 200
            })
            db.disconnect();
        })
    })
})

//获取个人资料信息
router.get("/getUserinfo", (req, res) => {
    var userName = aesDecrypt(req.body.userName, keys);
    console.log(userName)
    conn((err, db) => {
        setError(err, res, db);
        User.findOne({ userName }, (err, result) => {
            setError(err, res, db)
            res.json({
                msg: "获取个人信息成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})

//提交文章
router.post("/submitBooks", (req, res) => {
    var userName = aesDecrypt(req.body.userName, keys);
    var body = req.body;
    var title = body.title;
    var type = body.type;
    var text = body.text;
    var userPhoto = body.userPhoto;
    var nickName = body.nickName
    var time = new Date().getTime();
    console.log(time)
    console.log(title, type, text)
    conn((err, db) => {
        setError(err, res, db);
        Book.create({ userName, title, type, text, time, userPhoto, nickName }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "发表成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//获取新闻
router.get("/getNews", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        New.find({}, {}).exec((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取新闻成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//获取新闻详情
router.get("/getNewsDetail", (req, res) => {
    var newsId = req.query.newsId;
    // console.log(newsId)
    conn((err, db) => {
        setError(err, res, db);
        New.findOne({ _id: ObjectID(newsId) }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取新闻详情成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//获取新闻评论
router.post("/getNewsContent", (req, res) => {
    var newsId = req.body.newsId;
    console.log("----", newsId)
    conn((err, db) => {
        Newcontent.find({ newsId }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "评论获取成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//提交新闻评论
router.post("/submitNewsContent", (req, res) => {
    var userName = aesDecrypt(req.body.userName, keys);
    var time = new Date().getTime();
    var content = req.body.content;
    var newsId = req.body.newsId;
    var nickName = req.body.nickName;
    var headPic = req.body.headPic;
    console.log(nickName, headPic)
    conn((err, db) => {
        setError(err, res, db);
        Newcontent.create({ userName, time, content, newsId, nickName, headPic }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "提交新闻评论成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
////获取文章类型
router.get("/getBooksType", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        Book.distinct("title", (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取文章类型成功",
                code: 200,
                result
            })
            db.disconnect()
        })
    })
})
//获取用户发表的文章
router.post("/getUserBooks", (req, res) => {
    console.log(req.body)
    var userName = aesDecrypt(req.body.userName, keys);
    console.log(userName)
    conn((err, db) => {
        setError(err, res, db)
        Book.find({ userName }, {}).exec((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取用户文章成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//获取所有文章
router.get("/getAllBooks", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        Book.find({}, {}).exec((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取所有文章成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//删除用户发表的文章
router.post("/deleteBooks", (req, res) => {
    var userName = aesDecrypt(req.body.userName, keys);
    console.log(userName)
    var booksId = req.body.booksId;
    console.log(booksId)
    conn((err, db) => {
        setError(err, res, db);
        waterfall([
            (cb) => {
                Book.deleteOne({ _id: ObjectID(booksId) }, (err, result) => {
                    cb(err, result)
                })
            },
            (args, cb) => {
                if (args) {
                    Book.find({ userName }, {}).exec((err, result) => {
                        cb(err, result)
                    })
                }
            }
        ], (err, result) => {
            setError(err, res, db);
            res.json({
                result,
                booksId
            })
            db.disconnect();
        })
    })
})
//获取美图资源
router.get("/getPhoto", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        Photo.find({}, {}).exec((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取美图成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//获取音乐资源
router.get("/getMusic", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        Music.find({}, {}).exec((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取音乐资源成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//上传用户头像
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");//设置文件存储路径
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);//给文件重命名
    }
})
//创建上传对象
const upload = multer({ storage }).any();//表示任意格式文件
//上传图片
router.post("/uploadPhoto", upload, (req, res) => {
    var photoUrl = req.files[0].path;
    var userName = aesDecrypt(req.body.userName, keys);
    console.log(userName)
    conn((err, db) => {
        setError(err, res, db);
        User.updateOne({
            userName
        }, {
                $set: {
                    photo: photoUrl
                }
            }, (err, result) => {
                setError(err, res, db);
                res.json({
                    msg: "图像上传成功",
                    code: 200,
                    photoUrl
                })
                db.disconnect();
            })
    })
})
//获取用户图片
router.post("/getUserPhoto", (req, res) => {
    console.log(req.body)
    var userName = aesDecrypt(req.body.userName, keys);
    console.log(userName)
    conn((err, db) => {
        setError(err, res, db);
        User.find({ userName }, (err, result) => {
            setError(err, res.db);
            res.json({
                msg: "获取图像信息成功",
                type: 1,
                result
            })
            db.disconnect();
        })
    })
})
module.exports = router;