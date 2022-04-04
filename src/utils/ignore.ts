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
      if (codeIgnore[pre] === text[0]) {
        return true;
      }
    }
  } else {
    return true;
  }
  return false;
};
