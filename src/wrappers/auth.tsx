import { Redirect } from 'umi';
import { useAuth } from '@/utils/auth';

export default (props: any) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
