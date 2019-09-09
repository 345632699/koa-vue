/**
 * 基础表格sql语句
 */
'use strict'

const BaseSql = {
  region: {
    TABLE: 'base_region',
    FIELD_ID: 'id',
    FIELD_NAME: 'name'
  },
  department: {
    TABLE: 'base_department',
    FIELD_ID: 'id',
    FIELD_NAME: 'name',
    FIELD_PARENT_ID: 'parent_id'
  },
  projectType: {
    TABLE: 'base_project_type',
    FIELD_ID: 'id',
    FIELD_NAME: 'name',
    FIELD_ICON: 'icon'
  },
  engeeringType: {
    TABLE: 'base_engineering_type',
    FIELD_ID: 'id',
    FIELD_NAME: 'name'
  }
}

module.exports = BaseSql
