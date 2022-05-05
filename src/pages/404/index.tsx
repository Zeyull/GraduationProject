import { Result, Button } from 'antd';
import { history } from 'umi';

export default function NotFound() {
  return (
    <Result
      style={{ height: '600px' }}
      status="404"
      title="页面走丢了！"
      subTitle="您输入的页面错误或不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push('/home');
          }}
        >
          Back Home
        </Button>
      }
    />
  );
}
