import {Context} from 'koa';
import fs from 'fs';
import path from 'path';
import response from '../../utils/response';
import { randomStr } from '../../utils/math';

class UploadController {
    uploadHeaderImage(ctx: Context){
        const file = ctx.request.files?.file;
        if(file){
            //@ts-ignore
            const fileType = file.type;
            const typeSet = new Set(['image/jpeg','image/png','image/jpg']);
            if(!typeSet.has(fileType)){
                return response.error(ctx,'图片格式只能为jpeg,jpg,png');
            }
            //@ts-ignore
            const reader = fs.createReadStream(file.path);
            //@ts-ignore
            const ext = path.name(file.name);
            const filePath = '/upload/headerImage/' + `${randomStr(32)}${ext}`
            //@ts-ignore
            const writer = fs.createWriteStream('statics' + filePath);
            reader.pipe(writer);
            response.success(ctx,{file:filePath});
        }else{
            response.error(ctx,'文件不可以为空');
        }
    }
    
}