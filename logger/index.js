const log4js = require('log4js');
const moment = require("moment")
moment.locale("zh-cn")
const config = require("../config/logger")
log4js.configure(config);
/*打印日志*/
exports.getLogger = () => {//name取categories项
    return {
        default: log4js.getLogger("default"),
        err: log4js.getLogger("err"),
        other: log4js.getLogger("other"),
        fatal: log4js.getLogger("fatal"),
        warn: log4js.getLogger("warn"),
    }
};
//用来与express结合
exports.useLogger = function (logger) {
    return log4js.connectLogger(logger || log4js.getLogger('default'), {
        //自定义输出格式
        format: '[:remote-addr :method :url  :status :response-timems][:referrer HTTP/:test.m-version :user-agent]'
    })
};
