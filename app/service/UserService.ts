import { sequelize } from '../db';
import User from '../model/User';
import {userInfo} from '../types/user'

class UserService{
    async getUserById(uuid:number){
        return User.findByPk(uuid);
    }
    async getUserByEmail(email:string){
        return User.findOne({where: {email: email}});
    }
    async createUser(data:{user_name:string,email:string,password:string}){
        return User.create(data);
    }
    async updateUser(data:userInfo,uuid:number){
        return User.update({...data},{
            where:{
                uuid
            }
        })
    }
    async updateHeaderImg(url:string,uuid:number){
        return User.update({head_img:url},{
            where:{
                uuid
            }
        })
    }
}

export default new UserService;