import {Context} from 'koa';
import response from '../../utils/response';
import FrontService from '../service/FrontService';
import validate from '../../utils/validate';
import { Rules } from "async-validator";
import { questionContentRules,questionNameRules } from '../../utils/rules';
import {FrontQuestion} from '../types/question';
/**
 * CodeController
 * @class
 */
class CodeController{
    /**
     * Get 获取前端相关题目内容 
     * @return {frontQuestion:{question_name:string, question_content:string}} 返回所有前端相关题目
     */
    async getAllFrontQuestion(ctx:Context){
        const results = await FrontService.getAllFrontQuestion();
        // 没有数据时返回空数组[]
        if(results === null){
            return response.error(ctx,'获取题目失败',{},400);
        }
        return response.success(ctx,{frontQuestion: results},'获取题目成功',200);
    }

    /**
     * Post 创建新的前端题目
     * @param {string} question_name 题目名
     * @param {string} question_content 题目内容
     */
    async createFrontQuestion(ctx: Context){
        const data = ctx.request.body;
        const rules:Rules = {
            question_name:questionNameRules,
            question_content:questionContentRules
        }
        const {error} = await validate<FrontQuestion>(data,rules);
        if(error !== null){
            return response.error(ctx,error,{},400);
        }
        // 返回新创建的数据时字段和主键，数据实例中的没有的字段和数据库中数据字段可能不一致
        await FrontService.createFrontQuestion(data);
        return response.success(ctx,{},'创建成功',200);

    }
}

export default new CodeController;