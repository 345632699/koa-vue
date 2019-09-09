let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
let organizationModel = require('./organizationModel')

let organizationContact = sequelize.define('organization_contact', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  organization_id: {
    type: Sequelize.INTEGER,
    references: {
      model: organizationModel,
      key: 'id'
    }
  },
  mobile: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'sp_task_organization_contact',
  underscored: true
})

module.exports = organizationContact
