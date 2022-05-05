import styles from './index.less';
import { Avatar, Tag, Button, Comment, Tooltip, List, Input, Form } from 'antd';
import {
  UserOutlined,
  RollbackOutlined,
  LikeFilled,
  MessageFilled,
} from '@ant-design/icons';
import { useState, useRef } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import articleMD from './articleMD.js';
import moment from 'moment';

const { TextArea } = Input;

const articleTags: ArticleTags[] = [];
for (let i = 0; i < 7; i++) {
  articleTags.push({
    tagName: 'text',
  });
}
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

export default function ArticleContent() {
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
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.userName}>落雪如衣</p>
            <p className={styles.releaseTime}>发布时间:2022/04/04</p>
          </div>
        </div>
        <div className={styles.tagsContainer}>
          <span className={styles.text}>文章标签:</span>
          {articleTags.map((item) => {
            return <Tag key={item.tagName}>{item.tagName}</Tag>;
          })}
        </div>
        <Button block icon={<RollbackOutlined />} type="primary">
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
          <div className={styles.titleContainer}>
            基于Web的算法编程练习平台系统的设计与实现
          </div>
          <div className={styles.rowLine} />
          <div className={styles.articleContainer}>
            <MarkdownPreview
              source={articleMD}
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
