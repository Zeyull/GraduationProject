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
const app = new Koa;

app
.use(koaBody({
    multipart:true,
    formidable: {
        maxFieldsSize: 200 * 1024 * 1024 // 设置文件大小最多2MB
    }
}))
.use(koaStatic(path.join(__dirname, '..','statics')))
.use(AccessLoggerMiddleware)
.use(router.routes());

const run = (port:any):Server => {
    return app.listen(port);
}
export default run;