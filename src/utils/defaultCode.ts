export function defaultCodeContextFn(
  languageType: string,
  _questionID: string,
): string {
  let codeContext = '';
  switch (languageType) {
    case 'JavaScript':
      codeContext = `var fn = function(params) {
    //write code here
};`;
      break;
    case 'Java':
      codeContext = `class Solution {
    public xxx fn(xxx) {
        //write code here
    }
}`;
      break;
    case 'C++':
      codeContext = `class Solution {
public:
    xxx fn(xxx) {
        //write code here
    }
};`;
      break;
    case 'Python':
      codeContext = `class Solution(object):
    def fn(params):
        //write code here`;
      break;
    case 'C':
      codeContext = `xxx nextGreatestLetter(xxx){
    //write code here
}`;
      break;
  }
  return codeContext;
}

export function codeMirrorModeFn(languageType: string) {
  let codeMode = '';
  switch (languageType) {
    case 'JavaScript':
      codeMode = 'application/javascript';
      break;
    case 'Java':
      codeMode = 'text/x-java';
      break;
    case 'C++':
      codeMode = 'text/x-c++src';
      break;
    case 'Python':
      codeMode = 'text/x-python';
      break;
    case 'C':
      codeMode = 'text/x-csrc';
      break;
  }
  return codeMode;
}
