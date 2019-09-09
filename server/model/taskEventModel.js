// 模板关联字段映射表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  publish_time: Sequelize.DATE,
  content: Sequelize.STRING,
  description: Sequelize.STRING,
  organization_id: Sequelize.INTEGER
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'sp_task_event',
  underscored: true
})

module.exports = Event
