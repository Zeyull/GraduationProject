declare interface ArticleTags {
  tags_id?: number;
  tags_name: string;
}
// 文章粗略展现
declare interface ArticleData {
  id: number;
  title: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  img: string | null;
  tags: any;
}

declare interface ArticleType {
  article_content: string;
  article_id: number;
  article_title: string;
  author_id: number;
  img: string;
  like: number;
  question_id: number | null;
  time: string;
  author_img: string;
}

declare interface CommentType {
  article_id?: number;
  comment_id: number;
  content: string;
  reply_id: number;
  reply_name: string;
  time: string;
  user_name: string;
  head_img: string;
  uuid: number;
}
