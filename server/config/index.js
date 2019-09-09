'use strict';

//const logger = require('../lib/log').getLogger('TafDate', 'Config');//日志

let config = {};
/**
 * 取当前配置文件
 */
function getRelevantConfig() {
    let env = process.env.NODE_ENV;
    console.log("env ================>" , env)
    if (!env || ['development', 'production'].indexOf(env) === -1) {
        env = 'production';
//        logger.error('error find NODE_ENV:' + env);
        //throw new Error("please set the relevant NODE_ENV in you path");
    }
//    console.log('env --------------------' ,env);
    return require('./' + env);
}

module.exports = Object.assign(config, getRelevantConfig());
