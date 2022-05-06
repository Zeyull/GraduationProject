import { RuleItem }from 'async-validator';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export function codeGetMessage(code: string){
  //@ts-ignore
  return codeMessage[code];
}

// 邮箱规则
export const emailRules:RuleItem[] = [
  { type:'string', required: true, message: '邮箱不能为空' },
  {
    type:'string',
    pattern:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: '请输入正确的邮箱',
  },
];

// 密码规则
export const passwordRules:RuleItem[]= [
  { type:'string',required: true, message: '密码不能为空' },
  {
    type:'string',
    pattern: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Za-z]).*$/,
    message: '密码长度至少8位且至少含有一个数字和一个英文字母',
  },
];

// 验证码规则
export const captchaRules:RuleItem[] = [
  { type:'string',required: true, message: '验证码不能为空' },
  { type:'string',min: 6, max: 6, message: '请输入正确的验证码' },
];

// 昵称规则
export const usernameRules:RuleItem[] = [
  { type:'string',required: true, message: '用户名不能为空' },
  {
    type:'string',
    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{4,10}$/,
    message: '用户名长度应为4-10位,只包含中英文- _符号',
  },
];

// 手机规则
export const phoneRules:RuleItem[] = [
  { type:'string',required: true, message: '手机号不能为空' },
  {
    type:'string',
    pattern:
      /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/,
    message: '请输入正确的手机号',
  },
];

export const sexRules:RuleItem[] = [
  { type:'number',required: true, message: '性别类型不能为空' },
]

export const cityRules:RuleItem[] = [
  { type:'string',required: true, message: '居住城市不能为空' },
]

export const introductionRules:RuleItem[] = [
  { type:'string',required: true, message: '个人介绍不能为空' },
]

export const uuidRules:RuleItem[] = [
  { required: true, message: '用户ID不能为空' },
  { type: 'number', message: '用户ID类型为Number' },
]

export const typeRules:RuleItem[] = [
  { type:'number',required: true, message: '登录类型不能为空' },
]

export const ageRules:RuleItem[] = [
  { required: true, message: '请输入年龄' },
  { pattern: /^([1-9]\d?|100)$/,message:'年龄范围设置在1-100'}
]

export const questionNameRules:RuleItem[] = [
  {required:true, message: '题目名不能为空'},
  { type:'string', pattern:/^.{4,10}$/,message: '题目长度为4到10位'}
]

export const questionContentRules:RuleItem[] = [
  {required:true, message: '题目内容不能为空'},
]

export const articleTitleRules:RuleItem[] = [
  {required:true, message: '文章标题不能为空'},
  { type:'string', pattern:/^.{1,20}$/,message: '文章标题长度应该1到20位'},
]

export const timeRules:RuleItem[] = [
  {required:true, message: '上传时间不能为空'},
  { type:'string',message: 'time数据格式不对'},
]

export const articleContentRules:RuleItem[] = [
  {required:true, message: '文章内容不能为空'},
  { type:'string',message: 'article_content数据格式不对'},
]

export const authorIDRules:RuleItem[] = [
  {required:true, message: '发布者不能为空'},
]
