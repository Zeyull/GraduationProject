import styles from './index.less';
import { List, Avatar, Space, message } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import React, { useState, useCallback, useEffect } from 'react';
import { history } from 'umi';
import { useThrottleFn } from 'ahooks';
import request from '@/utils/request';
import { mdToNormalString } from '@/utils/dataHandle';
import { filterArticleFnAtom } from '@/jotai/articleList';
import { useAtom } from 'jotai';

const IconText = (props: { icon: any; text: string }) => (
  <Space>
    {React.createElement(props.icon)}
    {props.text}
  </Space>
);

export default function ArticleDataList(props: {
  isPagination: boolean;
  scrollDom?: any;
}) {
  const [, setFilterArticleFn] = useAtom(filterArticleFnAtom);
  const { isPagination, scrollDom } = props;
  const [maxArticleNumber, setMaxArticleNumber] = useState(15);
  const [listData, setListData] = useState<ArticleData[]>([]);
  const [originListData, setOriginListData] = useState<ArticleData[]>([]);

  function handleArticleData(data: any) {
    const newData: ArticleData[] = [];
    data.article.forEach((item: any, index: number) => {
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
    });
    setListData(newData);
    setOriginListData(newData);
  }

  // 初次加载
  useEffect(() => {
    async function firstLoad() {
      const articleRes = await request.get('/getAllArticle');
      if (articleRes.code === 200) {
        handleArticleData(articleRes.data);
      } else if (articleRes >= 400) {
        message.error(articleRes.msg);
      }
    }
    firstLoad();
  }, []);

  // 标签赛选传递函数
  useEffect(() => {
    function filterArticle(selectedTags: ArticleTags[]) {
      setListData(
        originListData.filter((item) => {
          let flag = true;
          const originTagsName = item.tags.map((item: any) => item.tags_name);
          selectedTags.forEach((selectItem) => {
            flag = flag && originTagsName.includes(selectItem.tags_name);
          });
          return flag;
        }),
      );
    }
    setFilterArticleFn({ filterArticleFn: filterArticle });
  }, [originListData, setFilterArticleFn]);

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
  const goArticleContent = (id: number) => {
    history.push(`/article-content/${id}`);
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
          onClick={() => goArticleContent(item.id)}
          style={{ cursor: 'pointer' }}
          key={item.title}
          actions={[
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
          ]}
          extra={item.img === null ? null : <img width={272} src={item.img} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<p className={styles.articleTitle}>{item.title}</p>}
          />
          <span>{item.content}</span>
          <span className={styles.clickMore}>. . .加载更多</span>
        </List.Item>
      )}
    />
  );
}
