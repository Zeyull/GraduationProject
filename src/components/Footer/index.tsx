import styles from './index.less';
import logo from '@/assets/logo.png';
import { QqOutlined, GithubOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.leftFooterContainer}>
        <img src={logo} alt={'logo'} />
        <QqOutlined />
        <GithubOutlined />
      </div>
      <div className={styles.rightFooterContainer}>
        <div>
          <ul>
            <a href="https://github.com/Zeyull" target="_Blank">
              <li>联系我</li>
            </a>
            <a href="https://github.com/Zeyull" target="_Blank">
              <li>关于我</li>
            </a>
          </ul>
        </div>
        <p>邮箱：13508085664@163.com | 2018070823 廖泽宇</p>
      </div>
    </footer>
  );
}
