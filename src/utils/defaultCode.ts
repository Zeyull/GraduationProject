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
    case 'Python3':
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
    case 'Python3':
      codeMode = 'text/x-python';
      break;
    case 'C':
      codeMode = 'text/x-csrc';
      break;
  }
  return codeMode;
}

export function getFrontPage(
  code: { html: string; css: string; js: string },
  body: any,
) {
  const { html, css, js } = code;

  let src = html;
  let array_matches_head_tag = null;
  let array_matches_body_tag = null;
  // 分成三个所以要把三个编辑器里的内容拼接成一个完整的html文件
  if (html) {
    let patternHtmlTag = /<html([^>]*)>/im;
    let array_matches_html_tag = patternHtmlTag.exec(html);
    if (array_matches_html_tag) {
      src = src.replace('<html>', '<html' + array_matches_html_tag[1] + '>');
    }
    let patternHead = /<head[^>]*>((.|[\n\r])*)<\/head>/im;
    array_matches_head_tag = patternHead.exec(src);
    let patternBody = /<body([^>]*)>/im;
    array_matches_body_tag = patternBody.exec(src);
    if (array_matches_body_tag) {
      src = src.replace('<body>', '<body ' + array_matches_body_tag[1] + '>');
    }
  }
  // 拼接css代码
  if (css) {
    let inputCss = '<style>' + css + '</style>';
    if (array_matches_head_tag) {
      src = src.replace('</head>', inputCss + '</head>');
    } else if (array_matches_body_tag) {
      src = src.replace('</body>', inputCss + '</body>');
    } else {
      src += inputCss;
    }
  }
  // 拼接js代码
  if (js) {
    let inputJs = '<script>' + js + '</script>';
    if (array_matches_body_tag) {
      src = src.replace('</body>', inputJs + '</body>');
    } else {
      src += inputJs;
    }
  }
  let text = src;
  if (text === '') {
    body.innerHTML = "<p class='defaultText'>编写代码后，点击编译生成页面</p>";
    return;
  }
  // 生成iframe，将拼接好的html代码写入iframs中，这样就能显示出运行结果了
  let ifr = document.createElement('iframe');
  ifr.setAttribute('frameborder', '0');
  ifr.setAttribute('id', 'iframeResult');
  ifr.setAttribute('width', '100%');
  ifr.setAttribute('height', '100%');
  body.innerHTML = '';
  body.appendChild(ifr);
  if (ifr.contentWindow) {
    let ifrw = ifr.contentWindow.document;
    ifrw.open();
    ifrw.write(text);
    ifrw.close();
  }
}
// 待优化：捕获异常
