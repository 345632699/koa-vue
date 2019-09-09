/**
 * 基础表格sql语句
 */
'use strict'
const logger = require('../../utils/logger_util').logger

const CommonSql = {
  getRecords: function (table, fields = null, conditions = null, limits = null) {
    let sql = ''
    let sqlFields = ''
    if (fields) {
      if (Array.isArray(fields)) {
        for (let item of fields) {
          if (sqlFields) {
            sqlFields += ','
          }
          sqlFields += item
        }
      } else {
        for (let key in fields) {
          if (sqlFields) {
            sqlFields += ','
          }
          if (fields[key] && fields[key] !== key) {
            sqlFields += `${fields[key]} as ${key}`
          } else {
            sqlFields += key
          }
        }
      }
    }

    let sqlConditions = ''
    if (conditions) {
      sqlConditions = this.formatConditions(conditions)
    }
    logger.info('sqlConditions...', sqlConditions)

    if (sqlFields) {
      sql = `SELECT ${sqlFields} FROM ${table}`
    } else {
      sql = `SELECT * FROM ${table}`
    }

    if (sqlConditions) {
      sql += ` WHERE ${sqlConditions}`
    }

    if (limits) {
      sql += ` LIMIT ${limits}`
    }

    return sql
  },

  getRevertRecords: function (table, fields = null, conditions = null, limits = null) {
    let sql = this.getRecords(table, fields, conditions)
    sql += ' ORDER BY id DESC'
    if (limits) {
      sql += ` LIMIT ${limits}`
    }
    return sql
  },

  count: function (table, conditions = null) {
    logger.debug('conditions...', conditions)
    let sqlConditions = ''
    if (conditions) {
      sqlConditions = this.formatConditions(conditions)
      logger.debug('sqlConditions...', conditions)
    }
    if (sqlConditions) {
      return `SELECT count(*) as total FROM ${table} WHERE ${sqlConditions}`
    } else {
      return `SELECT count(*) as total FROM ${table}`
    }
  },

  insert: function (table) {
    return `INSERT INTO ${table} SET ?`
  },

  update: function (table, conditions = null) {
    logger.debug('conditions...', conditions)
    let sqlConditions = ''
    if (conditions) {
      sqlConditions = this.formatConditions(conditions)
      logger.debug('sqlConditions...', sqlConditions)
    }

    if (sqlConditions) {
      return `UPDATE ${table} SET ? WHERE ${sqlConditions}`
    } else {
      return `UPDATE ${table} SET ?`
    }
  },

  delete: function (table, strIDs) {
    return `DELETE FROM ${table} WHERE id IN (${strIDs})`
  },

  deleteBy: function (table, conditions) {
    let sqlConditions = this.formatConditions(conditions)
    return `DELETE FROM ${table} WHERE ${sqlConditions}`
  },

  formatConditions: function (params) {
    if (Object.prototype.toString.call(params) === '[object String]') {
      return `${params}`
    }
    let sqlParams = ''
    for (let k in params) {
      if (params[k]) {
        if (sqlParams) {
          sqlParams += ' AND '
        }
        let v = params[k] + ''
        if (k) {
          if (v.indexOf('%') >= 0) {
            sqlParams += `${k} like '${v}'`
          } else {
            sqlParams += `${k}='${v}'`
          }
        } else if (v) {
          sqlParams += `(${v})`
        }
      }
    }
    if (sqlParams) {
      return `${sqlParams}`
    }
    return ''
  }
}

module.exports = CommonSql
