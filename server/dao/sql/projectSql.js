/**
 * 项目管理sql语句
 */
'use strict'

// 项目主表
const Project = {
  TABLE: 'sp_project',
  FIELD_ID: 'id',
  FIELD_SN: 'sn',
  FIELD_NAME: 'name',
  FIELD_REGION_ID: 'region_id',
  FIELD_REGION_NAME: 'region_name',
  FIELD_PROJ_TYPE: 'proj_type',
  FIELD_PROJ_TYPE_NAME: 'proj_type_name',
  FIELD_ENGIN_TYPE: 'engin_type',
  FIELD_ENGIN_TYPE_NAME: 'engin_type_name',
  FIELD_PROJ_DETAIL: 'project_detail',
  FIELD_SPONGE_DETAIL: 'sponge_detail',
  FIELD_PROJ_AREA: 'project_area',
  FIELD_SPONGE_AREA: 'sponge_area',
  FIELD_EXECUTANT: 'executant',
  FIELD_OPERATE_TYPE: 'operate_type',
  FIELD_CONTACT_NAME: 'contact_name',
  FIELD_CONTACT_PHONE: 'contact_phone',
  FIELD_INVESTMENT: 'investment',
  FIELD_INVEST_LOCAL: 'investment_local',
  FIELD_INVEST_SOCIAL: 'investment_social',
  FIELD_INVEST_SPONGE: 'investment_sponge',
  FIELD_START_TIME: 'start_time',
  FIELD_END_TIME: 'end_time',
  FIELD_CREATED_DEPARTMENT: 'created_department',
  FIELD_CREATED_TIME: 'created_time'
}

// 项目责任单位表
const ProjectDepartment = {
  TABLE: 'sp_proj_department',
  FIELD_PROJ_ID: 'project_id',
  FIELD_DEPART_ID: 'department_id',
  FIELD_STATE: 'state',

  // state可选值
  STATE_NONE: 0,
  STATE_DONE: 1
}

// 项目坐标表
const ProjectCoordinate = {
  TABLE: 'sp_proj_coordinate',
  FIELD_ID: 'id',
  FIELD_PROJ_ID: 'project_id',
  FIELD_IDX: 'idx',
  FIELD_INFLECTION: 'inflection',
  FIELD_LONGITUDE: 'longitude',
  FIELD_LATITUDE: 'latitude',
  FIELD_CIRCLE: 'circle'
}

// 项目投资批复文件表
const ProjectApprovalFile = {
  TABLE: 'sp_proj_approval_file',
  FIELD_ID: 'id',
  FIELD_PROJ_ID: 'project_id',
  FIELD_NAME: 'name',
  FIELD_URL: 'url',
  FIELD_TYPE: 'type',
  FIELD_STATUS: 'status',
  FIELD_CREATED_TIME: 'created_time'
}

// 子项目表
const SubProject = {
  TABLE: 'sp_sub_project',
  FIELD_ID: 'id',
  FIELD_PARENT_ID: 'parent_id',
  FIELD_NAME: 'name',
  FIELD_PROJ_TYPE: 'project_type',
  FIELD_PROGRESS: 'progress',
  FIELD_PROJ_DETAIL: 'project_detail',
  FIELD_SPONGE_DETAIL: 'sponge_detail',
  FIELD_PROJ_AREA: 'project_area',
  FIELD_SPONGE_AREA: 'sponge_area',
  FIELD_CREATED_TIME: 'created_time'
}

// 项目生命周期表
const ProjectLifecycle = {
  TABLE: 'sp_proj_life_cycle',
  FIELD_ID: 'id',
  FIELD_PROJ_ID: 'project_id',
  FIELD_STAGE_IDX: 'stage_idx',
  FIELD_STAGE_TITLE: 'stage_title',
  FIELD_STEP_IDX: 'step_idx',
  FIELD_TITLE: 'title',
  FIELD_TYPE: 'type',
  FIELD_LINK_TIPS: 'link_tips',
  FIELD_LINK_TYPE: 'link_type',
  FIELD_FILE_NAME: 'file_name',
  FIELD_FILE_PATH: 'file_path',
  FIELD_FILE_TYPE: 'file_type',
  FIELD_OPINION_TIPS: 'opinion_tips',
  FIELD_OPINION: 'opinion',
  FIELD_STATE: 'state',
  FIELD_CREATED_TIME: 'created_time',
  FIELD_UPDATED_TIME: 'updated_time',
  FIELD_FILE_UPDATED_TIME: 'file_updated_time',

  // state可选值
  STATE_NONE: 0,
  STATE_DONE: 1,
  STATE_DOING: 2,

  // type的flag
  TYPE_FLAG_DEPARTMENT: 1,
  TYPE_FLAG_LINK: 2,
  TYPE_FLAG_OPINION: 4,
  TYPE_FLAG_START_PROJ: 8,
  TYPE_FLAG_END_PROJ: 16,

  // link_type的可选值
  LINK_TYPE_FILE: 1,
  LINK_TYPE_PROJ_INFO: 2
}

// 项目巡查表
const ProjectInspection = {
  TABLE: 'sp_proj_inspection',
  FIELD_ID: 'id',
  FIELD_PROJ_ID: 'project_id',
  FIELD_INSPECT_TIME: 'inspect_time',
  FIELD_CREATED_TIME: 'created_time',
  FIELD_MATTERS: 'matters',
  FIELD_ISSUES: 'issues',
  FIELD_STATE: 'state',

  // state可选值
  STATE_NONE: 0,
  STATE_DONE: 1
}

// 项目巡查附件表
const ProjectInspectionFile = {
  TABLE: 'sp_proj_inspection_file',
  FIELD_ID: 'id',
  FIELD_INSPECT_ID: 'inspect_id',
  FIELD_NAME: 'name',
  FIELD_URL: 'url',
  FIELD_TYPE: 'type',
  FIELD_STATUS: 'status',
  FIELD_CREATED_TIME: 'created_time'
}

// 海绵设备表
const ProjectDevice = {
  TABLE: 'sp_proj_device'
}

// 监控设备表
const ProjectMonitor = {
  TABLE: 'sp_proj_monitor'
}

// 项目物理绩效评估日志表
const ProjectEvalLog = {
  TABLE: 'sp_proj_evaluation_logs'
}

// 项目数据文件表
const ProjectDataFile = {
  TABLE: 'sp_proj_data_file'
}

const ProjectSql = {
  getProjectCount: function ({regionId,
    departmentId,
    projectType,
    createdStartTime,
    createdEndTime,
    searchWord}) {
    let sql = ''
    let sqlConditions = ''
    let prefix = ''
    if (departmentId) {
      prefix = `${Project.TABLE}.`
    }
    if (regionId) {
      sqlConditions += `${prefix}${Project.FIELD_REGION_ID}=${regionId}`
    }
    if (projectType) {
      if (sqlConditions) sqlConditions += ' AND '
      sqlConditions += `${prefix}${Project.FIELD_PROJ_TYPE}=${projectType}`
    }
    if (createdStartTime && createdEndTime) {
      if (sqlConditions) sqlConditions += ' AND '
      sqlConditions += `UNIX_TIMESTAMP(${prefix}${Project.FIELD_CREATED_TIME})>=${createdStartTime} 
      AND UNIX_TIMESTAMP(${prefix}${Project.FIELD_CREATED_TIME})<=${createdEndTime}`
    }
    if (searchWord) {
      if (sqlConditions) sqlConditions += ' AND '
      sqlConditions += `(${prefix}${Project.FIELD_SN} LIKE '%${searchWord}%' OR ${prefix}${Project.FIELD_NAME} LIKE '%${searchWord}%')`
    }
    if (departmentId) {
      if (sqlConditions) sqlConditions += ' AND '
      sqlConditions += `${ProjectDepartment.TABLE}.${ProjectDepartment.FIELD_DEPART_ID}=${departmentId}`
    }
    if (sqlConditions) {
      sqlConditions = `WHERE ${sqlConditions}`
    }

    if (departmentId) { // 联表查询
      sql = `SELECT count(*) as total FROM ${Project.TABLE} LEFT JOIN ${ProjectDepartment.TABLE} 
            ON ${Project.TABLE}.${Project.FIELD_ID}=${ProjectDepartment.TABLE}.${ProjectDepartment.FIELD_PROJ_ID} ${sqlConditions}`
    } else { // 单表查询
      sql = `SELECT count(*) as total FROM ${Project.TABLE} ${sqlConditions}`
    }
    return sql
  },

  getProjectList: function ({
    regionId,
    departmentId,
    projectType,
    createdStartTime,
    createdEndTime,
    searchWord,
    limits}) {
    let sql = ''
    let fields = {
      id: `${Project.TABLE}.${Project.FIELD_ID}`,
      sn: Project.FIELD_SN,
      name: `${Project.TABLE}.${Project.FIELD_NAME}`,
      region_id: Project.FIELD_REGION_ID,
      region_name: Project.FIELD_REGION_NAME,
      project_type: Project.FIELD_PROJ_TYPE,
      project_type_name: Project.FIELD_PROJ_TYPE_NAME,
      engineering: Project.FIELD_ENGIN_TYPE,
      engineering_name: Project.FIELD_ENGIN_TYPE_NAME,
      // project_detail: Project.FIELD_PROJ_DETAIL,
      // sponge_detail: Project.FIELD_SPONGE_DETAIL,
      project_area: Project.FIELD_PROJ_AREA,
      // sponge_area: Project.FIELD_SPONGE_AREA,
      // executant: Project.FIELD_EXECUTANT,
      // operate_type: Project.FIELD_OPERATE_TYPE,
      // contact_name: Project.FIELD_CONTACT_NAME,
      // contact_phone: Project.FIELD_CONTACT_PHONE,
      investment: Project.FIELD_INVESTMENT,
      // investment_local: Project.FIELD_INVEST_LOCAL,
      // investment_social: Project.FIELD_INVEST_SOCIAL,
      // investment_sponge: Project.FIELD_INVEST_SPONGE,
      start_time: `DATE_FORMAT(${Project.TABLE}.${Project.FIELD_START_TIME}, '%Y-%m-%d')`,
      end_time: `DATE_FORMAT(${Project.TABLE}.${Project.FIELD_END_TIME}, '%Y-%m-%d')`,
      created_department: Project.FIELD_CREATED_DEPARTMENT,
      created_time: `DATE_FORMAT(${Project.TABLE}.${Project.FIELD_CREATED_TIME}, '%Y-%m-%d')`
    }
    let sqlFields = this.formatFields(fields) // 项目主表的字段
    // 项目生命周期的字段
    sqlFields += `,${ProjectLifecycle.TABLE}.${ProjectLifecycle.FIELD_TITLE} AS current_status`
    sqlFields += `,${ProjectLifecycle.TABLE}.${ProjectLifecycle.FIELD_STATE} AS state`
    sqlFields += `,CASE WHEN ${ProjectLifecycle.TABLE}.${ProjectLifecycle.FIELD_STATE}=${ProjectLifecycle.STATE_DOING} AND ${ProjectLifecycle.TABLE}.${ProjectLifecycle.FIELD_FILE_PATH} IS NOT NULL THEN 1`
    sqlFields += ` ELSE 0 END AS update_status`

    if (limits) {
      limits = `LIMIT ${limits}`
    }
    let sqlConditions = ''
    let prefix = ''
    // if (departmentId) {
    prefix = `${Project.TABLE}.`
    // }
    if (regionId) {
      sqlConditions += `${prefix}${Project.FIELD_REGION_ID}=${regionId}`
    }
    if (projectType) {
      if (sqlConditions) sqlConditions += ' AND '
      sqlConditions += `${prefix}${Project.FIELD_PROJ_TYPE}=${projectType}`
    }
    if (createdStartTime && createdEndTime) {
      if (sqlConditions) sqlConditions += ' AND '
      sqlConditions += `UNIX_TIMESTAMP(${prefix}${Project.FIELD_CREATED_TIME})>=${createdStartTime} 
      AND UNIX_TIMESTAMP(${prefix}${Project.FIELD_CREATED_TIME})<=${createdEndTime}`
    }
    if (searchWord) {
      if (sqlConditions) sqlConditions += ' AND '
      sqlConditions += `(${prefix}${Project.FIELD_SN} LIKE '%${searchWord}%' OR ${prefix}${Project.FIELD_NAME} LIKE '%${searchWord}%')`
    }
    if (departmentId) {
      if (sqlConditions) sqlConditions += ' AND '
      sqlConditions += `${ProjectDepartment.TABLE}.${ProjectDepartment.FIELD_DEPART_ID}=${departmentId}`
    }
    if (sqlConditions) sqlConditions += ' AND '
    sqlConditions = `WHERE ${sqlConditions} 
    (${ProjectLifecycle.TABLE}.${ProjectLifecycle.FIELD_STATE}=${ProjectLifecycle.STATE_DOING} OR 
    (${ProjectLifecycle.TABLE}.${ProjectLifecycle.FIELD_STATE}=${ProjectLifecycle.STATE_DONE} AND ${ProjectLifecycle.TABLE}.${ProjectLifecycle.FIELD_TYPE}&${ProjectLifecycle.TYPE_FLAG_END_PROJ}=${ProjectLifecycle.TYPE_FLAG_END_PROJ}))`

    if (departmentId) { // 关联责任单位表格
      sql = `SELECT ${sqlFields} FROM ${Project.TABLE}
              LEFT JOIN ${ProjectDepartment.TABLE} 
              ON ${Project.TABLE}.${Project.FIELD_ID}=${ProjectDepartment.TABLE}.${ProjectDepartment.FIELD_PROJ_ID}
              LEFT JOIN ${ProjectLifecycle.TABLE} ON ${Project.TABLE}.${Project.FIELD_ID}=${ProjectLifecycle.TABLE}.${ProjectDepartment.FIELD_PROJ_ID}
              ${sqlConditions} ORDER BY update_status DESC, id DESC ${limits}`
    } else { // 无需关联责任单位
      sql = `SELECT ${sqlFields} FROM ${Project.TABLE}
              LEFT JOIN ${ProjectLifecycle.TABLE} ON ${Project.TABLE}.${Project.FIELD_ID}=${ProjectLifecycle.TABLE}.${ProjectDepartment.FIELD_PROJ_ID}
              ${sqlConditions} ORDER BY update_status DESC, id DESC ${limits}`
    }
    return sql
  },

  formatFields: function (fields) {
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

    if (sqlFields) return sqlFields
    else return '*'
  },

  getInspectionCount: function ({projectId, state}) {
    return `SELECT count(*) as total FROM ${ProjectInspection.TABLE} 
      WHERE ${ProjectInspection.FIELD_PROJ_ID}=${projectId} AND ${ProjectInspection.FIELD_STATE}=${state}`
  },

  getInspectionList: function ({projectId, state, limit}) {
    let strSql = `SELECT ${ProjectInspection.FIELD_ID}, 
      ${ProjectInspection.FIELD_MATTERS}, 
      ${ProjectInspection.FIELD_ISSUES}, 
      DATE_FORMAT(${ProjectInspection.FIELD_CREATED_TIME}, '%Y-%m-%d') as created_time, 
      DATE_FORMAT(${ProjectInspection.FIELD_INSPECT_TIME}, '%Y-%m-%d') as inspect_time
      FROM ${ProjectInspection.TABLE} 
      WHERE ${ProjectInspection.FIELD_PROJ_ID}=${projectId} AND ${ProjectInspection.FIELD_STATE}=${state} ORDER BY id DESC`
    if (limit) {
      strSql += ` LIMIT ${limit}`
    }
    return strSql
  },

  getInspectionFiles: function (inspectIds) {
    let strIds = ''
    for (let id of inspectIds) {
      if (strIds) strIds += ','
      strIds += id
    }
    if (!strIds) return ''
    return `SELECT ${ProjectInspectionFile.FIELD_INSPECT_ID}, 
      ${ProjectInspectionFile.FIELD_NAME}, 
      ${ProjectInspectionFile.FIELD_URL},
      ${ProjectInspectionFile.FIELD_TYPE}
      FROM ${ProjectInspectionFile.TABLE} WHERE ${ProjectInspectionFile.FIELD_INSPECT_ID} in (${strIds})`
  },

  completeInspection: function (inspectionId, departmentId) {
    return `UPDATE ${ProjectInspection.TABLE} 
      SET ${ProjectInspection.FIELD_STATE}=1, ${ProjectInspection.FIELD_INSPECT_TIME}=CURRENT_TIMESTAMP
      WHERE id=${inspectionId}`
  },

  getMultiProjectDepartments: function (projectIds) {
    let strIDs = ''
    for (let id of projectIds) {
      if (strIDs) strIDs += ','
      strIDs += id
    }
    return `SELECT ${ProjectDepartment.FIELD_PROJ_ID}, ${ProjectDepartment.FIELD_DEPART_ID}, ${ProjectDepartment.FIELD_STATE} 
    FROM ${ProjectDepartment.TABLE} WHERE ${ProjectDepartment.FIELD_PROJ_ID} in (${strIDs})`
  },

  // 删除项目责任单位
  deleteProjectDepartments: function (projectId, departmentIds) {
    let strIDs = ''
    for (let id of departmentIds) {
      if (strIDs) strIDs += ','
      strIDs += id
    }
    return `DELETE FROM ${ProjectDepartment.TABLE} WHERE ${ProjectDepartment.FIELD_PROJ_ID}=${projectId} AND ${ProjectDepartment.FIELD_DEPART_ID} in (${strIDs})`
  },

  // 确认项目责任单位
  confirmProjectDepartment: function (projectId, departmentId) {
    return `UPDATE ${ProjectDepartment.TABLE} SET ${ProjectDepartment.FIELD_STATE}=1 WHERE ${ProjectDepartment.FIELD_PROJ_ID}=${projectId} AND ${ProjectDepartment.FIELD_DEPART_ID}=${departmentId}`
  },

  // 获取子项目列表
  getSubProjects: function (projectId) {
    return `SELECT id, ${SubProject.FIELD_NAME}, 
    ${SubProject.FIELD_PROJ_TYPE}, 
    ${SubProject.FIELD_PROGRESS}, 
    ${SubProject.FIELD_PROJ_DETAIL}, 
    ${SubProject.FIELD_SPONGE_DETAIL}, 
    ${SubProject.FIELD_PROJ_AREA}, 
    ${SubProject.FIELD_SPONGE_AREA},
    DATE_FORMAT(${SubProject.FIELD_CREATED_TIME}, '%Y-%m-%d') as created_time 
    FROM ${SubProject.TABLE} WHERE ${SubProject.FIELD_PARENT_ID}=${projectId}`
  },

  // 获取项目附件列表
  getExternalFile: function (projectId) {
    return `SELECT ${ProjectLifecycle.FIELD_FILE_NAME},
      ${ProjectLifecycle.FIELD_FILE_PATH},
      DATE_FORMAT(${ProjectLifecycle.FIELD_FILE_UPDATED_TIME}, '%Y-%m-%d') as file_updated_time 
      FROM ${ProjectLifecycle.TABLE}
      WHERE ${ProjectLifecycle.FIELD_PROJ_ID}=${projectId} AND ${ProjectLifecycle.FIELD_FILE_PATH} IS NOT NULL AND LENGTH(${ProjectLifecycle.FIELD_FILE_PATH})>0`
  },

  // 获取项目评审意见
  getProjectOpinions: function (projectId) {
    return `SELECT ${ProjectLifecycle.FIELD_TITLE}, ${ProjectLifecycle.FIELD_OPINION} FROM ${ProjectLifecycle.TABLE}
      WHERE ${ProjectLifecycle.FIELD_PROJ_ID}=${projectId} AND ${ProjectLifecycle.FIELD_OPINION} IS NOT NULL AND LENGTH(${ProjectLifecycle.FIELD_OPINION})>0`
  },

  // 获取项目生命周期列表
  getProjectLifecycle: function (projectId) {
    let strSql = `SELECT
      ${ProjectLifecycle.FIELD_PROJ_ID},
      ${ProjectLifecycle.FIELD_ID},
      ${ProjectLifecycle.FIELD_STAGE_IDX},
      ${ProjectLifecycle.FIELD_STAGE_TITLE},
      ${ProjectLifecycle.FIELD_STEP_IDX},
      ${ProjectLifecycle.FIELD_TITLE},
      ${ProjectLifecycle.FIELD_TYPE},
      ${ProjectLifecycle.FIELD_LINK_TIPS},
      ${ProjectLifecycle.FIELD_LINK_TYPE},
      ${ProjectLifecycle.FIELD_FILE_NAME},
      ${ProjectLifecycle.FIELD_FILE_PATH},
      ${ProjectLifecycle.FIELD_FILE_TYPE},
      ${ProjectLifecycle.FIELD_OPINION_TIPS},
      ${ProjectLifecycle.FIELD_OPINION},
      ${ProjectLifecycle.FIELD_STATE},
      DATE_FORMAT(${ProjectLifecycle.FIELD_CREATED_TIME}, '%Y-%m-%d') as created_time,
      DATE_FORMAT(${ProjectLifecycle.FIELD_UPDATED_TIME}, '%Y-%m-%d') as updated_time,
      DATE_FORMAT(${ProjectLifecycle.FIELD_FILE_UPDATED_TIME}, '%Y-%m-%d') as file_updated_time 
      FROM ${ProjectLifecycle.TABLE}
      WHERE ${ProjectLifecycle.FIELD_PROJ_ID}=${projectId}
      ORDER BY ${ProjectLifecycle.FIELD_STAGE_IDX},${ProjectLifecycle.FIELD_STEP_IDX}`
    return strSql
  },

  // 获取单个项目生命周期当前步骤
  getCurrentProjectLifecycle: function (projectId) {
    let strSql = `SELECT ${ProjectLifecycle.FIELD_PROJ_ID},
      ${ProjectLifecycle.FIELD_PROJ_ID},
      ${ProjectLifecycle.FIELD_ID},
      ${ProjectLifecycle.FIELD_STAGE_IDX},
      ${ProjectLifecycle.FIELD_STAGE_TITLE},
      ${ProjectLifecycle.FIELD_STEP_IDX},
      ${ProjectLifecycle.FIELD_TITLE},
      ${ProjectLifecycle.FIELD_TYPE},
      ${ProjectLifecycle.FIELD_LINK_TIPS},
      ${ProjectLifecycle.FIELD_LINK_TYPE},
      ${ProjectLifecycle.FIELD_FILE_NAME},
      ${ProjectLifecycle.FIELD_FILE_PATH},
      ${ProjectLifecycle.FIELD_FILE_TYPE},
      ${ProjectLifecycle.FIELD_OPINION_TIPS},
      ${ProjectLifecycle.FIELD_OPINION},
      ${ProjectLifecycle.FIELD_STATE},
      DATE_FORMAT(${ProjectLifecycle.FIELD_CREATED_TIME}, '%Y-%m-%d') as created_time,
      DATE_FORMAT(${ProjectLifecycle.FIELD_UPDATED_TIME}, '%Y-%m-%d') as updated_time,
      DATE_FORMAT(${ProjectLifecycle.FIELD_FILE_UPDATED_TIME}, '%Y-%m-%d') as file_updated_time 
      FROM ${ProjectLifecycle.TABLE}
      WHERE ${ProjectLifecycle.FIELD_PROJ_ID}=${projectId} AND ${ProjectLifecycle.FIELD_STATE}!=${ProjectLifecycle.STATE_DONE}
      ORDER BY ${ProjectLifecycle.FIELD_STAGE_IDX},${ProjectLifecycle.FIELD_STEP_IDX} LIMIT 0,1`
    return strSql
  },

  // 获取多个项目生命周期当前步骤
  getMultiCurrentProjectLifecycles: function (projectIds) {
    let strIds = ''
    for (let id of projectIds) {
      if (strIds) strIds += ','
      strIds += id
    }
    if (!strIds) return ''
    let strSql = `SELECT ${ProjectLifecycle.FIELD_PROJ_ID},
      ${ProjectLifecycle.FIELD_ID},
      ${ProjectLifecycle.FIELD_STAGE_IDX},
      ${ProjectLifecycle.FIELD_STAGE_TITLE},
      ${ProjectLifecycle.FIELD_STEP_IDX},
      ${ProjectLifecycle.FIELD_TITLE},
      ${ProjectLifecycle.FIELD_TYPE},
      ${ProjectLifecycle.FIELD_LINK_TIPS},
      ${ProjectLifecycle.FIELD_LINK_TYPE},
      ${ProjectLifecycle.FIELD_FILE_NAME},
      ${ProjectLifecycle.FIELD_FILE_PATH},
      ${ProjectLifecycle.FIELD_FILE_TYPE},
      ${ProjectLifecycle.FIELD_OPINION_TIPS},
      ${ProjectLifecycle.FIELD_OPINION},
      ${ProjectLifecycle.FIELD_STATE},
      DATE_FORMAT(${ProjectLifecycle.FIELD_CREATED_TIME}, '%Y-%m-%d') as created_time,
      DATE_FORMAT(${ProjectLifecycle.FIELD_UPDATED_TIME}, '%Y-%m-%d') as updated_time,
      DATE_FORMAT(${ProjectLifecycle.FIELD_FILE_UPDATED_TIME}, '%Y-%m-%d') as file_updated_time 
      FROM ${ProjectLifecycle.TABLE}
      WHERE ${ProjectLifecycle.FIELD_STATE}=${ProjectLifecycle.STATE_DOING} AND ${ProjectLifecycle.FIELD_PROJ_ID} IN (${strIds})
      ORDER BY ${ProjectLifecycle.FIELD_STAGE_IDX},${ProjectLifecycle.FIELD_STEP_IDX}`
    // let strSql = `SELECT project_id,id,stage_idx,stage_title,step_idx,title,TYPE,link_tips,link_type,file_name,file_path,file_type,opinion_tips,opinion,state,
    // DATE_FORMAT(created_time, '%Y-%m-%d') AS created_time,
    // DATE_FORMAT(updated_time, '%Y-%m-%d') AS updated_time,
    // DATE_FORMAT(file_updated_time, '%Y-%m-%d') AS file_updated_time FROM sp_proj_life_cycle
    // WHERE state!=1 AND project_id IN (${strIds}) GROUP BY project_id`
    return strSql
  },

  // 更新项目生命周期
  updateLifecycle: function (projectId) {
    return `UPDATE ${ProjectLifecycle.TABLE} SET ${ProjectLifecycle.FIELD_UPDATED_TIME}=CURRENT_TIMESTAMP, ? WHERE id=${projectId}`
  },

  getLifecycleTemplate: function (enginType) {
    return `SELECT stage_idx,stage_title,step_idx,type,title,external_api,link_tips,link_type,opinion_tips FROM template_life_cycle WHERE engineering_type=${enginType}`
  },

  // 开始施工
  startProject: function (projectId) {
    return `UPDATE ${Project.TABLE} SET ${Project.FIELD_START_TIME}=CURRENT_TIMESTAMP WHERE id=${projectId}`
  },

  // 竣工
  completeProject: function (projectId) {
    return `UPDATE ${Project.TABLE} SET ${Project.FIELD_END_TIME}=CURRENT_TIMESTAMP WHERE id=${projectId}`
  },

  // 获取可更新状态的项目个数
  getProjectNewStatusCount: function () {
    return `SELECT count(*) as total FROM ${ProjectLifecycle.TABLE}
      WHERE ${ProjectLifecycle.FIELD_STATE}=${ProjectLifecycle.STATE_DOING} AND ${ProjectLifecycle.FIELD_FILE_PATH} IS NOT NULL`
  }
}

export {
  Project, // 项目主表
  ProjectDepartment, // 项目责任单位表
  ProjectCoordinate, // 项目坐标表
  ProjectApprovalFile, // 项目投资批复文件表
  SubProject, // 子项目表
  ProjectLifecycle, // 项目生命周期表
  ProjectInspection, // 项目巡查表
  ProjectInspectionFile, // 项目巡查附件表
  ProjectSql // 项目Sql封装
}
