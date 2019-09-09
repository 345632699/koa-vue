'use strict'

const taskSql = {
  // 组织架构表
  organization: {
    // 获取素有的菜单
    getOrganizationList: 'select * from sp_task_organization where parent_id=0',
    // 获取海绵办子级列表
    getChildList: 'select * from sp_task_organization where parent_id > 0',
    // 更新组织成员记录
    editOrganization: 'replace into sp_task_organization (id,group_name,name,position,parent_id,level,block_id) values ?',
    // 删除组织记录
    deleteOrganizationRecord: 'delete from sp_task_organization where id in(?)',
    // 查询需要更新的子级
    getNeedUpdateChild: 'select id,group_name from sp_task_organization where parent_id = -1',
    // 根据group_name取parent_id
    getParentId: 'select id from sp_task_organization where name = ?',
    // 更新子级菜单里的parent_id 在创建完三级架构后执行
    updateChildParentId: 'update sp_task_organization set parent_id = ? where id = ?'
  }
}
module.exports = taskSql
