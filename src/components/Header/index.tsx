import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
import unloginImg from '@/assets/unLoginImg.png';

export default function Header() {
  function onSearch() {
    console.log('onSearch');
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftHeaderContainer}>
        <ul>
          <a href="#" className={styles.iconText}>
            <li>欧客</li>
          </a>
          <a href="#">
            <li>算法题目</li>
          </a>
          <a href="#">
            <li>文章笔记</li>
          </a>
          <a href="#">
            <li>前端练习</li>
          </a>
          <a href="#">
            <li>题库</li>
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
        <div className={styles.headImg}>
          <img src={unloginImg} />
        </div>
      </div>
    </header>
  );
}
