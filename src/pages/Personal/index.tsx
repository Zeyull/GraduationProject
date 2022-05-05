import CalendarCard from './components/CalendarCard';
import { useState, useRef } from 'react';
import styles from './index.less';
import { Menu, Button, Avatar, Upload, message, Modal, Image } from 'antd';
import PiePattern from './components/PiePattern';
import PersonalData from './components/PersonalData';
import MyArticle from './components/MyArticle';
import SubmitTimeLine from './components/SubmitTimeLine';
import Charts from '@/components/Echarts';
import {
  EditOutlined,
  HistoryOutlined,
  SettingOutlined,
  LogoutOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { userInfoAtom } from '@/jotai';
import { useAtom } from 'jotai';
import request from '@/utils/request';
import { clearLocalStorage } from '@/utils/dataHandle';
import { history } from 'umi';

function getBase64(img: any, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
// 图片文件上传前进行处理
function beforeUpload(file: any) {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG/JPEG格式的图片');
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('文件大小不能超过5Mb');
  }
  return isJpgOrPng && isLt5M;
}

export default function Personal() {
  const [isHeaderImgModalVisible, setIsHeaderImgModalVisible] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [headImgFile, setHeadImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  // 获取用户信息
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const head_img = userInfo.head_img;
  // @ts-ignore
  const headerUrl = process.env.BASE_URL + head_img;

  const [menuKey, setMenuKey] = useState('note');
  const [isChangeUserData, setIsChangeUserData] = useState(false);
  const menuRef = useRef<HTMLInputElement>(null); // 如何解决null报错

  // 图片状态改变回调
  function imgHandleChange(info: any) {
    setHeadImgFile(info.file.originFileObj);
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImgUrl(imageUrl);
      });
      return;
    }
  }
  // 自定义文件上传
  async function uploadHeaderImage() {
    const dataForm = new FormData();
    dataForm.append('uuid', userInfo.uuid?.toString() as string);
    dataForm.append('file', headImgFile as unknown as Blob);
    // 开始等待
    setImgLoading(true);
    const res = await request.post('/uploadHeaderImage', {
      requestType: 'form',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: dataForm,
    });
    if (res.code === 200) {
      message.success(res.msg);
      setUserInfo({ ...userInfo, head_img: res.data.url });
      setIsHeaderImgModalVisible(false);
      setImgUrl('');
      setHeadImgFile(null);
    } else if (res.code >= 400) {
      message.error(res.msg);
    }
    setImgLoading(false);
  }

  // 关闭修改框
  const handleCancel = () => {
    setIsHeaderImgModalVisible(false);
    setImgUrl('');
    setHeadImgFile(null);
  };
  // 弹出头像修改框
  function handleAvatar(e: any) {
    if (e.target.nodeName === 'IMG') {
      setIsHeaderImgModalVisible(true);
    }
  }

  // 选择菜单容器
  const menuHandleClick = (e: any) => {
    setMenuKey(e.key);
  };

  // 编辑个人资料
  const updatePersonalData = () => {
    setIsChangeUserData(true);
    setMenuKey('setting');
    if (menuRef.current) {
      menuRef.current.scrollIntoView();
    }
  };

  // 图一
  const optionChartsOne = {
    width: '360px',
    height: '310px',
    options: {
      title: {
        text: '已完成题目总记录',
        bottom: '5%',
        left: '50%',
        textAlign: 'center',
        textStyle: {
          color: '#1D2129',
          fontSize: 14,
          fontWeight: 400,
        },
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    },
  };
  // 图二
  const optionChartsTwo = {
    width: '360px',
    height: '310px',
    options: {
      legend: {
        top: 'bottom',
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [10, 90],
          center: ['50%', '40%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' },
          ],
        },
      ],
    },
  };

  let MenuContent;
  switch (menuKey) {
    case 'note':
      MenuContent = <MyArticle />;
      break;
    case 'history':
      MenuContent = <SubmitTimeLine />;
      break;
    case 'setting':
      MenuContent = (
        <PersonalData
          isChange={isChangeUserData}
          changeFn={setIsChangeUserData}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      );
      break;
    case 'out':
      clearLocalStorage();
      history.push('/home');
      location.reload();
      break;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.avatarContainer} onClick={handleAvatar}>
          <Avatar src={headerUrl} />
        </div>
        <p>{userInfo.user_name}</p>
        <div className={styles.buttonContainer}>
          <Button onClick={updatePersonalData} icon={<EditOutlined />}>
            编辑个人资料
          </Button>
        </div>
        <div className={styles.dataContainer}>
          <ul>
            <li>
              <span>性别：</span>&nbsp;
              <span>{userInfo.sex === 1 ? '男' : '女'}</span>
            </li>
            <li>
              <span>年龄：</span>&nbsp;<span>{userInfo.age}</span>
            </li>
            <li>
              <span>个人简介：</span>&nbsp;<span>{userInfo.introduction}</span>
            </li>
          </ul>
        </div>
        <div className={styles.menuList}>
          <Menu
            onClick={menuHandleClick}
            mode="vertical"
            defaultSelectedKeys={['note']}
          >
            <Menu.Item
              key="note"
              icon={<EditOutlined style={{ color: '#3491FA' }} />}
            >
              我的笔记
              <RightOutlined />
            </Menu.Item>
            <Menu.Item
              key="history"
              icon={<HistoryOutlined style={{ color: '#86909C' }} />}
            >
              刷题记录
              <RightOutlined />
            </Menu.Item>
            <Menu.Item
              key="setting"
              icon={<SettingOutlined style={{ color: '#1D2129' }} />}
            >
              个人资料
              <RightOutlined />
            </Menu.Item>
            <Menu.Item
              key="out"
              icon={<LogoutOutlined style={{ color: '#F53F3F' }} />}
            >
              退出登录
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.CalendarContainer}>
          <p className={styles.CalendarTitle}>每日记录</p>
          <CalendarCard />
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chartOne}>
            <Charts option={optionChartsOne} />
          </div>
          <div className={styles.chartTwo}>
            <Charts option={optionChartsTwo} />
          </div>
          <PiePattern />
        </div>
        <div className={styles.menuContainer} ref={menuRef}>
          {MenuContent}
        </div>
      </div>
      <Modal
        title="修改头像"
        visible={isHeaderImgModalVisible}
        className={styles.headerImgModal}
        width={300}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button onClick={handleCancel} key={'cancel'}>
            取消
          </Button>,
          <Upload
            key={'upload'}
            onChange={imgHandleChange}
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            <Button type="primary" loading={imgLoading}>
              上传图片
            </Button>
          </Upload>,
          <Button
            onClick={uploadHeaderImage}
            key={'ok'}
            type="primary"
            loading={imgLoading}
          >
            确定
          </Button>,
        ]}
      >
        <Image
          width={240}
          height={240}
          src={imgUrl === '' ? headerUrl : imgUrl}
        />
      </Modal>
    </div>
  );
}
