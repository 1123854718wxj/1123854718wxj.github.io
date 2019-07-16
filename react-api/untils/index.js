//加密中间件
var crypto = require("crypto"); // node 模块 

// 加密函数
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = "wuhan1902daydayup";

exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 


//error回调函数
exports.setError = function (err, res, db) {
    if (err) {
        res.json({
            msg: '数据库错误',
            code: 500,
            type: 10010
        });
        db.disconnect();
        throw err;
    }
}

//检查后端的session是否存在
// 检测 后端session   token 是否存在 是否登录 
// req.headers.token 把 token 传递过来  
// 后端需要处理的逻辑  
// 1. 如果 req.headers 没有token 直接判断 token不存在,请马上登录
// 2. 前端 req.headers 有 token ,但是 后端 的 session 没有存储token token过期或者失效
// 3. 前端 req.headers 有 token, 后端 session 也有 token  但是不匹配  token不匹配
exports.checkToken = function (req, res, next) {
    console.log("token")
    console.log(req.path)
    if (req.path !== "/react/checkCode") {
        var client_token = req.headers.token;
        console.log(client_token)
        var server_token = req.session.token;
        console.log("检测 token ----")
        console.log(server_token);
        if (client_token) {
            if (server_token) {
                if (client_token === server_token) {
                    next(); // token 匹配成功         
                } else {
                    res.json({
                        msg: "token不匹配,请马上登录",
                        code: 401
                    })
                }
            } else {
                res.json({
                    msg: "token过期或者失效,请马上登录",
                    code: 401
                })
            }
        } else {
            res.json({
                msg: "token不存在,请马上登录",
                code: 401
            })
        }
    } else {
        next();
    }

}