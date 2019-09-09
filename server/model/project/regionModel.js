// 任务表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const region = sequelize.define('region', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  region_id: Sequelize.INTEGER,
  region_code: Sequelize.STRING,
  region_name: Sequelize.STRING,
  name: Sequelize.STRING,
  path: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
  status: Sequelize.INTEGER,
  spell: Sequelize.STRING,
  letter: Sequelize.STRING,
  first_letter: Sequelize.STRING,
  parent_id: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'base_region',
  underscored: true
})

module.exports = region
