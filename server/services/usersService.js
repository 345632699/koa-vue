'use strict';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import AdminDao from '../dao/adminDao';
const {secret} = require('../config');
const adminDaoImp = new AdminDao()

const getUserInfo = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await adminDaoImp.getUserById(id) // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const postUserAuth = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await adminDaoImp.getUserByName(data)
  if (userInfo != null) { // 如果查无此用户会返回null
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.username,
        id: userInfo.id
      }
      const token = jwt.sign(userToken, secret, { expiresIn: 60 * 60 }) // 签发token
      ctx.body = {
        success: true,
        token: token // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

export default {
  getUserInfo,
  postUserAuth
}
