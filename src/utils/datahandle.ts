export function clearLocalStorage() {
  const items = ['token'];
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

export function judgeReutrn(info: any) {
  if (Object.keys(info).length === 0) {
    return {
      res: 'normal',
      msg: '',
    };
  }
  // WRONG_ANSWER = -1 (this means the process exited normally, but the answer is wrong)
  // SUCCESS = 0 (this means the answer is accepted)
  // CPU_TIME_LIMIT_EXCEEDED = 1
  // REAL_TIME_LIMIT_EXCEEDED = 2
  // MEMORY_LIMIT_EXCEEDED = 3
  // RUNTIME_ERROR = 4
  // SYSTEM_ERROR = 5
  let status = '';
  switch (info.result) {
    case -1:
      status = 'WRONG_ANSWER';
      break;
    case 0:
      status = 'SUCCESS';
      break;
    case 1:
      status = 'CPU_TIME_LIMIT_EXCEEDED';
      break;
    case 2:
      status = 'REAL_TIME_LIMIT_EXCEEDED';
      break;
    case 3:
      status = 'MEMORY_LIMIT_EXCEEDED';
      break;
    case 4:
      status = 'RUNTIME_ERROR';
      break;
    case 5:
      status = 'SYSTEM_ERROR';
      break;
    default:
      status = 'CODE_ERROR';
  }
  if (info.result === 0) {
    return {
      res: true,
      msg: `运行时间共${info.statistic_info.time_cost}ms 占用空间共${
        info.statistic_info.memory_cost / 1024
      }KB`,
      status,
    };
  } else {
    const msgErr =
      info.statistic_info.err_info === undefined
        ? `${status} 运行时间共${info.statistic_info.time_cost}ms 占用空间共${
            info.statistic_info.memory_cost / 1024
          }KB`
        : '，错误信息:' + info.statistic_info.err_info.replace(/\n/g, `\\n`);
    return {
      res: false,
      msg: `${status} ${msgErr}`,
      status,
    };
  }
  // can_unshare: true
  // code: "var fn = function(params) {\n    //write code here\n};"
  // contest: null
  // create_time: "2022-05-10T05:00:36.218470Z"
  // id: "7cfd4f8e643259962c939d7522e24934"
  // info: {err: null, data: Array(1)}
  // ip: "117.172.232.183"
  // language: "JavaScript"
  // problem: 1
  // result: -1
  // shared: false
  // statistic_info: {time_cost: 71, memory_cost: 15593472}
  // user_id: 1
  // username: "root"
}
