'use strict';

const mysql = require('mysql');
const {webDbConfig} = require('../config');

//const logger = require('./log').getLogger('TafDate', 'MysqlWebDao');//日志

const pool = mysql.createPool(webDbConfig);

//logger.info('dbConfig:' + JSON.stringify(webDbConfig));

/**
 * 三方平台对用户的web数据库
 *
 * author:jockli 2016/12/22
 * 
 */
let MysqlWebDao = function(){};

MysqlWebDao.prototype.execute = function(sql, params = null, format = true, callback) {
  if (format) {
    sql = queryFormat(sql, params);
  }
  ////logger.info('');
  //logger.info('executeSql:%s', sql);
  ////logger.info('');
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

module.exports = new MysqlWebDao();