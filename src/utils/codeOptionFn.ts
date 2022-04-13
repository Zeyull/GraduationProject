import { codeIgnoreToken } from './ignore';
import * as _ from 'lodash';
import type { EditorConfiguration } from 'codemirror';
import { message } from 'antd';

// 换行后新增空行
export const extraEnterLine = (data: any, editor: any) => {
  const currentLine = data.to.line;
  const nextLine = currentLine + 1;
  const addString = '\t';
  const valueArr = editor.getValue().split('\n');
  if (_.trimStart(valueArr[nextLine], ' ') !== '') {
    valueArr.splice(nextLine, 0, addString);
    editor.setValue(valueArr.join('\n'));
    editor.setCursor({ line: nextLine, ch: 1, sticky: null });
  }
};

export function codemirrorOnchange(editor: any, data: any, _value: any) {
  if (data.origin === '+input') {
    if (data.text.toString() === ',') {
      extraEnterLine(data, editor);
    }
    if (!codeIgnoreToken(data.text)) {
      setTimeout(() => {
        editor.execCommand('autocomplete');
      }, 20);
    }
  }
}

export function getCodeMirrorOptions(
  languageMode: string,
): EditorConfiguration {
  return {
    lineNumbers: true,
    mode: languageMode,
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
    autoCloseTags: true, // 是否自动闭合标签
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    hintOptions: {
      completeSingle: false,
    },
    lint: true, // 代码显示报错
  };
}
