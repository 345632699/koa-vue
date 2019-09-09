// 任务表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  sn: Sequelize.STRING,
  region_name: Sequelize.STRING,
  region_id: Sequelize.INTEGER,
  proj_type_name: Sequelize.STRING,
  proj_type: Sequelize.INTEGER,
  engin_type_name: Sequelize.STRING,
  engin_type: Sequelize.INTEGER,
  project_detail: Sequelize.STRING,
  sponge_detail: Sequelize.STRING,
  project_area: Sequelize.INTEGER,
  sponge_area: Sequelize.INTEGER,
  executant: Sequelize.STRING,
  operate_type: Sequelize.STRING,
  contact_name: Sequelize.STRING,
  contact_phone: Sequelize.STRING,
  investment: Sequelize.INTEGER,
  investment_local: Sequelize.INTEGER,
  investment_social: Sequelize.INTEGER,
  investment_sponge: Sequelize.INTEGER,
  start_time: Sequelize.STRING,
  end_time: Sequelize.STRING,
  created_department: Sequelize.INTEGER,
  created_time: Sequelize.STRING,
  status: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'sp_project',
  underscored: true
})

module.exports = project
