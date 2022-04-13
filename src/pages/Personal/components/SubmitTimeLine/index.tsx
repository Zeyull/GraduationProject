import styles from './index.less';
import { Timeline, Card } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import LevelTag from '@/components/LevelTag';

export default function SubmitTimeLine() {
  const submitObject: QuestionSubmissionHistory[] = [
    {
      result: true,
      submitTime: '2022/03/27 11:01',
      questionIndex: 29,
      questionName: '合并两个有序数组',
      consumeTime: 76,
      questionLevel: '1',
    },
    {
      result: false,
      submitTime: '2022/03/26 12:01',
      questionIndex: 123,
      questionName: '合并两个有序数组',
      consumeTime: 76,
      questionLevel: '2',
    },
    {
      result: true,
      submitTime: '2022/03/25 09:01',
      questionIndex: 101,
      questionName: '合并两个有序数组',
      consumeTime: 76,
      questionLevel: '3',
    },
    {
      result: true,
      submitTime: '2022/03/27 11:01',
      questionIndex: 78,
      questionName: '合并两个有序数组',
      consumeTime: 76,
      questionLevel: '2',
    },
    {
      result: false,
      submitTime: '2022/03/27 11:01',
      questionIndex: 56,
      questionName: '合并有序数组',
      consumeTime: 76,
      questionLevel: '3',
    },
    {
      result: true,
      submitTime: '2022/03/19 12:31',
      questionIndex: 10,
      questionName: '合并两个有序数组',
      consumeTime: 76,
      questionLevel: '1',
    },
    {
      result: false,
      submitTime: '2022/03/10 11:01',
      questionIndex: 23,
      questionName: '合并K个有序数组',
      consumeTime: 76,
      questionLevel: '1',
    },
  ];
  return (
    <div className={styles.mainContainer}>
      <Timeline mode="alternate" className={styles.submitTimeLine}>
        {submitObject.map((item, index) => {
          return (
            <Timeline.Item
              key={index}
              dot={
                item.result ? (
                  <CheckCircleOutlined
                    style={{ fontSize: '18px', color: '#00B42A' }}
                  />
                ) : (
                  <CloseCircleOutlined
                    style={{ fontSize: '18px', color: '#CB2634' }}
                  />
                )
              }
              position={!item.result ? 'left' : 'right'}
            >
              <Card
                title={
                  <div className={styles.cardTitle}>
                    {item.result ? (
                      <>
                        <LevelTag level={item.questionLevel} />
                        <span className={styles.questionText}>
                          {item.questionIndex}. {item.questionName}{' '}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={styles.questionText}>
                          {item.questionIndex}. {item.questionName}{' '}
                        </span>
                        <LevelTag level={item.questionLevel} />
                      </>
                    )}
                  </div>
                }
                hoverable={true}
              >
                <p className={styles.timeText}>提交时间: {item.submitTime} </p>
                <p className={styles.timeText}>耗时: {item.consumeTime}ms</p>
              </Card>
            </Timeline.Item>
          );
        })}
      </Timeline>
      <div className={styles.endText}>End</div>
    </div>
  );
}
