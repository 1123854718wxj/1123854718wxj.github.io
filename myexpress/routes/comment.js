var express = require('express');
var router = express.Router();
var { conn } = require('../untils/db');
var { checkIsLogin, setError, aesDecrypt, keys } = require('../untils/index');
var { Movie, Comment } = require('../untils/schema');
var { waterfall, series } = require('async');
var {ObjectID} = require("mongodb");
//电影评论路由模块
router.get('/index', (req, res) => {
    var query = req.query;
    var findData = (mongoose, callback) => {
        Movie.findOne({ id: query.mid }, (err, result) => {
            setError(err, res, mongoose);
            callback(result);
            mongoose.disconnect();
        })
    }
    checkIsLogin(req, res, () => {
        conn((err, mongoose) => {
            setError(err, res, mongoose);
            findData(mongoose, (result) => {
                res.render('comment', { result });
            })
        })

    })
})
//提交电影评论
router.post('/submit', (req, res) => {
    var body = req.body;
    console.log("body",body);
    var insertData = function (mongoose, callback) {
        waterfall([
            (callback) => {
                Movie.findOne({ id: body.mid }, (err, result) => {
                    callback(err, result);
                })
            },
            (atgs, callback) => {//atgs是上一个回调函数的result
                body.username = aesDecrypt(req.session.token,keys);
                console.log("username:",body.username);
                body.time = new Date();
                body.atgs = atgs;
                body.mTitle = atgs.title;
                var comment = new Comment(body);
                comment.save((err, result) => {
                    callback(err, result);
                })
            }
        ], function (err, result) {
            setError(err, res, mongoose);
            callback(result);
            console.log(result)
        })
    }

    checkIsLogin(req, res, () => {
        conn((err, mongoose) => {
            insertData(mongoose, (result) => {
                console.log('result1',result)
                req.session.mid = result.mid;//电影id存储session
                res.json({
                    msg: "评论插入成功",
                    code: 200,
                    result
                })
            })
        })
    })
})

//电影评论
router.get("/mlist",(req,res)=>{

    var pageNo = req.query.pageNo * 1 ||  0;
    var pageSize  = req.query.pageSize * 1 || 10;
    var total = 0;
    var totalPage = 0;

    var findData = function(db,callback){
        series([
            (callback)=>{
                Comment.find({},{}).exec((err,result)=>{
                    if(result.length>0){
                        total = result.length;
                        totalPage = Math.ceil(total/pageSize);
                        pageNo = pageNo <=1 ? 1 : pageNo;
                        pageNo = pageNo >=totalPage ? totalPage : pageNo;
                    }
                    callback(err,result);
                })
            },
            (callback)=>{
                Comment.find({},{}).skip((pageNo-1)*pageSize).limit(pageSize).sort({_id:-1}).exec((err,result)=>{
                    callback(err,result);
                })
            }
        ],(err,result)=>{
            setError(err,res,db);
            callback(result);  // [result,result]
            db.disconnect();
        })
    }
    // var findData = function(db,callback){
    //     Comment.find({},{}).sort({_id:-1}).exec((err,result)=>{
    //         setError(err,res,db);
    //         callback(result);
    //         db.disconnect();
    //     })
    // }
    checkIsLogin(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            findData(db,(result)=>{
                var comment = result[1].map((item)=>{
                    return item;
                })
                res.render("mlist",{
                    result:comment,
                    total,
                    totalPage,
                    pageNo,
                    pageSize,
                    username:aesDecrypt(req.session.token,keys)
                });
            })
        })
    })
    
})

//评论详情路由
router.get("/mvdetail",(req,res)=>{
    var mid = req.query.mid || "";
    var findData = function(db,callback){
        series([
            callback=>{
                Movie.findOne({id:mid},(err,result)=>{
                    callback(err,result);
                })
            },
            callback=>{
                Comment.find({mid}).sort({_id:-1}).exec((err,result)=>{
                    callback(err,result);
                })
            }
        ],(err,result)=>{
            setError(err,res,db);
            callback(result);
            db.disconnect();
        })
    }

    checkIsLogin(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            findData(db,(result)=>{
                res.render("mvdetail",{
                    movie:result[0],
                    comments:result[1]
                });
            })
            
        })
    })
})

//获取我的所有评论
router.get("/my",(req,res)=>{
    var username = req.query.username || "";
    checkIsLogin(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            Comment.find({username},{}).sort({_id:-1}).exec((err,result)=>{
                setError(err,res,db);
                res.render("my",{
                    comments:result,
                    username
                });
                db.disconnect();
            })
            
        })
    })
})

//获取电影mid
router.get('/mv',(req,res)=>{
    var mid=req.query.mid || "";
    checkIsLogin(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            Movie.findOne({id:mid},(err,result)=>{
                setError(err,res,db);
                res.json({
                    msg:'获取mid成功',
                    code:200,
                    result
                })

                db.disconnect();
            })
        })
    })
})

//删除评论
router.get("/delById",(req,res)=>{
    var uid = req.query.uid || "";
    console.log(uid);
    var obj = {};
    // -1 表示删除所有  
    if(uid!=="-1"){
        obj._id = ObjectID(uid); // 特殊 处理  _id 
    }else{
        obj.username = aesDecrypt( req.session.token, keys);
    }
    checkIsLogin(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            Comment.deleteMany(obj,(err,result)=>{
                setError(err,res,db);
                res.json({
                    msg:"删除评论成功",
                    code:200,
                    type:1,
                    result
                });
                db.disconnect();
            })
        })
    })

})

//修改评论
router.get("/update",(req,res)=>{
    var uid = req.query.uid || "";
    var title = req.query.title;
    var content = req.query.content;
    
    checkIsLogin(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            Comment.updateOne({
                _id:ObjectID(uid)
            },{
                $set:{
                    title:title,
                    content,
                    time:new Date()
                }
            },(err,result)=>{
                setError(err,res,db);
                res.json({
                    msg:"修改评论成功",
                    code:200,
                    type:1,
                    result
                });
                db.disconnect();
            })
        })
    })

})

//上传图片
//cnpm -i multiparty -S
var multiparty=require("multiparty");//图片上传
var fs=require("fs");

router.post('/uploadImg',(req,res)=>{
    console.log("上传img");
    var form=new multiparty.Form();

    //设置编码
    form.encoding="UTF-8";
    //设置临时的图片中转站
    form.uploadDir="./uploadtemp";
    //设置最大的图片dax(最大支持2M)
    form.maxFilesSize=2*1024*1024;
    form.parse(req,(err,fileds,files)=>{//fileds 文件域 files文件信息
        if(err) throw err;
        //文件上传最终存放路径
        var uploadUrl="/images/upload";
        file=files['filedata'];
        originalFilename=file[0].originalFilename;
        tempath=file[0].path;//文件的临时存放

        var timestamp=new Date().getTime();
        uploadUrl += timestamp+originalFilename;
        newPath="./public"+uploadUrl;

        //可读流,可写流
        var fileRead=fs.createReadStream(tempath);
        var fileWrite=fs.createWriteStream(newPath);

        fileRead.pipe(fileWrite);
        //监听文件传输
        fileWrite.on("close",()=>{
            //删除临时文件
            fs.unlinkSync(tempath);
            res.json({err:"",msg:uploadUrl})
        })

    })
})
module.exports = router;