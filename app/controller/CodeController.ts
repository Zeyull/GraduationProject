import {Context} from 'koa';
import response from '../../utils/response';
import FrontService from '../service/FrontService';
import validate from '../../utils/validate';
import { Rules } from "async-validator";
import { questionContentRules,questionNameRules } from '../../utils/rules';
import {FrontQuestion} from '../types/question';
import QuestionService from '../service/QuestionService';
import config from '../config';
import axios from "axios";

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

    /**
     * Get 通过ID获取题目
     * @param {number} question_id 题目ID
     * @param {number} uuid 用户ID
     * @return {question} 题目内容
     */
    async getQuestionByID(ctx: Context){
        const data = ctx.request.query;
        const uuid = Number(data.uuid);
        const question_id = Number(data.question_id);
        let res = await QuestionService.getQuestionByID(question_id);
        const successSubmission = await QuestionService.getQuestionRightCommitByID(question_id);
        const allSubmission = await QuestionService.getQuestionCommitsByID(question_id);
        if(res === null){
            return response.error(ctx,'题目未找到',{},400);
        }
        // @ts-ignore
        res.dataValues.successSubmission = successSubmission;
        // @ts-ignore
        res.dataValues.allSubmission = allSubmission;
        // @ts-ignore
        res.dataValues.passRate =  allSubmission === 0 ? 0 :  successSubmission/ allSubmission;
        return response.success(ctx,{question:res},'获取题目成功',200);
    }

    /**
     * Get 获取所有题目
     * @param {string} uuid 用户ID
     * @returns {question[]} 题目
     */
    async getAllQuestion(ctx: Context){
        const data = ctx.request.query;
        const uuid = Number(data.uuid);
        const res = await QuestionService.getAllQuestion();
        const commitsPromise:any = [];
        const rightPromise:any = [];
        const questionStatusPromise:any = [];
        const solutionPromise:any = [];

        res.forEach(item=>{
            commitsPromise.push(QuestionService.getQuestionCommitsByID(item.question_id));
            rightPromise.push(QuestionService.getQuestionRightCommitByID(item.question_id));
            questionStatusPromise.push(QuestionService.getUserQuestionStatus(uuid,item.question_id));
            solutionPromise.push(QuestionService.getQuestionSolutionsByID(item.question_id));
        })
        const commitsQuestion =  await Promise.all(commitsPromise);
        const rightQuestion = await Promise.all(rightPromise);
        const questionStatus = await Promise.all(questionStatusPromise);
        const solutionsArr = await Promise.all(solutionPromise);
        res.forEach((_item:any,index:number) =>{
            // @ts-ignore
            res[index].dataValues.passRate = commitsQuestion[index] === 0 ? 0 :  rightQuestion[index]/ commitsQuestion[index];
            // @ts-ignore
            res[index].dataValues.state =  questionStatus[index] === null ||  questionStatus[index].state ===  0 ? 0 : 1;
            // @ts-ignore
            res[index].dataValues.solutions =  solutionsArr[index];
            
        });
        response.success(ctx,{question:res},'获取所有题目',200);
    }

    /**
     * Post 判题
     * @param {string} question_id 问题ID
     * @param {string} code 输入内容
     * @param {string} language 语言
     * @param {number} uuid 用户id
     * @param {string} time 提交时间
     * @param
     * @return {result} 返回结果
     */
    async judgeCode(ctx: Context){
        const data = ctx.request.body;
        const session = config.code.session;
        const long_session = config.code.long_session as string;
        const csrfToken = config.code.csrftoken as string;
        let submissionID = "";
        await axios.post('http://118.31.58.57:8080/api/submission',{
            code: data.code,
            language: data.language,
            problem_id: data.question_id,
        },{
            headers: {
                "Cookie" : long_session,
                "X-CSRFToken": csrfToken
            }
        })
        .then((res:any) => {
            submissionID = res.data.data.submission_id;
        })
        .catch(err => {
            console.log(err);
        });
        if(submissionID === ""){
            return response.error(ctx,'判题请求错误',{},400);
        }
        let flag =true;
        let apiRes:any = {};
        while(flag){
            await axios.get(`http://118.31.58.57:8080/api/submission?id=${submissionID}`,
            {
                headers: {
                    "Cookie" : 'sessionid=' + session
                },
            }).then((res:any) => {
                if(Object.keys(res.data.data.statistic_info ).length !== 0){
                    flag = false;
                    apiRes = res.data.data;
                }
            }).catch(err => {
                console.log(err);
            });
        }
        if(apiRes.result === 0){
            await QuestionService.createUserQuestion({
                uuid:Number(data.uuid),
                question_id:Number(data.question_id),
                state:1,
                date:data.time,
                language:apiRes.language,
                time:apiRes.statistic_info.time_cost,
                submission_id:submissionID
            });
        }else{
            await QuestionService.createUserQuestion({
                uuid:Number(data.uuid),
                question_id:Number(data.question_id),
                state:0,
                date:data.time,
                language:apiRes.language,
                time:apiRes.statistic_info.err_info === undefined ? apiRes.statistic_info.time_cost : "0",
                submission_id:submissionID
            });
        }
        response.success(ctx,{result:apiRes},'结果已返回',200); 
    }

    /**
     * Get 获取用户某题目提交记录
     * @param {string} uuid 用户ID
     * @param {string} question_id 题目ID
     * * @return {UserQuestion} 提交记录
     */
    async getJudgeSubmitsByID(ctx: Context){
        const data = ctx.request.query;
        const uuid = Number(data.uuid);
        const question_id = Number(data.question_id);
        const res = await QuestionService.getJudgeSubmitsByID(uuid, question_id);
        response.success(ctx,{list:res},'获取记录成功',200);
    }

    /**
     * Get 获取某个用户的所有题的提交记录
     * @param {string} uuid 用户ID
     * @return {UserQuestion[]} 提交记录数组
     */
    async getSubHistoryByID(ctx:Context){
        const data = ctx.request.query;
        const uuid = Number(data.uuid);
        const res = await QuestionService.getSubHistoryByID(uuid);
        const questionResPromise:any = [];
        res.forEach((item) => {
            questionResPromise.push(QuestionService.getQuestionByID(item.question_id));
        })
        const questionRes = await Promise.all(questionResPromise);
        res.forEach((item,index) => {
            // @ts-ignore
            item.dataValues.question_name = questionRes[index].question_name;
            // @ts-ignore
            item.dataValues.question_index = questionRes[index].question_index;
            // @ts-ignore
            item.dataValues.level = questionRes[index].level;
        })
        return response.success(ctx,{res},'获取提交记录成功',200);
    }

    /**
     * Get 获取每日一题
     */
    async getDailyQuestion(ctx: Context){
        const res = await QuestionService.getDailyQuestion();
        response.success(ctx,{data:res},'获取每日一题成功',200);
    }

}

export default new CodeController;