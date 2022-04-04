import styles from './index.less';
import { Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';

const columns: ColumnType<QuestionSubmissionHistory>[] = [
  {
    align: 'center',
    title: '结果',
    dataIndex: 'result',
    render: (_value: any, record) => {
      return (
        <p
          className={record.result ? styles.resultSuccess : styles.resultError}
        >
          {record.result ? '成功' : '失败'}
        </p>
      );
    },
  },
  {
    align: 'center',
    title: '语言',
    dataIndex: 'language',
    render: (_value: any, record) => {
      return <p>{record.language}</p>;
    },
  },
  {
    align: 'center',
    title: '用时',
    dataIndex: 'consumeTime',
    render: (_value: any, record) => {
      return <p>{record.consumeTime}ms</p>;
    },
  },
  {
    align: 'center',
    title: '提交时间',
    dataIndex: 'submitTime',
    render: (_value: any, record) => {
      return <p>{record.submitTime}</p>;
    },
  },
];

const tableData: QuestionSubmissionHistory[] = [
  {
    result: true,
    language: 'JavaScript',
    consumeTime: 93,
    submitTime: '2022/03/27 11:01',
  },
  {
    result: false,
    language: 'C++',
    consumeTime: 43,
    submitTime: '2022/03/26 12:01',
  },
  {
    result: true,
    language: 'JavaScript',
    consumeTime: 133,
    submitTime: '2022/03/26 10:43',
  },
  {
    result: true,
    language: 'C++',
    consumeTime: 50,
    submitTime: '2022/03/25 16:45',
  },
];
export default function SubmissionHistory() {
  return (
    <div className={styles.mainContainer}>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey={(record) => record.submitTime}
        pagination={false}
      />
    </div>
  );
}
