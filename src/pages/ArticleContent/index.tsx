import styles from './index.less';
import { Avatar, Tag, Button } from 'antd';
import {
  UserOutlined,
  RollbackOutlined,
  LikeFilled,
  MessageFilled,
} from '@ant-design/icons';
import { useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import articleMD from './articleMD.js';

const articleTags: ArticleTags[] = [];
for (let i = 0; i < 7; i++) {
  articleTags.push({
    tagName: 'text',
  });
}

export default function ArticleContent() {
  const [likeState] = useState(false);
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
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.titleContainer}>
          基于Web的算法编程练习平台系统的设计与实现
        </div>
        <div className={styles.rowLine} />
        <div className={styles.articleContainer}>
          <MarkdownPreview source={articleMD} className={styles.articleText} />
        </div>
      </div>
    </div>
  );
}
