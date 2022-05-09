import { Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
import { history } from 'umi';
import logo from '@/assets/logo.png';
import { userInfoAtom } from '@/jotai';
import { useAtom } from 'jotai';

export default function Header() {
  const [userInfo] = useAtom(userInfoAtom);
  const head_img = userInfo.head_img;
  const headerUrl = process.env.BASE_URL + head_img;
  function onSearch() {
    console.log('onSearch');
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

  // const goPersonalPage = () => {
  //   history.push('/personal');
  // };

  // const goCodePage = () => {
  //   history.push('/code');
  // };

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
          <Input
            placeholder="请输入搜索内容"
            onPressEnter={onSearch}
            prefix={<SearchOutlined />}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.headImg} onClick={goLoginPage}>
          <Avatar size={48} src={headerUrl} />
        </div>
      </div>
    </header>
  );
}
