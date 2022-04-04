import { Tag } from 'antd';

export default function LevelTag(props: { level: string | undefined }) {
  const { level } = props;
  let text = '简单';
  let color = 'green';
  switch (level) {
    case '1':
      text = '简单';
      color = 'green';
      break;
    case '2':
      text = '中等';
      color = 'blue';
      break;
    case '3':
      text = '困难';
      color = 'red';
      break;
  }
  return <Tag color={color}>{text}</Tag>;
}
