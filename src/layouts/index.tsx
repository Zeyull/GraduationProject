import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './index.less';
import { history } from 'umi';
import { useAtom } from 'jotai';
import { isFullCodePage } from '@/jotai';

export default function IndexLayout(props: any) {
  const isFullPage = useAtom(isFullCodePage)[0];
  const path = history.location.pathname;
  const isCodePage = path === '/code';
  return (
    <div className={styles.basicLayout}>
      {!isFullPage && <Header />}
      <div className={styles.container}>{props.children}</div>
      {!isCodePage && <Footer />}
    </div>
  );
}
