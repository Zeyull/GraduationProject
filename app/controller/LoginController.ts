import {Context} from 'koa';
import {sign} from '../../utils/auth';
import UserService from '../service/UserService';
import response from '../../utils/response';
import validate from '../../utils/validate';
import Schema, { Rules, Values } from "async-validator";
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
        const {data,error} = await validate<IUser>(ctx,rules);
        if(error !== null){
            return response.error(ctx,error);
        }
        const user = await UserService.getUserById('1');
        if(user  ===  null){
            return response.error(ctx,'用户不存在',{})
        }
        const token = sign(user);
        response.success(ctx,{token});
    }
}
export default new LoginController;