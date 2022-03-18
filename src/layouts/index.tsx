import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './index.less';

export default function indexLayout(props: any) {
  return (
    <>
      <Header />
      <div className={styles.container}>{props.children}</div>
      <Footer />
    </>
  );
}
