import {Context} from 'koa';
import {sign} from '../../utils/auth';
import UserService from '../service/UserService';
import response from '../../utils/response';
import { createPwdHash } from '../../utils/hash';
import validate from '../../utils/validate';
import { Rules } from "async-validator";
import {emailRules, usernameRules, passwordRules,captchaRules,typeRules}from '../../utils/rules';
import { validateCaptcha } from '../../utils/captcha';

/**
 * LoginController
 * @class 
 */
class LoginController{
    async index(ctx:Context){
        const rules:Rules = {
            email:[
                {
                    type: 'string',
                    required: true,
                    message: '邮箱不能为空'
                }
            ],
            password:[
                {
                    type: 'string',
                    required: true,
                    message: '密码不能为空'
                }
            ]
        }
        interface IUser{
            email:string,
            password:string,
        }
        const {error} = await validate<IUser>(ctx.request.body,rules);
        if(error !== null){
            return response.error(ctx,error);
        }
        const user = await UserService.getUserById(1);
        if(user  ===  null){
            return response.error(ctx,'用户不存在',{})
        }
        const token = sign(user);
        response.success(ctx,{token});
    }
    /**
     * Post 注册接口
     * @param {string} user_name 用户名
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @param {string} captcha 验证码
     */
    async register(ctx: Context){
        const data = ctx.request.body;
        // 输入校验
        const rules:Rules = {
            user_name:usernameRules,
            email:emailRules,
            password:passwordRules,
            captcha:captchaRules
        }
        interface IUser{
            user_name:string,
            email:string,
            password:string,
            captcha:string
        }
        const {error} = await validate<IUser>(data,rules);
        if(error !== null){
            return response.error(ctx,error,{},400);
        }
        // 校验邮箱是否存在
        const recordUser = await UserService.getUserByEmail(data.email);
        if(recordUser !== null){
            return response.error(ctx,'该邮箱已存在',{},400);
        }
        // 验证码验证
        const captchaFlag = validateCaptcha(data.email,data.captcha);
        if(!captchaFlag){
            return response.error(ctx,'验证码错误',{},400);
        }
        // 密码加密
        data.password = createPwdHash(data.password);
        // 插入数据库
        const createUser = await UserService.createUser(data);
        if(createUser === null){
            return response.error(ctx,'用户创建失败',{},400);
        }else{
            const user = await UserService.getUserByEmail(data.email);
            const token = sign(user);
            return response.success(ctx,{token,userInfo:user},'用户创建成功',200);
        }
    }

    /**
     * Post 登录接口
     * @param {string} email 邮箱
     * @param {string} Password_Captcha 密码或验证码
     * @param {number} type 登录类型 0是验证码登录 1是邮箱登录
     * @returns {token:string|uuid:number} 用户Token 用户ID
     */
    async login(ctx: Context){
        const data = ctx.request.body;
        if(data.type === 0){
            // 验证码校验
            const rules:Rules = {
                email:emailRules,
                captcha:captchaRules,
                type:typeRules
            }
            interface IUser{
                email:string,
                captcha:string,
                type:number
            }
            const {error} = await validate<IUser>(data,rules);
            if(error !== null){
                return response.error(ctx,error,{},400);
            }
            // 邮箱验证
            const recordUser = await UserService.getUserByEmail(data.email);
            // 验证码验证
            const captchaFlag = validateCaptcha(data.email,data.captcha);
            // 登录验证
            if(recordUser === null || captchaFlag === false){
                return response.error(ctx,'邮箱不存在或验证码错误',{},400);
            }    
        }else if(data.type === 1){
            // 密码校验
            const rules:Rules = {
                email:emailRules,
                password:[
                    { type:'string', required: true, message: '密码不能为空' },
                ],
                type:typeRules
            }
            interface IUser{
                email:string,
                password:string,
                type:number
            }
            const {error} = await validate<IUser>(data,rules);
            if(error !== null){
                return response.error(ctx,error,{},400);
            }
            // 邮箱验证
            const recordUser= await UserService.getUserByEmail(data.email);
            // 密码验证
            const newPWD = createPwdHash(data.password);
            // 登录验证
            if(recordUser === null || newPWD !== recordUser.password){
                return response.error(ctx,'邮箱不存在或密码错误',{},400);
            }    
        }else{
            return response.error(ctx,'登录类型错误',{},400);
        }
        const user = await UserService.getUserByEmail(data.email);
        const token = sign(user);
        //@ts-ignore
        response.success(ctx,{token,uuid:user.uuid},'登录成功',200);
    }
}
export default new LoginController;