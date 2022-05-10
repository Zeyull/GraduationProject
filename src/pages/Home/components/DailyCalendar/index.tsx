import { getNowMonthCalendar, dayNameCH } from '@/utils/date';
import { CheckCircleFilled } from '@ant-design/icons';
import styles from './index.less';
import request from '@/utils/request';
import { useEffect, useState } from 'react';
import moment from 'moment';
import * as _ from 'lodash';

export default function DailyCalendar(props: {
  dailyQuestion: any;
  uuid: number;
}) {
  const { dailyQuestion, uuid } = props;
  const dateArr = getNowMonthCalendar();
  const firstDay = dateArr[0].day;
  const year = dateArr[0].year;
  const month = dateArr[0].month;
  const [subHistory, setSubHistory] = useState([]);

  useEffect(() => {
    async function firstLoad() {
      const res = await request.get('/getSubHistoryByID', {
        params: {
          uuid,
        },
      });
      if (res.code === 200) {
        setSubHistory(res.data.res);
      }
    }
    firstLoad();
  }, [uuid]);

  for (let i = 0; i < firstDay; i++) {
    dateArr.unshift({ year, month, date: -1, day: -1 });
  }
  // 如果每日一题多了 效率不高
  function judgeDate(date: any) {
    for (let item of dailyQuestion) {
      if (
        moment(item.date).format('YYYY-MM-DD') ===
        `${date.year}-${_.padStart(date.month, 2, '0')}-${_.padStart(
          date.date,
          2,
          '0',
        )}`
      ) {
        let res = subHistory.find(
          (newItem: any) =>
            item.question_id === newItem.question_id && newItem.state === 1,
        );
        if (res !== undefined) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dayName}>
        {dayNameCH.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </div>
      <div className={styles.daysCalendar}>
        {dateArr.map((item, index) => {
          return judgeDate(item) ? (
            <div key={index}>
              <CheckCircleFilled />
            </div>
          ) : (
            <div key={index}>
              <p>{item.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
