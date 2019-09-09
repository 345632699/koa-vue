// 模板字段表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
let TaskTemplate = require('../model/taskTemplateModel')
let TemplateColumn = require('../model/taskTempColModel')
const TaskColumn = sequelize.define('task_column', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.INTEGER
  },
  value: {
    type: Sequelize.STRING
  },
  unit: {
    type: Sequelize.STRING
  },
  required: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'sp_task_column',
  underscored: true
})

TaskColumn.belongsToMany(TaskTemplate, { as: 'Templates', through: TemplateColumn, foreignKey: 'column_id' })
TaskTemplate.belongsToMany(TaskColumn, { as: 'Columns', through: TemplateColumn, foreignKey: 'template_id' })
// sequelize.sync()
module.exports = TaskColumn
