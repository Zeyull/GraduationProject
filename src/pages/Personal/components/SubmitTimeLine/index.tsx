import styles from './index.less';
import { Timeline, Card, Empty } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import LevelTag from '@/components/LevelTag';
import moment from 'moment';

export default function SubmitTimeLine(props: {
  submitArr: QuestionSubmissionHistory[];
}) {
  const { submitArr } = props;

  return (
    <div className={styles.mainContainer}>
      <Timeline mode="alternate" className={styles.submitTimeLine}>
        {submitArr.length === 0 ? (
          <Empty />
        ) : (
          submitArr.map((item, index) => {
            return (
              <Timeline.Item
                key={index}
                dot={
                  item.state === 1 ? (
                    <CheckCircleOutlined
                      style={{ fontSize: '18px', color: '#00B42A' }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{ fontSize: '18px', color: '#CB2634' }}
                    />
                  )
                }
                position={item.state === 1 ? 'left' : 'right'}
              >
                <Card
                  title={
                    <div className={styles.cardTitle}>
                      {item.state === 1 ? (
                        <>
                          <LevelTag level={item.level} />
                          <span className={styles.questionText}>
                            {item.question_index}. {item.question_name}{' '}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className={styles.questionText}>
                            {item.question_index}. {item.question_name}{' '}
                          </span>
                          <LevelTag level={item.level} />
                        </>
                      )}
                    </div>
                  }
                  hoverable={true}
                >
                  <p className={styles.timeText}>
                    提交时间: {moment(item.date).format('YYYY-MM-DD HH:mm')}{' '}
                  </p>
                  <p className={styles.timeText}>耗时: {item.time}ms</p>
                </Card>
              </Timeline.Item>
            );
          })
        )}
      </Timeline>
      <div className={styles.endText}>End</div>
    </div>
  );
}
