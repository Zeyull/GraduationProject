import type { Rule } from 'rc-field-form/lib/interface';

// 邮箱规则
export const emailRules: Rule[] = [
  { required: true, message: '请输入邮箱' },
  {
    pattern:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: '请输入正确的邮箱',
  },
];

// 密码规则
export const passwordRules: Rule[] = [
  { required: true, message: '请输入密码' },
  {
    pattern: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Za-z]).*$/,
    message: '密码长度至少8位且至少含有一个数字和一个英文字母',
  },
];

// 验证码规则
export const captchaRules: Rule[] = [
  { required: true, message: '请输入验证码' },
  { min: 6, max: 6, message: '请输入正确的验证码' },
];

// 学号规则
export const studentIdRules: Rule[] = [
  { required: true, message: '请输入学号' },
  { pattern: /^.*(?=.{5,})(?=.*\d).*$/, message: '请输入正确的学号' },
];

// 昵称规则
export const usernameRules: Rule[] = [
  { required: true, message: '请输入用户名' },
  {
    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{4,10}$/,
    message: '用户名长度应为4-10位,只包含中英文- _符号',
  },
];

export const phoneRules: Rule[] = [
  { required: true, message: '请输入手机号' },
  {
    pattern:
      /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/,
    message: '请输入正确的手机号',
  },
];

export const ageRules: Rule[] = [
  { required: true, message: '请输入年龄' },
  {
    pattern: /^([1-9]\d?|100)$/,
    message: '年龄范围在1-100',
  },
];
