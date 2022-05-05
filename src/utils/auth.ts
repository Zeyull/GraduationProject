// 判断用户是否登录
export function useAuth() {
  const isLogin = localStorage.getItem('token') !== null;
  return {
    isLogin,
  };
}
