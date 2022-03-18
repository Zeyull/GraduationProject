import { Form, Input, Button, Checkbox, Menu } from 'antd';
import { useState } from 'react';
import backIcons from './images/backIcons.svg';
import {
  emailRules,
  captchaRules,
  usernameRules,
  passwordRules,
} from '@/utils/rules';
import styles from './index.less';

export default function Login() {
  const [current, setCurrent] = useState('password');
  const [type, setType] = useState('login');

  const menuHandleClick = (e: any) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const toRegister = () => {
    setType('register');
  };

  const toLogin = () => {
    setType('login');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.iconBack}>
        <img src={backIcons} />
      </div>
      <div className={styles.centerContainer}>
        <div className={styles.text}>
          <div className={styles.lineRow} />
          <p>{type === 'register' ? '注册' : '登录'}</p>
          <div className={styles.lineRow} />
        </div>
        <div className={styles.main}>
          <div className={styles.leftContainer}>
            <img />
          </div>
          <div className={styles.lineColumn} />
          <div className={styles.rightContainer}>
            {type === 'login' ? (
              <>
                <Menu
                  onClick={menuHandleClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  className={styles.menu}
                >
                  <Menu.Item key="password">密码登录</Menu.Item>
                  <Menu.Item key="verification">验证码登录</Menu.Item>
                </Menu>
                <div className={styles.menuContainer}>
                  {current === 'password' ? (
                    <LoginForm type={'password'} toRegister={toRegister} />
                  ) : (
                    <LoginForm type={'verfication'} toRegister={toRegister} />
                  )}
                </div>
              </>
            ) : (
              <Register toLogin={toLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm(props: {
  type: string;
  toRegister: React.MouseEventHandler<HTMLElement>;
}) {
  const { type, toRegister } = props;

  // 验证码长度
  const varficationLength = 6;

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="login"
      className={styles.loginForm}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="username" rules={emailRules}>
        <Input placeholder={'请输入邮箱'} />
      </Form.Item>
      {type === 'verfication' && (
        <Form.Item>
          <Form.Item name="verfication" rules={captchaRules}>
            <Input maxLength={varficationLength} placeholder={'请输入验证码'} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">获取验证码</Button>
          </Form.Item>
        </Form.Item>
      )}

      {type === 'password' && (
        <>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder={'请输入密码'} />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item>
              <span>忘记密码</span>
            </Form.Item>
          </Form.Item>
        </>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
        <Button onClick={toRegister}>注册</Button>
      </Form.Item>
    </Form>
  );
}

function Register(props: { toLogin: React.MouseEventHandler<HTMLElement> }) {
  const { toLogin } = props;
  const varficationLength = 6;
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="register"
      className={styles.registerForm}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="name" rules={usernameRules}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" rules={passwordRules}>
        <Input.Password placeholder={'请输入密码'} />
      </Form.Item>
      <Form.Item name="username" rules={emailRules}>
        <Input placeholder={'请输入邮箱'} />
      </Form.Item>
      <Form.Item>
        <Form.Item name="verfication" rules={captchaRules}>
          <Input maxLength={varficationLength} placeholder={'请输入验证码'} />
        </Form.Item>
        <Form.Item>
          <Button type="primary">获取验证码</Button>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
        <Button onClick={toLogin}>登录</Button>
      </Form.Item>
    </Form>
  );
}
