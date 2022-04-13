import styles from './index.less';
import { List, Avatar, Button } from 'antd';

const listData: ArticleData[] = [];
for (let i = 0; i < 200; i++) {
  listData.push({
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    content:
      'We supply a series of design principles,We supply a series of design principles. ',
  });
}

export default function MyArticle() {
  return (
    <div className={styles.mainContainer}>
      <List
        className={styles.list}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
          showSizeChanger: false,
        }}
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="list-edit" type="primary">
                edit
              </Button>,
              <Button key="list-delete" danger>
                delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<p>{item.title}</p>}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}
