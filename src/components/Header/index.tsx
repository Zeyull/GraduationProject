import { Avatar, Mentions, Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi';
import logo from '@/assets/logo.png';
import { userInfoAtom } from '@/jotai';
import { OptionProps } from 'rc-mentions/lib/Option';
import { useAtom } from 'jotai';
import request from '@/utils/request';

const { Option } = Mentions;

export default function Header() {
  const [userInfo] = useAtom(userInfoAtom);
  const [mentionValue, setMentionValue] = useState('');
  const [questionArr, setQuestionArr] = useState([]);
  const [articleArr, setArticleArr] = useState([]);
  const head_img = userInfo.head_img;
  const headerUrl = process.env.BASE_URL + head_img;

  useEffect(() => {
    async function firstLoad() {
      const quesstionRes = await request.get('/getAllQuestion', {
        params: {
          uuid: userInfo.uuid === null ? 0 : userInfo.uuid,
        },
      });
      setQuestionArr(quesstionRes.data.question);
      const articleRes = await request.get('/getAllArticle');
      setArticleArr(articleRes.data.article);
    }
    firstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(value: any) {
    setMentionValue(value);
  }

  function onSelect(option: any) {
    setMentionValue(option.value);
    history.push(option.key);
  }

  const goHomePage = () => {
    history.push('/home');
  };

  const goLoginPage = () => {
    if (userInfo.uuid !== null) {
      history.push(`/personal/${userInfo.uuid}`);
    } else {
      history.push('/login');
    }
  };

  const goArticlePage = () => {
    history.push('/article-list');
  };

  const goFrontCoodePage = () => {
    history.push('/front-code');
  };
  // 禁止换行
  const noWrap: React.KeyboardEventHandler<HTMLTextAreaElement> = (e: any) => {
    if (e.keyCode === 13) e.preventDefault();
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftHeaderContainer}>
        <ul>
          <a className={styles.iconText} onClick={goHomePage}>
            <img src={logo} alt="OK" />
            <li>欧客</li>
          </a>
          <a onClick={goArticlePage}>
            <li>博客笔记</li>
          </a>
          <a onClick={goFrontCoodePage}>
            <li>前端练习</li>
          </a>
        </ul>
      </div>
      <div className={styles.rightHeaderContainer}>
        <div className={styles.search}>
          <Mentions
            prefix={''}
            placeholder="请输入搜索内容"
            onChange={onChange}
            onSelect={onSelect}
            value={mentionValue}
            className={styles.searchInput}
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            filterOption={(_input: string, option: OptionProps) => {
              if (option.value) {
                return (
                  option.value.toUpperCase().includes(mentionValue) ||
                  option.value.toLowerCase().includes(mentionValue)
                );
              }
              return false;
            }}
            onKeyDown={noWrap}
          >
            {questionArr.map((item: any) => {
              return (
                <Option
                  value={item.question_name}
                  key={`/code/${item.question_id}`}
                  className={styles.resBox}
                >
                  <div className={styles.resBoxTitle}>
                    <p>问题</p>
                    <RightOutlined />
                  </div>
                  <p>{item.question_name}</p>
                </Option>
              );
            })}
            {articleArr.map((item: any) => {
              return (
                <Option
                  value={item.article_title}
                  key={`/article-content/${item.article_id}`}
                  className={styles.resBox}
                >
                  <div className={styles.resBoxTitle}>
                    <p>文章</p>
                    <RightOutlined />
                  </div>
                  <p>{item.article_title}</p>
                </Option>
              );
            })}
          </Mentions>
        </div>
        <div className={styles.headImg} onClick={goLoginPage}>
          <Avatar size={48} src={headerUrl} />
        </div>
      </div>
    </header>
  );
}
