import styles from './index.less';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function QuestionText(props: { questionData: FrontQuestion[] }) {
  const { questionData } = props;
  return (
    <div className={styles.mainContainer}>
      <Collapse accordion defaultActiveKey={['1']}>
        {questionData.map((item, index) => {
          return (
            <Panel
              header={`${index + 1}. ${item.question_name}`}
              key={item.fquestion_id}
            >
              <p>{item.question_content.replace(/\\n/gm, '\n')}</p>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}
