'use strict';

const {loglevel} = require('../config');
const dateUtils = require('./datetime_utils')
const log4js = require('log4js');
/**
 * configure方法为配置log4js对象，内部有levels、appenders、categories三个属性
 * levels:
 *         配置日志的输出级别,共ALL<TRACE<DEBUG<INFO<WARN<ERROR<FATAL<MARK<OFF八个级别,default level is OFF
 *         只有大于等于日志配置级别的信息才能输出出来，可以通过category来有效的控制日志输出级别
 * appenders:
 *         配置文件的输出源，一般日志输出type共有console、file、dateFile三种
 *         console:普通的控制台输出
 *         file:输出到文件内，以文件名-文件大小-备份文件个数的形式rolling生成文件
 *         dateFile:输出到文件内，以pattern属性的时间格式，以时间的生成文件
 *                 
 */

log4js.configure({
    appenders: {
        sponge: {
            type: "dateFile",
            filename: './logs/sponge-city',//您要写入日志文件的路径
            alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
            //compress : true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
            pattern: "-yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
            encoding: 'utf-8',//default "utf-8"，文件的编码
            category: "log_date",
        }
    },
    categories: { default: { appenders: ['sponge'], level: loglevel } }
});

const loggerfile = function () {
    var createDate = new Date();
    var createTime = dateUtils.dateToStr("YYYY-MM-DD", createDate)
    let logfile = './logs/sponge-city-' + createTime + '.log';
    return logfile
}

export const logger = log4js.getLogger(loggerfile())
