import dotenv from 'dotenv';
dotenv.config();
import db from './db'
db();
import Koa from 'Koa';
import router from './router';
import {Server} from 'http';
import AccessLoggerMiddleware from './middleware/AccessLoggerMiddleware';
import koaBody  from 'koa-body';
import koaStatic from 'koa-static'
import path from 'path';
import moment from 'moment';
import QuestionService from './service/QuestionService';
import schedule from 'node-schedule';
const app = new Koa;
// 全局验证码Map
export const captchaMap = new Map<string, string | null>();

// 生成每日一题
let rule = new schedule.RecurrenceRule();
rule.hour =0;
rule.minute =0;
rule.second =0;
// 启动任务
const job = schedule.scheduleJob(rule, () => {
    QuestionService.createDailyQuestion(moment().format('YYYY-MM-DD HH:mm:ss'));
});

app
.use(koaBody({
    multipart:true,
    formidable: {
        maxFieldsSize: 500 * 1024 * 1024, // 设置文件大小最多5MB
        hashAlgorithm:'md5'
    }
}))
.use(koaStatic(path.join(__dirname, '..','statics')))
.use(AccessLoggerMiddleware)
.use(router.routes());

const run = (port:any):Server => {
    return app.listen(port);
}
export default run;