import Article from '../model/Article';
import Tag from '../model/Tags';
import TagsArticle from '../model/TagsArticle';
import {ArticleType,TagType} from '../types/article';


class ArticleService{
    // 获取所有文章
    async getAllArticle(){
        return Article.findAll();
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
}

export default new ArticleService;