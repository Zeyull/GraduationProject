import koaRouter from 'koa-router';
import IndexController from '../controller/indexController';
import LoginController from '../controller/LoginController';
import AuthMiddleware from '../middleware/AuthMiddleware';
const router = new koaRouter({prefix:"/api"});
router.get('/',IndexController.index);
router.post('/login',LoginController.index);
router.use(AuthMiddleware)
export default router;