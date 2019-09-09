'use strict'

const UserSql = {

  user: {
    insert: 'INSERT INTO d_user SET ?',
    update: 'UPDATE d_user SET ',
    findById: 'SELECT * FROM d_user WHERE id =:id ',
    findByPhone: 'SELECT * FROM d_user WHERE phone =:phone ',
    getUserPageList: 'SELECT * FROM d_user  @params ORDER BY created_time DESC   LIMIT :start, :size ',
    getUserPageCount: 'SELECT count(*) as count FROM d_user  @params  LIMIT 1',
    findByGroupId: 'SELECT id,name,phone FROM d_user WHERE status=:status AND group_id =:group_id '
  }
}
module.exports = UserSql
