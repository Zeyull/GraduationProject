import { Tag } from 'antd';

const redStyles = {
  color: '#cf1322',
  background: '#fff1f0',
  borderColor: '#ffa39e',
};

const blueStyles = {
  color: '#096dd9',
  background: '#e6f7ff',
  borderColor: '#91d5ff',
};

const greenStyles = {
  color: '#389e0d',
  background: '#f6ffed',
  borderColor: '#b7eb8f',
};

export default function LevelTag(props: { level: string | undefined }) {
  const { level } = props;
  let text = '简单';
  let color = 'green';
  let tagStyle;
  switch (level) {
    case '1':
      text = '简单';
      color = 'green';
      tagStyle = greenStyles;
      break;
    case '2':
      text = '中等';
      color = 'blue';
      tagStyle = blueStyles;
      break;
    case '3':
      text = '困难';
      color = 'red';
      tagStyle = redStyles;
      break;
  }
  return (
    <Tag color={color} style={tagStyle}>
      {text}
    </Tag>
  );
}
