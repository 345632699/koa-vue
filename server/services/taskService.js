'use strict'
import taskDao from '../dao/taskDao'
import Collection from '../utils/collection_utils'
import {logger} from '../utils/logger_util'

const Organization = require('../model/organizationModel')
const Contact = require('../model/organizationContactModel')
const TaskType = require('../model/taskTypeModel')
const TaskTemplate = require('../model/taskTemplateModel')
const Column = require('../model/taskColumnModel')
const Task = require('../model/taskModel')
const TaskOrganization = require('../model/taskOrganizationModel')
const TaskTempCol = require('../model/taskTempColModel')
const ChildTask = require('../model/childTaskModel')
const Block = require('../model/taskBlockModel')
const Event = require('../model/taskEventModel')
const Meeting = require('../model/taskMeetingModel')
const MeetingOrganization = require('../model/taskMeetingOrganizationModel')
let Sequelize = require('sequelize')
const Op = Sequelize.Op

const formatInputValue = async function (arr) {
  let values = []
  arr.forEach(function (item) {
    let value = []
    if (item.id !== undefined) {
      value.push(item.id)
    } else {
      value.push(0)
    }
    value.push(item.group_name)
    value.push(item.name)
    value.push(item.position)
    value.push(item.parent_id)
    value.push(item.level)
    value.push(item.block_id)
    values.push(value)
  })
  return values
}

const updateChildParentId = async function () {
  let childIds = await taskDao.getNeedUpdateChild()
  childIds.forEach(async function (item) {
    let parentId = await taskDao.getParentId(item.group_name)
    await taskDao.updateChildParentId([parentId.id, item.id])
  })
}

/**
 * @api {get} /api/editOrganization 组织架构编辑更新
 * @apiName editOrganization 组织架构编辑更新
 * @apiGroup Organization
 *
 * @apiHeader (Authorization) {String} authorization
 *
 * @apiParam {String} levelOne 以及架构
 * @apiParam {String} levelTwo 二级架构
 * @apiParam {String} levelThree 三级架构
 * @apiParam {String} child 三级架构里 海绵办的子成员单位
 * @apiParam {Array} [delIds] 删除的成员ID
 * @apiParam {String} name 成员名称 levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiParam {String} group_name 架构名称 levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiParam {String} position 职位 levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiParam {String} parent_id 三级架构中子成员的父级ID levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiParam {String} level 架构等级，对应 1 一级机构 2 二级架构 3 三级架构 levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiParam {String} block_id 区域ID 预留字段，各个组织对应所在的城市地区ID levelOne,levelTwo,levelThree里member数组包含的参数
 *
 * @apiSuccess {Array} data 返回机构体
 * @apiSuccess {Number} ret  1 包含错误 0 执行成功
 * @apiSuccess {string} errorMsg 成功失败返回消息提示
 *
 * @apiSuccessExample Success-Response:
 * {
      ret: 0,
      data: [],
      errorMsg: '更新成功'
}
 */
const editOrganization = async function (ctx) {
  try {
    let data = ctx.request.body
    let levelOne = data.levelOne.member
    let levelTwo = data.levelTwo.member
    let levelThree = data.levelThree.member
    let childData = data.child.member
    let delIds = data.delIds
    let blockId = data.block_id
    let orgTitle = data.org_title
    await Block.update({
      org_title: orgTitle
    }, {
      where: {
        id: blockId
      }
    })
    let arr = []
    arr = arr.concat(levelOne, levelTwo, levelThree)
    let values = await formatInputValue(arr)
    let childArr = []
    childData.forEach(function (item) {
      if (item) {
        childArr = childArr.concat(item)
      }
    })
    let childArrValues = await formatInputValue(childArr)
    values = values.concat(childArrValues)
    await taskDao.editOrganization(values)
    // 更新子级父ID
    await updateChildParentId()
    // 更新已经删除的条目
    if (delIds.length) {
      let res = await Organization.destroy({
        where: {
          id: {
            [Op.in]: delIds
          }
        }
      })
      console.log(res)
    }
    // 更新架构名字
    await Organization.update({
      group_name: data.levelOne.name
    }, {
      where: {
        level: 1,
        parent_id: 0
      }
    })
    await Organization.update({
      group_name: data.levelTwo.name
    }, {
      where: {
        level: 2,
        parent_id: 0
      }
    })
    await Organization.update({
      group_name: data.levelThree.name
    }, {
      where: {
        level: 3,
        parent_id: 0
      }
    })

    ctx.body = {
      ret: 0,
      data: [],
      errorMsg: '更新成功'
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      ret: 0,
      data: e,
      errorMsg: '数据查询编辑出错'
    }
  }
}

/**
 * @api {get} /api/getOrganizationList 获取组织架构列表
 * @apiName getOrganizationList 获取组织架构列表
 * @apiGroup Organization
 *
 * @apiHeader (Authorization) {String} authorization
 *
 * @apiSuccess {Array} levelOne 返回一级架构的成员数组
 * @apiSuccess {Array} levelTwo 返回二级架构的成员数组
 * @apiSuccess {Array} levelThree 返回三级架构的成员数组
 * @apiSuccess {Int} id 成员ID levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiSuccess {String} name 成员名称 levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiSuccess {String} group_name 架构名称 levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiSuccess {String} position 职位 levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiSuccess {String} parent_id 三级架构中子成员的父级ID levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiSuccess {String} level 架构等级，对应 1 一级机构 2 二级架构 3 三级架构 levelOne,levelTwo,levelThree里member数组包含的参数
 * @apiSuccess {String} block_id 区域ID 预留字段，各个组织对应所在的城市地区ID levelOne,levelTwo,levelThree里member数组包含的参数
 *
 * @apiSuccess {Array} data 返回机构体
 * @apiSuccess {Number} ret  1 包含错误 0 执行成功
 * @apiSuccess {string} errorMsg 成功失败返回消息提示
 *
 * @apiSuccessExample Success-Response:
 *
 *{
  "ret": 0,
  "data": {
    "levelOne": [
      {
        "id": 1,
        "group_name": "组长",
        "name": "黄敏",
        "position": "市政府副市长",
        "parent_id": 0,
        "level": 1,
        "block_id": null,
        "updated_at": null,
        "created_at": null
      }
    ],
    "levelTwo": [
      {
        "id": 2,
        "group_name": "副组长",
        "name": "王刚",
        "position": "市政府副秘书长",
        "parent_id": 0,
        "level": 2,
        "block_id": null,
        "updated_at": null,
        "created_at": null
      },
      {
        "id": 3,
        "group_name": "副组长",
        "name": "王立新",
        "position": "市水务局局长",
        "parent_id": 0,
        "level": 2,
        "block_id": null,
        "updated_at": null,
        "created_at": null
      }
    ],
    "levelThree": [
      {
        "id": 4,
        "group_name": "成员单位",
        "name": "市委宣传部",
        "position": null,
        "parent_id": 0,
        "level": 3,
        "block_id": null,
        "updated_at": null,
        "created_at": null,
        "child_list": []
      },
      {
        "id": 5,
        "group_name": "成员单位",
        "name": "市住房建设局",
        "position": null,
        "parent_id": 0,
        "level": 3,
        "block_id": null,
        "updated_at": null,
        "created_at": null,
        "child_list": []
      },
      {
        "id": 6,
        "group_name": "成员单位",
        "name": "市发展改革委",
        "position": null,
        "parent_id": 0,
        "level": 3,
        "block_id": null,
        "updated_at": null,
        "created_at": null,
        "child_list": []
      },
      {
        "id": 7,
        "group_name": "成员单位",
        "name": "市水务局",
        "position": null,
        "parent_id": 0,
        "level": 3,
        "block_id": null,
        "updated_at": null,
        "created_at": null,
        "child_list": []
      }
    ]
  }
}
 */
const getOrganizationList = async function (ctx) {
  let mainList = await taskDao.getOrganizationList()
  let childList = await taskDao.getChildList()
  let blockId = 1
  let block = await Block.findOne({
    where: {
      id: blockId
    }
  })
  // 初始化返回数据
  let result = {}
  result.levelOne = []
  result.levelTwo = []
  result.levelThree = []
  // 循环遍历 三级架构
  mainList.forEach(function (item, index) {
    let level = item.level
    if (level === 1) {
      result.levelOne.push(item)
    } else if (level === 2) {
      result.levelTwo.push(item)
    } else {
      result.levelThree.push(item)
    }
  })
  // 遍历海绵办组织结构
  childList.forEach(function (childItem, index) {
    let parentId = childItem.parent_id
    result.levelThree.forEach(function (item) {
      if (!item['child_list']) item['child_list'] = []
      if (item.id === parentId) {
        item['child_list'].push(childItem)
      }
    })
  })
  result.block = block

  ctx.body = {
    ret: 0,
    data: result
  }
}

/**
 * @api {get} /api/getContracList 获取组织架构通讯录列表
 * @apiName getContracList 获取组织架构通讯录列表
 * @apiGroup Organization
 *
 * @apiHeader (Authorization) {String} authorization
 *
 * @apiSuccess {Array} data 返回机构体
 * @apiSuccess {Number} ret  1 包含错误 0 执行成功
 * @apiSuccess {string} errorMsg 成功失败返回消息提示
 * @apiSuccess {Int} id 组织成员ID
 * @apiSuccess {String} group_name 架构名称
 * @apiSuccess {String} name 成员名称
 *
 * @apiSuccess {String} position 成员的职位
 * @apiSuccess {Int} parent_id 子级成员的父级ID
 * @apiSuccess {Int} level 架构等级
 *
 * @apiSuccessExample Success-Response:
 * {
  "ret": 0,
  "data": [
    {
      "id": 1,
      "group_name": "组长",
      "name": "黄敏",
      "position": "市政府副市长",
      "parent_id": 0,
      "level": 1,
      "block_id": null,
      "createdAt": null,
      "updatedAt": null,
      "created_at": null,
      "updated_at": null,
      "contact": {
        "id": 1,
        "name": "黄敏",
        "organization_id": 1,
        "mobile": "13423432212"
      }
    },
    {
      "id": 3,
      "group_name": "副组长",
      "name": "王立新",
      "position": "市水务局局长",
      "parent_id": 0,
      "level": 2,
      "block_id": null,
      "createdAt": null,
      "updatedAt": null,
      "created_at": null,
      "updated_at": null,
      "contact": {
        "id": 2,
        "name": "王立新",
        "organization_id": 3,
        "mobile": "13765472642"
      }
    },
    {
      "id": 2,
      "group_name": "副组长",
      "name": "王刚",
      "position": "市政府副秘书长",
      "parent_id": 0,
      "level": 2,
      "block_id": null,
      "createdAt": null,
      "updatedAt": null,
      "created_at": null,
      "updated_at": null,
      "contact": {
        "id": 4,
        "name": "王刚",
        "organization_id": 2,
        "mobile": "13767646261"
      }
    }
  ]
}
 */
const getContracList = async function (ctx) {
  let result = await Organization.findAll({
    include: [{
      model: Contact,
      as: 'contact'
      // where: { id: organizationContact.organization_id }
    }],
    order: [
      ['level', 'asc'],
      ['parent_id', 'asc']
    ]
  })
  console.log(result)
  ctx.body = {
    ret: 0,
    data: result
  }
}

// 更新联系方式
/**
 * @api {get} /api/updateContract 更新组织架构通讯录列表
 * @apiName updateContract 更新组织架构通讯录列表
 * @apiGroup Organization
 *
 * @apiHeader (Authorization) {String} authorization
 *
 * @apiParam {Int} organization_id 组织成员ID
 * @apiParam {String} name 联系人姓名
 * @apiParam {String} mobile 联系人电话
 *
 * @apiSuccess {Array} data 返回机构体
 * @apiSuccess {Number} ret  1 包含错误 0 执行成功
 * @apiSuccess {String} errorMsg 成功失败返回消息提示
 *
 * @apiSuccessExample Success-Response:
 * {
      ret: 0,
      data: [],
      errorMsg: '更新成功'
}
*/
const updateContract = async function (ctx) {
  let query = ctx.request.body
  try {
    let contactRes = await Contact.findOrCreate({
      where: {
        organization_id: query.organization_id
      }
    })
    let contact = contactRes[0]
    let res = await contact.update({
      name: query.name,
      mobile: query.mobile
    })
    console.log(res)
    ctx.body = {
      ret: 0,
      data: res
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '更新失败'
    }
  }
}

// 查找任务类型
/**
 * @api {get} /api/getTaskTypeList 查找任务类型列表,组织成员列表，任务模板列表
 * @apiName getTaskTypeList 查找任务类型列表,组织成员列表，任务模板列表
 * @apiGroup Task
 *
 * @apiHeader (Authorization) {String} authorization
 *
 * @apiSuccess {Array} data 返回机构体
 * @apiSuccess {Number} ret  1 包含错误 0 执行成功
 * @apiSuccess {String} errorMsg 成功失败返回消息提示
 * @apiSuccess {Array} TaskTypeList 任务添加类型李彪
 * @apiSuccess {Array} TaskTemplateList 任务添加模板列表
 * @apiSuccess {Array} OrganizationList 组织成员列表
 * @apiSuccess {Int} id 数组元素对应ID TaskTypeList,TaskTemplateList,OrganizationList 数组元素包含字段
 * @apiSuccess {Int} id  数组元素对应名称 TaskTypeList,TaskTemplateList,OrganizationList 数组元素包含字段
 *
 * @apiSuccessExample Success-Response:
 * {
  "ret": 0,
  "data": [
    {
      "TaskTypeList": [
        {
          "id": 1,
          "name": "专项研究"
        },
        {
          "id": 2,
          "name": "规划编制"
        },
        {
          "id": 3,
          "name": "政策制定"
        },
        {
          "id": 4,
          "name": "项目推进"
        },
        {
          "id": 5,
          "name": "宣传推广"
        }
      ],
      "TaskTemplateList": [
        {
          "id": 1,
          "name": "项目推进模板"
        },
        {
          "id": 2,
          "name": "规划编制模板"
        },
        {
          "id": 3,
          "name": "会议管理模板"
        },
        {
          "id": 4,
          "name": "专项研究模板"
        },
        {
          "id": 5,
          "name": "默认模板"
        }
      ],
      "OrganizationList": [
        {
          "id": 1,
          "name": "黄敏"
        },
        {
          "id": 2,
          "name": "王刚"
        },
        {
          "id": 3,
          "name": "王立新"
        },
        {
          "id": 4,
          "name": "市委宣传部"
        },
        {
          "id": 5,
          "name": "市住房建设局"
        }
      ]
    }
  ]
}
 */
const getTaskTypeList = async function (ctx) {
  let taskTypeList = await TaskType.findAll({
    attributes: ['id', 'name']
  })
  let TaskTemplateList = await TaskTemplate.findAll({
    attributes: ['id', 'name']
  })
  let OrganizationList = await Organization.findAll({
    attributes: ['id', 'name'],
    where: {
      level: {
        [Op.gt]: 2
      }
    }
  })
  // let list1 = await TaskTemplate.findAll({
  //   include: [{
  //     model: Coulumn,
  //     as: 'Columns'
  //   }],
  //   where: {
  //     id: 1
  //   }
  // })
  ctx.body = {
    ret: 0,
    data: [
      {TaskTypeList: taskTypeList, TaskTemplateList: TaskTemplateList, OrganizationList: OrganizationList}]
  }
}

// 查询某个模板下含有的字段
/**
 * @api {get} /api/getColumnList 更新组织架构通讯录列表
 * @apiName getColumnByTemplateId 更新组织架构通讯录列表
 * @apiGroup Template
 *
 * @apiHeader (Authorization) {String} authorization
 *
 * @apiParam {Int} template_id 模板ID
 *
 * @apiSuccess {Array} data 返回机构体
 * @apiSuccess {Number} ret  1 包含错误 0 执行成功
 * @apiSuccess {String} errorMsg 成功失败返回消息提示
 *
 * @apiSuccessExample Success-Response:
 * {
      ret: 0,
      data: [],
      errorMsg: '更新成功'
}
 */
const getColumnByTemplateId = async function (ctx) {
  let query = ctx.request.query
  let templateId = query.template_id
  let columnList = await TaskTemplate.findOne({
    include: [{
      model: Column,
      as: 'Columns'
    }],
    where: {
      id: templateId
    }
  })

  ctx.body = {
    ret: 0,
    data: columnList
  }
}

// 编辑任务
const updateTask = async function (ctx) {
  try {
    let data = ctx.request.body.params
    let task = {}
    task.name = data.task.name
    task.template_id = data.template_id
    task.task_type_id = data.task.type
    task.task_num = data.task.number
    task.template_id = data.template_id
    task.assessment_standard = data.assessment_standard
    task.grading_standard = data.grading_standard
    task.score = data.score
    let taskId = data.task_id
    // 把真实名称存入 content
    let fields = data.fields
    let responsibleDepartmentIds = fields.responsible_department
    let assistingDepartmentIds = fields.assisting_department
    // 责任单位
    let responsibleDepartment = await Organization.findAll({
      'where': {
        'id': responsibleDepartmentIds
      },
      attributes: ['name']
    })
    // 协助单位
    let assistingDepartment = await Organization.findAll({
      'where': {
        'id': assistingDepartmentIds
      },
      attributes: ['name']
    })
    fields.responsible_department_name = responsibleDepartment
    fields.assisting_department_name = assistingDepartment

    // 字段赋值
    task.content = JSON.stringify(fields)
    let rescode = await Task.update(task, {
      where: {
        id: taskId
      }
    })
    let destroyRes = await TaskOrganization.destroy({
      where: {
        task_id: taskId
      }
    })
    console.log('rescode', rescode)
    console.log('destroyRes', destroyRes)
    if (rescode && taskId > 0) {
      // 责任单位关联
      if (responsibleDepartmentIds.length){
        responsibleDepartmentIds.forEach(function (item) {
          TaskOrganization.create({
            task_id: taskId,
            organization_id: item,
            type: 1
          })
        })
      }
      // 协助单位关联
      if (assistingDepartmentIds.length) {
        assistingDepartmentIds.forEach(function (item) {
          TaskOrganization.create({
            task_id: taskId,
            organization_id: item,
            type: 2
          })
        })
      }
      // 子任务入记录库
      let childTaskList = fields.child_task_list
      await ChildTask.destroy({
        where: {
          task_id: taskId
        }
      })
      childTaskList.forEach(async function (item) {
        let name = item.responsible_department
        let organizationId = await Organization.findOne({
          'where': {
            'name': name
          },
          attributes: ['id']
        })
        let res = await ChildTask.create({
          'organization_id': organizationId.id,
          'task_id': taskId,
          'child_task_name': item.name,
          'end_time': item.time,
          'status': 0
        })
        console.log('返回值', res)
      })
    }
    ctx.body = {
      ret: 0,
      data: task,
      errorMsg: '更新成功'
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '查询失败'
    }
  }
}

// 创建任务
const createTask = async function (ctx) {
  let data = ctx.request.body.params
  let task = {}
  task.name = data.task.name
  task.template_id = data.template_id
  task.task_type_id = data.task.type
  task.task_num = data.task.number
  task.template_id = data.template_id
  task.assessment_standard = data.assessment_standard
  task.grading_standard = data.grading_standard
  task.score = data.score
  task.status = data.fields.time.value ? 0 : 2
  try {
    // 把真实名称存入 content
    let fields = data.fields
    let responsibleDepartmentIds = fields.responsible_department
    let assistingDepartmentIds = fields.assisting_department
    // 责任单位
    let responsibleDepartment = await Organization.findAll({
      'where': {
        'id': responsibleDepartmentIds
      },
      attributes: ['name']
    })
    // 协助单位
    let assistingDepartment = await Organization.findAll({
      'where': {
        'id': assistingDepartmentIds
      },
      attributes: ['name']
    })
    fields.responsible_department_name = responsibleDepartment
    fields.assisting_department_name = assistingDepartment
    // 字段赋值
    task.content = JSON.stringify(fields)
    let rescode = await Task.create(task)
    if (rescode.id) {
      // 责任单位关联
      if (responsibleDepartmentIds.length){
        responsibleDepartmentIds.forEach(function (item) {
          TaskOrganization.create({
            task_id: rescode.id,
            organization_id: item,
            type: 1
          })
        })
      }
      // 协助单位关联
      if (assistingDepartmentIds.length) {
        assistingDepartmentIds.forEach(function (item) {
          TaskOrganization.create({
            task_id: rescode.id,
            organization_id: item,
            type: 2
          })
        })
      }
      // 子任务入记录库
      let childTaskList = fields.child_task_list
      childTaskList.forEach(async function (item) {
        let name = item.responsible_department
        let organizationId = await Organization.findOne({
          'where': {
            'name': name
          },
          attributes: ['id']
        })
        console.log('====================')
        let res = await ChildTask.create({
          'organization_id': organizationId.id,
          'task_id': rescode.id,
          'child_task_name': item.name,
          'end_time': item.time,
          'status': 0
        })
        console.log('返回值', res)
        console.log('====================')
      })
      ctx.body = {
        ret: 0,
        data: data,
        errorMsg: '创建成功'
      }
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '查询失败'
    }
  }
}

// 查询任务详情
const getTaskDetail = async function (ctx) {
  let query = ctx.request.query
  console.log('query:', query)
  let taskId = query.task_id ? query.task_id : 2
  let organizationList = await Task.findAll({
    include: [{
      model: Organization,
      as: 'Organizations'
    }],
    where: {
      id: taskId
    }
  })
  console.log(organizationList)
  let task = await Task.findById(taskId, {
    include: [{
      model: TaskType,
      as: 'task_types'
    }]
  })
  let content = JSON.parse(task.content)
  let additionalFields = content.additional_fields
  let additionalFieldList = []
  for (let index in additionalFields) {
    let column = await Column.find({
      where: {
        code: index
      },
      attributes: ['name', 'code', 'type']
    })
    column.value = additionalFields[index]
    additionalFieldList.push(column)
  }
  let originalFields = content.additional_fields
  content.additional_fields = additionalFieldList
  content.original_fields = originalFields
  task.content = content
  task.dataValues.organization_list = organizationList
  ctx.body = {
    ret: 0,
    data: task
  }
}

// 任务管理中心
const taskManage = async function (ctx) {
  let listByOrg = await Organization.findAll({
    attributes: ['id', 'name'],
    include: [{
      model: Task,
      as: 'Tasks'
    }]
  })
  let listByTaskType = await TaskType.findAll({
    include: [{
      model: Task,
      as: 'tasks'
    }]
  })
  let listByOrgArr = []
  let listByTaskTypeArr = []
  let allHangup = 0
  let allHDone = 0
  let allLongterm = 0
  listByOrg.forEach(function (item) {
    if (item.Tasks.length > 0) {
      let list = item.Tasks
      let longterm = 0
      let hangup = 0
      let done = 0
      list.forEach(function (task) {
        hangup = task.status === 0 ? hangup + 1 : hangup
        done = task.status === 1 ? done + 1 : done
        longterm = task.status === 2 ? longterm + 1 : longterm
        allHangup = task.status === 0 ? allHangup + 1 : allHangup
        allHDone = task.status === 1 ? allHDone + 1 : allHDone
        allLongterm = task.status === 2 ? allLongterm + 1 : allLongterm
      })
      listByOrgArr.push({
        id: item.id,
        name: item.name,
        hangup: hangup,
        done: done,
        longterm: longterm
      })
    }
  })
  listByTaskType.forEach(function (item) {
    if (item.tasks.length > 0) {
      let list = item.tasks
      let longterm = 0
      let hangup = 0
      let done = 0
      list.forEach(function (task) {
        hangup = task.status === 0 ? hangup + 1 : hangup
        done = task.status === 1 ? done + 1 : done
        longterm = task.status === 2 ? longterm + 1 : longterm
        allHangup = task.status === 0 ? allHangup + 1 : allHangup
        allHDone = task.status === 1 ? allHDone + 1 : allHDone
        allLongterm = task.status === 2 ? allLongterm + 1 : allLongterm
      })
      listByTaskTypeArr.push({
        id: item.id,
        name: item.name,
        hangup: hangup,
        done: done,
        longterm: longterm
      })
    }
  })
  let taskCount = {
    allHangup: allHangup,
    allHDone: allHDone,
    allLongterm: allLongterm,
    taskCount: allHangup + allHDone + allLongterm
  }
  ctx.body = {
    ret: 0,
    data: {
      listByOrg: listByOrgArr,
      listByTaskType: listByTaskTypeArr,
      taskCount: taskCount
    }
  }
}

// 更改任务状态
const updateTaskStatus = async function (ctx) {
  try {
    let data = ctx.request.body
    let taskId = data.task_id
    let status = data.status
    console.log(data)
    let res = await Task.update({
      status: status
    }, {
      where: {
        id: taskId
      }
    })
    if (res) {
      ctx.body = {
        ret: 0,
        data: res,
        errorMsg: '更新状态成功'
      }
    }
  } catch (e) {
    logger.debug('updateTaskStatus has error => ', e)
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '系统出错'
    }
  }
}

// 获取所欲的字段
const getAllColumn = async function (ctx) {
  let columns = await Column.findAll()
  ctx.body = {
    ret: 0,
    data: columns
  }
}

// 新增字段
const createColumn = async function (ctx) {
  try {
    let data = ctx.request.body
    let column = await Column.create({
      name: data.name,
      type: data.type,
      unit: data.unit,
      value: data.value
    })
    column.update({
      code: 'field' + column.id
    })
    ctx.body = {
      ret: 0,
      data: column,
      errorMsg: '创建成功'
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '创建出错'
    }
  }
}

// 删除字段
const deleteColumnById = async function (ctx) {
  try {
    let query = ctx.request.query
    let columnId = query.column_id
    let result = await Column.find({
      include: {
        model: TaskTemplate,
        as: 'Templates'
      },
      where: {
        id: columnId
      }
    })
    if (result.Templates.length) {
      ctx.body = {
        ret: 1,
        data: result.Templates,
        errorMsg: '该字段被其他模板引用，无法删除'
      }
      return
    }
    let res = await Column.destroy({
      where: {
        id: columnId
      }
    })
    if (res) {
      ctx.body = {
        ret: 0,
        data: res,
        errorMsg: '删除成功'
      }
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '删除失败'
    }
  }
}
// 创建模板
const createTemplate = async function (ctx) {
  let data = ctx.request.body
  try {
    if (!data.template_name) {
      ctx.body = {
        ret: 1,
        data: [],
        errorMsg: '模板名称不能为空'
      }
      return
    }
    let template = await TaskTemplate.create({
      name: data.template_name
    })
    let templateColumns = data.template_ids
    let insertData = []
    templateColumns.forEach(function (item, index) {
      insertData.push({
        template_id: template.id,
        column_id: item,
        sort: index + 1
      })
    })
    let res = await TaskTempCol.bulkCreate(insertData)
    console.log(res)
    ctx.body = {
      ret: 0,
      data: data,
      errorMsg: '创建成功'
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '创建失败'
    }
  }
}

// 更新模板
const updateTemplate = async function (ctx) {
  try {
    let data = ctx.request.body
    let templateId = data.template_id
    // 判断是否进行了修改
    if (data.original.template_name !== data.template_name) {
      await TaskTemplate.update({
        name: data.template_name
      }, {
        where: {
          id: templateId
        }
      })
    }
    // 判断字段进行了修改
    if (data.original.template_ids !== data.template_ids) {
      let delIds = Collection.array_difference(data.original.template_ids, data.template_ids)
      TaskTempCol.destroy({
        where: {
          column_id: {
            [Op.in]: delIds
          },
          template_id: templateId
        }
      })
      let addlIds = Collection.array_difference(data.template_ids, data.original.template_ids)
      let insertData = []
      addlIds.forEach(function (item, index) {
        insertData.push({
          template_id: templateId,
          column_id: item,
          sort: index + 1
        })
      })
      await TaskTempCol.bulkCreate(insertData)
    }
    ctx.body = {
      ret: 0,
      data: data,
      errorMsg: '更新成功'
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '更新失败'
    }
  }
}

// 模板列表
const getTemplateList = async function (ctx) {
  try {
    let TemplateList = await TaskTemplate.findAll({
      include: [{
        model: Column,
        as: 'Columns',
        attributes: ['name']
      }],
      attributes: ['id', 'name']
    })
    console.log(TemplateList)
    ctx.body = {
      ret: 0,
      data: TemplateList,
      errorMsg: 'success'
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '数据查询出错'
    }
  }
}
// 删除模板
const deleteTemolate = async function (ctx) {
  try {
    let data = ctx.request.body
    let templateId = data.template_id
    let result = await TaskTemplate.find({
      include: {
        model: Task,
        as: 'tasks'
      },
      where: {
        id: templateId
      }
    })
    if (result.tasks.length) {
      ctx.body = {
        ret: 1,
        data: result.tasks,
        errorMsg: '该模板存在引用关联，无法删除'
      }
      return
    }
    let res = await TaskTemplate.destroy({
      where: {
        id: templateId
      }
    })
    console.log(res)
    if (res) {
      ctx.body = {
        ret: 0,
        data: data,
        errorMsg: '删除成功'
      }
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '删除失败'
    }
  }
}

// 获取列表
const getTaskList = async function (ctx) {
  try {
    let data = ctx.request.query
    if (data.organization_id) {
      console.log(data)
      let res = await Organization.findOne({
        include: {
          model: Task,
          as: 'Tasks',
          include: [{
            model: TaskType,
            as: 'task_types',
            required: false
          }]
        },
        attributes: ['name', 'id'],
        where: {
          id: data.organization_id
        }
      })
      let TaskTypeList = await TaskType.findAll({
        attributes: ['id', 'name']
      })

      let Tasks = res.Tasks
      let arr = []
      TaskTypeList.forEach(function (item) {
        Tasks.forEach(function (task) {
          if (task.task_type_id === item.id) {
            if (typeof (arr[item.id]) === 'undefined') {
              arr[item.id] = {}
              arr[item.id].name = ''
              arr[item.id].list = []
            }
            arr[item.id].name = item.name
            arr[item.id].list.push(task)
          }
        })
      })

      res.dataValues.task_list = arr
      ctx.body = {
        ret: 0,
        data: res
      }
      return
    }

    if (data.task_type_id) {
      let res = await TaskType.findOne({
        include: {
          model: Task,
          as: 'tasks'
        },
        attributes: ['id', 'name'],
        where: {
          id: data.task_type_id
        }
      })
      ctx.body = {
        ret: 0,
        data: res
      }
    }
  } catch (e) {

  }
}

const createEvent = async function (ctx) {
  try {
    let data = ctx.request.body
    if (!data.title) {
      ctx.body = {
        ret: 1,
        data: [],
        errorMsg: '标题不能为空'
      }
      return
    }
    if (!data.publish_time) {
      ctx.body = {
        ret: 1,
        data: [],
        errorMsg: '发布时间不能为空'
      }
      return
    }
    if (!data.content) {
      ctx.body = {
        ret: 1,
        data: [],
        errorMsg: '正文内容不能为空'
      }
      return
    }
    let event = {}
    event.title = data.title
    event.publish_time = data.publish_time
    event.content = data.content
    event.description = data.description
    event.organization_id = 1
    if (data.event_id) {
      let res = await Event.update(event, {
        where: {
          id: data.event_id
        }
      })
      if (res) {
        ctx.body = {
          ret: 0,
          data: res,
          errorMsg: '更新成功'
        }
      }
      return
    }
    let res = await Event.create(event)
    console.log(res)
    if (res) {
      ctx.body = {
        ret: 0,
        data: res,
        errorMsg: '创建成功'
      }
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '创建失败'
    }
  }
}

const getEventList = async function (ctx) {
  try {
    let i = '2018'
    let result = {}
    while (i) {
      let time = i + '-01' + '-01'
      let eventList = await Event.findAll({
        where: {
          publish_time: {
            [Op.gt]: time
          }
        },
        order: [
          ['publish_time', 'DESC']
        ]
      })
      if (eventList.length) {
        eventList.forEach(function (item) {
          let imgReg = /<img.*?(?:>|\/>)/gi
          let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
          let str = item.content
          let arr = str.match(imgReg)
          let srcArr = []
          for (let i = 0; i < arr.length; i++) {
            let src = arr[i].match(srcReg)
            // 获取图片地址
            srcArr.push(src[1])
          }
          item.dataValues.imgList = srcArr
        })

        result[i] = eventList
        i += 1
      } else {
        i = 0
      }
    }

    if (result) {
      ctx.body = {
        ret: 0,
        data: result,
        errorMsg: '查询成功'
      }
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '查询出错'
    }
  }
}

const getEvemtDetail = async function (ctx) {
  try {
    let data = ctx.request.query
    let eventId = data.event_id
    let event = await Event.find({
      where: {
        id: eventId
      }
    })
    console.log(event)
    if (event) {
      ctx.body = {
        ret: 0,
        data: event,
        errorMsg: '查询成功'
      }
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '查询出错'
    }
  }
}

const createMeeting = async function (ctx) {
  try {
    let data = ctx.request.body
    let meeting = {}
    meeting.name = data.name
    meeting.time = data.datetime
    meeting.content = data.content
    meeting.file_list = JSON.stringify(data.file_list)
    meeting.organization_id = 10
    let res = await Meeting.create(meeting)
    if (res) {
      let contractList = data.contract_list
      contractList.forEach(async function (item) {
        await MeetingOrganization.create({
          organization_id: item.organization_id,
          meeting_id: res.id,
          name: item.name
        })
      })
      ctx.body = {
        ret: 0,
        data: res,
        errorMsg: 'suucess'
      }
    }
  } catch (e) {
    ctx.body = {
      ret: 1,
      data: e,
      errorMsg: '创建失败'
    }
  }
}

const getMeetingList = async function (ctx) {
  let query = ctx.request.query
  let whereArr = {}
  if (query.datetime) {
    whereArr.time = query.datetime
  }
  if (query.keyword) {
    whereArr.name = {
      [Op.like]: '%' + query.keyword + '%'
    }
  }
  if (query.organization_id) {
    let res = await Organization.findOne({
      include: [{
        model: Meeting,
        as: 'meeting',
        through: {
          attributes: ['name']
        },
        include: [
          {
            model: Organization,
            as: 'organization',
            attributes: ['name']
          },
          {
            model: Organization,
            as: 'organizations',
            through: {
              attributes: ['name']
            }
          }
        ],
        where: whereArr
      }],
      where: {id: query.organization_id}
    })
    let result = []
    if (res) {
      result = res.dataValues.meeting
    }
    ctx.body = {
      ret: 0,
      data: result,
      errorMsg: 'success'
    }
  } else {
    let meetingList = await Meeting.findAll({
      include: [{
        model: Organization,
        as: 'organizations',
        attributes: ['name']
      }, {
        model: Organization,
        as: 'organization',
        attributes: ['name']
      }],
      where: whereArr
    })
    ctx.body = {
      ret: 0,
      data: meetingList,
      errorMsg: 'success'
    }
  }
}

export default {
  editOrganization,
  getOrganizationList,
  getContracList,
  updateContract,
  createTask,
  getTaskTypeList,
  getColumnByTemplateId,
  getTaskDetail, // 获取任务详情
  getAllColumn,
  createColumn,
  createTemplate,
  deleteTemolate,
  getTemplateList,
  updateTask,
  taskManage,
  updateTemplate,
  deleteColumnById,
  getTaskList,
  updateTaskStatus,
  createEvent,
  getEventList,
  getEvemtDetail,
  getMeetingList,
  createMeeting
}
