/**
 * 管理员
 */
'use strict'
const sql = require('./sql').adminSql
const commonDao = require('./commonDao')

/**
 *
 */
export default class AdminDao {
  constructor (name) {
    this.name = name
  }
  /**
     * 根据登录名查询用户信息
     * @param {type} obj
     * @returns {unresolved}
     */
  async getUserByName (obj) {
    const result = await commonDao.select(sql.admin.findByUsername, { username: obj.username }, true)
    // console.log("getUserByName result", JSON.stringify(result));
    if (result.length > 0) {
      return result[0]
    }
    return null
  }

  /**
     *管理员更新
     * @param {type} id
     * @param {type} obj
     * @returns {unresolved}
     */
  async adminUpdateById (id, obj) {
    // console.log('adminUpdateById obj => ', JSON.stringify(obj));
    let updateSql = sql.admin.update
    for (let key in obj) {
      if (typeof obj[key] !== 'function') {
        updateSql += ' ' + key + '=:' + key + ' ,'
      }
    }
    updateSql = updateSql.slice(0, -1)
    updateSql += ' WHERE id=:id'
    obj.id = id
    await commonDao.update(updateSql, obj, true)
  }

  /**
     * 根据手机号码查询用户信息
     * @param {type} obj
     * @returns {unresolved}
     */
  async getUserById (id) {
    console.log('getUserById...', id)
    const result = await commonDao.select(sql.admin.findById, { id: id }, true)
    // console.log("findById result", JSON.stringify(result));
    if (result.length > 0) {
      return result[0]
    }
    return null
  }

  /**
     * 管理员添加
     * @param {type} obj
     * @returns {unresolved}
     */
  async adminAdd (obj) {
    // console.log("adminAdd begin", JSON.stringify(obj));
    await commonDao.insert(sql.admin.insert, obj, false)
  }
}
