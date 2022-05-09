import styles from './index.less';
import { List, Avatar, Button, message, Space, Popconfirm } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import React, { useState, useEffect } from 'react';
import { mdToNormalString } from '@/utils/dataHandle';
import { history } from 'umi';

const IconText = (props: { icon: any; text: string }) => (
  <Space>
    {React.createElement(props.icon)}
    {props.text}
  </Space>
);

export default function MyArticle(props: {
  isUserSelf: boolean;
  uuid: number;
}) {
  const { isUserSelf, uuid } = props;

  const [listData, setListData] = useState<ArticleData[]>([]);
  const [_originListData, setOriginListData] = useState<ArticleData[]>([]);

  // 初次加载
  useEffect(() => {
    function handleArticleData(data: any) {
      const newData: ArticleData[] = [];
      data.article.forEach((item: any, index: number) => {
        if (item.author_id === uuid) {
          newData.push({
            id: item.article_id,
            title: item.article_title,
            avatar: process.env.BASE_URL + item.author_img,
            content: mdToNormalString(item.article_content),
            likes: data.likesNum[index],
            comments: data.commentsNum[index],
            img: item.img === null ? null : process.env.BASE_URL + item.img,
            tags: data.tags[index],
          });
        }
      });
      setListData(newData);
      setOriginListData(newData);
    }

    async function firstLoad() {
      const articleRes = await request.get('/getAllArticle');
      if (articleRes.code === 200) {
        handleArticleData(articleRes.data);
      } else if (articleRes >= 400) {
        message.error(articleRes.msg);
      }
    }
    firstLoad();
  }, [uuid]);

  // 跳转页面
  const goArticleContent = (id: number) => {
    history.push(`/article-content/${id}`);
  };

  // 确定删除文章
  async function articleConfirm(article_id: number) {
    const res = await request.delete('/deleteArticle', {
      params: {
        article_id,
      },
    });
    if (res.code === 200) {
      setListData(listData.filter((item) => item.id !== article_id));
      message.success(res.msg);
    }
  }
  return (
    <div className={styles.mainContainer}>
      <List
        className={styles.list}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
          showSizeChanger: false,
        }}
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            actions={
              isUserSelf
                ? [
                    // <Button key="list-edit" type="primary">
                    //   编辑
                    // </Button>,
                    <Popconfirm
                      key="list-delete"
                      title="你确定删除该文章吗？"
                      onConfirm={() => {
                        articleConfirm(item.id);
                      }}
                      okText="删除"
                      cancelText="取消"
                    >
                      <Button key="list-delete" danger>
                        删除
                      </Button>
                    </Popconfirm>,
                    <IconText
                      icon={LikeOutlined}
                      text={item.likes.toString()}
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text={item.comments.toString()}
                      key="list-vertical-message"
                    />,
                  ]
                : [
                    <IconText
                      icon={LikeOutlined}
                      text={item.likes.toString()}
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text={item.comments.toString()}
                      key="list-vertical-message"
                    />,
                  ]
            }
            key={item.id}
            extra={
              item.img === null ? null : <img width={272} src={item.img} />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<p className={styles.articleTitle}>{item.title}</p>}
            />
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => goArticleContent(item.id)}
            >
              {item.content}
            </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => goArticleContent(item.id)}
              className={styles.clickMore}
            >
              . . .加载更多
            </span>
          </List.Item>
        )}
      />
    </div>
  );
}
