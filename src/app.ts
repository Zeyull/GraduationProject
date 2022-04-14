// 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。
import { message } from 'antd';

message.config({
  duration: 2,
  maxCount: 3,
});

// 设置markdown主题色
document.documentElement.setAttribute('data-color-mode', 'light');
