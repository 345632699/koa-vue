// 评估模型
let sequelize = require('../config/development').sequelize
let Sequelize = require('sequelize')
let evaluateMethod = require('evaMethodModel')
const evaluate = sequelize.define('project_type', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: Sequelize.INTEGER,
  evaluate_method_id: {
    type: Sequelize.INTEGER,
    references: {
      model: evaluateMethod,
      key: 'id'
    }
  },
  status: Sequelize.INTEGER,
  evaluate_time: Sequelize.STRING,
  type: Sequelize.INTEGER
},
{
  timestamps: true,
  freezeTableName: true,
  tableName: 'sp_evaluate',
  underscored: true
})

evaluate.hasOne()
evaluateMethod.hasMany(evaluate, {foreignKey: 'evaluate_method_id', targetKey: 'id', as: 'evaluate'})
evaluate.belongsTo(evaluateMethod, {foreignKey: 'evaluate_method_id', targetKey: 'id', as: 'methods'})

module.exports = evaluate
