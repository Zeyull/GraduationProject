import styles from './index.less';
import MarkdownPreview from '@uiw/react-markdown-preview';
import LevelTag from '@/components/LevelTag';

export default function QuestionText(props: { questionMd: string }) {
  const { questionMd } = props;
  document.documentElement.setAttribute('data-color-mode', 'light');
  const questionInfo: DetailQuestionOption = {
    id: '682',
    index: 682,
    name: '棒球比赛',
    state: false,
    passRate: 80,
    solutions: 63,
    allSubmission: 100,
    successSubmission: 80,
    level: '1',
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <p className={styles.title}>
          {questionInfo.index}. &nbsp; {questionInfo.name}
        </p>
        <LevelTag level={questionInfo.level} />
        <p className={styles.subTitle}>
          提交次数：{questionInfo.allSubmission} ｜ 成功次数：
          {questionInfo.successSubmission} ｜通过率： {questionInfo.passRate}%
        </p>
      </div>
      <MarkdownPreview source={questionMd} className={styles.questionText} />
    </div>
  );
}
