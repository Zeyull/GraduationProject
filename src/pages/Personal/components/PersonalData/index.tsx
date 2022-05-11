import styles from './index.less';
import {
  Descriptions,
  Input,
  Form,
  Cascader,
  Radio,
  Button,
  message,
} from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { usernameRules, emailRules, ageRules } from '@/utils/rules';
import cityInfo from '@/utils/cityInfo';
import request from '@/utils/request';

const { TextArea } = Input;

export default function PersonalData(props: {
  isChange: boolean;
  changeFn: Function;
  userInfo: UserInfo;
  setUserInfo: Function;
}) {
  const { isChange, changeFn, userInfo, setUserInfo } = props;

  // 提交新的用户信息
  async function onFormFinish(formData: any) {
    formData.city = formData.city.join('/');
    const res = await request.post('/updateUserInfo', {
      data: {
        uuid: userInfo.uuid,
        userInfo: formData,
      },
    });
    if (res.code >= 400) {
      message.error(res.msg);
    } else if (res.code === 200) {
      message.success(res.msg);
      const userInfoRes = await request.get('/getUserInfo', {
        params: {
          uuid: userInfo.uuid,
        },
      });
      if (userInfoRes.code >= 400) {
        message.error(userInfoRes.msg);
      } else if (userInfoRes.code === 200) {
        const data = userInfoRes.data;
        setUserInfo(data.user);
      }
      changeFn(false);
    }
  }
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
      initialValues={{
        user_name: userInfo.user_name,
        age: userInfo.age,
        city: userInfo.city.split('/'),
        sex: userInfo.sex,
        email: userInfo.email,
        introduction: userInfo.introduction,
      }}
    >
      <Form.Item name="user_name" label="用户名" rules={usernameRules}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label="年龄" rules={ageRules}>
        <Input />
      </Form.Item>
      <Form.Item name="city" label="居住城市">
        <Cascader options={cityInfo} placeholder="Please select" />
      </Form.Item>
      <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value={1}>
            <div className={styles.maleRadio}>
              <ManOutlined />
            </div>
          </Radio>
          <Radio value={0}>
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
        <Input readOnly />
      </Form.Item>
      <Form.Item
        name="introduction"
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
      <Descriptions.Item label="用户名">{userInfo.user_name}</Descriptions.Item>
      <Descriptions.Item label="年龄">{userInfo.age}</Descriptions.Item>
      <Descriptions.Item label="居住城市">{userInfo.city}</Descriptions.Item>
      <Descriptions.Item label="性别">
        {userInfo.sex === 1 ? '男' : '女'}
      </Descriptions.Item>
      <Descriptions.Item label="邮箱号" span={2}>
        {userInfo.email}
      </Descriptions.Item>
      <Descriptions.Item label="个人介绍" span={3}>
        {userInfo.introduction}
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
