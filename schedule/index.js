/*
* 定时任务
* */

const CronJob = require('cron').CronJob;
module.exports = (callback) => new CronJob('0/1 * * * * *', async function () {

}, null, true);


