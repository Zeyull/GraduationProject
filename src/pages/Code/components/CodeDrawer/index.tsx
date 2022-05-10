import styles from './index.less';
import { UpCircleFilled, DownCircleFilled } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import { useState } from 'react';
import { judgeReutrn } from '@/utils/dataHandle';

const { TextArea } = Input;

export default function CodeDrawer(props: { runVal: any; isLoading: boolean }) {
  const { runVal, isLoading } = props;
  const res = judgeReutrn(runVal);
  const msg = res.msg;
  let status = 'normal';
  if (res.res === true) {
    status = 'success';
  } else if (res.res === false) {
    status = 'fail';
  }
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [standardVal, _setStandardVal] = useState('');

  // 控制测试用例输入
  const onInputValChange = (e: any) => {
    setInputValue(e.target.value);
  };
  // 切换窗口状态
  const changeDrawerState = () => {
    setIsOpenDrawer((pre) => !pre);
  };

  const textareaClass = () => {
    let className = '';
    switch (status) {
      case 'success':
        className = styles.success;
        break;
      case 'fail':
        className = styles.fail;
        break;
    }
    return className;
  };

  return (
    <div
      className={styles.mainContainer}
      style={
        isOpenDrawer ? { position: 'relative' } : { top: 'calc(100% - 50px)' }
      }
    >
      {isOpenDrawer ? (
        <DownCircleFilled
          className={styles.openIcon}
          onClick={changeDrawerState}
        />
      ) : (
        <UpCircleFilled
          className={styles.openIcon}
          onClick={changeDrawerState}
        />
      )}
      {/* <div className={styles.leftContainer}>
        <p>测试用例</p>
        <TextArea
          value={inputValue}
          onChange={onInputValChange}
          placeholder="自测样例"
          autoSize={{ minRows: 5, maxRows: 5 }}
        />
      </div>
      <div className={styles.columnLine} /> */}

      <div
        className={styles.rightContainer}
        style={{ width: '100%', height: '100%' }}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <div className={`${styles.runInput} ${textareaClass()}`}>
            <p>运行结果</p>
            <TextArea
              value={msg}
              autoSize={{ minRows: 3, maxRows: 3 }}
              readOnly
            />
          </div>
        )}

        {/* <div className={styles.standardInput}>
          <p>标准结果</p>
          <Input value={standardVal} readOnly />
        </div> */}
      </div>
    </div>
  );
}
