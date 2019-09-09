'use strict';

import auth from '../services/usersService'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id
router.post('/user', auth.postUserAuth)

export default router