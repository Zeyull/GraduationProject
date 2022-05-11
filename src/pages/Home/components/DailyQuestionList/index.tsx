import styles from './index.less';
import { CalendarOutlined } from '@ant-design/icons';
import { getNowDate } from '@/utils/date';
import moment from 'moment';
import { history } from 'umi';

export default function DailyQuestionList(props: {
  dailyQuestion: any;
  allQuestion: any;
}) {
  const { dailyQuestion, allQuestion } = props;
  const optionsArr: DailyQuestionOption[] = [];
  dailyQuestion.forEach((item: any) => {
    const findQuestion = allQuestion.find((qitem: any) => {
      return item.question_id === qitem.question_id;
    });
    optionsArr.push({
      date: item.date,
      question_id: item.question_id,
      question_index: findQuestion.question_index,
      question_name: findQuestion.question_name,
      state: findQuestion.state,
    });
  });

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
  const { question_index, question_name, state, date, question_id } = option;
  const nowDateBoolean =
    getNowDate('L') === moment(date).format('YYYY-MM-DD') ? true : false;
  function toCodePage() {
    history.push(`/code/${question_id}`);
  }

  return (
    <div
      className={
        nowDateBoolean
          ? `${styles.itemContainer} ${styles.nowDate}`
          : styles.itemContainer
      }
      onClick={toCodePage}
    >
      <div className={styles.itemTitle}>
        <CalendarOutlined />
        <p>{moment(date).format('YYYY-MM-DD')}</p>
      </div>
      <p className={styles.indexName}>
        {question_index}.{question_name}
      </p>
      {state === 1 ? (
        <p className={styles.finished}>已完成</p>
      ) : (
        <p className={styles.unFinished}>未完成</p>
      )}
    </div>
  );
}
