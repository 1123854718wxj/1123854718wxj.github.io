var express = require("express");
var router = express.Router();
var { conn } = require("./untils/db");
var { setError, aesEncrypt, keys, aesDecrypt } = require("./untils/index");
var { Movie, Good, User, Car, Addr } = require("./untils/schema");
var { ObjectID } = require("mongodb");
var { waterfall } = require("async");
router.get("/movie", (req, res) => {
    var limit = req.query.limit * 1;
    conn((err, db) => {
        setError(err, res, db);
        Movie.find({}, {}).limit(limit).exec((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取电影数据成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})

//注册接口
router.post("/register", (req, res) => {
    var body = req.body;
    conn((err, db) => {
        setError(err, res, db);
        waterfall([
            (callback) => {
                User.findOne({ username: body.username }, (err, result) => {
                    callback(err, result)
                })
            },
            (args, callback) => {
                if (args) {
                    callback(null, { msg: "用户名已存在,请马上登录", code: 200, type: 0 })
                } else {
                    body.time = new Date();
                    var user = new User(body)
                    user.save((err, result) => {
                        callback(err, { msg: "注册成功", code: 200, type: 1 })
                    })
                }
            }
        ], (err, result) => {
            setError(err, res, db);
            res.json(result);
            db.disconnect();
        })
    })
})
//登录接口
router.post("/login", (req, res) => {
    var body = req.body;
    conn((err, db) => {
        setError(err, res, db);
        User.findOne(body, (err, result) => {
            setError(err, res, db);
            if (result) {
                var token = aesEncrypt(body.username, keys);
                console.log(token)
                req.session.token = token;
                console.log(req.session.token)
                var username = body.username;
                res.json({
                    msg: "登录成功",
                    code: 200,
                    type: 1,
                    token,
                    username
                })
            } else {
                res.json({
                    msg: "用户名不存在,请重新登录",
                    code: 401,
                    type: 0
                })
                db.disconnect();
            }
        })
    })
})

//获取用户名
router.get("/getUsername", (req, res) => {
    var username = aesDecrypt(req.headers.token, keys);
    res.json({
        username
    })
})
//获取商品数据接口
router.get("/getGoodsData", (req, res) => {
    var query = req.query;
    var limit = query.limit * 1 || 0;
    var keyword = query.keyword;
    var obj = {};
    if (keyword) {
        obj = {
            $or: [
                {
                    name: new RegExp(keyword),
                },
                {
                    "type.text": new RegExp(keyword)
                }
            ]
        }
    }
    conn((err, db) => {
        setError(err, res, db);
        Good.find(obj, {}).limit(limit).exec((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取商品数据成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })

});

//根据_id去获取商品详情数据
router.get("/getGoodOne", (req, res) => {
    var goodId = req.query.goodId;
    console.log("----------")
    console.log(goodId)
    conn((err, db) => {
        setError(err, res, db);
        Good.findOne({ _id: ObjectID(goodId) }, (err, result) => {
            console.log("+++++")
            console.log(result)
            setError(err, res, db);
            res.json({
                msg: "获取商品详情成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})
//删除商品数据
router.post("/removeGoodsData", (req, res) => {
    var goodId = req.body.goodId;
    var username = aesDecrypt(req.headers.token, keys)
    console.log(username)
    conn((err, db) => {
        setError(err, res, db);
        Car.remove({ username, goodId }, (err, result) => {
            setError(err, res, db)
            res.json({
                msg: "商品删除成功",
                code: 200,
                type: 1,
                result,
                goodId
            })
            db.disconnect();
        })

    })

})
//+-修改商品数据
router.post("/changeGoodsData", (req, res) => {
    var body = req.body;
    console.log(body)
    var username = aesDecrypt(req.headers.token, keys);
    console.log(username);
    var count = body.count * 1;
    var goodId = body.goodId;
    console.log(count, goodId)
    conn((err, db) => {
        setError(err, res, db);
        waterfall([
            (cb) => {
                Car.findOne({ username, goodId }, (err, result) => {
                    cb(err, result)
                })
            },
            (args, cb) => {
                if (args) {
                    Car.updateOne({ username, goodId }, {
                        $set: {
                            count,
                        }
                    }, (err, result) => {
                        cb(err, result)
                    })
                }
            }
        ], (err, result) => {
            setError(err, res, db);
            res.json(result);
            db.disconnect();
        })
    })

})
//获取商品分类
router.get("/getGoodTypes", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        Good.distinct("type", (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取商品分类数据成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})


//下拉刷新获取商品
router.get("/getGoodsByTypes", (req, res) => {
    var query = req.query;
    var type = query.type;
    conn((err, db) => {
        setError(err, res, db);
        Good.find({ 'type.value': type }, {}).exec((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取下拉刷新数据成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})

//购物车逻辑
// 新增 购物车 
// 1. 判断之前是否存在  
// 如果存在 直接修改 数量
// 不存在 直接新增  
// 加入购物车
router.post("/addToCar", (req, res) => {
    var body = req.body;
    console.log(body);
    var count = body.count * 1;
    var goodId = body.goodId;
    body.good = JSON.parse(body.good);
    body.count = count;
    var username = aesDecrypt(req.headers.token, keys);
    console.log("用户名", username)
    conn((err, db) => {
        setError(err, res, db);
        waterfall([
            (cb) => {
                Car.findOne({ username, goodId }, (err, result) => {
                    cb(err, result);
                })
            },
            (args, cb) => {
                if (args) {
                    // 修改数量
                    Car.updateOne({
                        username,
                        goodId
                    }, {
                            $inc: {
                                count,
                            }
                        }, (err, result) => {
                            cb(err, { msg: "添加购物车成功", code: 200, result, type: 0 })
                        })
                } else {
                    // 直接插入 
                    body.time = new Date();
                    body.username = username;
                    Car.create(body, (err, result) => {
                        cb(err, { msg: "添加购物车成功", code: 200, result, type: 1 })
                    })
                }
            }
        ], (err, result) => {
            setError(err, res, db);
            res.json(result);
            db.disconnect();
        })
    })
})


//查找该用户的购物车商品
router.get("/showCarData", (req, res) => {
    var username = aesDecrypt(req.session.token, keys)
    conn((err, db) => {
        setError(err, res, db);
        Car.find({ username }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取购物车信息成功",
                code: 200,
                result
            })
            db.disconnect();
        })
    })
})

//上传用户图片
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
const upload = multer({ storage }).any();//any表示任意格式的文件
//上传图片
router.post("/uploadPhoto", upload, (req, res) => {
    var photoUrl = req.files[0].path;
    var username = aesDecrypt(req.session.token, keys);
    conn((err, db) => {
        setError(err, res, db);
        User.updateOne({
            username
        }, {
                $set: {
                    photo: photoUrl
                }
            }, (err, result) => {
                setError(err, res, db);
                res.json({
                    msg: "图片上传成功",
                    code: 200,
                    photoUrl
                })
                db.disconnect();
            })
    })
})

//新增收货地址
router.post("/address", (req, res) => {
    var username = aesDecrypt(req.session.token, keys);
    console.log(username)
    var myMsg = req.body;
    console.log(myMsg);
    var address = myMsg.addressDetail;
    console.log(address)
    // delete myMsg.addressDetail;
    // myMsg = { ...myMsg, address };
    myMsg.address = myMsg.addressDetail;
    conn((err, db) => {
        setError(err, res, db);
        waterfall([
            (cb) => {
                Addr.findOne({ username, myMsg }, (err, result) => {
                    cb(err, result)
                })
            },
            (args, cb) => {
                if (args) {
                    cb(err, { msg: "地址已经存在，无需修改", code: 200, type: 0 })
                } else {
                    Addr.create({ username, myMsg }, (err, result) => {
                        cb(err, { msg: "地址添加成功", code: 200, type: 1 })
                    })
                }
            }
        ], (err, result) => {
            setError(err, res, db);
            res.json(result);
            db.disconnect();
        })
    })
})
//获取收货地址信息
router.get("/getAddressMsg", (req, res) => {
    var username = aesDecrypt(req.session.token, keys);
    conn((err, db) => {
        Addr.find({ username }, (err, result) => {
            setError(err, res, db);
            res.json(result);
            db.disconnect();
        })
    })
})
//获取用户图片
router.get("/getUserPhoto", (req, res) => {
    var username = aesDecrypt(req.session.token, keys);
    conn((err, db) => {
        setError(err, res, db);
        User.find({ username }, (err, result) => {
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
//用户提交功能反馈
router.post("/submitMsg", (req, res) => {
    res.json({
        msg: "提交成功"
    })

})
module.exports = router;