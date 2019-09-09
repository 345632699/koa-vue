'use strict';

/**
 * 参数配置 - 生产环境 .
 *
 */
let config = {};
config.env = 'production';
/**
 * 开放平台web使用的数据库
 */
config.webDbConfig = {
    host: 'weplus.mdb.mig',
    user: 'com_auditorium',
    password: 'C02@MXEJXaRv7U',
    database:'auditorium',
    port:16670
};
config.redisOptions = {
    host : '10.96.153.231',//安装好的redis服务器地址
    port : 6379,　//端口
    password: "LFET69378Q",
    prefix : 'sponge:',//存诸前缀
    ttl : 60 * 60 * 23,//过期时间
    db: 2   //前面两个已经有在使用
};

config.secret = 'sponge-city-demo-key'; // 指定密钥

config.loglevel = 'info'; // 日志等级

module.exports = config;