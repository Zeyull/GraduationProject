import {Context} from 'koa';
import { addCaptcha } from '../../utils/captcha';
import { sendCodeMail } from '../../utils/mail';
import { randomCaptcha } from '../../utils/random';
import response from '../../utils/response';
import UserService from '../service/UserService';
import validate from '../../utils/validate';
import { Rules } from "async-validator";
import { emailRules } from '../../utils/rules';
/**
 * IndexController
 * @class
 */
class IndexController{
    async index(ctx:Context){
        const results = await UserService.getUserById(1);
        ctx.body= results;
    }
    /**
     * Post 获取验证码
     * @param {string} email 邮箱
     */
    async getCaptcha(ctx:Context){
        const data = ctx.request.body;
        // 输入校验
        const rules:Rules = {
            email:emailRules,
        }
        interface IEmail{
            email:string,
        }
        const {error} = await validate<IEmail>(data,rules);
        if(error !== null){
            return response.error(ctx,error,{},400);
        }
        const captcha = randomCaptcha(6);
        try {
            const res = await sendCodeMail(data.email,captcha);
            if(res.code === 200){
                addCaptcha(data.email,captcha);
                return response.success(ctx,{},'验证码已发送',200);
            }
        }catch(err){
            return response.error(ctx,'验证码发送失败，请检查邮箱是否正确或稍后重试',{},400);
        }
    }
}

export default new IndexController;