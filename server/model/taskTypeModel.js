// 任务类型表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const taskType = sequelize.define('task_type', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'sp_task_type',
  underscored: true
})

module.exports = taskType
