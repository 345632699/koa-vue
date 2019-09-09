// 模板关联字段映射表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
let organization = require('../model/organizationModel')
let taskMeetingOrganizationModel = require('../model/taskMeetingOrganizationModel')

const Meeting = sequelize.define('meeting', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  time: Sequelize.DATE,
  content: Sequelize.STRING,
  file_list: Sequelize.STRING,
  organization_id: {
    type: Sequelize.INTEGER,
    references: {
      model: organization,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'sp_task_meeting',
  underscored: true
})

Meeting.belongsTo(organization, {foreignKey: 'organization_id', targetKey: 'id', as: 'organization'})
Meeting.belongsToMany(organization, { as: 'organizations', through: taskMeetingOrganizationModel, foreignKey: 'meeting_id' })
organization.belongsToMany(Meeting, { as: 'meeting', through: taskMeetingOrganizationModel, foreignKey: 'organization_id' })
// sequelize.sync()
module.exports = Meeting
