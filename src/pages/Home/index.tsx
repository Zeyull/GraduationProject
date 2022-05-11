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
import { useEffect, useState } from 'react';
import LevelTag from '@/components/LevelTag';
import { useAuth } from '@/utils/auth';
import request from '@/utils/request';
import { userInfoAtom } from '@/jotai';
import { useAtom } from 'jotai';
import { history } from 'umi';
import moment from 'moment';

const { Search } = Input;

const columns: ColumnType<QuestionOption>[] = [
  {
    title: '题目',
    dataIndex: 'name',
    sorter: (a, b) => a.question_index - b.question_index,
    render: (_value: any, record: QuestionOption) => {
      return (
        <p>
          {record.question_index}.{record.question_name}
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
    dataIndex: 's',
    sorter: (a, b) => (a.passRate as number) - (b.passRate as number),
    render: (_value: any, record: QuestionOption) => {
      return <p>{((record.passRate as number) * 100).toFixed(2)}%</p>;
    },
  },
  {
    align: 'center',
    title: '完成情况',
    dataIndex: 'state',
    className: 'icon',
    sorter: (a, b) => Number(a.state) - Number(b.state),
    render: (_value: any, record: QuestionOption) => {
      return record.state === 1 ? (
        <CheckSquareOutlined style={{ color: '#0FC6C2' }} />
      ) : (
        <CloseSquareOutlined style={{ color: '#CB2634' }} />
      );
    },
  },
];

export default function Home() {
  const { isLogin } = useAuth();
  const [userInfo] = useAtom(userInfoAtom);
  const [tableData, setTableData] = useState([]);
  const [originTableData, setOriginTableData] = useState([]);
  const [dailyQuestion, setDailyQuestion] = useState([]);
  const [currentKey, setCurrentKey] = useState('all');
  const [days, setDays] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const handleClick = (e: any) => {
    if (!isLogin) {
      return;
    }
    setCurrentKey(e.key);
  };
  const onSearch = (value: string) => {
    if (value === '') {
      setTableData(originTableData);
    }
    setTableData(
      originTableData.filter((item: any) => item.question_name.includes(value)),
    );
  };

  // 加载更多的题目
  const loadQuestion = () => {
    message.warn('暂无更多');
  };

  const clickSort = (e: any) => {
    if (!isLogin) {
      return message.error('请先登录');
    }
    const key = e.key;
    if (key === 'Incomplete') {
      setTableData(originTableData.filter((item: any) => item.state === 0));
    } else if (key === 'fire') {
      setTableData(
        originTableData.sort(
          (a: any, b: any) => (b.solutions as number) - (a.solutions as number),
        ),
      );
    } else if (key === 'all') {
      setTableData(originTableData);
    }
  };

  useEffect(() => {
    async function firstLoad() {
      const quesstionRes = await request.get('/getAllQuestion', {
        params: {
          uuid: userInfo.uuid === null ? 0 : userInfo.uuid,
        },
      });
      setTableData(quesstionRes.data.question);
      setOriginTableData(quesstionRes.data.question);
      const dailyRes = await request.get('/getDailyQuestion');
      if (dailyRes.code === 200) {
        setDailyQuestion(dailyRes.data.data.reverse());
      }
      const nowDate = moment().format('YYYY-MM-DD');
      const originTableData = quesstionRes.data.question;
      const dailyQuestion = dailyRes.data.data;
      let days = 0;
      dailyQuestion.forEach((item: any) => {
        const findQ = originTableData.find(
          (oitem: any) =>
            oitem.question_id === item.question_id && oitem.state === 1,
        );
        if (findQ !== undefined) {
          days++;
          if (nowDate === moment(item.date).format('YYYY-MM-DD')) {
            setIsCompleted(true);
          }
        }
      });
      setDays(days);
    }
    firstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToCodePage(question_id: number) {
    history.push(`/code/${question_id}`);
  }

  function linkToRandomQuestion() {
    const random = Math.floor(Math.random() * (originTableData.length - 1)) + 1;
    history.push(`/code/${random}`);
  }

  return (
    <div className={styles.mainContainer}>
      {/* <div className={styles.pageContainer}>1</div> */}
      <div className={styles.dailyQuestionContainer}>
        <div className={styles.dailyQuestion}>
          <DailyQuestionList
            dailyQuestion={dailyQuestion}
            allQuestion={originTableData}
          />
        </div>
        <div className={styles.recordContainer}>
          <DailyCalendar
            dailyQuestion={dailyQuestion}
            uuid={userInfo.uuid === null ? 0 : userInfo.uuid}
          />
          <div className={styles.recordBool}>
            <p>今日一题</p>
            {isCompleted ? (
              <p className={styles.success}>已完成</p>
            ) : (
              <p className={styles.error}>未完成</p>
            )}
          </div>
          <p className={styles.recordKeep}>已打卡{days}天</p>
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
          <Menu.Item key="all" icon={<SettingOutlined />} onClick={clickSort}>
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
          rowKey={(record) => record.question_id}
          className={styles.listQuestionTable}
          showSorterTooltip={false}
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => {
                goToCodePage(record.question_id);
              },
            };
          }}
        />
        <div className={styles.rightOverflow}>
          <div className={styles.rightStickyContainer}>
            <PiePattern uuid={userInfo.uuid === null ? 0 : userInfo.uuid} />
            <Button
              type="primary"
              className={styles.randomButton}
              icon={<RetweetOutlined />}
              onClick={linkToRandomQuestion}
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
