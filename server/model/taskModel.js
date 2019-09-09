// 任务表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
let taskType = require('../model/taskTypeModel')
let organization = require('../model/organizationModel')
let TaskOrgnization = require('../model/taskOrganizationModel')
let Template = require('../model/taskTemplateModel')
const task = sequelize.define('task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  task_type_id: {
    type: Sequelize.INTEGER,
    references: {
      model: taskType,
      key: 'id'
    }
  },
  assessment_standard: {
    type: Sequelize.STRING
  },
  grading_standard: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.DOUBLE
  },
  task_num: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER
  },
  template_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Template,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'sp_tasks',
  underscored: true
})

taskType.hasMany(task, {foreignKey: 'task_type_id', targetKey: 'id', as: 'tasks'})
task.belongsTo(taskType, {foreignKey: 'task_type_id', targetKey: 'id', as: 'task_types'})
// 组织架构与责任单位的关联
task.belongsToMany(organization, { as: 'Organizations', through: TaskOrgnization, foreignKey: 'task_id' })
organization.belongsToMany(task, { as: 'Tasks', through: TaskOrgnization, foreignKey: 'organization_id' })

Template.hasMany(task, {foreignKey: 'template_id', targetKey: 'id', as: 'tasks'})
// sequelize.sync()
module.exports = task
