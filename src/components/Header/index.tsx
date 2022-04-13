import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
import unloginImg from '@/assets/unLoginImg.png';
import { history } from 'umi';

export default function Header() {
  function onSearch() {
    console.log('onSearch');
  }

  const goHomePage = () => {
    history.push('/home');
  };

  const goLoginPage = () => {
    history.push('/login');
  };

  const goPersonalPage = () => {
    history.push('/personal');
  };

  const goCodePage = () => {
    history.push('/code');
  };

  const goArticlePage = () => {
    history.push('/article-list');
  };

  const goFrontCoodePage = () => {
    history.push('/front-code');
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftHeaderContainer}>
        <ul>
          <a className={styles.iconText} onClick={goHomePage}>
            <li>欧客</li>
          </a>
          <a onClick={goCodePage}>
            <li>算法题目</li>
          </a>
          <a onClick={goArticlePage}>
            <li>文章笔记</li>
          </a>
          <a onClick={goFrontCoodePage}>
            <li>前端练习</li>
          </a>
          <a onClick={goPersonalPage}>
            <li>个人主页</li>
          </a>
        </ul>
      </div>
      <div className={styles.rightHeaderContainer}>
        <div className={styles.search}>
          <Input
            placeholder="请输入搜索内容"
            onPressEnter={onSearch}
            prefix={<SearchOutlined />}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.headImg} onClick={goLoginPage}>
          <img src={unloginImg} />
        </div>
      </div>
    </header>
  );
}
