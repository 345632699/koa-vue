// 模板关联字段映射表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const TemplateColumn = sequelize.define('template_column', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  column_id: Sequelize.INTEGER,
  template_id: Sequelize.INTEGER,
  sort: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'sp_task_template_column',
  underscored: true
})

module.exports = TemplateColumn
