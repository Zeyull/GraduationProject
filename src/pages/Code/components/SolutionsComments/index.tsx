import styles from './index.less';
import { Button, Input } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ArticleDataList from '@/components/ArticleDataList';

export default function SolutionsComments() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.searchContainer}>
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
          <Input placeholder="请输入搜索内容" bordered={false} />
        </div>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} />
      </div>
      <div className={styles.solutionsContainer}>
        <ArticleDataList isPagination={true} />
      </div>
    </div>
  );
}
