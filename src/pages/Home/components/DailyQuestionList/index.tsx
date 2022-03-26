import styles from './index.less';
import { CalendarOutlined } from '@ant-design/icons';
import { getNowDate } from '@/utils/date';

const optionsArr: DailyQuestionOption[] = [
  {
    id: '#120',
    index: 30,
    name: '数气球',
    state: false,
    date: '2022/03/16',
  },
  {
    id: '#120',
    index: 30,
    name: '数气球',
    state: false,
    date: '2022/03/16',
  },
  {
    id: '#120',
    index: 30,
    name: '数气球',
    state: false,
    date: '2022/03/16',
  },
  {
    id: '#120',
    index: 30,
    name: '数气球',
    state: false,
    date: '2022/03/16',
  },
  {
    id: '#120',
    index: 30,
    name: '数气球',
    state: false,
    date: '2022/03/16',
  },
  {
    id: '#120',
    index: 30,
    name: '数气球',
    state: false,
    date: '2022/03/16',
  },
  {
    id: '#121',
    index: 101,
    name: '背包问题',
    state: true,
    date: '2022/03/17',
  },
  {
    id: '#122',
    index: 10,
    name: '飞碟的数量',
    state: false,
    date: '2022/03/18',
  },
  {
    id: '#123',
    index: 23,
    name: '树的前序遍历',
    state: true,
    date: '2022/03/19',
  },
].reverse();

export default function DailyQuestionList() {
  return (
    <div className={styles.mainContainer}>
      <p className={styles.title}>每日一题</p>
      <div className={styles.lineRow} />
      <p className={styles.subTitle}>一份耕耘，一份收获</p>
      <div className={styles.recordListOuter}>
        <div className={styles.recordList}>
          <div className={styles.continueText}>
            <p>TO BE</p>
            <p>CONTINUED...</p>
          </div>
          {optionsArr.map((item, index) => {
            return <DailyQuestionItem option={item} key={index} />;
          })}
        </div>
        <span className={styles.opacityMaskL} />
        <span className={styles.opacityMaskR} />
      </div>
    </div>
  );
}

function DailyQuestionItem(props: { option: DailyQuestionOption }) {
  const option = props.option;
  const { index, name, state, date } = option;
  const nowDateBoolean = getNowDate('L') === date ? true : false;
  // id
  return (
    <div
      className={
        nowDateBoolean
          ? `${styles.itemContainer} ${styles.nowDate}`
          : styles.itemContainer
      }
    >
      <div className={styles.itemTitle}>
        <CalendarOutlined />
        <p>{date}</p>
      </div>
      <p className={styles.indexName}>
        {index}.{name}
      </p>
      {state ? (
        <p className={styles.finished}>已完成</p>
      ) : (
        <p className={styles.unFinished}>未完成</p>
      )}
    </div>
  );
}
