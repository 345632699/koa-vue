// 模板关联字段映射表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const Block = sequelize.define('block', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  org_title: Sequelize.STRING
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'sp_task_block',
  underscored: true
})

module.exports = Block
