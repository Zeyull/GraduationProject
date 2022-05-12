import Question from '../model/Question';
import UserQuestion from '../model/UserQuestion';
import DailyQuestion from '../model/DailyQuestion';
import Article from '../model/Article';

class QuestionService{
    async getQuestionByID(question_id:number){
        return Question.findOne({where: {question_id}});
    }
    async getAllQuestion(){
        return Question.findAll();
    }
    async getQuestionCommitsByID(question_id:number){
        return UserQuestion.count({where: {question_id}})
    }
    async getQuestionRightCommitByID(question_id:number){
        return UserQuestion.count({where: {question_id,state:1}});
    }
    async getUserQuestionStatus(uuid:number,question_id:number){
        return UserQuestion.findOne({where: {uuid,question_id,state:1},attributes:['state']});
    }
    // 获取用户的某个题信息
    async getUserQuestionInfo(uuid:number,question_id:number){
        return UserQuestion.findAll({where: {uuid,question_id}})
    }
    async getQuestionSolutionsByID(question_id:number){
        return Article.count({where: {question_id}});
    }
    async createUserQuestion(data:any){
        return UserQuestion.create(data);
    }
    async getJudgeSubmitsByID(uuid:number,question_id:number){
        return UserQuestion.findAll({where: {uuid,question_id}});
    }
    async getSubHistoryByID(uuid:number){
        return UserQuestion.findAll({where: {uuid}});
    }
    async createDailyQuestion(date:string){
        const length = await Question.count();
        const question_id = Math.floor(Math.random() * length - 1) + 1;
        return DailyQuestion.create({date,question_id});
    }
    async getDailyQuestion(){
        return DailyQuestion.findAll();
    }
}

export default new QuestionService;