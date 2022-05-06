export  interface ArticleType{
    article_id?:number,
    article_title:string,
    article_content:string, 
    time:string,
    author_id:number,
    like?:number,
    img?:string|null,
    question_id?:number,
}

export interface TagType{
    tags_id?:number,
    tags_name:string,
}