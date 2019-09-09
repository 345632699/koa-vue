'use strict'

const {redisOptions} = require('../config')
const Redis = require('ioredis')

const redis = new Redis(redisOptions)

module.exports = redis
