import {Context} from 'koa';
import UserService from '../service/UserService';

class IndexController{
    async index(ctx:Context){
        const results = await UserService.getUserById('1');
        ctx.body= results;
    }
}

export default new IndexController;