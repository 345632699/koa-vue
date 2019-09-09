// 模板关联字段映射表模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
let organization = require('../model/organizationModel')
let Meeting = require('../model/taskMeetingModel')
const MeetingOrganization = sequelize.define('task_meeting_organization', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  organization_id: {
    type: Sequelize.INTEGER,
    references: {
      model: organization,
      key: 'id'
    }
  },
  meeting_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Meeting,
      key: 'id'
    }
  },
  organization_name: Sequelize.STRING
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'sp_task_meeting_organization',
  underscored: true
})

module.exports = MeetingOrganization
