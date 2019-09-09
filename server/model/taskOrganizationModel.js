// 任务 责任单位关联模型

let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const TaskOrgnization = sequelize.define('task_organization', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  task_id: Sequelize.INTEGER,
  organization_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'sp_task_organization_link',
  underscored: true
})

module.exports = TaskOrgnization
