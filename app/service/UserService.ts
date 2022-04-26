import { sequelize } from '../db';
import User from '../model/User';


class UserService{
    async getUserById(uuid:string){
        return User.findByPk(uuid);
    }
}

export default new UserService;