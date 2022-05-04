import {Context} from 'koa';
import fs from 'fs';
import path from 'path';
import response from '../../utils/response';
import { Rules } from "async-validator";
import {uuidRules}from '../../utils/rules';
import validate from '../../utils/validate';
import UserService from '../service/UserService';
/**
 * UploadController
 * @class
 */
class UploadController {
    /**
     * Post 修改用户头像
     * @param {string} uuid 用户ID
     * @param {file} file 用户头像
     * @returns {url:string} 用户头像路径
     */
    async uploadHeaderImage(ctx: Context){
        // 数据校验
        const uuid = Number(ctx.request.body.uuid);
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
        const recordUser = await UserService.getUserById(uuid);
        if(recordUser === null){
            return response.error(ctx,'用户不存在',{},400);
        }
        const file = ctx.request.files?.file;
        if(file){
            //@ts-ignore
            const fileType = file.mimetype;
            const typeSet = new Set(['image/jpeg','image/png','image/jpg']);
            if(!typeSet.has(fileType)){
                return response.error(ctx,'图片格式只能为jpeg,jpg,png',{},400);
            }
            //@ts-ignore
            const reader = fs.createReadStream(file.filepath);
            //@ts-ignore
            const ext = path.extname(file.originalFilename);
            //@ts-ignore
            const filePath = '/upload/headerImage/' + `${file.hash}${ext}`;
            //@ts-ignore
            const writer = fs.createWriteStream('statics' + filePath);
            reader.pipe(writer);
            await UserService.updateHeaderImg(filePath,uuid);
            response.success(ctx,{url:filePath},'头像上传成功',200);
        }else{
            response.error(ctx,'文件不可以为空',{},400);
        }
    }
}
export default new UploadController