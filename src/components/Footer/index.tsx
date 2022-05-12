import styles from './index.less';
import logo from '@/assets/logo.png';
import { QqOutlined, GithubOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const qqText = '834159744';
const gitText = '点击跳转至代码仓库';

export default function Footer() {
  function linkToGithub() {
    window.open('https://github.com/Zeyull/GraduationProject');
  }

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.leftFooterContainer}>
        <img src={logo} alt={'logo'} />
        <Tooltip placement="top" title={qqText}>
          <QqOutlined />
        </Tooltip>

        <Tooltip placement="top" title={gitText}>
          <GithubOutlined onClick={linkToGithub} />
        </Tooltip>
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
