/**
 * 管理员sql语句
 */
'use strict'

const AdminSql = {

  admin: {
    insert: 'INSERT INTO sp_admin SET ?',
    update: 'UPDATE sp_admin SET ',
    findById: 'SELECT * FROM sp_admin WHERE id =:id ',
    findByUsername: 'SELECT * FROM sp_admin WHERE username =:username ',
    getPageCount: 'SELECT count(*) as count FROM sp_admin   @params  LIMIT 1',
    getPageList: 'SELECT id ,username ,nickname ,status ,power ,email ,created_time ,login_time ,last_login_time FROM sp_admin   @params ORDER BY created_time  DESC   LIMIT :start, :size '
  },
  banner: {
    insert: 'INSERT INTO d_banner  SET ?',
    update: 'UPDATE d_banner  SET ',
    findById: 'SELECT * FROM d_banner  WHERE id =:id ',
    findByUsername: 'SELECT * FROM d_banner  WHERE username =:username ',
    getBanners: 'SELECT * FROM d_banner   @params ORDER BY sort  DESC '
  }

}
module.exports = AdminSql
