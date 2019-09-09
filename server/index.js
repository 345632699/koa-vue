'use strict'

import Koa from 'koa'
import json from 'koa-json'
import logger from 'koa-logger'
import jwt from 'koa-jwt'
import path from 'path'
import serve from 'koa-static'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'
import { Nuxt, Builder } from 'nuxt'

import auth from './routes/authority.js'
import api from './routes/api.js'
import whitelist from './routes/whitelist'
import apiServices from './services/apiService'

const session = require('koa-session')
const RedisStore = require('koa2-session-redis')
const {secret} = require('./config')
const {redisOptions} = require('./config')
const helmet = require('koa-helmet')

async function start () {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000
  const router = koaRouter()
  const redisSessionOptions = {
    key: 'sponge:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
    /* other options */
    store: new RedisStore(redisOptions)
  }

  app.keys = [secret]
  app.use(session(redisSessionOptions, app))
  app.use(koaBodyparser())
  app.use(json())
  app.use(logger())
  app.use(helmet())

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    // console.log(ctx.request.path + ':' + ctx.request.method);
    console.log(ctx.session)
    var strAuth = '/auth/'
    var strApi = '/api/'
    var strOpen = '/open/'

    if (ctx.request.url.search(strAuth) === -1 &&
      ctx.request.url.search(strApi) === -1 &&
      ctx.request.url.search(strOpen) === -1) {
      await next()
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    } else {
      apiServices.verifyToken(ctx)
      try {
        await next()
      } catch (err) {
        if (err.status === 401) {
          ctx.status = 401
          ctx.body = {
            success: false,
            token: null,
            info: 'Protected resource, use Authorization header to get access'
          }
        } else {
          throw err
        }
      }
      // ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    }
  })

  router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
  router.use('/api', jwt({secret: secret}), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
  router.use('/open', whitelist.routes()) // 白名单，同时会让所有的auth的请求路径前面加上'/open'的请求路径。

  app.use(router.routes()) // 将路由规则挂载到Koa上。

  app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
