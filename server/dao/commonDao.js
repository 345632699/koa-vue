/**
 * Created by bryonliu on 2016/12/19.
 *
 */
'use strict'
const mysql = require('mysql')
const transaction = require('node-mysql-transaction')// 第三方插件
const {webDbConfig} = require('../config')
const pool = mysql.createPool(webDbConfig)
const logger = require('../utils/logger_util').logger
// const logger = require('../utils/log_utils')('common-dao');

class CommonDao {
  getConnection () {
    let trCon = transaction({
      connection: [mysql.createConnection, webDbConfig]
    })
    return trCon
  }
  /**
     *
     * @param sql
     * @param params 参数
     * @param format 是否进行格式化，建议除去insert之外使用格式话
     *        格式化参数需要传入｛username:test｝对象 如果非格式化
     * @returns {Promise}
     */
  insert (sql, params = undefined, format = false) {
    return new Promise((resolve, reject) => {
      this._query(sql, params, format, function (err, result) {
        if (err) {
          logger.error('insert error...', err)
          reject(err)
        } else {
          resolve(result.insertId)
        }
      })
    })
  }

  delete (sql, params, format = true) {
    return new Promise((resolve, reject) => {
      this._query(sql, params, format, function (err, result) {
        if (err) {
          // logger.error('delete', sql, params, err);
          reject(err)
        } else {
          resolve(result.affectedRows)
        }
      })
    })
  }

  update (sql, params, format = true) {
    return new Promise((resolve, reject) => {
      this._query(sql, params, format, function (err, result) {
        if (err) {
          // logger.error('update', sql, params, err)
          reject(err)
        } else {
          // 使用changedRows返回成功修改的行数
          resolve(result.affectedRows)
        }
      })
    })
  }

  select (sql, params, format = true) {
    return new Promise((resolve, reject) => {
      this._query(sql, params, format, function (err, rows) {
        if (err) {
          // logger.error('select error', sql, params, err);
          reject(err)
        } else {
          // logger.info('rows ', rows);
          resolve(rows)
        }
      })
    })
  }

  _query (sql, params = null, format = true, cb = function () {}) {
    try {
      if (format) {
        sql = queryFormat(sql, params)
        logger.info('sql-format =>', sql)
      }
      logger.info('sql =>', sql)
      let query = pool.query(sql, format ? undefined : params, cb)
      logger.info('query =>', query)
    } catch (err) {
      logger.error('_query =>', sql, params, format, err)
      cb(err)
    }
  }
}

function queryFormat (query, values) {
  if (!values) {
    return query.replace('@params', function (txt, key) {
      return ''
    })
  }
  if (query.indexOf('@params') > 0) {
    return query.replace('@params', function (txt, key) {
      let sqlParams = ''

      for (let k in values) {
        if (values[k]) {
          if (sqlParams) {
            sqlParams += ' AND '
          }
          let v = values[k] + ''
          if (v.indexOf('%') >= 0) {
            sqlParams += `${k} like '${v}'`
          } else {
            sqlParams += `${k}='${v}'`
          }
        }
      }

      if (sqlParams) {
        return `WHERE ${sqlParams}`
      }
      return ''
    })
  } else {
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return pool.escape(values[key])
      }
      return txt
    })
  }
}

module.exports = new CommonDao()
