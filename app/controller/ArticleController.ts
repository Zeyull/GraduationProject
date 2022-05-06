import {Context} from 'koa';
import response from '../../utils/response';
import ArticleService from '../service/ArticleService';
import validate from '../../utils/validate';
import { Rules } from "async-validator";
import { articleTitleRules,timeRules,articleContentRules,authorIDRules } from '../../utils/rules';
import {ArticleType} from '../types/article';
import fs from 'fs';
import path from 'path';
/**
 * CodeController
 * @class
 */
class ArticleController{
    /**
     * Get 获取所有文章
     * @return {article:{ArticleType}} 返回所有文章
     */
    async getAllArticle(ctx: Context){
        const results = await ArticleService.getAllArticle();
        // 没有数据时返回空数组[]
        if(results === null){
            return response.error(ctx,'获取文章失败',{},400);
        }
        return response.success(ctx,{article: results},'获取文章成功',200);
    }

    /**
     * Post 创建文章
     * @param {string} article_title 文章标题
     * @param {string} time 时间戳
     * @param {string} article_content 文章内容
     * @param {number} author_id 作者ID
     * @param {string} tags 文章标签
     * @param {Blob} file 图片封面
     * @returns {article_id:number} 新创建的文章字段信息
     */
    async createArticle(ctx: Context){
        // 普通数据校验
        const data = ctx.request.body;
        const rules:Rules = {
            article_title:articleTitleRules,
            time:timeRules,
            article_content:articleContentRules,
            author_id:authorIDRules
        }
        const {error} = await validate<ArticleType>({
            article_title:data.article_title,
            time:data.time,
            article_content:data.article_content,
            author_id:data.author_id,
        },rules);
        if(error !== null){
            return response.error(ctx,error,{},400);
        }
        if(data.tags === ""){
            return response.error(ctx,"每个文章至少一个标签",{},400);
        }
        const recordArticle = await ArticleService.getArticleByTitle(data.article_title);
        if(recordArticle !== null){
            return response.error(ctx,"文章标题重复",{},400);
        }
        let newArticleID:number;
        // 文件校验 字段名即file
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
            const filePath = '/upload/articleImages/' + `${file.hash}${ext}`;
            //@ts-ignore
            const writer = fs.createWriteStream('statics' + filePath);
            reader.pipe(writer);
            const res = await ArticleService.createArticle({  
                article_title:data.article_title,
                time:data.time,
                article_content:data.article_content,
                author_id:Number(data.author_id),
                img:filePath
            });
            response.success(ctx,{article_id:res.article_id},'文章创建成功',200);
            newArticleID = res.article_id;
        }else{
            const res = await ArticleService.createArticle({  
                article_title:data.article_title,
                time:data.time,
                article_content:data.article_content,
                author_id:Number(data.author_id),
            });
            response.success(ctx,{article_id:res.article_id},'文章创建成功',200);
            newArticleID = res.article_id;
        }
        const tagsArr = JSON.parse(data.tags);
        const tagsIDArr = await ArticleService.findOrCreateTagsArr(tagsArr);
        const tagsArticlePromise:any[] = [];
        tagsIDArr.forEach(tagID => tagsArticlePromise.push(ArticleService.createTagsArticle(tagID,newArticleID)));
        await Promise.all(tagsArticlePromise);
    }

    /**
     * Get 获取单独某篇文章 包括其所有标签
     * @param {number} article_id 文章ID
     */
    async getArticleByID(ctx: Context){
        const data = ctx.request.query;
        const id = Number(data.article_id);
        const results = await ArticleService.getArticleByID(id);
        // 该文章不存在
        if(results === null){
            return response.error(ctx,'获取文章失败',{},400);
        }
        const tags = await ArticleService.getArticleTags(id);
        if(tags.length === 0){
            return response.error(ctx,'该文章没有标签',{},400);
        }
        return response.success(ctx,{article: results,tags},'获取文章成功',200);
    }
}

export default new ArticleController;