export default [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: './Home', title: '首页' },
      { path: '/login', component: './Login', title: '登录' },
      {
        path: '/personal',
        component: './Personal',
        title: '个人中心',
        wrappers: ['@/wrappers/auth'],
      },
      { path: '/code', component: './Code', title: 'xxx题' },
      { path: '/article-list', component: './ArticleList', title: '文章笔记' },
      {
        path: '/article-content/:id',
        component: './ArticleContent',
        title: 'xxx文章',
      },
      { path: '/front-code', component: './FrontCode', title: '前端练习' },
      {
        path: '/create-article',
        component: './CreateArticle',
        title: '新建文章',
        wrappers: ['@/wrappers/auth'],
      },
      {
        component: './404',
      },
    ],
  },
];
