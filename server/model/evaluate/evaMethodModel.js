// 评估方法
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
const evaluateMethod = sequelize.define('eva_method', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
},
{
  timestamps: true,
  freezeTableName: true,
  tableName: 'base_eva_method',
  underscored: true
})

module.exports = evaluateMethod
