import { getNowMonthCalendar, dayNameCH } from '@/utils/date';
import { CheckCircleFilled } from '@ant-design/icons';
import styles from './index.less';

export default function DailyCalendar() {
  const dateArr = getNowMonthCalendar();
  const firstDay = dateArr[0].day;
  const year = dateArr[0].year;
  const month = dateArr[0].month;
  for (let i = 0; i < firstDay; i++) {
    dateArr.unshift({ year, month, date: -1, day: -1 });
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
          return item.date > 0 ? (
            item.date % 2 === 0 ? (
              <div key={index}>
                <CheckCircleFilled />
              </div>
            ) : (
              <div key={index}>
                <p>{item.date}</p>
              </div>
            )
          ) : (
            <div key={index} />
          );
        })}
      </div>
    </div>
  );
}
