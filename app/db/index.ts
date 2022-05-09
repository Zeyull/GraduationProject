import { Sequelize } from "sequelize-typescript";
import config from "../config";
import path from 'path';
import { dbLogger } from "../logger";

export const sequelize = new Sequelize(config.db.db_name as string,config.db.db_user as string,config.db.db_password as string, {
    host: config.db.db_host,
    port: config.db.db_port as unknown as number,
    dialect: 'mysql',
    logging:msg=>dbLogger.info(msg),
    define: {
        timestamps:false,
        freezeTableName: true,
    },
    models:[path.join(__dirname,'..','model/**/*.ts'),path.join(__dirname,'..','model/**/*.js')],
    timezone: '+08:00',
});

const db = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
export default db;