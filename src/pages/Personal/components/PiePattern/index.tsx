import piePatternSrc from './piePatternSrc.js';
import styles from './index.less';
import { Card, message } from 'antd';
import Charts from '@/components/Echarts';
import { LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/utils/auth';
import { useEffect, useState } from 'react';
import request from '@/utils/request';

// 图三
const piePatternImg = new Image();
piePatternImg.src = piePatternSrc;

export default function PiePattern(props: { uuid: number }) {
  const { uuid } = props;
  const [submitArr, setSubmitArr] = useState<QuestionSubmissionHistory[]>([]);
  const [allQuestion, setAllQuestion] = useState<any>([]);
  useEffect(() => {
    async function firstLoad() {
      const res = await request.get('/getAllQuestion', {
        params: {
          uuid,
        },
      });
      if (res.code === 200) {
        setAllQuestion(res.data.question);
      } else if (res.code >= 400) {
        message.error(res.msg);
      }
      const subRes = await request.get('/getSubHistoryByID', {
        params: {
          uuid,
        },
      });
      if (subRes.code === 200) {
        setSubmitArr(subRes.data.res);
      } else if (subRes.code >= 400) {
        message.error(subRes.msg);
      }
    }
    firstLoad();
  }, [uuid]);
  const { isLogin } = useAuth();
  let difQ = 0;
  let midQ = 0;
  let easQ = 0;
  allQuestion.forEach((item: any) => {
    if (item.level === 3) {
      difQ++;
    }
    if (item.level === 2) {
      midQ++;
    }
    if (item.level === 1) {
      easQ++;
    }
  });
  let difR = 0;
  let midR = 0;
  let easR = 0;
  submitArr.forEach((item: any) => {
    if (item.state !== 0) {
      if (item.level === 1) {
        easR++;
      }
      if (item.level === 2) {
        midR++;
      }
      if (item.level === 3) {
        difR++;
      }
    }
  });
  const allCount = difQ + midQ + easQ;
  const completeCount = difR + midR + easR;
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
            { value: easQ, name: '简单' },
            { value: midQ, name: '中等' },
            { value: difQ, name: '困难' },
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
    <Card title="刷题总计" bordered={false} style={{ width: 310 }}>
      <div className={styles.chartThree}>
        <Charts option={optionChartsThree} />
      </div>
      <p>
        总题目： {completeCount} / {allCount}
      </p>
      <p>
        简单：{easR}/ {easQ}
      </p>
      <p>
        中等：{midR}/ {midQ}
      </p>
      <p>
        困难：{difR}/ {difQ}
      </p>
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
