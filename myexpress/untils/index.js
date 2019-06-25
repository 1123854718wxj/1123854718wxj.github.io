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
exports.checkIsLogin = function (req, res, callback) {
    if (req.session.token) {
        callback();
    } else {
        res.send(`<script>alert('您的登录已经失效了,请重新登录');location.href='/login'</script>`)
    }
}