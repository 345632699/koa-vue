'use strict'

import jwt from 'jsonwebtoken'
const {secret} = require('../config')

function verifyToken (ctx) {
  if (ctx.request.url.search('/api/') !== -1) {
    let token = ctx.request.header.authorization
    console.log('token...', token.substring(7)) // 去掉'Bearer '
    var decoded = jwt.verify(token.substring(7), secret)// 去掉'Bearer '
    console.log('decoded...', decoded) //
  }
}

function verifyNewBrowserUser (ctx) {
  console.log('verifyNewBrowserUser...', ctx.session)
  if (ctx.session.isNew) {
    return true
  } else {
    return false
  }
}

export default {
  verifyToken, // 验证token是否相同
  verifyNewBrowserUser // 验证Session是否相同
}
