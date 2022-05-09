export function clearLocalStorage() {
  const items = ['token', 'userInfoAtom'];
  items.forEach((item) => {
    localStorage.removeItem(item);
  });
}

// 处理评论内容 分为评论内容和回复内容 返回IDMap
export function getCommentByHandle(comments: CommentType[]) {
  const map = new Map();
  comments.forEach((comment) => {
    if (comment.reply_id === 0) {
      map.set(comment.comment_id, []);
    }
  });
  comments.forEach((comment) => {
    if (comment.reply_id !== 0) {
      let temp = comment;
      while (!map.has(temp.reply_id)) {
        temp = comments.find((item) => {
          return item.comment_id === temp.reply_id;
        }) as CommentType;
      }
      map.set(temp.reply_id, map.get(temp.reply_id).concat(comment.comment_id));
    }
  });
  return map;
}

export function mdToNormalString(md: string) {
  if (!md) {
    return '';
  } else {
    let str = md
      .replace(/(\*\*|__)(.*?)(\*\*|__)/g, '')
      .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g, '')
      // .replace(/\[[\s\S]*?\]\([\s\S]*?\)/g,'')                    //全局匹配连接
      // .replace(/<\/?.+?\/?>/g,'')                                 //全局匹配内html标签
      // .replace(/(\*)(.*?)(\*)/g,'')                               //全局匹配内联代码块
      // .replace(/`{1,2}[^`](.*?)`{1,2}/g,'')                       //全局匹配内联代码块
      // .replace(/```([\s\S]*?)```[\s]*/g,'')                       //全局匹配代码块
      .replace(/\~\~(.*?)\~\~/g, '')
      // .replace(/[\s]*[-\*\+]+(.*)/g,'')                           //全局匹配无序列表
      // .replace(/[\s]*[0-9]+\.(.*)/g,'')                           //全局匹配有序列表
      // .replace(/(#+)(.*)/g,'')                                    //全局匹配标题
      // .replace(/(>+)(.*)/g,'')                                    //全局匹配摘要
      .replace(/\r\n/g, '')
      .replace(/\n/g, '')
      .replace(/\s/g, '')
      .replace(/`+/g, '')
      .replace(/#+/g, '')
      .replace(/-+/g, '');
    return str.slice(0, 200);
  }
}
