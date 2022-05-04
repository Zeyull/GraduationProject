import { Context, Next } from "koa"

/**
 * 错误捕捉中间件
 */
export default async function ErrorMiddleware(ctx:Context, next:Next){
    try {
      ctx.error = (code:any, message:any) => {
        if (typeof code === 'string') {
          message = code
          code = 500
        }
        ctx.throw(code || 500, message || '服务器错误')
      }
      await next()
    } catch (e:any) {
      let status = e.status || 500
      let message = e.message || '服务器错误'
      ctx.response.body = { status, message }
    }
}
