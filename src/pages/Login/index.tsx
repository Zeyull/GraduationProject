import { Form, Input, Button, Checkbox, Menu, message } from 'antd';
import { useState, useRef } from 'react';
import backIcons from './images/backIcons.svg';
import {
  emailRules,
  captchaRules,
  usernameRules,
  passwordRules,
} from '@/utils/rules';
import styles from './index.less';
import logo from '@/assets/logo.png';
import request from '@/utils/request';
import { userInfoAtom } from '@/jotai';
import { useAtom } from 'jotai';
import { history } from 'umi';

export default function Login() {
  const [current, setCurrent] = useState('password');
  const [type, setType] = useState('login');

  const menuHandleClick = (e: any) => {
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
            <img src={logo} alt="Logo" />
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
  const [, setUserInfo] = useAtom(userInfoAtom);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  let [captchaTime, setCaptchaTime] = useState(59);
  const emailRef = useRef(null);

  // 验证码长度
  const varficationLength = 6;
  // 点击登录后事件处理
  async function onFinish(values: any) {
    const email = values.email;
    const data: any = {};

    if (type === 'verfication') {
      data.email = email;
      data.captcha = values.verfication;
      data.type = 0;
    } else {
      data.email = email;
      data.password = values.password;
      data.type = 1;
    }
    const res = await request.post('/login', { data });

    if (res.code >= 400) {
      message.error(res.msg);
    } else if (res.code === 200) {
      message.success(res.msg);
      const data = res.data;
      localStorage.setItem('token', data.token);
      const userInfoRes = await request.get('/getUserInfo', {
        params: {
          uuid: data.uuid,
        },
      });
      if (userInfoRes.code >= 400) {
        message.error(userInfoRes.msg);
      } else if (userInfoRes.code === 200) {
        const data = userInfoRes.data;
        setUserInfo(data.user);
        history.push('/home');
      }
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  async function getCaptcha() {
    let email = '';
    if (emailRef !== null) {
      // @ts-ignore
      email = emailRef.current.props.value;
    }
    if (email === undefined) {
      message.error('邮箱不能为空');
      return;
    }
    setCaptchaLoading(true);
    let siv = setInterval(() => {
      setCaptchaTime(captchaTime--);
      if (captchaTime <= -1) {
        clearInterval(siv);
        setCaptchaTime(59);
        setCaptchaLoading(false);
      }
    }, 1000);

    const res = await request.post('/getCaptcha', {
      data: {
        email,
      },
    });
    if (res.code >= 400) {
      clearInterval(siv);
      setCaptchaTime(59);
      setCaptchaLoading(false);
      message.error(res.msg);
    } else if (res.code === 200) {
      message.success(res.msg);
    }
  }

  return (
    <Form
      name="login"
      className={styles.loginForm}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="email" rules={emailRules}>
        <Input placeholder={'请输入邮箱'} ref={emailRef} />
      </Form.Item>
      {type === 'verfication' && (
        <Form.Item>
          <Form.Item name="verfication" rules={captchaRules}>
            <Input maxLength={varficationLength} placeholder={'请输入验证码'} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={getCaptcha}
              loading={captchaLoading}
            >
              {captchaLoading ? `重新发送(${captchaTime})` : '获取验证码'}
            </Button>
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
            {/* <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item> */}
            {/* <Form.Item>
              <span>忘记密码</span>
            </Form.Item> */}
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

  const [, setUserInfo] = useAtom(userInfoAtom);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  let [captchaTime, setCaptchaTime] = useState(59);
  const emailRef = useRef(null);
  // 注册回调
  async function onFinish(values: any) {
    const res = await request.post('/register', {
      data: values,
    });
    if (res.code >= 400) {
      message.error(res.msg);
    } else if (res.code === 200) {
      message.success(res.msg);
      const data = res.data;
      localStorage.setItem('token', data.token);
      setUserInfo(data.userInfo);
      history.push('/home');
    }
  }

  async function getCaptcha() {
    let email = '';
    if (emailRef !== null) {
      // @ts-ignore
      email = emailRef.current.props.value;
    }
    if (email === undefined) {
      message.error('邮箱不能为空');
      return;
    }
    setCaptchaLoading(true);
    let siv = setInterval(() => {
      setCaptchaTime(captchaTime--);
      if (captchaTime <= -1) {
        clearInterval(siv);
        setCaptchaTime(59);
        setCaptchaLoading(false);
      }
    }, 1000);

    const res = await request.post('/getCaptcha', {
      data: {
        email,
      },
    });
    if (res.code >= 400) {
      clearInterval(siv);
      setCaptchaTime(59);
      setCaptchaLoading(false);
      message.error(res.msg);
    } else if (res.code === 200) {
      message.success(res.msg);
    }
  }

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
      <Form.Item name="user_name" rules={usernameRules}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" rules={passwordRules}>
        <Input.Password placeholder={'请输入密码'} />
      </Form.Item>
      <Form.Item name="email" rules={emailRules}>
        <Input placeholder={'请输入邮箱'} ref={emailRef} />
      </Form.Item>
      <Form.Item>
        <Form.Item name="captcha" rules={captchaRules}>
          <Input maxLength={varficationLength} placeholder={'请输入验证码'} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={getCaptcha} loading={captchaLoading}>
            {captchaLoading ? `重新发送(${captchaTime})` : '获取验证码'}
          </Button>
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
