import styles from './index.less';
import { Button, Input } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ArticleDataList from '@/components/ArticleDataList';
import { history } from 'umi';

export default function SolutionsComments(props: { question_id: number }) {
  const { question_id } = props;
  function goToCreateArticle() {
    history.push(`/create-article?id=${question_id}`);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.searchContainer}>
          {/* <Button type="primary" shape="circle" icon={<SearchOutlined />} /> */}
          <Input
            placeholder="点击右侧编写新题解"
            bordered={false}
            readOnly={true}
          />
        </div>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={goToCreateArticle}
        />
      </div>
      <div className={styles.solutionsContainer}>
        <ArticleDataList isPagination={true} question_id={question_id} />
      </div>
    </div>
  );
}
