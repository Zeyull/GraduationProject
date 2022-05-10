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
router.get('/getUserInfo',UserController.getUserInfo);
router.post('/updateUserInfo',UserController.updateUserInfo);
router.post('/uploadHeaderImage',UploadController.uploadHeaderImage);

//code部分
router.get('/getAllFrontQuestion',CodeController.getAllFrontQuestion);
router.post('/createFrontQuestion',CodeController.createFrontQuestion);
router.post('/judgeCode',CodeController.judgeCode);
router.get('/getQuestionByID',CodeController.getQuestionByID);
router.get('/getAllQuestion',CodeController.getAllQuestion);
router.get('/getJudgeSubmitsByID',CodeController.getJudgeSubmitsByID);
router.get('/getSubHistoryByID',CodeController.getSubHistoryByID);
router.get('/getDailyQuestion',CodeController.getDailyQuestion);

//article部分
router.post('/createArticle',ArticleController.createArticle);
router.get('/getArticleByID',ArticleController.getArticleByID);
router.post('/getArticleLikeOrNot',ArticleController.getArticleLikeOrNot);
router.post('/addComment',ArticleController.addComment);
router.get('/getAllTags',ArticleController.getAllTags);
router.get('/getAllArticle',ArticleController.getAllArticle);
router.delete('/deleteArticle',ArticleController.deleteArticle);

// router.use(AuthMiddleware)
export default router;