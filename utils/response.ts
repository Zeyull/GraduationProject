import { Context } from "koa";
/**
 * 成功返回信息处理
 * @param ctx 
 * @param data 返回数据
 * @param msg 正确提示信息
 * @param code 状态码
 */
function success(ctx: Context,data: any = [],msg:string = 'success',code: number = 0){
    ctx.body = {
        code,
        msg,
        data
    }
}
/**
 * 
 * @param ctx 
 * @param data 返回数据
 * @param msg 错误提示信息
 * @param code 状态码
 */
function error(ctx: Context,msg:string = 'error',data: any = [],code: number = 1){
    ctx.body = {
        code,
        msg,
        data
    }
}

export default{
    success,
    error
}