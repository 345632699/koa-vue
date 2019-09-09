'use strict'

/**
 * 参数配置 - 本地环境
 */
let config = {}
config.env = 'dev'

/**
 * 开放平台web使用的数据库
 */
config.webDbConfig = {
  host: '10.96.153.231',
  user: 'root',
  password: 'bottle,',
  database: 'sponge_city',
  port: 3306,
  connectionLimit: 10, // 连接池最多可以创建连接数
  queueLimit: 0 // 队伍中等待连接的最大数量，0为不限制。
}

config.redisOptions = {
  host: '10.96.153.231', // 安装好的redis服务器地址
  port: 6379, // 端口
  password: 'LFET69378Q',
  prefix: 'sponge:', // 存诸前缀
  ttl: 60 * 60 * 23, // 过期时间
  db: 2 // 前面两个已经有在使用
}

let Sequelize = require('sequelize')
// 数据配置
let sequelize = new Sequelize('sponge_city', 'root', 'bottle', {
  host: '10.96.153.231',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  timezone: '+08:00',
  liases: false

})
config.sequelize = sequelize

config.secret = 'sponge-city-demo-key' // 指定密钥

config.loglevel = 'debug' // 日志等级

module.exports = config
