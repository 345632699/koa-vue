/**
 * 项目管理
 */
'use strict'
import {logger} from '../utils/logger_util'
import {ProjectSql,
  Project,
  ProjectDepartment,
  ProjectCoordinate,
  ProjectApprovalFile,
  SubProject,
  ProjectLifecycle,
  ProjectInspection,
  ProjectInspectionFile} from './sql/projectSql'
// const commonSql = require('./commonSql.).commonSql
const commonSql = require('./sql').commonSql
const commonDao = require('./commonDao')

export default class ProjectDao {
  /**
   * 获取项目个数
   * @param {regionId 区域id, departmentId 部门id, projectType 项目类型, searchWord 查询字段, createdStartTime 开始时间, createdEndTime 结束时间}
   * @return 项目个数 total
   */
  async getProjectCount ({regionId, departmentId, projectType, searchWord, createdStartTime, createdEndTime}) {
    try {
      let strSql = ProjectSql.getProjectCount({
        regionId: regionId,
        departmentId: departmentId,
        projectType: projectType,
        createdStartTime: createdStartTime,
        createdEndTime: createdEndTime,
        searchWord: searchWord
      })
      logger.debug('getProjectCount sql...', strSql)
      const result = await commonDao.select(strSql)
      return (result && result.length > 0) ? result : null
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目列表
   * @param
   * { pageSize 每页个数, pageNum 第几页,
   * regionId 区域id, departmentId 部门id,
   * projectType 项目类型, searchWord 查询字段,
   * createdStartTime 开始时间, createdEndTime 结束时间 }
   * @return 项目列表 {id,sn,name,
   * region_id,region_name,project_type,project_type_name,engineering,engineering_name,
   * project_detail,sponge_detail,
   * project_area,sponge_area,
   * executant,operate_type,
   * contact_name,contact_phone,
   * investment,investment_local,investment_sponge,
   * start_time,end_time,
   * created_department,created_time}
   */
  async getProjectList ({pageSize, pageNum, regionId, departmentId, projectType, searchWord, createdStartTime, createdEndTime}) {
    try {
      let limits = ''
      if (pageSize && pageNum) {
        limits = `${pageSize * (pageNum - 1)},${pageSize}`
      } else {
        limits = '0,10' // 默认抓取前10条记录
      }
      let strSql = ProjectSql.getProjectList({
        regionId: regionId,
        departmentId: departmentId,
        projectType: projectType,
        createdStartTime: createdStartTime,
        createdEndTime: createdEndTime,
        searchWord: searchWord,
        limits: limits
      })
      logger.debug('getProjectList sql...', strSql)
      let result = await commonDao.select(strSql)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目基本信息
   * @param 项目id
   * @return 项目基本信息 {id,sn,name,
   * region_id,region_name,project_type,project_type_name,engineering,engineering_name,
   * project_detail,sponge_detail,
   * project_area,sponge_area,
   * executant,operate_type,
   * contact_name,contact_phone,
   * investment,investment_local,investment_sponge,
   * start_time,end_time,
   * created_department,created_time}
   */
  async getProjectInfo (idValue) {
    try {
      let fields = {
        id: Project.FIELD_ID,
        sn: Project.FIELD_SN,
        name: Project.FIELD_NAME,
        region_id: Project.FIELD_REGION_ID,
        region_name: Project.FIELD_REGION_NAME,
        project_type: Project.FIELD_PROJ_TYPE,
        project_type_name: Project.FIELD_PROJ_TYPE_NAME,
        engineering: Project.FIELD_ENGIN_TYPE,
        engineering_name: Project.FIELD_ENGIN_TYPE_NAME,
        project_detail: Project.FIELD_PROJ_DETAIL,
        sponge_detail: Project.FIELD_SPONGE_DETAIL,
        project_area: Project.FIELD_PROJ_AREA,
        sponge_area: Project.FIELD_SPONGE_AREA,
        executant: Project.FIELD_EXECUTANT,
        operate_type: Project.FIELD_OPERATE_TYPE,
        contact_name: Project.FIELD_CONTACT_NAME,
        contact_phone: Project.FIELD_CONTACT_PHONE,
        investment: Project.FIELD_INVESTMENT,
        investment_local: Project.FIELD_INVEST_LOCAL,
        investment_social: Project.FIELD_INVEST_SOCIAL,
        investment_sponge: Project.FIELD_INVEST_SPONGE,
        start_time: `DATE_FORMAT(${Project.FIELD_START_TIME}, '%Y-%m-%d')`,
        end_time: `DATE_FORMAT(${Project.FIELD_END_TIME}, '%Y-%m-%d')`,
        created_department: Project.FIELD_CREATED_DEPARTMENT,
        created_time: `DATE_FORMAT(${Project.FIELD_CREATED_TIME}, '%Y-%m-%d')`
      }
      let result = await commonDao.select(commonSql.getRecords(Project.TABLE, fields, {id: idValue}))
      return (result && result.length > 0) ? result : null
    } catch (err) {
      return null
    }
  }

  /**
 * 添加项目
 * @param {type} obj
 * @returns 记录的id
 */
  async addProject (obj) {
    try {
      let res = await commonDao.insert(commonSql.insert(Project.TABLE), obj, false)
      return res
    } catch (err) {
      return null
    }
  }

  /**
 *  更新项目
 * @param {type} obj
 * @returns 成功更新的记录数
 */
  async updateProject (id, obj) {
    try {
      let res = null
      if (id) {
        res = await commonDao.update(commonSql.update(Project.TABLE, {id: id}), obj, false)
      }
      return res
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目所属责任单位列表
   * @param 项目id
   * @return 项目所属责任单位列表 {department_id, state(0-未确认 1-已确认)}
   */
  async getProjectDepartments (projectId) {
    try {
      let fields = [ProjectDepartment.FIELD_DEPART_ID,
        ProjectDepartment.FIELD_STATE
      ]
      let params = {}
      params[ProjectDepartment.FIELD_PROJ_ID] = projectId
      const result = await commonDao.select(commonSql.getRecords(ProjectDepartment.TABLE, fields, params))
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目所属责任单位列表
   * @param 项目id列表
   * @return 项目所属责任单位列表map {department_id, state(0-未确认 1-已确认)}, key值为projectId
   */
  async getMultiProjectDepartments (projectIds) {
    try {
      let strSql = ProjectSql.getMultiProjectDepartments(projectIds)
      let result = {}
      let res = await commonDao.select(strSql)
      for (let item of res) {
        if (!result[item.project_id]) {
          result[item.project_id] = []
        }
        result[item.project_id].push(item)
      }
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 添加项目责任单位
   * @param 项目id, 所属责任单位id列表
   * @return
   */
  async addProjectDepartments (projectId, departments) {
    try {
      let result = []
      for (let departmentId of departments) {
        let item = {}
        item[ProjectDepartment.FIELD_PROJ_ID] = projectId
        item[ProjectDepartment.FIELD_DEPART_ID] = departmentId
        item[ProjectDepartment.FIELD_STATE] = 0
        await commonDao.insert(commonSql.insert(ProjectDepartment.TABLE), item, false)
        result.push(departmentId)
      }
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 删除项目责任单位
   * @param 项目id, 所属责任单位id列表
   * @return
   */
  async deleteProjectDepartments (projectId, departmentIds) {
    try {
      let strSql = ProjectSql.deleteProjectDepartments(projectId, departmentIds)
      const result = await commonDao.delete(strSql)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 确认项目责任单位
   * @param 项目id, 所属责任单位id
   * @return
   */
  async confirmProjectDepartment (projectId, departmentId) {
    try {
      let strSql = ProjectSql.confirmProjectDepartment(projectId, departmentId)
      const result = await commonDao.update(strSql, null, false)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目地块坐标
   * @param 项目id
   * @return 项目地块坐标列表 {id, idx, inflection, longitude, latitude, circle}
   */
  async getProjectCoordinates (projectId) {
    try {
      let fields = [ProjectCoordinate.FIELD_ID,
        ProjectCoordinate.FIELD_IDX,
        ProjectCoordinate.FIELD_INFLECTION,
        ProjectCoordinate.FIELD_LONGITUDE,
        ProjectCoordinate.FIELD_LATITUDE,
        ProjectCoordinate.FIELD_CIRCLE
      ]
      let params = {}
      params[ProjectCoordinate.FIELD_PROJ_ID] = projectId
      let selectSql = commonSql.getRecords(ProjectCoordinate.TABLE, fields, params)
      logger.debug('getProjectCoordinates...', selectSql)
      const result = await commonDao.select(selectSql)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 保存项目地块坐标(修改/新增)
   * @param 项目id, 项目地块坐标列表 {id(可选), idx, inflection, longitude, latitude, circle}
   * @return id（新增项）或1（修改项）
   */
  async saveProjectCoordinates (projectId, coordinates) {
    try {
      let result = []
      let res = null
      for (let item of coordinates) {
        let record = {}
        record[ProjectCoordinate.FIELD_PROJ_ID] = projectId
        record[ProjectCoordinate.FIELD_INFLECTION] = item.inflection
        record[ProjectCoordinate.FIELD_LONGITUDE] = item.longitude
        record[ProjectCoordinate.FIELD_LATITUDE] = item.latitude
        record[ProjectCoordinate.FIELD_CIRCLE] = item.circle
        if (item.id) res = await commonDao.update(commonSql.update(ProjectCoordinate.TABLE, {id: item.id}), record, false)
        else res = await commonDao.insert(commonSql.insert(ProjectCoordinate.TABLE), record, false)
        result.push(res)
      }
      logger.debug('saveProjectCoordinates result ...', result)
      return result
    } catch (err) {
      logger.error('saveProjectCoordinates err...', err)
      return null
    }
  }

  /**
   * 删除项目地块坐标
   * @param 项目地块坐标id列表
   * @return 已删除记录个数
   */
  async deleteProjectCoordinates (ids) {
    try {
      let strIDs = ''
      for (let id of ids) {
        if (strIDs) strIDs += ','
        strIDs += id
      }
      const result = await commonDao.delete(commonSql.delete(ProjectCoordinate.TABLE, strIDs))
      logger.debug('deleteProjectCoordinates result ...', result)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目投资批复文件
   * @param 项目id
   * @return 项目投资批复文件列表{name, url, type}
   */
  async getProjectApprovalFiles (projectId) {
    try {
      let fields = [ProjectApprovalFile.FIELD_NAME,
        ProjectApprovalFile.FIELD_URL,
        ProjectApprovalFile.FIELD_TYPE
      ]
      let params = {}
      params[ProjectApprovalFile.FIELD_PROJ_ID] = projectId
      const result = await commonDao.select(commonSql.getRecords(ProjectApprovalFile.TABLE, fields, params))
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 新增单个项目投资批复文件
   * @param {projectId, name, url, type}
   * @return 记录id
   */
  async addProjectApprovalFile ({projectId, name, type, url}) {
    try {
      let record = {}
      record[ProjectApprovalFile.FIELD_PROJ_ID] = projectId
      record[ProjectApprovalFile.FIELD_NAME] = name
      record[ProjectApprovalFile.FIELD_URL] = url
      record[ProjectApprovalFile.FIELD_TYPE] = type
      const result = await commonDao.insert(commonSql.insert(ProjectApprovalFile.TABLE), record, false)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 新增多个项目投资批复文件
   * @param 项目id, 项目投资批复文件列表 {name, url, type}
   * @return id 列表
   */
  async addProjectApprovalFiles ({projectId, approvalFiles}) {
    try {
      let result = []
      for (let item of approvalFiles) {
        let record = {}
        record[ProjectApprovalFile.FIELD_PROJ_ID] = projectId
        record[ProjectApprovalFile.FIELD_NAME] = item.name
        record[ProjectApprovalFile.FIELD_URL] = item.url
        record[ProjectApprovalFile.FIELD_TYPE] = item.type
        let res = await commonDao.insert(commonSql.insert(ProjectApprovalFile.TABLE), record, false)
        result.push(res)
      }
      logger.debug('addProjectApprovalFiles result ...', result)
      return result
    } catch (err) {
      logger.error('addProjectApprovalFiles err...', err)
      return null
    }
  }

  /**
   * 删除项目投资批复文件
   * @param {project_id, name}
   * @return 已删除记录个数
   */
  async deleteProjectApprovalFile ({projectId, name}) {
    try {
      let conditions = {}
      conditions[ProjectApprovalFile.FIELD_PROJ_ID] = projectId
      conditions[ProjectApprovalFile.FIELD_NAME] = name
      let strSql = commonSql.deleteBy(ProjectApprovalFile.TABLE, conditions)
      const result = await commonDao.delete(strSql)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目外部附件
   * @param 项目id
   * @return 项目外部附件列表 {file_name, file_path, file_updated_time}
   */
  async getProjectExternalFiles (projectId) {
    try {
      const result = await commonDao.select(ProjectSql.getExternalFile(projectId))
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目评审意见
   * @param 项目id
   * @return 项目评审意见列表 {title, opinion}
   */
  async getProjectOpinions (projectId) {
    try {
      const result = await commonDao.select(ProjectSql.getProjectOpinions(projectId))
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取子项目列表
   * @param 父项目id
   * @return 子项目列表 {id, name, project_type, progress, project_detail, sponge_detail, project_area, sponge_area, created_time}
   */
  async getSubProjects (projectId) {
    try {
      const result = await commonDao.select(ProjectSql.getSubProjects(projectId))
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 保存子项目(修改/新增)
   * @param 项目id, 子项目列表 {id(可选), name, project_type, project_detail, sponge_detail, project_area, sponge_area}
   * @return id（新增项）或1（修改项）
   */
  async saveSubProjects (projectId, subProjects) {
    try {
      let result = []
      let res = null
      for (let item of subProjects) {
        let record = {}
        record[SubProject.FIELD_NAME] = item.name
        record[SubProject.FIELD_PARENT_ID] = projectId
        record[SubProject.FIELD_PROJ_TYPE] = item.project_type
        record[SubProject.FIELD_PROJ_DETAIL] = item.project_detail
        record[SubProject.FIELD_SPONGE_DETAIL] = item.sponge_detail
        record[SubProject.FIELD_PROJ_AREA] = item.project_area
        record[SubProject.FIELD_SPONGE_AREA] = item.sponge_area
        if (item.id) res = await commonDao.update(commonSql.update(SubProject.TABLE, {id: item.id}), record, false)
        else res = await commonDao.insert(commonSql.insert(SubProject.TABLE), record, false)
        result.push(res)
      }
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 删除多个子项目
   * @param 子项目id列表
   * @return 已删除记录个数
   */
  async deleteSubProjects (ids) {
    try {
      let strIDs = ''
      for (let id of ids) {
        if (strIDs) strIDs += ','
        strIDs += id
      }
      const result = commonDao.delete(commonSql.delete(SubProject.TABLE, strIDs))
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目巡查记录个数
   * @param  projectId(项目id), state(是否已确认)
   * @return 项目个数 total
   */
  async getInspectionCount ({projectId, state}) {
    try {
      let strSql = ProjectSql.getInspectionCount({projectId: projectId, state: state})
      const result = await commonDao.select(strSql)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目巡查记录列表
   * @param {pageSize, pageNum, projectId, state}
   * @return 项目巡查记录列表 {id, matters, issues, created_time, inspect_time}
   */
  async getInspectionList ({pageSize, pageNum, projectId, state}) {
    try {
      let limit = null
      if (pageSize && pageNum) {
        let start = (pageNum - 1) * pageSize
        limit = `${start},${pageSize}`
      }
      let strSql = ProjectSql.getInspectionList({projectId: projectId, state: state, limit: limit})
      const result = await commonDao.select(strSql)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 获取项目巡查记录附件列表
   * @param  inspectIds 巡查记录Id列表
   * @return 附件列表map,key值为巡查记录的id
   */
  async getInspectionFiles (inspectIds) {
    try {
      let strSql = ProjectSql.getInspectionFiles(inspectIds)
      if (!strSql) {
        return null
      }
      let res = await commonDao.select(strSql)
      let result = []
      for (let item of res) {
        if (result[item.inspect_id]) result[item.inspect_id].push(item)
        else result[item.inspect_id] = [item]
      }
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 添加项目巡查
   * @param {projectId, matters, issues}
   * @return 记录id
   */
  async addInspection ({projectId, matters, issues}) {
    try {
      let item = {}
      item[ProjectInspection.FIELD_PROJ_ID] = projectId
      item[ProjectInspection.FIELD_MATTERS] = matters
      item[ProjectInspection.FIELD_ISSUES] = issues
      const result = await commonDao.insert(commonSql.insert(ProjectInspection.TABLE), item, false)
      return result
    } catch (err) {
      return null
    }
  }

  /**
 * 完成项目巡查
 * @param {inspectionId 项目巡查id, departmentId 责任单位id}
 * @return 1
 */
  async completeInspection ({inspectionId, departmentId}) {
    try {
      let strSql = ProjectSql.completeInspection(inspectionId, departmentId)
      const result = await commonDao.update(strSql, null, false)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 添加项目巡查记录附件
   * @param file:{inspection_id, name, type, url}
   * @return 记录id
   */
  async addInspectionFile (file) {
    try {
      let item = {}
      item[ProjectInspectionFile.FIELD_INSPECT_ID] = file.inspection_id
      item[ProjectInspectionFile.FIELD_NAME] = file.name
      item[ProjectInspectionFile.FIELD_TYPE] = file.type
      item[ProjectInspectionFile.FIELD_URL] = file.url
      const result = await commonDao.insert(commonSql.insert(ProjectInspectionFile.TABLE), item, false)
      return result
    } catch (err) {
      return null
    }
  }

  /**
   * 删除项目巡查记录附件
   * @param file:{inspection_id, name}
   * @return 1
   */
  async deleteInspectionFile (file) {
    try {
      let conditions = {}
      conditions[ProjectInspectionFile.FIELD_INSPECT_ID] = file.inspection_id
      conditions[ProjectInspectionFile.FIELD_NAME] = file.name
      let strSql = commonSql.deleteBy(ProjectInspectionFile.TABLE, conditions)
      const result = commonDao.delete(strSql)
      return result
    } catch (err) {
      return null
    }
  }

  async initProjectLifecycle (projectId, lifecycleItems) {
    try {
      let res = null
      for (let item of lifecycleItems) {
        let obj = {}
        obj[ProjectLifecycle.FIELD_PROJ_ID] = projectId
        obj[ProjectLifecycle.FIELD_STAGE_IDX] = item.stage_idx
        obj[ProjectLifecycle.FIELD_STAGE_TITLE] = item.stage_title
        obj[ProjectLifecycle.FIELD_STEP_IDX] = item.step_idx
        obj[ProjectLifecycle.FIELD_TYPE] = item.type
        obj[ProjectLifecycle.FIELD_TITLE] = item.title
        obj[ProjectLifecycle.FIELD_LINK_TIPS] = item.link_tips
        obj[ProjectLifecycle.FIELD_LINK_TYPE] = item.link_type
        obj[ProjectLifecycle.FIELD_OPINION_TIPS] = item.opinion_tips
        if (item.stage_idx === 1 && item.step_idx === 1) {
          obj[ProjectLifecycle.FIELD_STATE] = ProjectLifecycle.STATE_DOING
        }
        res = await commonDao.insert(commonSql.insert(ProjectLifecycle.TABLE), obj, false)
        if (!res) break
      }
      return res
    } catch (err) {
      return null
    }
  }

  async getLifecycleTemplate (enginType) {
    try {
      let strSql = ProjectSql.getLifecycleTemplate(enginType)
      const result = await commonDao.select(strSql)
      return result.length > 0 ? result : null
    } catch (err) {
      return null
    }
  }
  
  /**
   * 获取项目生命周期
   * @param projectId
   * @return current_stage
   *         stages [{idx, title, current_step, state,
   *                 steps [{idx, title, type, link_type, link_tips, file_name, file_path, file_type, opinion_tips, opinion, state, created_time, updated_time, file_updated_time}]}]
   */
  async getProjectLifecycle (projectId) {
    try {
      let result = {}
      let currentStage = null
      let stages = []
      let res = await commonDao.select(ProjectSql.getProjectLifecycle(projectId))
      for (let item of res) {
        if (!result[item.stage_idx]) {
          result[item.stage_idx] = {
            idx: item.stage_idx,
            title: item.stage_title,
            current_step: null, // 当前步骤
            state: null, // 0-默认 1-已完成
            steps: []
          }
        }
        result[item.stage_idx].steps.push({
          idx: item.step_idx,
          title: item.title,
          type: item.type,
          link_tips: item.link_tips,
          link_type: item.link_type,
          file_name: item.file_name,
          file_path: item.file_path,
          file_type: item.file_type,
          opinion_tips: item.opinion_tips,
          opinion: item.opinion,
          state: item.state,
          created_time: item.created_time,
          updated_time: item.updated_time,
          file_updated_time: item.file_updated_time
        })
      }
      logger.debug('getProjectLifecycle result...', JSON.stringify(result))
      for (let idx in result) {
        let stage = result[idx]
        if (stage.steps) {
          for (let stepIdx in stage.steps) {
            if (stage.steps[stepIdx].state !== 1) {
              stage.current_step = parseInt(stepIdx, 10) + 1
              break
            }
          }
        }
        if (!stage.current_step) {
          stage.current_step = stage.steps.length
          stage.state = ProjectLifecycle.STATE_DONE
        } else if (!currentStage) {
          currentStage = parseInt(idx, 10)
          stage.state = ProjectLifecycle.STATE_DOING
        } else {
          stage.state = ProjectLifecycle.STATE_NONE
        }
        stages.push(stage)
      }
      if (!currentStage) currentStage = stages.length
      logger.info('getProjectLifecycle stages...', JSON.stringify(stages))
      return {
        current_stage: currentStage,
        stages: stages
      }
    } catch (err) {
      return null
    }
  }

  // 获取单个项目生命周期当前步骤
  async getCurrentProjectLifecycle (projectId) {
    try {
      let res = await commonDao.select(ProjectSql.getCurrentProjectLifecycle(projectId))
      return res
    } catch (err) {
      return null
    }
  }

  // 获取多个项目生命周期当前步骤
  async getMultiCurrentProjectLifecycles (projectIds) {
    try {
      let res = await commonDao.select(ProjectSql.getMultiCurrentProjectLifecycles(projectIds))
      return res
    } catch (err) {
      return null
    }
  }

  // 更新项目生命周期
  async updateLifecycle ({id, state, opinion}) {
    try {
      let obj = {}
      obj[ProjectLifecycle.FIELD_STATE] = state
      if (opinion) {
        obj[ProjectLifecycle.FIELD_OPINION] = opinion
      }
      let strSql = ProjectSql.updateLifecycle(id)
      let res = await commonDao.update(strSql, obj, false)
      return res
    } catch (err) {
      return null
    }
  }

  // 项目开始施工
  async startProject (id) {
    try {
      let strSql = ProjectSql.startProject(id)
      let res = await commonDao.update(strSql, null, false)
      return res
    } catch (err) {
      return null
    }
  }

  // 项目竣工
  async completeProject (id) {
    try {
      let strSql = ProjectSql.completeProject(id)
      let res = await commonDao.update(strSql, null, false)
      return res
    } catch (err) {
      return null
    }
  }

  /**
   * 获取可更新状态项目个数
   * @param
   * @return total
   */
  async getProjectNewStatusCount () {
    const result = await commonDao.select(ProjectSql.getProjectNewStatusCount())
    return (result && result.length > 0) ? result : null
  }
}
