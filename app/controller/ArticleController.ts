import {Context} from 'koa';
import response from '../../utils/response';
import ArticleService from '../service/ArticleService';
import UserService from '../service/UserService'
import validate from '../../utils/validate';
import { Rules } from "async-validator";
import { articleTitleRules,timeRules,articleContentRules,authorIDRules,authorIMGRules } from '../../utils/rules';
import {ArticleType} from '../types/article';
import fs from 'fs';
import path from 'path';
/**
 * CodeController
 * @class
 */
class ArticleController{
    /**
     * Get 获取所有文章信息
     * @return {article|tags|comments|likes} 返回所有文章
     */
    async getAllArticle(ctx: Context){
        const results = await ArticleService.getAllArticle();
        // 没有数据时返回空数组[]
        if(results.length === 0){
            return response.error(ctx,'获取文章失败',{},400);
        }
        const tagsArticlePromise:any[] = [];
        const likesNumPromise:any[]= [];
        const commentsNumPromise:any[]= [];
        results.forEach(article =>{
            tagsArticlePromise.push(ArticleService.getArticleTags(article.article_id));
            likesNumPromise.push(ArticleService.getArticleLikes(article.article_id));
            commentsNumPromise.push(ArticleService.getAllComment(article.article_id));
        });
        const tags = await Promise.all(tagsArticlePromise);
        const likesNum = await Promise.all(likesNumPromise);
        const commentsNum = await Promise.all(commentsNumPromise);
        return response.success(ctx,{article: results,tags,likesNum,commentsNum:commentsNum.map(item=>item.length)},'获取文章成功',200);
    }
    /**
     * Get 获取所有标签
     * @return {Tags} 返回所有标签
     */
    async getAllTags(ctx: Context){
        const results = await ArticleService.getAllTags();
        if(results.length === 0){
            return response.error(ctx,'获取标签失败',{},400);
        }
        return response.success(ctx,{tags: results},'获取标签成功',200);
    }
    /**
     * Post 创建文章
     * @param {string} article_title 文章标题
     * @param {string} time 时间戳
     * @param {string} article_content 文章内容
     * @param {number} author_id 作者ID
     * @param {string} tags 文章标签
     * @param {Blob} file 图片封面
     * @param {string} author_img 作者头像
     * @param {number} question_id 问题ID
     * @returns {article_id:number} 新创建的文章字段信息
     */
    async createArticle(ctx: Context){
        // 普通数据校验
        const data = ctx.request.body;
        const question_id = data.question_id === undefined ? null : Number(data.question_id);
        const rules:Rules = {
            article_title:articleTitleRules,
            time:timeRules,
            article_content:articleContentRules,
            author_id:authorIDRules,
            author_img:authorIMGRules
        }
        const {error} = await validate<ArticleType>({
            article_title:data.article_title,
            time:data.time,
            article_content:data.article_content,
            author_id:data.author_id,
            author_img:data.author_img,
        },rules);
        if(error !== null){
            return response.error(ctx,error,{},400);
        }
        if(data.tags === "[]"){
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
                author_img:data.author_img,
                question_id,
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
                author_img:data.author_img,
                question_id,
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
     * Get 某用户获取单独某篇文章
     * @param {number} article_id 文章ID
     * @param {number|null} uuid 用户ID
     * @return {article|tags|comment|likes|isLike}
     */
    async getArticleByID(ctx: Context){
        const data = ctx.request.query;
        const id = Number(data.article_id);// Number(null)=>0
        const uuid = data.uuid === void 0 ? null : Number(data.uuid);
        const results = await ArticleService.getArticleByID(id);
        // 该文章不存在
        if(results === null){
            return response.error(ctx,'获取文章失败',{},400);
        }
        const tags = await ArticleService.getArticleTags(id);
        if(tags.length === 0){
            return response.error(ctx,'该文章没有标签',{},400);
        }
        const likes = await ArticleService.getArticleLikes(id);
        let isLike = false;
        if(uuid !== null){
            const isLikeRes = await ArticleService.getUserIsLikeToArticle(id,uuid);
            if(isLikeRes !== null){
                isLike = true;
            }
        }
        const comments = await ArticleService.getAllComment(id);
        return response.success(ctx,{article: results,tags,likes,isLike,comments},'获取文章成功',200);
    }

    /**
     * Post 给某个文章点赞或取消点赞
     * @param {number} article_id 文章ID
     * @param {number} uuid 用户ID
     * @param {number} type 1:确定点赞  0:取消点赞
     */
    async getArticleLikeOrNot(ctx: Context){
        const data = ctx.request.body;
        const article_id = Number(data.article_id);
        const uuid = Number(data.uuid);
        const type = Number(data.type);
        const article = await ArticleService.getArticleByID(article_id);
        const user = await UserService.getUserById(uuid);
        if(user  ===  null || article === null){
            return response.error(ctx,'文章或用户不存在，点赞失败',{},400);
        }
        if(type === 1){
            const res = await ArticleService.createLikeToArticle(article_id,uuid);
            if(res === null){
                return response.error(ctx,'点赞失败',{},400);
            }
            return response.success(ctx,{},'点赞成功',200);
        }else if(type === 0){
            const res = await ArticleService.deleteLikeFromArticle(article_id,uuid);
            if(res === 0){
                return response.error(ctx,'取消点赞失败',{},400);
            }
            return response.success(ctx,{},'取消点赞',200);
        }else{
            return response.error(ctx,'点赞请求：type类型不对',{},400);
        }
    }

    /**
     * Post 评论文章或回评论
     * @param {number} article_id 文章ID
     * @param {number} uuid 用户ID
     * @param {string} content 评论内容
     * @param {string} time 评论时间
     * @param {string} user_name 评论用户名
     * @param {number} reply_id 回复ID
     * @param {string} reply_name 回复用户名
     * @param {string} head_img 评论用户头像
     */
    async addComment(ctx: Context){
        const data = ctx.request.body;
        const reply_id = Number(data.reply_id);
        const article_id = Number(data.article_id);
        const uuid = Number(data.uuid);
        // 判断用户文章评论是否存在 待写
        const res = await ArticleService.createComment({
            ...data,
            reply_id,
            article_id,
            uuid
        });
        if(res === null){
            response.error(ctx,'评论失败',{},400);    
        }
        response.success(ctx,{comment:res},'评论成功',200);

    }
    /**
     * Delete 删除文章
     * @param {number} article_id 删除文章的ID
     */
    async deleteArticle(ctx: Context){
        const data =ctx.request.query;
        const article_id = Number(data.article_id);
        await ArticleService.deleteArticle(article_id);
        return response.success(ctx,{},"文章删除成功",200);
    }
}

export default new ArticleController;