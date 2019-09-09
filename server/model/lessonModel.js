let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')

let lesson = sequelize.define('3m_user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.TEXT
  },
  free: {
    type: Sequelize.BOOLEAN
  },
  // 时间戳
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at'
  }
}, {
  timestamps: true,
  deletedAt: false,
  freezeTableName: true,
  tableName: 'lessons'
})

module.exports = lesson
