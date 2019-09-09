// 子任务模型
// 任务类型表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const ChildTask = sequelize.define('child_task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  child_task_name: {
    type: Sequelize.STRING
  },
  organization_id: Sequelize.INTEGER,
  task_id: Sequelize.INTEGER,
  status: Sequelize.INTEGER,
  end_time: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'sp_child_task',
  underscored: true
})

module.exports = ChildTask
