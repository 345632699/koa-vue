'use strict'

import baseImp from '../services/baseService'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/getRegions', baseImp.getRegions) // 获取行政区域列表

router.get('/getDepartments', baseImp.getDepartments) // 获取行政单位列表

router.get('/getProjectTypes', baseImp.getProjectTypes) // 获取项目类型列表

router.get('/getEngeeringTypes', baseImp.getEngeeringTypes) // 获取工程类型列表

export default router