export  interface ArticleType{
    article_id?:number,
    article_title:string,
    article_content:string, 
    time:string,
    author_id:number,
    like?:number,
    img?:string|null,
    question_id?:number|null,
    author_img:string
}

export interface TagType{
    tags_id?:number,
    tags_name:string,
}

export interface CommentType{
    comment_id?:number,
    article_id:number
     uuid:number
     content:string
     time:string
     user_name:string
     reply_id:number
     reply_name:string
     head_img:string
}