import styles from './index.less';
import {
  Avatar,
  Tag,
  Button,
  Comment,
  List,
  Input,
  Form,
  message,
  Collapse,
} from 'antd';
import {
  RollbackOutlined,
  LikeFilled,
  MessageFilled,
  LockOutlined,
} from '@ant-design/icons';
import { useState, useRef, useEffect, useCallback } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import moment from 'moment';
import request from '@/utils/request';
import { useAtom } from 'jotai';
import { userInfoAtom } from '@/jotai/userInfo';
import { useAuth } from '@/utils/auth';
import { getCommentByHandle } from '@/utils/dataHandle';
import { history } from 'umi';
const { TextArea } = Input;
const { Panel } = Collapse;

export default function ArticleContent(props: any) {
  const { isLogin } = useAuth();
  const [userInfo] = useAtom(userInfoAtom);
  const [article, SetArticle] = useState<ArticleType>();
  const [author, SetAuthor] = useState<UserInfo>();
  const [tags, SetTags] = useState<ArticleTags[]>();
  const [originComments, SetOriginComments] = useState<CommentType[]>([]);
  const [comments, SetComments] = useState<any>([]);
  const [isLike, SetIsLike] = useState<boolean>(false);
  const [likesNumber, SetLikesNumber] = useState<number>(0);
  const article_id = Number(props.match.params.id);
  const [replyInfo, SetReplyInfo] = useState({ comment_id: 0, reply_name: '' });
  const [commentValue, SetCommentValue] = useState('');
  const [commentReplyText, SetCommentReplyText] = useState('发表友善的评论吧');

  function handleComments(comments: CommentType[]) {
    const map = getCommentByHandle(comments);

    const resComments: any = [];
    comments?.forEach((comment) => {
      if (map.has(comment.comment_id)) {
        const tempArr = {
          author_id: comment.uuid,
          replyNum: map.get(comment.comment_id).length,
          children: [] as any,
          actions: [
            <span
              key={comment.comment_id}
              className="replySpan"
              onClick={() =>
                clickReply({
                  comment_id: comment.comment_id,
                  reply_name: comment.user_name,
                })
              }
            >
              回复
            </span>,
          ],
          author: comment.user_name,
          avatar: `${process.env.BASE_URL}${comment?.head_img}`,
          content: <p>{comment.content}</p>,
          datetime: (
            <span>{moment(comment.time).format('YYYY/MM/DD HH:mm')}</span>
          ),
        };
        const arr = map.get(comment.comment_id);
        arr.forEach((idItem: number) => {
          const findComment = comments.find((item: CommentType) => {
            return item.comment_id === idItem;
          }) as CommentType;
          // 修改评论的回复内容
          let showContent: any = '';
          if (findComment.reply_id !== comment.comment_id) {
            showContent = (
              <>
                <span>回复</span>
                <span
                  className={styles.replyName}
                  onClick={() => {
                    clickToPersonal(findComment.uuid);
                  }}
                >{`@${findComment.reply_name}`}</span>
                <span>{':' + findComment.content}</span>
              </>
            );
          }
          tempArr.children.push({
            author_id: comment.uuid,
            actions: [
              <span
                key={findComment.comment_id}
                className="replySpan"
                onClick={() =>
                  clickReply({
                    comment_id: findComment.comment_id,
                    reply_name: findComment.user_name,
                  })
                }
              >
                回复
              </span>,
            ],
            author: findComment.user_name,
            avatar: `${process.env.BASE_URL}${findComment?.head_img}`,
            content: (
              <p>{showContent === '' ? findComment.content : showContent}</p>
            ),
            datetime: (
              <span>{moment(findComment.time).format('YYYY/MM/DD HH:mm')}</span>
            ),
          });
        });
        resComments.push(tempArr);
      }
    });

    SetComments(resComments);
  }

  async function firstRequestFn() {
    let uuid;
    if (userInfo.uuid === null) {
      uuid = undefined;
    } else {
      uuid = userInfo.uuid;
    }
    // 文章请求
    const articeRes = await request.get('/getArticleByID', {
      params: {
        article_id: article_id,
        uuid,
      },
    });
    const articleData = articeRes.data.article;
    const tagsData = articeRes.data.tags;
    const likesNumber = articeRes.data.likes;
    const isLike = articeRes.data.isLike;
    const comments = articeRes.data.comments;

    if (articeRes.code >= 400) {
      message.error(articeRes.msg);
      return;
    } else if (articeRes.code === 200) {
      SetArticle(articleData);
      SetTags(tagsData);
      SetIsLike(isLike);
      SetLikesNumber(likesNumber);
      SetOriginComments(comments);
      handleComments(comments);
    }
    // 用户请求
    const userRes = await request.get('/getUserInfo', {
      params: {
        uuid: articleData.author_id,
      },
    });
    const userData = userRes.data.user;
    if (userRes.code >= 400) {
      message.error(userRes.msg);
      return;
    } else if (userRes.code === 200) {
      SetAuthor(userData);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const firstRequestCBFn = useCallback(firstRequestFn, [article_id, userInfo]);
  useEffect(() => {
    firstRequestCBFn();
  }, [firstRequestCBFn]);

  // 给文章点赞或取消点赞
  async function likeArticleOrNot() {
    if (userInfo.uuid === null) {
      return message.error('请先登录');
    }
    if (article === null) {
      return message.error('文章加载失败');
    }
    const type = isLike ? 0 : 1;
    const res = await request.post('/getArticleLikeOrNot', {
      data: {
        article_id: article?.article_id,
        uuid: userInfo.uuid,
        type,
      },
    });
    if (res.code === 200) {
      if (isLike === false) {
        if (likesNumber === 0) {
          message.success(res.msg + `！你是第一个给这篇文章点赞的用户！`);
        } else {
          message.success(res.msg + `！有${likesNumber}位小伙伴和你意见一致！`);
        }
        SetLikesNumber(likesNumber + 1);
      } else {
        message.error(res.msg);
        SetLikesNumber(likesNumber - 1);
      }
      SetIsLike(!isLike);
    } else if (res.code >= 400) {
      message.error(res.msg);
    }
  }

  // 跳转至评论区
  const commentRef = useRef<HTMLInputElement>(null);
  function linkToCommentContainer() {
    if (commentRef.current !== null) {
      commentRef.current.scrollIntoView();
    }
    SetReplyInfo({ comment_id: 0, reply_name: '' });
    SetCommentReplyText('发表友善的评论吧');
  }

  // 点击回复
  function clickReply(data: { comment_id: number; reply_name: string }) {
    const comment_id = data.comment_id;
    const reply_name = data.reply_name;
    SetReplyInfo({ comment_id, reply_name });
    SetCommentReplyText(`回复 @${reply_name} ：`);
  }
  // 提交评论
  async function handleSubmit() {
    const content = commentValue;
    if (content === '') {
      return message.error('评论内容不能为空');
    }
    const reply_id = replyInfo.comment_id;
    const reply_name = replyInfo.reply_name;
    // 评论文章/回复
    const res = await request.post('/addComment', {
      data: {
        article_id: article?.article_id,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        uuid: userInfo.uuid,
        head_img: userInfo.head_img,
        user_name: userInfo.user_name,
        content,
        reply_id,
        reply_name,
      },
    });
    if (res.code === 200) {
      const data = res.data.comment;
      handleComments([...originComments, data]);
      SetOriginComments([...originComments, data]);
      SetCommentValue('');
      message.success(res.msg);
    } else if (res.code >= 400) {
      message.error(res.msg);
    }
  }

  function textAreaChange(e: any) {
    SetCommentValue(e.target.value);
  }
  // 跳转至个人页面
  function clickToPersonal(uuid: number) {
    history.push(`/personal/${uuid}`);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.messageContainer}>
          <div
            className={styles.headImg}
            onClick={() => {
              clickToPersonal(author?.uuid as number);
            }}
          >
            <Avatar
              size={64}
              src={`${process.env.BASE_URL}${
                author?.head_img || '/default/unLoginImg.png'
              }`}
            />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.userName}>{author?.user_name}</p>
            <p className={styles.releaseTime}>
              发布时间:
              {moment(article?.time).locale('zh-cn').format('YYYY-MM-DD')}
            </p>
          </div>
        </div>
        <div className={styles.tagsContainer}>
          <span className={styles.text}>文章标签:</span>
          {tags?.map((item) => {
            return <Tag key={item.tags_id}>{item.tags_name}</Tag>;
          })}
        </div>
        <Button
          block
          icon={<RollbackOutlined />}
          type="primary"
          style={{ display: article?.question_id ? 'block' : 'none' }}
        >
          前往题目页面
        </Button>
        <div className={styles.otherButtons}>
          <Button
            block
            shape="circle"
            type={!isLike ? 'default' : 'primary'}
            icon={<LikeFilled />}
            size="large"
            className={!isLike ? styles.unClick : ''}
            onClick={likeArticleOrNot}
          />
          <Button
            block
            shape="circle"
            type="primary"
            icon={<MessageFilled />}
            size="large"
            onClick={linkToCommentContainer}
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.bg}>
          <div className={styles.titleContainer}>{article?.article_title}</div>
          <div className={styles.rowLine} />
          <div className={styles.articleContainer}>
            <MarkdownPreview
              source={article?.article_content}
              className={styles.articleText}
            />
          </div>
        </div>
        <div className={styles.commentContainer} ref={commentRef}>
          <div className={styles.comments}>
            <List
              header={`${originComments.length} 条评论`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item: any) => (
                <li>
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={
                      <div onClick={() => clickToPersonal(item.author_id)}>
                        <Avatar src={item.avatar} />
                      </div>
                    }
                    content={item.content}
                    datetime={item.datetime}
                  >
                    {item.replyNum === 0 ? (
                      item.children.map((item: any, index: number) => {
                        return (
                          <Comment
                            key={index}
                            actions={item.actions}
                            author={item.author}
                            avatar={
                              <div
                                onClick={() => clickToPersonal(item.author_id)}
                              >
                                <Avatar src={item.avatar} />
                              </div>
                            }
                            content={item.content}
                            datetime={item.datetime}
                          />
                        );
                      })
                    ) : (
                      <Collapse bordered={false}>
                        <Panel header={`共 ${item.replyNum} 条回复`} key="1">
                          {item.children.map((item: any, index: number) => {
                            return (
                              <Comment
                                key={index}
                                actions={item.actions}
                                author={item.author}
                                avatar={
                                  <div
                                    onClick={() =>
                                      clickToPersonal(item.author_id)
                                    }
                                  >
                                    <Avatar src={item.avatar} />
                                  </div>
                                }
                                content={item.content}
                                datetime={item.datetime}
                              />
                            );
                          })}
                        </Panel>
                      </Collapse>
                    )}
                  </Comment>
                </li>
              )}
            />
          </div>
          <div className={styles.replyBox}>
            <Comment
              avatar={
                <Avatar src={`${process.env.BASE_URL}${userInfo?.head_img}`} />
              }
              content={
                <>
                  <Form.Item>
                    <TextArea
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      value={commentValue}
                      onChange={textAreaChange}
                      placeholder={commentReplyText}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      onClick={handleSubmit}
                    >
                      添加评论
                    </Button>
                  </Form.Item>
                </>
              }
            />
            <div
              className={styles.unLoginMask}
              style={{ display: isLogin ? 'none' : 'inline' }}
            >
              <div className={styles.unLoginLock}>
                <LockOutlined />
                <p>请登录后评论</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
