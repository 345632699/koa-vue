/**
 * 基础表格
 */
'use strict'
const baseSql = require('./sql').baseSql
const commonSql = require('./sql').commonSql
const commonDao = require('./commonDao')

export default class BaseDao {
  /**
     * 获取行政区域列表
     * @returns {id, name}列表
     */
  async getRegions () {
    let fields = [baseSql.region.FIELD_ID,
      baseSql.region.FIELD_NAME]
    const result = await commonDao.select(commonSql.getRecords(baseSql.region.TABLE, fields))
    if (result.length > 0) {
      return result
    }
    return null
  }

  /**
     * 获取行政单位列表
     * @returns {id, name, parent_id}列表
     */
  async getDepartments () {
    let fields = [baseSql.department.FIELD_ID,
      baseSql.department.FIELD_NAME,
      baseSql.department.FIELD_PARENT_ID]
    const result = await commonDao.select(commonSql.getRecords(baseSql.department.TABLE, fields))
    if (result.length > 0) {
      return result
    }
    return null
  }

  /**
     * 获取项目类型列表
     * @returns {id, name, icon}列表
     */
  async getProjectTypes () {
    let fields = [baseSql.projectType.FIELD_ID,
      baseSql.projectType.FIELD_NAME,
      baseSql.projectType.FIELD_ICON]
    const result = await commonDao.select(commonSql.getRecords(baseSql.projectType.TABLE, fields))
    if (result.length > 0) {
      return result
    }
    return null
  }

  /**
     * 获取工程类型列表
     * @returns {id, name}列表
     */
  async getEngeeringTypes () {
    let fields = [baseSql.engeeringType.FIELD_ID,
      baseSql.engeeringType.FIELD_NAME]
    const result = await commonDao.select(commonSql.getRecords(baseSql.engeeringType.TABLE, fields))
    if (result.length > 0) {
      return result
    }
    return null
  }
}
