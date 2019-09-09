'use strict'

import {logger} from '../utils/logger_util'
import redisCache from '../utils/redis_cache'
import redisKey from '../defines/redisKey'
import errorMsg from '../defines/errorMsg'
import BaseDao from '../dao/baseDao'
const baseDaoImp = new BaseDao()

/**
 * 获取行政区域列表
 * @return {id, name} 行政区域列表
 */
const getRegions = async function (ctx) {
  let result = await getRegionList()
  if (result) {
    ctx.body = {
      ret: 0,
      data: result
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

/**
 * 获取行政单位列表
 * @return {id, name, parent_id} 行政单位列表
 */
const getDepartments = async function (ctx) {
  let result = await getDepartmentList()
  if (result) {
    ctx.body = {
      ret: 0,
      data: result
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

/**
 * 获取项目类型列表
 * @return {id, name, icon} 项目类型列表
 */
const getProjectTypes = async function (ctx) {
  let result = await getProjectTypeList()
  if (result) {
    ctx.body = {
      ret: 0,
      data: result
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

/**
 * 获取工程类型列表
 * @return {id, name} 工程类型列表
 */
const getEngeeringTypes = async function (ctx) {
  let result = await getEngeeringTypeList()
  if (result) {
    ctx.body = {
      ret: 0,
      data: result
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

const getRegionList = async function () {
  let result = await redisCache.get(redisKey.REDIS_K_REGIONS)
  if (result) {
    result = JSON.parse(result)
  } else {
    result = await baseDaoImp.getRegions()
    logger.debug('getRegionList from db =>', result)
    redisCache.set(redisKey.REDIS_K_REGIONS, JSON.stringify(result))
  }
  return result
}

const getDepartmentList = async function () {
  let result = await redisCache.get(redisKey.REDIS_K_DEPARTMENTS)
  if (result) {
    result = JSON.parse(result)
  } else {
    result = await baseDaoImp.getDepartments()
    logger.debug('getDepartmentList from db =>', result)
    redisCache.set(redisKey.REDIS_K_DEPARTMENTS, JSON.stringify(result))
  }
  return result
}

const getProjectTypeList = async function () {
  let result = await redisCache.get(redisKey.REDIS_K_PROJECTTYPES)
  if (result) {
    result = JSON.parse(result)
  } else {
    result = await baseDaoImp.getProjectTypes()
    logger.debug('getProjectTypeList from db =>', result)
    redisCache.set(redisKey.REDIS_K_PROJECTTYPES, JSON.stringify(result))
  }
  return result
}

const getEngeeringTypeList = async function () {
  let result = await redisCache.get(redisKey.REDIS_K_ENGEERINGTYPES)
  if (result) {
    result = JSON.parse(result)
  } else {
    result = await baseDaoImp.getEngeeringTypes()
    logger.debug('getEngeeringTypeList from db =>', result)
    redisCache.set(redisKey.REDIS_K_ENGEERINGTYPES, JSON.stringify(result))
  }
  return result
}

export default {
  getRegions,
  getDepartments,
  getProjectTypes,
  getEngeeringTypes,
  getRegionList,
  getDepartmentList,
  getProjectTypeList,
  getEngeeringTypeList
}
