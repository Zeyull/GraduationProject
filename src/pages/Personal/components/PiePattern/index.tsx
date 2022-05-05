import piePatternSrc from './piePatternSrc.js';
import styles from './index.less';
import { Card } from 'antd';
import Charts from '@/components/Echarts';
import { LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/utils/auth';
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
        selectedOffset: 10,
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

export default function PiePattern() {
  const { isLogin } = useAuth();
  return (
    <Card title="刷题总计" bordered={false} style={{ width: 310 }}>
      <div className={styles.chartThree}>
        <Charts option={optionChartsThree} />
      </div>
      <p>总题目： 43 / 1200</p>
      <p>简单：1/ 200 </p>
      <p>中等：32/500</p>
      <p>困难：10/500</p>
      <div
        className={styles.unLoginMask}
        style={{ display: isLogin ? 'none' : 'inline' }}
      >
        <div className={styles.unLoginLock}>
          <LockOutlined />
          <p>请登录后查看</p>
        </div>
      </div>
    </Card>
  );
}
