const dir = require("../root")

module.exports = {
    replaceConsole: true,
    pm2: true,
    appenders: {
        stdout: {//控制台输出
            type: 'console'
        },
        req: {  //请求转发日志
            type: 'dateFile',    //指定日志文件按时间打印
            filename: dir('/logs/req_log/log'),  //指定输出文件路径
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            daysToKeep: 3,
        },
        err: {  //错误日志
            type: 'dateFile',
            filename: dir('/logs/err_log/log'),
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,

        },
        oth: {  //其他日志
            type: 'dateFile',
            filename: dir('/logs/oth_log/log'),
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            daysToKeep: 3,

        },
        /* email: {
             type: '@log4js-node/smtp',
             sender: "", //发送邮件的邮箱
             subject: 'Latest error report', //标题
             SMTP: {
                 host: "", //smtp.qq.com
                 auth: {user: 'xxx@qq.com', pass: '密码'}, //auth { user: 'xxx@qq.com', pass: '密码' }
             },
             recipients: "", //接收邮件的邮箱
         },
 */
        fatal: {  //错误日志
            type: 'dateFile',
            filename: dir('/logs/fatal_log/log'),
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
        warn: {
            type: 'dateFile',
            filename: dir('/logs/warn_log/log'),
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            daysToKeep: 3,

        }
    },
    categories: {
        //appenders:采用的appender,取appenders项,level:设置级别
        default: {appenders: ['req'], level: 'debug'},
        err: {appenders: ['err'], level: 'error'},
        other: {appenders: ["oth"], level: "info"},
        fatal: {appenders: ["fatal"], level: "fatal"},
        warn: {appenders: ["warn"], level: "warn"}
    }
}
