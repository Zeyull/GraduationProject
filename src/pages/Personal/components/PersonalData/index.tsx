import styles from './index.less';
import { Descriptions, Input, Form, Cascader, Radio, Button } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { usernameRules, phoneRules, emailRules } from '@/utils/rules';
import cityInfo from '@/utils/cityInfo';

const { TextArea } = Input;

export default function PersonalData(props: {
  isChange: boolean;
  changeFn: Function;
}) {
  const { isChange, changeFn } = props;

  // 提交新的用户信息
  const onFormFinish = (e: any) => {
    console.log(e);
    changeFn(false);
    // city: (2) ['上海', '宝山']
    // email: "123123@qq.com"
    // personalIntroduction: "213"
    // phone: "13508085664"
    // sex: "male"
    // userName: "2133"
  };
  // 取消修改
  const cancelForm = () => {
    changeFn(false);
  };

  const personalInput = (
    <Form
      name="personalData"
      className={styles.personalForm}
      labelWrap={true}
      onFinish={onFormFinish}
    >
      <Form.Item name="userName" label="用户名" rules={usernameRules}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="电话" rules={phoneRules}>
        <Input />
      </Form.Item>
      <Form.Item name="city" label="居住城市">
        <Cascader options={cityInfo} placeholder="Please select" />
      </Form.Item>
      <Form.Item
        name="sex"
        label="性别"
        initialValue={'male'}
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value="male">
            <div className={styles.maleRadio}>
              <ManOutlined />
            </div>
          </Radio>
          <Radio value="female">
            <div className={styles.femaleRadio}>
              <WomanOutlined />
            </div>
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={emailRules}
        style={{ gridArea: 'e' }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="personalIntroduction"
        label="个人介绍"
        style={{ gridArea: 'g', width: '70%' }}
      >
        <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
      </Form.Item>
      <Form.Item
        style={{ gridArea: 'i', justifySelf: 'start', alignSelf: 'end' }}
      >
        <Button type="primary" htmlType="submit">
          确定修改
        </Button>
        <Button onClick={cancelForm} className={styles.cancelButton}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
  const personalDataItem = (
    <Descriptions>
      <Descriptions.Item label="用户名">落雪如意</Descriptions.Item>
      <Descriptions.Item label="电话">1810000000</Descriptions.Item>
      <Descriptions.Item label="居住城市">上海</Descriptions.Item>
      <Descriptions.Item label="性别">男</Descriptions.Item>
      <Descriptions.Item label="邮箱号" span={2}>
        834159744@qq.com
      </Descriptions.Item>
      <Descriptions.Item label="个人介绍" span={3}>
        这个人很懒没有个人介绍
      </Descriptions.Item>
    </Descriptions>
  );
  return (
    <div className={styles.mainContainer}>
      <p className={styles.title}>个人信息</p>
      {isChange ? personalInput : personalDataItem}
    </div>
  );
}
