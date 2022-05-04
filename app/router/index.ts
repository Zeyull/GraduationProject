import koaRouter from 'koa-router';
import indexController from '../controller/indexController';
import LoginController from '../controller/LoginController';
import UploadController from '../controller/UploadController';
import UserController from '../controller/UserController';
import AuthMiddleware from '../middleware/AuthMiddleware';
const router = new koaRouter({prefix:"/api"});
router.post('/register',LoginController.register);
router.post('/getCaptcha',indexController.getCaptcha);
router.post('/login',LoginController.login);
router.get('/getUserInfo',UserController.getUserInfo);
router.post('/updateUserInfo',UserController.updateUserInfo);
router.post('/uploadHeaderImage',UploadController.uploadHeaderImage);
// router.use(AuthMiddleware)
export default router;