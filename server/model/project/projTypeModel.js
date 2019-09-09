// 任务表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const projectType = sequelize.define('project_type', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  icon: Sequelize.STRINGD
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'base_project_type',
  underscored: true
})

module.exports = projectType
