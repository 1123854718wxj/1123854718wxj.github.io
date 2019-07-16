//连接mongoose数据库
var mongoose = require('mongoose');
const config = {
    hostname: '0.0.0.0',
    port: 27017,
    dbName: 'mysystem',
}
const CONN_DB_STR = `mongodb://${config.hostname}:${config.port}/${config.dbName}`;

//接口暴露
exports.conn = (callback) => {
    mongoose.connect(CONN_DB_STR, { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log('数据库连接失败');
            callback(err, null);
        } else {
            console.log('数据库连接成功');
            callback(null, mongoose);
        }
    })
}