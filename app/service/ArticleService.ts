import Article from '../model/Article';
import Tag from '../model/Tags';
import UserArticle_Likes from '../model/UserArticleLikes';
import Comment from '../model/Comment';
import TagsArticle from '../model/TagsArticle';
import {ArticleType,TagType,CommentType} from '../types/article';


class ArticleService{
    // 获取所有文章
    async getAllArticle(){
        return Article.findAll();
    }
    // 获取所有标签
    async getAllTags(){
        return Tag.findAll();
    }
    // 获取某篇文章的所有标签信息
    async getArticleTags(article_id:number){
        const tagsID = await TagsArticle.findAll({
            where: {article_id:article_id},
            attributes: ['tags_id']
        });
        const tags:TagType[] = [];
        const tagsPromise = tagsID.map(item => {
            return Tag.findOne({
                where: {tags_id: item.tags_id},
            })
        });
        const res = await Promise.all(tagsPromise);
        res.forEach(item =>{
            tags.push(item as TagType);
        })
        return tags;
    }
    // 删除某篇文章
    async deleteArticle(article_id:number){
        Article.destroy({where:{article_id}});
        Comment.destroy({where:{article_id}});
        TagsArticle.destroy({where:{article_id}});
        UserArticle_Likes.destroy({where:{article_id}});
    }
    // 获取某篇文章的所有点赞数
    async getArticleLikes(article_id:number){
        return UserArticle_Likes.count({where:{article_id}});
    }
    // 查看某个用户是否对某篇文章点赞
    async getUserIsLikeToArticle(article_id:number,uuid:number){
        return UserArticle_Likes.findOne({where:{article_id,uuid}});
    }
    // 创建新的文章 返回创建的部分实例字段
    async createArticle(data:ArticleType){
        return Article.create({...data});
    }
    // 通过标题查找文章 找不到返回null
    async getArticleByTitle(title:string){
        return Article.findOne({where: {article_title: title}});
    }
    // 通过ID查找文章
    async getArticleByID(article_id:number){
        return Article.findOne({where: {article_id}});
    }
    // 寻找或创建新的标签 并返回这些标签的ID
    async findOrCreateTagsArr(tags:TagType[]){
        const tagsID:number[] = [];
        const tagsPromise = tags.map(item => {
            return Tag.findOrCreate({
                where: {tags_name: item.tags_name},
                defaults: {
                    tags_name: item.tags_name
                }
            })
        });
        const res = await Promise.all(tagsPromise);
        res.forEach(item =>{
            tagsID.push(item[0].tags_id);
        })
        return tagsID;
    }
    // 为标签和文章创建多对多的关系
    async createTagsArticle(tags_id:number,article_id:number){
        return TagsArticle.create({tags_id,article_id});
    }
    // 给某篇文章点赞
    async createLikeToArticle(article_id:number,uuid:number){
        return UserArticle_Likes.create({article_id,uuid});
    }
    // 取消某篇文章点赞
    async deleteLikeFromArticle(article_id:number,uuid:number){
        return UserArticle_Likes.destroy({where:{article_id,uuid}});
    }
    // 获取某篇文章的全部评论
    async getAllComment(article_id:number){
        return Comment.findAll({where: {article_id}});
    }
    // 评论文章或回复评论
    async createComment(data:CommentType){
        return Comment.create({...data});
    }
}

export default new ArticleService;