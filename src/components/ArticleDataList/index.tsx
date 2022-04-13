import styles from './index.less';
import { List, Avatar, Space } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import React, { useState, useCallback, useEffect } from 'react';
import { history } from 'umi';
import { useThrottleFn } from 'ahooks';

const IconText = (props: { icon: any; text: string }) => (
  <Space>
    {React.createElement(props.icon)}
    {props.text}
  </Space>
);

const listData: ArticleData[] = [];
for (let i = 0; i < 200; i++) {
  listData.push({
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

export default function ArticleDataList(props: {
  isPagination: boolean;
  scrollDom?: any;
}) {
  const { isPagination, scrollDom } = props;

  const [maxArticleNumber, setMaxArticleNumber] = useState(15);
  const onScrollAddArticle = useCallback(() => {
    let wScrollY = window.scrollY; // 当前滚动条top值
    let wInnerH = window.innerHeight; // 设备窗口的高度
    let bScrollH = document.body.scrollHeight; // body总高度
    if (wScrollY + wInnerH >= bScrollH - 10) {
      setMaxArticleNumber(maxArticleNumber + 15);
    }
  }, [maxArticleNumber]);
  const { run: throttAddArticleFn } = useThrottleFn(onScrollAddArticle, {
    wait: 2000,
  });
  useEffect(() => {
    if (!isPagination) {
      scrollDom.addEventListener('scroll', throttAddArticleFn);
    }
    return () => {
      if (!isPagination) {
        scrollDom.removeEventListener('scroll', throttAddArticleFn);
      }
    };
  }, [isPagination, scrollDom, throttAddArticleFn]);

  // 跳转页面
  const goArticleContent = () => {
    history.push('/article-content');
  };

  return (
    <List
      className={styles.list}
      pagination={
        isPagination
          ? {
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
              showSizeChanger: false,
            }
          : false
      }
      itemLayout="vertical"
      size="large"
      dataSource={isPagination ? listData : listData.slice(0, maxArticleNumber)}
      renderItem={(item) => (
        <List.Item
          onClick={goArticleContent}
          style={{ cursor: 'pointer' }}
          key={item.title}
          actions={[
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<p>{item.title}</p>}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}
