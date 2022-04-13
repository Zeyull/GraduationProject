import styles from './index.less';
import { Collapse } from 'antd';
import { codemirrorOnchange, getCodeMirrorOptions } from '@/utils/codeOptionFn';
import { useAtom } from 'jotai';
import { htmlValue, cssValue, jsValue } from '@/jotai';
// codemirror 基础文件
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
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
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/hint/html-hint.js';
// 代码折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
// 光标行代码高亮
import 'codemirror/addon/selection/active-line';
// 自动闭合标签
import 'codemirror/addon/edit/closetag.js';
// 左右括号高亮 括号自动闭合
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
// 语言类型
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/css/css.js';
// 代码校验
import 'codemirror/addon/lint/lint.js'; // 错误校验
import 'codemirror/addon/lint/lint.css'; // 错误校验

const { Panel } = Collapse;

export default function CodeContent() {
  const [, setHtml] = useAtom(htmlValue);
  const [, setCss] = useAtom(cssValue);
  const [, setJs] = useAtom(jsValue);
  return (
    <div className={styles.mainContainer}>
      <Collapse defaultActiveKey={['HTML', 'CSS', 'JS']}>
        <Panel header="HTML代码" key="HTML">
          <ReactCodeMirror
            value={'/* write <div>content</div> here */'}
            options={getCodeMirrorOptions('text/html')}
            onChange={(editor, data, value) => {
              codemirrorOnchange(editor, data, value);
              setHtml(editor.getValue());
            }}
          />
        </Panel>
        <Panel header="CSS代码" key="CSS">
          <ReactCodeMirror
            value={'/* write css here */'}
            options={getCodeMirrorOptions('text/css')}
            onChange={(editor, data, value) => {
              codemirrorOnchange(editor, data, value);
              setCss(editor.getValue());
            }}
          />
        </Panel>
        <Panel header="JS代码" key="JS">
          <ReactCodeMirror
            value={'// write JavaScript here'}
            options={getCodeMirrorOptions('application/javascript')}
            onChange={(editor, data, value) => {
              codemirrorOnchange(editor, data, value);
              setJs(editor.getValue());
            }}
          />
        </Panel>
      </Collapse>
    </div>
  );
}
