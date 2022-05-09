import styles from './index.less';
import DailyQuestionList from './components/DailyQuestionList';
import DailyCalendar from './components/DailyCalendar';
import PiePattern from '../Personal/components/PiePattern';
import { Menu, Input, Table, Button, BackTop, message } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import {
  SettingOutlined,
  // HighlightOutlined,
  FireOutlined,
  CloseCircleOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  RightCircleOutlined,
  RetweetOutlined,
  UpCircleFilled,
  LockOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import LevelTag from '@/components/LevelTag';
import { useAuth } from '@/utils/auth';

const { Search } = Input;

const columns: ColumnType<QuestionOption>[] = [
  {
    title: '题目',
    dataIndex: 'name',
    sorter: (a, b) => a.index - b.index,
    render: (_value: any, record: QuestionOption) => {
      return (
        <p>
          {record.index}.{record.name}
        </p>
      );
    },
  },
  {
    align: 'center',
    title: '难度',
    dataIndex: 'level',
    sorter: (a, b) => Number(a.level) - Number(b.level),
    render: (_value: any, record: QuestionOption) => {
      return <LevelTag level={record.level} />;
    },
  },
  {
    align: 'center',
    title: '题解/讨论',
    dataIndex: 'solutions',
    sorter: (a, b) => (a.solutions as number) - (b.solutions as number),
  },
  {
    align: 'center',
    title: '通过率',
    dataIndex: 'passRate',
    sorter: (a, b) => (a.passRate as number) - (b.passRate as number),
    render: (_value: any, record: QuestionOption) => {
      return <p>{record.passRate}%</p>;
    },
  },
  {
    align: 'center',
    title: '完成情况',
    dataIndex: 'state',
    className: 'icon',
    sorter: (a, b) => Number(a.state) - Number(b.state),
    render: (_value: any, record: QuestionOption) => {
      return record.state ? (
        <CheckSquareOutlined style={{ color: '#0FC6C2' }} />
      ) : (
        <CloseSquareOutlined style={{ color: '#CB2634' }} />
      );
    },
  },
];
// mock数据
const data: QuestionOption[] = [
  {
    id: '23',
    index: 23,
    name: '接雨水',
    state: false,
    level: '3',
    solutions: 79,
    passRate: 35,
  },
  {
    id: '131',
    index: 131,
    name: '打家拦舍',
    state: true,
    level: '2',
    solutions: 129,
    passRate: 75,
  },
  {
    id: '1',
    index: 1,
    name: '两数之和',
    state: true,
    level: '1',
    solutions: 100,
    passRate: 65,
  },
  {
    id: '22',
    index: 22,
    name: '接雨水-改',
    state: false,
    level: '3',
    solutions: 49,
    passRate: 37,
  },
  {
    id: '43',
    index: 43,
    name: '背包问题',
    state: true,
    level: '2',
    solutions: 65,
    passRate: 50,
  },
  {
    id: '63',
    index: 63,
    name: '完全背包问题',
    state: true,
    level: '2',
    solutions: 191,
    passRate: 65,
  },
  {
    id: '64',
    index: 64,
    name: '01背包问题',
    state: true,
    level: '2',
    solutions: 15,
    passRate: 43,
  },
  {
    id: '5',
    index: 5,
    name: '二叉树的前序遍历',
    state: true,
    level: '1',
    solutions: 10,
    passRate: 70,
  },
  {
    id: '6',
    index: 6,
    name: '二叉树的中序遍历',
    state: true,
    level: '1',
    solutions: 14,
    passRate: 60,
  },
  {
    id: '7',
    index: 7,
    name: '二叉树的后序遍历',
    state: true,
    level: '1',
    solutions: 12,
    passRate: 43,
  },
];

export default function Home() {
  const { isLogin } = useAuth();
  const [tableData, setTableData] = useState(data);
  const [currentKey, setCurrentKey] = useState('all');
  const keepDays = 31;
  const todayQuestionBoolean = true;
  const handleClick = (e: any) => {
    if (!isLogin) {
      return;
    }
    setCurrentKey(e.key);
  };
  const onSearch = (value: string) => console.log(value);

  // 加载更多的题目
  const loadQuestion = () => {
    setTableData([...data, ...tableData]);
  };

  const clickSort = () => {
    if (!isLogin) {
      return message.error('请先登录');
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* <div className={styles.pageContainer}>1</div> */}
      <div className={styles.dailyQuestionContainer}>
        <div className={styles.dailyQuestion}>
          <DailyQuestionList />
        </div>
        <div className={styles.recordContainer}>
          <DailyCalendar />
          <div className={styles.recordBool}>
            <p>今日一题</p>
            {todayQuestionBoolean ? (
              <p className={styles.success}>已完成</p>
            ) : (
              <p className={styles.error}>未完成</p>
            )}
          </div>
          <p className={styles.recordKeep}>已连续打卡{keepDays}天</p>
          <div
            className={styles.unLoginMask}
            style={{ display: isLogin ? 'none' : 'inline' }}
          >
            <div className={styles.unLoginLock}>
              <LockOutlined />
              <p>请登录后查看</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.listQuestionMenuSeach}>
        <Menu
          onClick={handleClick}
          selectedKeys={[currentKey]}
          mode="horizontal"
          className={styles.listQuestionMenu}
        >
          <Menu.Item key="all" icon={<SettingOutlined />}>
            全部题目
          </Menu.Item>
          <Menu.Item
            key="Incomplete"
            icon={<CloseCircleOutlined />}
            onClick={clickSort}
          >
            未完成
          </Menu.Item>
          <Menu.Item key="fire" icon={<FireOutlined />} onClick={clickSort}>
            大家都在做
          </Menu.Item>
        </Menu>
        <Search
          placeholder="请输入题目关键字"
          onSearch={onSearch}
          enterButton
          className={styles.listQuestionSearch}
        />
      </div>
      <div className={styles.listQuestionContainer}>
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey={(record) => record.id}
          className={styles.listQuestionTable}
          showSorterTooltip={false}
          pagination={false}
        />
        <div className={styles.rightOverflow}>
          <div className={styles.rightStickyContainer}>
            <PiePattern />
            <Button
              type="primary"
              className={styles.randomButton}
              icon={<RetweetOutlined />}
            >
              随机一题
            </Button>
          </div>
        </div>
        <BackTop>
          <UpCircleFilled className={'backTopUp'} />
        </BackTop>
      </div>
      <Button
        className={styles.listLoadButton}
        type="default"
        icon={<RightCircleOutlined />}
        onClick={loadQuestion}
      >
        加载更多
      </Button>
    </div>
  );
}
