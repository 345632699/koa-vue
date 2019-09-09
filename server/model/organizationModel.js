let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const Block = require('../model/taskBlockModel')

const organization = sequelize.define('organization', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  group_name: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  position: {
    type: Sequelize.STRING
  },
  parent_id: {
    type: Sequelize.INTEGER
  },
  level: {
    type: Sequelize.INTEGER
  },
  block_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: true,
  deletedAt: false,
  freezeTableName: true,
  tableName: 'sp_task_organization',
  underscored: true
})
let contact = require('./organizationContactModel')
organization.hasOne(contact, { as: 'contact', foreignKey: 'organization_id' })
Block.hasMany(organization, {foreignKey: 'block_id', targetKey: 'id', as: 'organizations'})
organization.belongsTo(Block, {foreignKey: 'block_id', targetKey: 'id', as: 'block'})
module.exports = organization
