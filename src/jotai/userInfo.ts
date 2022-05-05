import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const defaultUserInfo: UserInfo = {
  uuid: null,
  head_img: '/default/unLoginImg.png',
  city: '浙江/杭州',
  email: '',
  introduction: '这个人很懒，什么都没有写',
  sex: 1,
  user_name: '',
  age: 18,
};

export const userInfoAtom = atomWithStorage<UserInfo>(
  'userInfoAtom',
  defaultUserInfo,
);
