export default [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: './Home', title: '首页' },
      { path: '/login', component: './Login', title: '登录' },
      { path: '/personal', component: './Personal', title: '个人中心' },
    ],
  },
];
