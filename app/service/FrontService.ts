import FrontQuestion from '../model/FrontQuestion';
import {FrontQuestion as FrontQuestionType} from '../types/question';

class FrontService{
    async getAllFrontQuestion(){
        return FrontQuestion.findAll();
    }

    async createFrontQuestion(data:FrontQuestionType){
        return FrontQuestion.create({...data});
    }
}

export default new FrontService;