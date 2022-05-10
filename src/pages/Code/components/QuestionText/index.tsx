import styles from './index.less';
import MarkdownPreview from '@uiw/react-markdown-preview';
import LevelTag from '@/components/LevelTag';

export default function QuestionText(props: {
  questionInfo: DetailQuestionOption;
}) {
  const { questionInfo } = props;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <p className={styles.title}>
          {questionInfo.question_index}. &nbsp; {questionInfo.question_name}
        </p>
        <LevelTag level={questionInfo.level} />
        <p className={styles.subTitle}>
          提交次数：{questionInfo.allSubmission} ｜ 成功次数：
          {questionInfo.successSubmission} ｜通过率：{' '}
          {((questionInfo.passRate as number) * 100).toFixed(2)}%
        </p>
      </div>
      <MarkdownPreview
        source={questionInfo.content}
        className={styles.questionText}
      />
    </div>
  );
}
