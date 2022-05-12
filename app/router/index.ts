import koaRouter from 'koa-router';
import AuthMiddleware from '../middleware/AuthMiddleware';
import indexController from '../controller/indexController';
import LoginController from '../controller/LoginController';
import UploadController from '../controller/UploadController';
import UserController from '../controller/UserController';
import CodeController from '../controller/CodeController';
import ArticleController from '../controller/ArticleController';
const router = new koaRouter({prefix:"/api"});
router.post('/register',LoginController.register);
router.post('/getCaptcha',indexController.getCaptcha);
router.post('/login',LoginController.login);
router.get('/getAllFrontQuestion',CodeController.getAllFrontQuestion);
router.get('/getAllQuestion',CodeController.getAllQuestion);
router.get('/getDailyQuestion',CodeController.getDailyQuestion);
router.get('/getAllTags',ArticleController.getAllTags);
router.get('/getAllArticle',ArticleController.getAllArticle);
router.get('/getQuestionByID',CodeController.getQuestionByID);
router.get('/getSubHistoryByID',CodeController.getSubHistoryByID);
router.get('/getArticleByID',ArticleController.getArticleByID);
router.get('/getUserInfo',UserController.getUserInfo);
router.get('/getJudgeSubmitsByID',CodeController.getJudgeSubmitsByID);
// token 判断
router.use(AuthMiddleware);
router.post('/updateUserInfo',UserController.updateUserInfo);
router.post('/uploadHeaderImage',UploadController.uploadHeaderImage);
router.post('/createFrontQuestion',CodeController.createFrontQuestion);
router.post('/judgeCode',CodeController.judgeCode);
router.post('/createArticle',ArticleController.createArticle);
router.post('/getArticleLikeOrNot',ArticleController.getArticleLikeOrNot);
router.post('/addComment',ArticleController.addComment);
router.delete('/deleteArticle',ArticleController.deleteArticle);
export default router;