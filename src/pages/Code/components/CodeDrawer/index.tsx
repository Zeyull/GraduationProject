import styles from './index.less';
import { UpCircleFilled, DownCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

export default function CodeDrawer() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [runVal, _setRunVal] = useState('');
  const [standardVal, _setStandardVal] = useState('');

  // 控制测试用例输入
  const onInputValChange = (e: any) => {
    setInputValue(e.target.value);
  };
  // 切换窗口状态
  const changeDrawerState = () => {
    setIsOpenDrawer((pre) => !pre);
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
      <div className={styles.leftContainer}>
        <p>测试用例</p>
        <TextArea
          value={inputValue}
          onChange={onInputValChange}
          placeholder="自测样例"
          autoSize={{ minRows: 5, maxRows: 5 }}
        />
      </div>
      <div className={styles.columnLine} />

      <div className={styles.rightContainer}>
        <div className={styles.runInput}>
          <p>运行结果</p>
          <Input value={runVal} readOnly />
        </div>
        <div className={styles.standardInput}>
          <p>标准结果</p>
          <Input value={standardVal} readOnly />
        </div>
      </div>
    </div>
  );
}
