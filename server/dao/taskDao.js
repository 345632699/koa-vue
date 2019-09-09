/**
 * 任务管理
 */
'use strict'

const task = require('./sql/taskSql')
const commonDao = require('./commonDao')

export default class taskDao {
  // 获取所有组织架构的列表 不包含子集列表
  static async getOrganizationList () {
    try {
      const result = await commonDao.select(task.organization.getOrganizationList, null, true)
      return result.length ? result : null
    } catch (e) {
      console.log('getOrganizationList eror:', e)
    }
  }

  // 获取三级架构中的子级里列表
  static async getChildList () {
    try {
      const result = await commonDao.select(task.organization.getChildList, null, true)
      return result.length ? result : null
    } catch (e) {
      console.log('getOrganizationList eror:', e)
    }
  }

  // 更新现有列表
  static async editOrganization (obj) {
    try {
      const result = await commonDao.update(task.organization.editOrganization, [obj], false)
      return result
    } catch (e) {
      console.log('editOrganization eror:', e)
    }
  }

  // 需要更新的3级架构的子级
  static async getNeedUpdateChild (obj = null) {
    try {
      const result = await commonDao.select(task.organization.getNeedUpdateChild, obj, false)
      return result
    } catch (e) {
      console.log('editOrganization eror:', e)
    }
  }

  // 更新父级ID
  static async updateChildParentId (obj) {
    try {
      const result = await commonDao.update(task.organization.updateChildParentId, obj, false)
      return result
    } catch (e) {
      console.log('editOrganization eror:', e)
    }
  }

  // 通过姓名获取父级ID
  static async getParentId (obj) {
    try {
      const result = await commonDao.select(task.organization.getParentId, obj, false)
      return result[0]
    } catch (e) {
      console.log('editOrganization eror:', e)
    }
  }

  // 删除前端删除的条目
  static async deleteOrganizationRecord (obj) {
    try {
      return await commonDao.update(task.organization.deleteOrganizationRecord, obj, false)
    } catch (e) {
      console.log('editOrganization eror:', e)
    }
  }
}
