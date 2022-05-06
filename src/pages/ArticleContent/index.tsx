import styles from './index.less';
import {
  Avatar,
  Tag,
  Button,
  Comment,
  Tooltip,
  List,
  Input,
  Form,
  message,
} from 'antd';
import { RollbackOutlined, LikeFilled, MessageFilled } from '@ant-design/icons';
import { useState, useRef, useEffect, useCallback } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import moment from 'moment';
import request from '@/utils/request';

const { TextArea } = Input;

// 评论数据
const data = [
  {
    actions: [
      <span key="comment-list-reply-to-0" className="replySpan">
        回复
      </span>,
    ],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [
      <span key="comment-list-reply-to-1" className="replySpan">
        回复
      </span>,
    ],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];
// 提交评论
function handleSubmit(e: any) {
  console.dir(e);
}

const Editor = (props: { onSubmit: any; submitting: boolean }) => (
  <>
    <Form.Item>
      <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={props.submitting}
        onClick={props.onSubmit}
        type="primary"
      >
        添加评论
      </Button>
    </Form.Item>
  </>
);

export default function ArticleContent(props: any) {
  const [article, SetArticle] = useState<ArticleType>();
  const [author, SetAuthor] = useState<UserInfo>();
  const [tags, SetTags] = useState<ArticleTags[]>();
  const article_id = Number(props.match.params.id);

  async function firstRequestFn() {
    // 文章请求
    const articeRes = await request.get('/getArticleByID', {
      params: {
        article_id: article_id,
      },
    });
    const articleData = articeRes.data.article;
    const tagsData = articeRes.data.tags;
    if (articeRes.code >= 400) {
      message.error(articeRes.msg);
      return;
    } else if (articeRes.code === 200) {
      SetArticle(articleData);
      SetTags(tagsData);
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
  const firstRequestCBFn = useCallback(firstRequestFn, [article_id]);
  useEffect(() => {
    firstRequestCBFn();
  }, [firstRequestCBFn]);

  const commentRef = useRef<HTMLInputElement>(null);
  const [likeState] = useState(false);

  function linkToCommentContainer() {
    if (commentRef.current !== null) {
      commentRef.current.scrollIntoView();
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.messageContainer}>
          <div className={styles.headImg}>
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
              发布时间:{moment(article?.time).format('YYYY-MM-DD')}
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
            type={!likeState ? 'default' : 'primary'}
            icon={<LikeFilled />}
            size="large"
            className={!likeState ? styles.unClick : ''}
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
              header={`${data.length} 条评论`}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <li>
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  />
                </li>
              )}
            />
          </div>
          <div className={styles.replyBox}>
            <Comment
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Han Solo"
                />
              }
              content={<Editor onSubmit={handleSubmit} submitting={false} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
