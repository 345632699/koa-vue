// 任务模板表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')

const TaskTemplate = sequelize.define('task_template', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  memo: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'sp_task_template',
  underscored: true
})

module.exports = TaskTemplate
