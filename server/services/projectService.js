'use strict';

import {logger} from '../utils/logger_util'
import redisCache from '../utils/redis_cache'
import redisKey from '../defines/redisKey'
import errorMsg from '../defines/errorMsg'
import ProjectDao from '../dao/projectDao'
import {Project, ProjectLifecycle} from '../dao/sql/projectSql'
import baseService from '../services/baseService'

const projectDaoImp = new ProjectDao()

/**
 * 获取项目个数
 * @param {region 区域id, department 部门id, project_type 项目类型, search_word 查询字段, created_start_time 开始时间, created_end_time 结束时间}
 * @return 项目个数 total
 */
const getProjectCount = async function (ctx) {
  let reqData = ctx.request.body
  let result = await projectDaoImp.getProjectCount({
    regionId: reqData.region,
    departmentId: reqData.department,
    projectType: reqData.project_type,
    createdStartTime: reqData.created_start_time,
    createdEndTime: reqData.created_end_time,
    searchWord: reqData.search_word
  })
  logger.debug('getProjectCount reqData...', reqData)
  logger.debug('getProjectCount result...', result)
  if (result && result.length > 0) {
    ctx.body = {
      ret: 0,
      data: result[0]
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

/**
 * 获取项目列表
 * @param {page_size, page, region, department, project_type, search_word, created_start_time, created_end_time}
 * @return 项目列表 {id,sn,name,
 * region_id,region_name,project_type,project_type_name,engineering,engineering_name,
 * project_detail,sponge_detail,
 * project_area,sponge_area,
 * executant,operate_type,
 * contact_name,contact_phone,
 * investment,investment_local,investment_sponge,
 * start_time,end_time,
 * created_department,created_time
 * current_status当前状态, update_status是否可更新状态}
 */
const getProjectList = async function (ctx) {
  let reqData = ctx.request.body
  let result = await projectDaoImp.getProjectList({
    pageSize: reqData.page_size,
    pageNum: reqData.page,
    regionId: reqData.region,
    departmentId: reqData.department,
    projectType: reqData.project_type,
    createdStartTime: reqData.created_start_time,
    createdEndTime: reqData.created_end_time,
    searchWord: reqData.search_word
  })

  if (!result) {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
    return
  }
  if (!result.length) {
    ctx.body = {
      ret: 0,
      data: result
    }
    return
  }

  // 获取项目责任单位
  let projectIds = []
  for (let item of result) {
    projectIds.push(item.id)
  }
  let departments = await baseService.getDepartmentList()
  let projDepartments = await projectDaoImp.getMultiProjectDepartments(projectIds)
  if (projDepartments) {
    for (let item of result) {
      item.department = ''
      if (projDepartments[item.id]) {
        for (let depart of projDepartments[item.id]) {
          if (item.department) item.department += '，'
          item.department += departments[depart.department_id - 1].name
        }
      }
    }
  }

  ctx.body = {
    ret: 0,
    data: result
  }
}

/**
 * 获取项目基本信息
 * @param 项目id
 * @return 项目基本信息{id,sn,name,
 * region_id,region_name,project_type,project_type_name,engineering,engineering_name,
 * project_detail,sponge_detail,
 * project_area,sponge_area,
 * executant,operate_type,
 * contact_name,contact_phone,
 * investment,investment_local,investment_sponge,
 * start_time,end_time,
 * created_department,created_time}
 */
const getProjectInfo = async function (ctx) {
  let result = await projectDaoImp.getProjectInfo(ctx.query.id)
  if (result && result.length > 0) {
    ctx.body = {
      ret: 0,
      data: result[0]
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

/**
 * 获取项目所有信息
 * @param 项目id
 * @return 项目所有信息
 */
//todo 未实现
const getProjectDetailInfo = async function (ctx) {
  let result = await projectDaoImp.getProjectInfo(ctx.query.id)
  if (result && result.length > 0) {
    ctx.body = {
      ret: 0,
      data: result[0]
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

/**
 * 获取项目地块坐标
 * @param 项目id
 * @return 项目地块坐标列表 {id, idx, inflection, longitude, latitude, circle}
 */
const getProjectCoordinates = async function (ctx) {
  let result = await projectDaoImp.getProjectCoordinates(ctx.query.id)
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
 * 保存项目地块坐标(修改/新增)
 * @param 项目id, 项目地块坐标列表 {id(可选), idx, inflection, longitude, latitude, circle}
 * @return id（新增项）或1（修改项）
 */
const saveProjectCoordinates = async function (ctx) {
  let projectId = ctx.request.body.id
  let coordinates = ctx.request.body.coordinates
  let result = await projectDaoImp.saveProjectCoordinates(projectId, coordinates)
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
 * 删除项目地块坐标
 * @param 项目地块坐标id列表
 * @return 已删除记录个数
 */
const deleteProjectCoordinates = async function (ctx) {
  let ids = ctx.request.body
  let result = await projectDaoImp.deleteProjectCoordinates(ids)
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
 * 获取项目投资批复文件
 * @param 项目id
 * @return 项目投资批复文件列表{name, url, type}
 */
const getProjectApprovalFiles = async function (ctx) {
  let result = await projectDaoImp.getProjectApprovalFiles(ctx.query.id)
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
 * 新增项目投资批复文件
 * @param {project_id, name, url, type}
 * @return 记录id
 */
const addProjectApprovalFile = async function (ctx) {
  let reqData = ctx.request.body
  let result = await projectDaoImp.addProjectApprovalFile({
    projectId: reqData.project_id,
    name: reqData.name,
    url: reqData.url,
    type: reqData.type
  })
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
 * 新增多个项目投资批复文件
 * @param {project_id, name, url, type}
 * @return 记录id列表
 */
const addProjectApprovalFiles = async function (ctx) {
  let reqData = ctx.request.body
  let result = await projectDaoImp.addProjectApprovalFiles({
    projectId: reqData.project_id,
    approvalFiles: reqData.approval_files
  })
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
 * 删除项目投资批复文件
 * @param {project_id, name}
 * @return 已删除记录个数
 */
const deleteProjectApprovalFile = async function (ctx) {
  let data = ctx.request.body
  let result = await projectDaoImp.deleteProjectApprovalFile({
    projectId: data.project_id,
    name: data.name
  })
  if (result && result.length > 0) {
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
 * 获取项目外部拉取的附件
 * @param 项目id
 * @return 项目外部拉取的附件列表 {file_name, file_path, file_updated_time}
 */
const getProjectExternalFiles = async function (ctx) {
  let result = await projectDaoImp.getProjectExternalFiles(ctx.query.id)
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
 * 获取项目评审意见
 * @param 项目id
 * @return 项目评审意见列表 {title, opinion}
 */
const getProjectOpinions = async function (ctx) {
  let result = await projectDaoImp.getProjectOpinions(ctx.query.id)
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
 * 项目录入 or 修改
 * @param
 * {
 * sn,name,region,project_type,engineering,project_detail,sponge_detail,project_area,sponge_area,executant,operate_type,
 * contact_name,contact_phone,investment,investment_local,investment_social,investment_sponge,created_department
 * }
 * @return 记录的id(新增) 或 1(修改)
 */
const saveProject = async function (ctx) {
  let obj = ctx.request.body
  let result = null
  let record = {}
  record[Project.FIELD_SN] = obj.sn
  record[Project.FIELD_NAME] = obj.name
  record[Project.FIELD_REGION_ID] = obj.region
  record[Project.FIELD_PROJ_TYPE] = obj.project_type
  record[Project.FIELD_ENGIN_TYPE] = obj.engineering
  record[Project.FIELD_PROJ_DETAIL] = obj.project_detail
  record[Project.FIELD_SPONGE_DETAIL] = obj.sponge_detail
  record[Project.FIELD_PROJ_AREA] = obj.project_area
  record[Project.FIELD_SPONGE_AREA] = obj.sponge_area
  record[Project.FIELD_EXECUTANT] = obj.executant
  record[Project.FIELD_OPERATE_TYPE] = obj.operate_type
  record[Project.FIELD_CONTACT_NAME] = obj.contact_name
  record[Project.FIELD_CONTACT_PHONE] = obj.contact_phone
  record[Project.FIELD_INVESTMENT] = obj.investment
  record[Project.FIELD_INVEST_LOCAL] = obj.investment_local
  record[Project.FIELD_INVEST_SOCIAL] = obj.investment_social
  record[Project.FIELD_INVEST_SPONGE] = obj.investment_sponge
  if (obj.created_department) record[Project.FIELD_CREATED_DEPARTMENT] = obj.created_department
  if (!obj.engineering || !obj.project_type || !obj.region) {
    logger.error('saveProject error...', obj.engineering, obj.project_type, obj.region)
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
    return
  }

  // todo FIELD_REGION_NAME FIELD_PROJ_TYPE_NAME FIELD_ENGIN_TYPE_NAME 这几个属性后面废弃
  let regions = await baseService.getRegionList()
  record[Project.FIELD_REGION_NAME] = regions[obj.region - 1].name
  let projectTypes = await baseService.getProjectTypeList()
  record[Project.FIELD_PROJ_TYPE_NAME] = projectTypes[obj.project_type - 1].name
  let engeeringTypes = await baseService.getEngeeringTypeList()
  record[Project.FIELD_ENGIN_TYPE_NAME] = engeeringTypes[obj.engineering - 1].name

  let retCode = 0
  if (obj.id) {
    result = await projectDaoImp.updateProject(obj.id, record)
  } else {
    result = await projectDaoImp.addProject(record)
    if (result) {
      let proejctId = result
      if (!await initProjectLifecycle(proejctId, obj.engineering)) {
        retCode = -2
      }
    }
  }
  logger.debug('saveProject result...', result)
  if (result) {
    ctx.body = {
      ret: retCode,
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
 * 获取子项目列表
 * @param 父项目id
 * @return 子项目列表 {id, name, project_type, progress, project_detail, sponge_detail, project_area, sponge_area, created_time}
 */
const getSubProjects = async function (ctx) {
  let result = await projectDaoImp.getSubProjects(ctx.query.id)
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
 * 保存多个子项目(修改/新增)
 * @param 项目id, 子项目列表subprojects {id(可选), name, project_type, project_detail, sponge_detail, project_area, sponge_area}
 * @return id（新增项）或1（修改项）
 */
const saveSubProjects = async function (ctx) {
  let projectId = ctx.request.body.id
  let subprojects = ctx.request.body.subprojects
  let result = await projectDaoImp.saveSubProjects(projectId, subprojects)
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
 * 删除多个子项目
 * @param 子项目id列表
 * @return 已删除记录个数
 */
const deleteSubProjects = async function (ctx) {
  let ids = ctx.request.body
  let result = await projectDaoImp.deleteSubProjects(ids)
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
 * 获取项目所属责任单位列表
 * @param 项目id
 * @return 项目所属责任单位列表 {id, name, state(0-未确认 1-已确认)}
 */
const getProjectDepartments = async function (ctx) {
  let result = []
  let projDepartments = await projectDaoImp.getProjectDepartments(ctx.query.id)
  if (projDepartments) {
    let departments = await baseService.getDepartmentList()
    for (let record of projDepartments) {
      if (record.department_id) {
        let item = {
          id: record.department_id,
          name: departments[record.department_id - 1].name,
          state: record.state
        }
        result.push(item)
      }
    }
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
 * 添加项目责任单位
 * @param 项目id, 所属责任单位id列表
 * @return
 */
const addProjectDepartments = async function (ctx) {
  let projectId = ctx.request.body.id
  let departments = ctx.request.body.departments
  logger.debug('addProjectDepartments...', projectId, departments)
  let result = await projectDaoImp.addProjectDepartments(projectId, departments)
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
 * 删除项目责任单位
 * @param 项目id, 所属责任单位id列表
 * @return
 */
const deleteProjectDepartments = async function (ctx) {
  let projectId = ctx.request.body.id
  let departments = ctx.request.body.departments
  logger.debug('deleteProjectDepartments...', projectId, departments)
  let result = await projectDaoImp.deleteProjectDepartments(projectId, departments)
  if (result) {
    logger.debug('deleteProjectDepartments result...', result)
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
 * 确认项目责任单位
 * @param project_id（项目id）, department_id（所属责任单位id）
 * @return
 */
//todo 对于成功， 应该要返回提示成功
const confirmProjectDepartment = async function (ctx) {
  let reqData = ctx.request.body
  let result = await projectDaoImp.confirmProjectDepartment(reqData.project_id, reqData.department_id)
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
 * 获取项目巡查记录个数
 * @param  project_id(项目id), state(是否已确认)
 * @return 项目个数 total
 */
const getInspectionCount = async function (ctx) {
  let reqData = ctx.request.body
  let params = {
    projectId: reqData.project_id,
    state: reqData.state
  }
  let result = await projectDaoImp.getInspectionCount(params)
  if (result && result.length > 0) {
    ctx.body = {
      ret: 0,
      data: result[0]
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

/**
 * 获取项目巡查记录列表
 * @param {page_size, page, project_id, state}
 * @return 项目巡查记录列表 {id, matters, issues, created_time, inspect_time, files{id, inspect_id, name, url, type}}
 */
const getInspectionList = async function (ctx) {
  let reqData = ctx.request.body
  let params = {
    pageSize: reqData.page_size,
    pageNum: reqData.page,
    projectId: reqData.project_id,
    state: reqData.state
  }
  let result = await projectDaoImp.getInspectionList(params)
  if (!result) {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
    return
  }

  let inspectIds = []
  for (let item of result) {
    inspectIds.push(item.id)
  }
  let resFile = await projectDaoImp.getInspectionFiles(inspectIds)
  if (resFile && resFile.length > 0) {
    for (let item of result) {
      if (resFile[item.id]) {
        item.files = resFile[item.id]
      }
    }
  }

  ctx.body = {
    ret: 0,
    data: result
  }
}

/**
 * 添加项目巡查
 * @param {project_id, matters, issues}
 * @return 记录id
 */
const addInspection = async function (ctx) {
  let reqData = ctx.request.body
  const result = await projectDaoImp.addInspection({
    projectId: reqData.project_id,
    matters: reqData.matters,
    issues: reqData.issues
  })
  logger.debug('addInspection...', result)
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
 * 完成项目巡查
 * @param {id 项目巡查id, department_id 责任单位id}
 * @return 1
 */
const completeInspection = async function (ctx) {
  let reqData = ctx.request.body
  let result = await projectDaoImp.completeInspection({
    inspectionId: reqData.id,
    departmentId: reqData.department_id
  })
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
 * 添加项目巡查记录附件
 * @param {inspection_id, name, type, url}
 * @return 记录id
 */
const addInspectionFile = async function (ctx) {
  let reqData = ctx.request.body
  let file = {
    inspection_id: reqData.inspection_id,
    name: reqData.name,
    type: reqData.type,
    url: reqData.url
  }
  let result = await projectDaoImp.addInspectionFile(file)
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
 * 删除项目巡查记录附件
 * @param {inspection_id, name}
 * @return 1
 */
const deleteInspectionFile = async function (ctx) {
  let reqData = ctx.request.body
  let file = {
    inspection_id: reqData.inspection_id,
    name: reqData.name
  }
  let result = await projectDaoImp.deleteInspectionFile(file)
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

// 初始化项目的生命周期
const initProjectLifecycle = async function (projectId, enginType) {
  let lifecycleItems = await getLifecycleTemplate(enginType)
  if (!lifecycleItems || lifecycleItems.length <= 0) return null
  let result = await projectDaoImp.initProjectLifecycle(projectId, lifecycleItems)
  return result
}

// 获取项目生命周期模板
const getLifecycleTemplate = async function (enginType) {
  let key = redisKey.REDIS_K_LIFECYCLE_T + '_' + enginType
  let result = await redisCache.get(key)
  if (result) {
    result = JSON.parse(result)
    logger.debug('getLifecycleTemplate from redis =>', result)
  } else {
    result = await projectDaoImp.getLifecycleTemplate(enginType)
    logger.debug('getLifecycleTemplate from db =>', result)
    if (result) {
      redisCache.set(key, JSON.stringify(result))
    }
  }
  return result
}

/**
 * 获取项目生命周期
 * @param projectId
 * @return current_stage
 *         stages [{idx, title, current_step, state,
 *                 steps [{idx, title, type, link_type, link_tips, file_name, file_path, file_type, opinion_tips, opinion, state, created_time, updated_time, file_updated_time}]}]
 */
const getProjectLifecycle = async function (ctx) {
  let projectId = ctx.query.id
  let result = await projectDaoImp.getProjectLifecycle(projectId)
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
 * 项目生命周期状态更新
 * @param project_id, stage_idx, step_idx
 * @return 1
 */
const updateProjectState = async function (ctx) {
  let reqData = ctx.request.body
  let result = null

  let res = await projectDaoImp.getCurrentProjectLifecycle(reqData.project_id)
  if (!res || res.length <= 0) {
    logger.error('updateProjectState error... no current step')
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
    return
  }
  let currentStep = res[0]
  if (currentStep.stage_idx !== reqData.stage_idx ||
    currentStep.step_idx !== reqData.step_idx) {
    logger.error('updateProjectState error, wrong param...', reqData.stage_idx, reqData.step_idx)
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
    return
  }

  let resUpdateLifecycle = await projectDaoImp.updateLifecycle({
    id: currentStep.id,
    state: ProjectLifecycle.STATE_DONE,
    opinion: reqData.opinion
  })
  if (!resUpdateLifecycle) {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
    return
  }

  res = await projectDaoImp.getCurrentProjectLifecycle(reqData.project_id)
  if (!res || res.length <= 0) {
    //已竣工
    result = await projectDaoImp.completeProject(reqData.project_id)
  } else {
    let newCurrentStep = res[0]
    result = await projectDaoImp.updateLifecycle({id: newCurrentStep.id, state: ProjectLifecycle.STATE_DOING})

    let startProject = ((currentStep.type & ProjectLifecycle.TYPE_FLAG_START_PROJ) === ProjectLifecycle.TYPE_FLAG_START_PROJ)
    if (startProject) {
      // 开始施工
      result = await projectDaoImp.startProject(reqData.project_id)
    }
  }

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
 * 获取可更新状态项目个数
 * @param
 * @return total
 */
const getProjectNewStatusCount = async function (ctx) {
  let result = await projectDaoImp.getProjectNewStatusCount()
  if (result) {
    ctx.body = {
      ret: 0,
      data: result[0]
    }
  } else {
    ctx.body = {
      ret: -1,
      msg: errorMsg.ERR_MSG_UNKNOWN
    }
  }
}

export default {
  getProjectCount,
  getProjectList,
  getProjectInfo,
  getProjectDetailInfo,
  getProjectCoordinates,
  saveProjectCoordinates,
  deleteProjectCoordinates,
  getProjectApprovalFiles,
  addProjectApprovalFile,
  addProjectApprovalFiles,
  deleteProjectApprovalFile,
  getProjectExternalFiles,
  getProjectOpinions,
  saveProject,
  getSubProjects,
  saveSubProjects,
  deleteSubProjects,
  getProjectDepartments,
  addProjectDepartments,
  deleteProjectDepartments,
  confirmProjectDepartment,
  getInspectionCount,
  getInspectionList,
  addInspection,
  completeInspection,
  addInspectionFile,
  deleteInspectionFile,
  getProjectLifecycle,
  updateProjectState,
  getProjectNewStatusCount
}
