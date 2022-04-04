import styles from './index.less';
import { Menu, Select, Popover, Button, Tooltip, message } from 'antd';
import {
  FileTextOutlined,
  HighlightOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  ExpandOutlined,
  CompressOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import questionMD from './questionMD.js';
import { useState } from 'react';
import QuestionText from './components/QuestionText';
import SubmissionHistory from './components/SubmissionHistory';
import CodeDrawer from './components/CodeDrawer';
import { useAtom } from 'jotai';
import { isFullCodePage } from '@/jotai';
import { codeIgnoreToken } from '@/utils/ignore';
import { defaultCodeContextFn, codeMirrorModeFn } from '@/utils/defaultCode';
// codemirror 基础文件
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import type { EditorConfiguration } from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
// codemirror 主题样式
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/mdn-like.css';

// 代码补全
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
// 代码折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
// 光标行代码高亮
import 'codemirror/addon/selection/active-line';
// 左右括号高亮 括号自动闭合
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
// 语言类型
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/perl/perl.js';
import 'codemirror/mode/clike/clike.js';

// import request from '@/utils/request';

const { Option } = Select;

export default function Code() {
  const [menuComponent, setMenuComponent] = useState(
    <QuestionText questionMd={questionMD} />,
  );
  const [isFullPage, setIsCodeFullPage] = useAtom(isFullCodePage);
  const [defaultCodeContext, setDefaultCodeContext] = useState(
    defaultCodeContextFn('JavaScript', 'any'),
  );
  const [codeMirrorMode, setCodeMirrorMode] = useState(
    codeMirrorModeFn('JavaScript'),
  );
  const menuClick = (e: any) => {
    switch (e.keyPath[0]) {
      case 'text':
        setMenuComponent(<QuestionText questionMd={questionMD} />);
        break;
      case 'solutions':
        setMenuComponent(<QuestionText questionMd={questionMD} />);
        break;
      case 'history':
        setMenuComponent(<SubmissionHistory />);
    }
  };
  const isFullCodePageClick = () => {
    setIsCodeFullPage((pre) => !pre);
  };
  // const [md, handleMD] = useState('loading... ...');

  // useEffect(() => {
  // request.get('public/questionMd.md')
  //   fetch('public/questionMd.md')
  //     .then((res) => {console.log(res); return res.text()})
  //     .then((txt) => {console.log(txt);handleMD(txt)});

  // }, [md]);

  // 处理语言选择栏选择结果
  const handleLanguageSelect = (e: any) => {
    setDefaultCodeContext(defaultCodeContextFn(e, 'any'));
    setCodeMirrorMode(codeMirrorModeFn(e));
  };

  const PopoverContent = (
    <div style={{ width: '200px' }}>
      <p>
        代码框中预设代码已经指定好类名、方法名、参数名，请勿修改或重新命名，直接返回值即可。
      </p>
    </div>
  );

  const codeMirrorOptions: EditorConfiguration = {
    lineNumbers: true,
    mode: codeMirrorMode,
    theme: 'mdn-like',
    extraKeys: {
      'Ctrl-S': function () {
        message.success('已自动保存');
      },
      'Cmd-S': function () {
        message.success('已自动保存');
      },
    }, // 自动提示配置
    autofocus: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    tabSize: 4, // tab 宽度
    indentUnit: 4, // 缩进单位
    styleActiveLine: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    hintOptions: {
      completeSingle: false,
    },
  };

  return (
    <div
      className={styles.mainContainer}
      style={
        isFullPage
          ? { paddingTop: '0px', height: '100vh' }
          : { paddingTop: '10px', height: 'calc(100vh - 70px)' }
      }
    >
      <div className={styles.leftContainer}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['text']}
          onClick={menuClick}
          className={styles.menuSelect}
        >
          <Menu.Item key="text" icon={<FileTextOutlined />}>
            题目描述
          </Menu.Item>
          <Menu.Item key="solutions" icon={<HighlightOutlined />}>
            题解讨论
          </Menu.Item>
          <Menu.Item key="history" icon={<HistoryOutlined />}>
            提交记录
          </Menu.Item>
        </Menu>
        <div className={styles.menuContainer}>{menuComponent}</div>
        <div className={styles.bottomLine} />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.codeOptions}>
          <div className={styles.languageOptions}>
            <Select
              defaultValue="JavaScript"
              style={{ width: 120 }}
              onChange={handleLanguageSelect}
              className={styles.languageSelect}
            >
              <Option value="JavaScript">JavaScript</Option>
              <Option value="C++">C++</Option>
              <Option value="C">C</Option>
              <Option value="Java">Java</Option>
              <Option value="Python">Python</Option>
            </Select>
            <Popover
              className={styles.popoverText}
              placement="bottomLeft"
              content={PopoverContent}
              trigger="click"
            >
              <div className={styles.greenCircle} />
              <p>核心代码模式</p>
            </Popover>
          </div>
          <div className={styles.otherOptions}>
            <QuestionCircleOutlined />
            <Tooltip title={<p>重制代码</p>}>
              <RedoOutlined />
            </Tooltip>
            {isFullPage ? (
              <CompressOutlined onClick={isFullCodePageClick} />
            ) : (
              <ExpandOutlined onClick={isFullCodePageClick} />
            )}
          </div>
        </div>
        <div className={styles.codeContainer}>
          <ReactCodeMirror
            value={defaultCodeContext}
            options={codeMirrorOptions}
            onChange={(editor, data, _value) => {
              if (data.origin === '+input') {
                if (!codeIgnoreToken(data.text)) {
                  setTimeout(() => {
                    editor.execCommand('autocomplete');
                  }, 20);
                }
              }
            }}
          />
        </div>
        <CodeDrawer />
        <div className={styles.codeButton}>
          <Button className={styles.submit} type="primary">
            提交
          </Button>
          <Button className={styles.test} icon={<ApiOutlined />}>
            测试
          </Button>
        </div>
      </div>
    </div>
  );
}
