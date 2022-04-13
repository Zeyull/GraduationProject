import * as _ from 'lodash';
/**
 * 忽略自动提示的 token
 */
const codeIgnore = [
  '',
  '#',
  '!',
  '-',
  '=',
  '@',
  '$',
  '%',
  '&',
  '+',
  ';',
  '(',
  ')',
  '*',
  ' ',
  '\t',
  '\n',
];
export const codeIgnoreToken = (text: string[]) => {
  if (text !== [] && text[0]) {
    for (const pre in codeIgnore) {
      if (_.trimStart(text[0], ' ') === codeIgnore[pre]) {
        return true;
      }
    }
  } else {
    return true;
  }
  return false;
};
