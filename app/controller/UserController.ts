import {Context} from 'koa';
import { addCaptcha } from '../../utils/captcha';
import { sendCodeMail } from '../../utils/mail';
import { randomCaptcha } from '../../utils/random';
import response from '../../utils/response';
import UserService from '../service/UserService';
import validate from '../../utils/validate';
import { Rules } from "async-validator";
import {emailRules, usernameRules,phoneRules,sexRules,cityRules,introductionRules,uuidRules,ageRules}from '../../utils/rules';
/**
 * UserController
 * @class
 */
class UserController{
    /**
     * Get 获取用户信息
     * @param {string} uuid 用户ID
     * @return {user} 用户信息
     */
    async getUserInfo(ctx: Context){
        const data = ctx.request.query;
        // 输入校验
        const uuid = Number(data.uuid);
        const rules:Rules = {
            uuid:uuidRules,
        }
        interface IUser{
            uuid:number,
        }
        const {error} = await validate<IUser>({uuid},rules);
        if(error !== null){
            return response.error(ctx,error,{},400);
        }
        const user = await UserService.getUserById(uuid);
        if(user === null){
            return response.error(ctx,'该用户不存在',{},400);    
        }
        response.success(ctx,{user},'获取用户信息',200);
    }

    /**
     * Post 更新用户信息
     * @param {string} uuid 用户ID
     * @param {userInfo} userInfo 用户信息
     */
    async updateUserInfo(ctx: Context){
        const data = ctx.request.body;
        // 输入校验
        const rules:Rules = {
            uuid:uuidRules,
            user_name:usernameRules,
            age:ageRules,
            email:emailRules,
            sex:sexRules,
            city:cityRules,
            introduction:introductionRules,
        }
        interface IUser{
            uuid:number,
            user_name:string,
            age:number,
            email:string,
            sex:number,
            city:string,
            introduction:string,
        }
        const {error} = await validate<IUser>({uuid:data.uuid,...data.userInfo},rules);
        if(error !== null){
            return response.error(ctx,error,{},400);
        }
        // 判断用户是否存在
        const recordUser = await UserService.getUserById(data.uuid);
        if(recordUser === null){
            return response.error(ctx,'用户不存在',{},400);
        }
        // 用户更新
        await UserService.updateUser(data.userInfo,data.uuid);
        response.success(ctx,{},'用户信息修改成功',200);
    }
}

export default new UserController;