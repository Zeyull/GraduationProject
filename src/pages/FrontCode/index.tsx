import styles from './index.less';
import { Menu, Button, message } from 'antd';
import {
  FileTextOutlined,
  CodeOutlined,
  ExpandOutlined,
  CompressOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useState, useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { isFullCodePage, htmlValue, cssValue, jsValue } from '@/jotai';
import QuestionText from './components/QuestionText';
import CodeContent from './components/CodeContent';
import { getFrontPage } from '@/utils/defaultCode';
import { useAuth } from '@/utils/auth';
import request from '@/utils/request';

export default function FrontCode() {
  const [questionData, SetQuestionData] = useState<FrontQuestion[]>([]);
  useEffect(() => {
    const res = new Promise((resolve, _reject) => {
      resolve(request.get('/getAllFrontQuestion'));
    });
    res.then((response: any) => {
      if (response.code >= 400) {
        message.error(response.msg);
      } else if (response.code === 200) {
        SetQuestionData(response.data.frontQuestion);
      }
    });
  }, []);

  const { isLogin } = useAuth();
  const [isFullPage, setIsCodeFullPage] = useAtom(isFullCodePage);
  const pageIfr = useRef(null);
  const [html] = useAtom(htmlValue);
  const [css] = useAtom(cssValue);
  const [js] = useAtom(jsValue);
  const isFullCodePageClick = () => {
    setIsCodeFullPage((pre) => !pre);
  };
  //
  const [menuComponent, setMenuComponent] = useState('text');
  //  菜单点击
  const menuClick = (e: any) => {
    switch (e.keyPath[0]) {
      case 'text':
        setMenuComponent('text');
        break;
      case 'code':
        setMenuComponent('code');
        break;
    }
  };

  return (
    <div
      className={styles.mainContainer}
      style={
        isFullPage
          ? { paddingTop: '0px', height: '100vh' }
          : { paddingTop: '10px', height: 'calc(100vh - 70px)' }
      }
    >
      <div className={styles.leftContainer}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['text']}
          onClick={menuClick}
          className={styles.menuSelect}
          inlineCollapsed={false}
        >
          <Menu.Item key="text" icon={<FileTextOutlined />}>
            题目描述
          </Menu.Item>
          <Menu.Item key="code" icon={<CodeOutlined />}>
            在线编程
          </Menu.Item>
        </Menu>
        <div className={styles.menuContainer}>
          {menuComponent === 'text' ? (
            <QuestionText questionData={questionData} />
          ) : (
            <CodeContent />
          )}
        </div>
        <div className={styles.bottomLine} />
        <div className={styles.bottomLine} />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.codeOptions}>
          <div className={styles.otherOptions}>
            {isFullPage ? (
              <CompressOutlined onClick={isFullCodePageClick} />
            ) : (
              <ExpandOutlined onClick={isFullCodePageClick} />
            )}
          </div>
        </div>
        <div className={styles.frontContainer} ref={pageIfr}>
          <p className={'defaultText'}>编写代码后，点击编译生成页面</p>
        </div>
        <div className={styles.codeButton}>
          <Button
            className={styles.submit}
            type="primary"
            onClick={() => {
              getFrontPage({ html, css, js }, pageIfr.current);
            }}
          >
            编译
          </Button>
        </div>
        <div
          className={styles.unLoginMask}
          style={{ display: isLogin ? 'none' : 'inline' }}
        >
          <div className={styles.unLoginLock}>
            <LockOutlined />
            <p>请登录后查看</p>
          </div>
        </div>
      </div>
    </div>
  );
}
