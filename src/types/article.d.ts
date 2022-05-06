declare interface ArticleTags {
  tags_id?: number;
  tags_name: string;
}
// 文章粗略展现
declare interface ArticleData {
  href?: string;
  title: string;
  avatar: string;
  content: string;
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
}
