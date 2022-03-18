import CalendarCard from './components/ClandarCard';
import styles from './index.less';
import unLoginImg from '@/assets/unLoginImg.png';
import { Menu, Button, Card } from 'antd';
import piePatternSrc from './piePatternSrc.js';
import Charts from '@/components/Echarts';
import {
  EditOutlined,
  HistoryOutlined,
  StarOutlined,
  SettingOutlined,
  LogoutOutlined,
  RightOutlined,
} from '@ant-design/icons';

export default function Personal() {
  const handleClick = (e: any) => {
    console.log('click', e);
  };

  const updatePersonalData = (e: any) => {
    console.log('updatePersonalData', e);
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
  // 图三
  const piePatternImg = new Image();
  piePatternImg.src = piePatternSrc;
  const optionChartsThree = {
    width: '262px',
    height: '110px',
    options: {
      series: [
        {
          name: 'pie',
          type: 'pie',
          selectedMode: 'single',
          selectedOffset: 30,
          clockwise: true,
          label: {
            fontSize: 14,
            fontWeight: 500,
            color: '#000',
          },
          labelLine: {
            lineStyle: {
              color: '#235894',
            },
          },
          data: [
            { value: 1048, name: '简单' },
            { value: 735, name: '中等' },
            { value: 580, name: '困难' },
          ],
          itemStyle: {
            opacity: 0.7,
            color: {
              image: piePatternImg,
              repeat: 'repeat',
            },
            borderWidth: 3,
            borderColor: '#235894',
          },
        },
      ],
    },
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <img src={unLoginImg} />
        <p>落雪如衣</p>
        <div className={styles.buttonContainer}>
          <Button onClick={updatePersonalData} icon={<EditOutlined />}>
            编辑个人资料
          </Button>
        </div>
        <div className={styles.dataContainer}>
          <ul>
            <li>
              <span>性别：</span>&nbsp;<span>男</span>
            </li>
            <li>
              <span>年龄：</span>&nbsp;<span>18</span>
            </li>
            <li>
              <span>邮箱：</span>&nbsp;<span>834159744@qq.com</span>
            </li>
            <li>
              <span>个人简介：</span>&nbsp;<span>这个人很懒没有个人介绍</span>
            </li>
          </ul>
        </div>
        <div className={styles.menuList}>
          <Menu
            onClick={handleClick}
            mode="vertical"
            defaultSelectedKeys={['note']}
            // selectedKeys={['note']}
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
              key="start"
              icon={<StarOutlined style={{ color: '#F9CC45' }} />}
            >
              我的收藏
              <RightOutlined />
            </Menu.Item>
            <Menu.Item
              key="setting"
              icon={<SettingOutlined style={{ color: '#1D2129' }} />}
            >
              设置
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
          <Card title="刷题总计" bordered={false} style={{ width: 310 }}>
            <div className={styles.chartThree}>
              <Charts option={optionChartsThree} />
            </div>
            <p>总题目： 43 / 1200</p>
            <p>简单：1/ 200 </p>
            <p>中等：32/500</p>
            <p>困难：10/500</p>
          </Card>
        </div>
        <div className={styles.menuContainer}>1</div>
      </div>
    </div>
  );
}
