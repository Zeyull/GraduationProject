import styles from './index.less';
import { Table, message, Spin } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { userInfoAtom } from '@/jotai';
import { useAtom } from 'jotai';
import request from '@/utils/request';
import { useState, useEffect } from 'react';
import moment from 'moment';

const columns: ColumnType<QuestionSubmissionHistory>[] = [
  {
    align: 'center',
    title: '结果',
    dataIndex: 'result',
    render: (_value: any, record) => {
      return (
        <p className={record.state ? styles.resultSuccess : styles.resultError}>
          {record.state === 1 ? '成功' : '失败'}
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
      return <p>{record.time}ms</p>;
    },
  },
  {
    align: 'center',
    title: '提交时间',
    dataIndex: 'submitTime',
    render: (_value: any, record) => {
      return <p>{moment(record.date).format('YYYY/MM/DD HH:mm')}</p>;
    },
  },
];

export default function SubmissionHistory(props: {
  question_id: number;
  judgeLoading: boolean;
}) {
  const [userInfo] = useAtom(userInfoAtom);
  const [tableData, setTableData] = useState([]);
  const { question_id, judgeLoading } = props;
  useEffect(() => {
    async function firstLoad() {
      const res = await request.get('/getJudgeSubmitsByID', {
        params: {
          uuid: userInfo.uuid === null ? 0 : userInfo.uuid,
          question_id,
        },
      });
      if (res.code >= 400) {
        message.error('获取题目提交历史记录请求错误');
      } else if (res.code === 200) {
        setTableData(res.data.list);
      }
    }
    firstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [judgeLoading]);
  return (
    <div className={styles.mainContainer}>
      {judgeLoading ? (
        <Spin style={{ marginLeft: '46%', marginTop: '10%' }} size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey={(record) => record.date}
          pagination={false}
        />
      )}
    </div>
  );
}
