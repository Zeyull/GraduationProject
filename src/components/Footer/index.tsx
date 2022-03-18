import styles from './index.less';
import { QqOutlined, GithubOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.leftFooterContainer}>
        <img />
        <QqOutlined />
        <GithubOutlined />
      </div>
      <div className={styles.rightFooterContainer}>
        <div>
          <ul>
            <a href="#">
              <li>联系我们</li>
            </a>
            <a href="#">
              <li>常见问题</li>
            </a>
            <a href="#">
              <li>关于我们</li>
            </a>
          </ul>
        </div>
        <p>邮箱：13508085664@163.com | 2018070823 廖泽宇</p>
      </div>
    </footer>
  );
}
