'use strict'

/**
 * 存放SQL
 * @type {{admin: *}}
 */
module.exports = {
  adminSql: require('./adminSql'),
  userSql: require('./userSql'),
  baseSql: require('./baseSql'),
  // projectSql: require('./projectSql'),
  commonSql: require('./commonSql')
}
