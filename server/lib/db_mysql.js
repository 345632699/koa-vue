'use strict';

const mysql = require('mysql');
const {apiDbConfig} = require('../config');

//const logger = require('./log').getLogger('TafDate', 'MysqlDao');//日志

const pool = mysql.createPool(apiDbConfig);

//logger.info('dbConfig:' + JSON.stringify(apiDbConfig));

/**
 * 三方平台本身使用的数据库，主要存储各服务号token及三方平台自己token
 *
 * author:jockli 2016/12/22
 * 
 */
let MysqlDao = function(){};

MysqlDao.prototype.execute = function(sql, params = null, format = true, callback) {
  if (format) {
    sql = queryFormat(sql, params);
  }
  //logger.info('executeSql:%s', sql);
  pool.query(sql, format ? undefined : params, callback);
}

function queryFormat(query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return pool.escape(values[key]);
    }
    return txt;
  });
}

module.exports = new MysqlDao();